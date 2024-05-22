import express from "express";
import { getUserByEmail, create_user } from "../../db/models/users"
import bcrypt from "bcrypt"

import FormData from "form-data"


const importDynamic = new Function('modulePath', 'return import(modulePath)');

const fetch = async (...args:any[]) => {
  const module = await importDynamic('node-fetch');
  return module.default(...args);
};



const router = express.Router()


router.get("/clan/membership/applications", async (request: express.Request, response: express.Response) => {

    const loginURL = process.env["TARGET_ENDPOINT"] + "/"
    const notificationURL = `${process.env["TARGET_ENDPOINT"]}/activity/notifications`;
    const formData = new FormData();

    formData.append('XAwsao1U50', process.env["EMAIL"]);
    formData.append('password', process.env["PASSWORD"]);
    formData.append('email_field', process.env["EMAIL_FIELD"]);

  
    const options =  {

            method: "POST",
            headers: {

                 Accept: '*/*',
                'User-Agent': process.env["USER_AGENT"],
                'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
            },

            body: formData

       

      }



     fetch(loginURL, options)
    .then(res => res.text())
    .then(json => response.send(json))
    .catch(err => response.send(err));



})

router.post("/login", async (request: express.Request, response: express.Response) => {

    const { email, password } = request.body

    if (!email || !password) {

        return response.status(400).json({ data: "You have to fill required fields"})
    }

    const user = await getUserByEmail(email).select("+ auth.password")

    if (!user) {

        return response.status(404).json({ data: "Could not find user"})
    }


    const correctPassword = await bcrypt.compare(password, user.auth.password)

    if (!correctPassword) {

        return response.status(403).json({ data: "Incorrect email or password"})
    }


    const sessionId = Math.floor(Math.random() * 2000) + user._id.toString()
    user.auth.sessionToken = sessionId
    await user.save()

    response.cookie("session-id", user.auth?.sessionToken, { domain: "localhost", path: "/"})
    response.status(200).json({data: user})
})



router.post("/register", async (request: express.Request, response: express.Response) => {


    try {
        console.log("body:", request.body)
        const { email, username, password } = request.body

        if (!email || !username || !password) {

            return response.status(400).json({ data: "You have to fill all required fields"})
        }


        const registeredUser = await getUserByEmail(email)

        if (registeredUser) {

            return response.status(400).json({ data: "An user with given email already exist"})
        }


        const hash_password = await bcrypt.hash(password, 10)
        const user = await create_user({

            username,
            email,
            auth: {

                password: hash_password
            }
        })


        return response.status(201).json( {data: user})

    } catch (error) {
        
        console.log("REGISTER API:", error)
        response.status(400).json({data: "Something went wrong try again in a few minutes"})
    }
})



export default router