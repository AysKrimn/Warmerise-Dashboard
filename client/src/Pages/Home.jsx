import React, { useEffect, useState } from 'react'


import WUserCard from '../Components/WUserCard'
import SectionTitle from "../Components/SectionTitle"
import Skeleton from '@mui/material/Skeleton';

import { useNavigate } from 'react-router-dom'
import { base_endpoint } from "../API/config"
import { Box, Button } from '@mui/material'


export default function Home() {

  // states
  const [topUsers, setTopusers] = useState([])
  const [loader, setLoader] = useState(true)

  const yonlendir = useNavigate()

  const navigateToDetailSearch = () => {

        yonlendir("/users/search-more")
  }



  useEffect(() => {

      const get_top_users = async () => {

          const request = await fetch(`${base_endpoint}/stats/users/top-5`)
          const response = await request.json()

          if (request.status === 200) {

              setTopusers(response)
              setLoader(false)
          }

          console.log(response)

      }

        get_top_users()

  }, [])


  return (

            <>

              

                            <SectionTitle title="Top 5"></SectionTitle>


              
                            <Box display="flex" flexWrap="wrap" gap="15px">

                                  { 
                                      loader ? Array.from(new Array(5)).map((card, index) => { return <Skeleton key={index} variant="rectangular" width={210} height={118} /> }) 
                                      
                                      : topUsers.map(user => { return <WUserCard data={user.data}></WUserCard> })
                                  }

      
                            </Box>
                    


                            <Box textAlign="center" marginTop="2rem">
                                    <Button onClick={navigateToDetailSearch}>Do spesific search</Button>
                            </Box>
                      
                

                    

         

                 
            </>
  )
}
