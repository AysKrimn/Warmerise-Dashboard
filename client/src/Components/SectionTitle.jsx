import { Typography } from '@mui/material'
import React from 'react'

export default function SectionTitle({ title }) {
  return (

        <>
    
        
        <Typography sx={{ textAlign: "center", marginTop: "1rem"}} variant='h3'>{title}</Typography> 
        <hr></hr>

        </>
  )
}
