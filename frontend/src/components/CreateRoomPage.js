import React, { Component } from "react";
import { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl"
import { Link } from "react-router-dom";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { Collapse } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";


const CreateRoomPage = ({def_skipVotes=4, def_pause=true, def_update=false, def_roomCode=null, updateCallback}) => { 

    const history = useNavigate();

    let [update, setUpdate] = useState(def_update)  
    let [pause, setPause] = useState(def_pause)  
    let [successMsg, setSuccessMsg] = useState('')  
    let [errorMsg, setErrorMsg] = useState('')  
    let [skipVotes, setSkipVotes] = useState(def_skipVotes)
    console.log(def_skipVotes)

    update ? console.log(skipVotes) : console.log('update false');

    let handleRoomButtonPressed = async () => {
        console.log(skipVotes)
        console.log(setPause)
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: skipVotes,
                guest_can_pause: pause
            }),
        };
        // console.log(requestOptions);
        await fetch('/api/create-room', requestOptions).then((response) =>
            response.json()
        ).then((data) => history("/room/" + data.code));


            
 
    }
    
    const handleUpdateButtonPressed = async () => {
        console.log(skipVotes)
        console.log(def_roomCode)
        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                votes_to_skip: skipVotes,
                guest_can_pause: pause,
                code: def_roomCode,
            }),
        };
        // console.log(requestOptions);
        await fetch('/api/update-room', requestOptions).then((response) => {
            if (response.ok) {
                
                setSuccessMsg("Room updated successfully!")

            } else {
                setErrorMsg("Error updated room...")
            }
            updateCallback()
        }
        
            
        );
    }


    const renderCreateButton = () => {  
        return(
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" onClick={handleRoomButtonPressed}>
                    Create A Room
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" to="/" component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
        );
    }

    const renderUpdateButton = () => {
        return(
            <Grid item xs={12} align="center">
            <Button color="primary" variant="contained" onClick={handleUpdateButtonPressed}>
                Update Room
            </Button>
        </Grid>
        )
    }

    const title = update ? "Update Room" : "Create a Room";

    return (
    <Grid container spacing={1}>
    
    <Grid item xs={12} align="center">
        <Collapse in={errorMsg != '' || successMsg != ''}>
                {successMsg != '' ? (
                <Alert
                severity="success"
                onClose={() => {
                  setSuccessMsg("");
                }}
                >{successMsg}</Alert>
                ) : (
                <Alert severity="error" 
                onClose={() => {
                    setErrorMsg('');
                }}
                >{errorMsg}</Alert>)}
            </Collapse>
    </Grid>
    <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
             {title}
        </Typography>
    </Grid>
    <Grid item xs={12} align="center">
        <FormControl component="fieldset" >
            <FormHelperText component="div">
                <div align="center">
                    Guest Control of Playback State
                </div>
            </FormHelperText>
            <RadioGroup 
                row 
                defaultValue={def_pause.toString()}
                onChange={(e)=> {setPause(e.target.value)}}>
                <FormControlLabel
                    value="true"
                    control={<Radio color="primary" />}
                    label="Play/Pause"
                    labelPlacement="bottom"
                />
                <FormControlLabel 
                    value="false"
                    control={<Radio color="secondary" />}
                    label="No Control"
                    labelPlacement="bottom"
                />  
            </RadioGroup>
        </FormControl>
    </Grid>
    <Grid item xs={12} align="center">
        <FormControl>
            <TextField 
                required={true} 
                type="number" 
                onChange={(e)=> {setSkipVotes(e.target.value)}}
                defaultValue={skipVotes}
                inputProps={{
                    min: 1,
                    style: {textAlign: "center"},
                }} 
                />
                <FormHelperText component="div">
                    <div align="center">Votes Required to Skip Song</div>
                </FormHelperText>
        </FormControl>
    </Grid>
    {update ? renderUpdateButton() : renderCreateButton()}
</Grid>     

  )
}
export default CreateRoomPage