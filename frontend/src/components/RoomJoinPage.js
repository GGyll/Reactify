import React, { Component } from "react";
import { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import {TextField, Button, Grid, Typography } from "@material-ui/core";


const RoomJoinPage = () => {
    const history = useNavigate();
    let [roomCode, setRoomCode] = useState("")  
    let [error, setError] = useState("")  
  

    let handleTextFieldChange = e => {
        setRoomCode(e.target.value)
    };

    let roomButtonPressed = () => {
        const requestOptions = {
           method: "POST",
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({
                code: roomCode
           })
        };
        fetch('/api/join-room', requestOptions).then((response) => {
            if (response.ok) {
                history(`/room/${roomCode}`)
            } else {
                setError("Room not found.")
            }
        }).catch((error) => {
            console.log(error);
        })
    };

    return (
    <Grid container spacing={1}>
        <Grid item xs={12} align="center">
            <Typography variant="h4" component="h4">
                Join a Room
            </Typography>
        </Grid>
        <Grid item xs={12} align="center">
            <TextField
                error={error}
                label="Code"
                placeholder="Enter a Room Code"
                value={roomCode}
                helperText={error}
                variant="outlined" 
                onChange={handleTextFieldChange}
            />
    
        </Grid>
        
        <Grid item xs={12} align="center">
            <Button variant="contained" color="primary" onClick={roomButtonPressed}>Enter Room</Button>
        </Grid>
        <Grid item xs={12} align="center">
            <Button variant="contained" color="secondary" to="/" component={Link}>Back</Button>
        </Grid>
        
    </Grid>
  
  
  )


 
  
}



export default RoomJoinPage