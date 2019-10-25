import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Mic from '@material-ui/icons/Mic';
import { ReactMicPlus } from 'react-mic-plus';
import { StoreContext } from "../../context/StoreContext";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        background: '#3F5274'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    soundWave: {
        maxWidth: 300,
        position: 'static',
        float: 'right',
        marginLeft: 462
    },
}));

export default function Recorder() {
    const classes = useStyles();
    const { toggleOpen, saveRecord } = useContext(StoreContext);
    const { record } = useContext(StoreContext)

    function onStop(recordedBlob) {
        console.log('recordedBlob is: ', recordedBlob);
        saveRecord(recordedBlob)
    }

    return (
        <div>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Recorder
                    </Typography>
                    <div>
                        <ReactMicPlus
                            className={classes.soundWave}
                            record={record}
                            onStop={onStop}
                            strokeColor="#000000"
                            backgroundColor="#3F5274"
                            nonstop={true}
                            duration={5}
                        />
                    </div>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={toggleOpen}
                            color="inherit"
                        >
                            <Mic />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
