import React, { useEffect, useRef, useState } from 'react'
import SectionTitle from '../Components/SectionTitle'
import { Alert, Box, Button, TextField } from '@mui/material'
import { base_endpoint } from '../API/config'
import WUserCard from '../Components/WUserCard'

export default function SearchUser() {

  const [userInput, setUserInput] = useState("")
  const [previousInput, setPreviousInput] = useState("")
  const [target, setTarget] = useState(null)
  
  const handleState = (e) => {

        setUserInput(e.target.value)
  }

  const get_user_data = async () => {

            console.log("tetik ve state:", userInput)

            if (userInput === "") {

                return
            }


            if (userInput === previousInput) {
                console.log("query aynı olduğu için aborted.")
                return
            }

            const request = await fetch(`${base_endpoint}/stats/users/${userInput}`)
            const response = await request.json()

            console.log("SUNUCUDAN GELEN YANİT:", response)

            if (request.status === 200) {

                setTarget(response.data)
                setPreviousInput(userInput)

            } else {

                console.log(response)
                window.alert(response.data)
            }
            
 }


    useEffect(() => {

                const handleClickOutside = (event) => {
                // Textbox dışına tıklandığında yapılacak işlemler
                if (!event.target.closest('.search-box')) {
                    // API isteği yapabilirsiniz
                    get_user_data()
                }
                };

                // Dışarı tıklama olayını dinle
                document.addEventListener('mousedown', handleClickOutside);

                // useEffect'in temizleme işlevi
                return () => {
                document.removeEventListener('mousedown', handleClickOutside);
                };
    }); 




  const alert = useRef()
  return (

        <>
        
           <SectionTitle title="Search User"></SectionTitle> 

           <Alert ref={alert} onClose={(e) => { alert.current.remove()}} severity="warning">When you done click outside of textbox to see your search result.</Alert>
           
           <Box display="flex">
                 
                 <TextField
                    className='search-box'
                    value={userInput}
                    onChange={(handleState)}
                    sx={{ flex: "1", marginTop: "8px"}} id="outlined-search" label="Type username here" type="search" 
                 />
           </Box>
          

          {

            target !== null 
            ?

            <Box>
                    <WUserCard data={target}></WUserCard>

            </Box>
             

            : 
                null

          }
           
        </>
  )
}
