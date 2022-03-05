import React from 'react'
import { useState } from "react";
import { useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import RoomJoinPage from "./RoomJoinPage";
import Room from "./Room";
import CreateRoomPage from "./CreateRoomPage";
import { Grid, Button, ButtonGroup, Typography} from "@material-ui/core"
import SurroundSoundIcon from '@material-ui/icons/SurroundSound';
import { 
    BrowserRouter, 
    Routes, 
    Route, 
    Link, 
    Navigate,
    Redirect 
} from "react-router-dom";



const HomePage = () => {
  
  let [roomCode, setRoomCode] = useState(null)  

  useEffect(() => {
    userInRoom()
    console.log('useEffect fired')
    console.log(roomCode)
  }, []);
  
  let userInRoom = async () => {
    await fetch('/api/user-in-room')
    .then((response) => response.json())
    .then((data) => {
      console.log(typeof(data.code))
      setRoomCode(data.code)
      console.log('this far')
    })
  }
  const RenderHomePage =
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <SurroundSoundIcon fontSize='large' color='secondary' />
          <Typography variant="h3" component="h3">
            Reactify
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/join" component={ Link }>
              Join a Room
            </Button>
            <Button color="secondary" to="/create" component={ Link }>
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>;


  
  return (
    <BrowserRouter>
    
    <div className="app">


        <Routes>
            <Route path='/' element={roomCode ? <Navigate to={"/room/" + roomCode} /> : RenderHomePage}/>
            <Route path='/join/*' element={ <RoomJoinPage /> }/>
            <Route path='/create' element={ <CreateRoomPage /> }/>
            <Route path='/room/:roomCode' element={ <Room /> }/>
        </Routes>


    </div>
    
    </BrowserRouter>

  )
}

export default HomePage