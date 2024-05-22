import React from 'react'
import SiteNavBar from '../Components/SiteNavBar'
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'

export default function AppLayout() {
  return (

        <>

            <SiteNavBar></SiteNavBar>

            <div className='site-content'>

                    <Container>
                        
                            <Outlet></Outlet>
                    
                    </Container>
                 
            </div>
        
        
        </>
  )
}
