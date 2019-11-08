import React, { useState, useEffect, useCallback, createContext, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import Mic from '@material-ui/icons/Mic';
import StopIcon from '@material-ui/icons/Stop';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SaveIcon from '@material-ui/icons/Save';
import GetAppIcon from '@material-ui/icons/GetApp';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { StoreContext } from "../../context/StoreContext";
import Player from "../AudioPlayer";
const path = ``

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    marginTop: 200,
    button: {
        margin: theme.spacing(1),
        float: "left",
        marginTop: 18
    },
    input: {
        display: "none"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        marginLeft: 150,
        float: "left",
        marginTop: 20,
        position: "static"
    }, appBar: {
        top: 'auto',
        bottom: 0,
        background: '#3F5274'
    },
    grow: {
        flexGrow: 1,
    },
    fab: {
        zIndex: 1,
        top: -40,
        left: 0,
        right: 0,
        margin: theme.spacing(2),
        marginLeft: -7
    },
    player: {
        display: "block",
        marginLeft: 1200,
        width: 300,
        color: "blue"
    }
}));

function BottomBar() {
    const classes = useStyles();
    const { isOpen, record, blob, onselect } = useContext(StoreContext)
    const { selectNext } = useContext(StoreContext)
    const { selectPrev } = useContext(StoreContext)
    const { startRecording, stopRecording, getDB } = useContext(StoreContext)

    useEffect(() => {
        var timerID = setInterval(() => stopRecording(), 60000);
        return function cleanup() {
            clearInterval(timerID);
        };
    });

    return (
        <div>
            {isOpen && (
                <React.Fragment>
                    <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
                        <AppBar position="fixed" color="primary" className={classes.appBar}>
                            <Toolbar>
                                {(record === false) && (<Fab color="secondary" aria-label="edit" className={classes.fab} onClick={startRecording}>
                                    <Mic />
                                </Fab>)}
                                {record && (<Fab color="primary" aria-label="edit" className={classes.fab} onClick={stopRecording}>
                                    <StopIcon />
                                </Fab>
                                )}
                                <Fab color="primary" aria-label="edit" className={classes.fab} onClick={selectPrev}>
                                    <SkipPreviousIcon />
                                </Fab>
                                <Fab color="primary" aria-label="edit" className={classes.fab} onClick={selectNext}>
                                    <SkipNextIcon />
                                </Fab>
                                <a className="download" href={blob.blobURL} download="verse.webm">
                                    <Fab aria-label="download" className={classes.fab}>
                                        <GetAppIcon />
                                    </Fab>
                                </a>
                                <Fab aria-label="download" className={classes.fab} onClick={getDB}>
                                    <PlayCircleFilledIcon />
                                </Fab>
                                <span className={classes.player}>
                                    <Player />
                                </span>
                            </Toolbar>
                        </AppBar>
                    </Slide>
                </React.Fragment>
            )
            }
        </div >
    );
}
export default BottomBar;