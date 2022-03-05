import React, { Component} from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { Grid, Button, Typography} from "@material-ui/core";
import CreateRoomPage from "./CreateRoomPage"
import MusicPlayer from './MusicPlayer';


const Room = () => {
  const history = useNavigate();
  let param = useParams();
  let room_id = param.roomCode;
  
  
  let [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false)
  let [pause, setPause] = useState(true)  
  let [song, setSong] = useState({})
  let [skipVotes, setSkipVotes] = useState(2)
  let [host, setHost] = useState(false)
  let [showSettings, setShowSettings] = useState(false)
  

  let getRoomDetails = async () => {
    let response = await fetch("/api/get-room" + "?code=" + room_id)
    let data = await response.json()
    if (!response.ok) {
        history('/');
        return
    }
    setSkipVotes(data.votes_to_skip)
    setPause(data.guest_can_pause)
    setHost(data.is_host)

    console.log(data.is_host)
    console.log(data.votes_to_skip)
    console.log('UPDATE CALLBACK')
  }




  useEffect(() => {
    getRoomDetails()
    if (host) {
        console.log('Host updated')
        console.log(host)
        authenticateSpotify()
        
    }
}, [host])
  
useEffect(() => {
    let interval = setInterval(getCurrentSong, 1000)

    return () => {
        console.log('Component unmounting code')
        clearInterval(interval)
    };
  },[])

  


  
  const authenticateSpotify = () => {
    fetch('/spotify/is-authenticated')
    .then((response) => response.json())
    .then((data) => {
        setSpotifyAuthenticated(data.status);
        if (!data.status) {
            fetch('/spotify/get-auth-url')
            .then((response) => response.json())
            .then((data) => {
                // Redirect to Spotify auth page
                window.location.replace(data.url);
            });
        }
    });
  }
  
  const getCurrentSong = () => {
      fetch('/spotify/current-song')
      .then((response) => {
          if (!response.ok) {
              console.log('response not ok')
                return {};
          } else {
            console.log('response ok')  
      
            return response.json();
          }
      })
      .then((data) => {
        console.log(data)   
        setSong(data)
      }
      )

  }

  const leaveButtonPressed = () => {
    const requestOptions = {
       method: "POST",
       headers: {"Content-Type": "application/json"}, 
    };
    fetch('/api/leave-room', requestOptions).then((_response) => {
        history('/');
    });
  }

  const updateShowSettings = (value) => {
      setShowSettings(value)
  }

  const renderSettings = () => {
      return <Grid container spacing={1}>
          <Grid item xs={12} align="center">
            <CreateRoomPage 
            def_update={true} 
            def_skipVotes={skipVotes} 
            def_pause={pause} 
            def_roomCode={room_id} 
            updateCallback={getRoomDetails}
             />
          </Grid>
          <Grid item xs={12} align="center">
          <Button variant="contained" color="secondary" onClick={() => updateShowSettings(false)}>
                  Close
              </Button>
          </Grid>
      </Grid>
  }


  const renderSettingsButton = () => {
      return (
          <Grid item xs={12} align="center">
              <Button variant="contained" color="primary" onClick={() => updateShowSettings(true)}>
                  Settings
              </Button>
          </Grid>
      );
  }
   
    if (showSettings) {
      return renderSettings();
    }
    return (
    <Grid container spacing={1}>
        <Grid item xs={12} align="center">
            <Typography variant="h4" component="h4">
                Code: {room_id}
            </Typography>
        </Grid>
        <MusicPlayer {...song}/>
        
        {host ? renderSettingsButton() : null}
        <Grid item xs={12} align="center">
            <Button color="secondary" variant="contained" onClick= {leaveButtonPressed}>
                Leave Room
                </Button>
        </Grid>
    </Grid>
    
    
   
  );
}

export default Room

