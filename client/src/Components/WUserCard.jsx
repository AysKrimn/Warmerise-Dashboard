import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Box, CardActionArea } from '@mui/material';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export default function WUserCard({ data }) {
  return (

    <Card sx={{ minWidth: "550px", maxWidth:"auto", marginTop: "1rem" }}>

    <Box display="flex" alignItems="center" gap="5px" paddingLeft="10px">
            <Avatar alt="Remy Sharp" src={data.image} />
            <p className='w-username'>
                    <a target='_blank' href={`https://warmerise.com/profile/${data.username}`}>{data.username}</a>
            </p>
        
    </Box>
  

      <CardActionArea>

        <CardMedia
          component="img"
          height="140"
          image={data.image}
          alt="user's banner"
        />


        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Stats
          </Typography>
   

          <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>XP</TableCell>
            <TableCell>Kills</TableCell>
            <TableCell>Deaths</TableCell>
            <TableCell>KDR</TableCell>
            <TableCell>H.K</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">{data.rank}</TableCell>
              <TableCell>{data.xp}</TableCell>
              <TableCell>{data.kills}</TableCell>
              <TableCell>{data.deaths}</TableCell>
              <TableCell>{data.kdr}</TableCell>
              <TableCell>{data.hk}</TableCell>
        </TableRow>
        
        </TableBody>
      </Table>
    </TableContainer>


        </CardContent>
      </CardActionArea>
    </Card>
  );
}