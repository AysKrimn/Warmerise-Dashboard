import express from "express";
import cheerio from "cheerio";


const importDynamic = new Function('modulePath', 'return import(modulePath)');

const fetch = async (...args:any[]) => {
  const module = await importDynamic('node-fetch');
  return module.default(...args);
};


// util
import { get_profile_data } from "../Helpers/ParseHTML";


const router = express.Router()




router.get("/stats/users/top-5", async (request: express.Request, response: express.Response) => {

    const target_endpoint = `${process.env['TARGET_ENDPOINT']}/pages/top100`
    
    const make_api_request = await fetch(target_endpoint)
    const data = []

    if(make_api_request.ok) {

        const html = await make_api_request.text()
        const $ = cheerio.load(html)
        const table = $(".datagrid tbody tr")
        const counter = 5
        const names = []
        const data = []
    
        table.slice(0, counter).each(async (idx, element) => {
     

            const profileName = $(element).find("td").eq(1).find('a').text()
            names.push(profileName)
            
            if (idx === counter - 1) {

            
                for await (const name of names) {

                   const req = await fetch(`${process.env["LOCAL_DEVELOPMENT"]}/api/v1/stats/users/${name}`)
                   const res = await req.json()

                   if (typeof res !== "object") {

                        continue
                   }

                   data.push(res)
    
                }

                response.status(200).send(data)
            }
        })
    

      
    } else {

        response.status(400).json({ data: "Could not connect Warmerise Server"})
    }

})


router.get("/stats/users/:username", async (request: express.Request, response: express.Response) => {

    const target_endpoint = `${process.env['TARGET_ENDPOINT']}/profile/${request.params.username}`
    const make_api_request = await fetch(target_endpoint)
    console.log("STATUS CODE:", make_api_request.status);

    if(make_api_request.status == 403) {

        return response.status(403).json({ data: `${process.env["TARGET_ENDPOINT"]} refused to share data`})
    }


    if(make_api_request.ok) {

        const html = await make_api_request.text()
        const $ = cheerio.load(html)

        const listItems = $(".layout_page_user_profile_index"); 
        const profileData = get_profile_data($, listItems)

        response.status(200).json({data: profileData})

    } else {


        return response.status(400).json({ data: "Something went wrong try again later"})
    }

})



export default router