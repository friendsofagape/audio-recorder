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
import DeleteIcon from '@material-ui/icons/Delete';
import { StoreContext } from "../../context/StoreContext";

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
  },appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fab: {
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: theme.spacing(2),
    marginLeft: 10
  },
}));

function BottomBar() {
  const classes = useStyles();
  const { isOpen } = useContext(StoreContext)
  const { selectNext } = useContext(StoreContext)
  const [ startrec, setStartrec ] = useState(false)

  function startRecording(){
    setStartrec(true)
  }
  function stopRecording(){
    setStartrec(false)
  }
return (
        <div>
            {isOpen && (
            <React.Fragment>
            <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
                <AppBar position="fixed" color="primary" className={classes.appBar}>
                    <Toolbar>
                        { (startrec === false) && (<Fab color="secondary" aria-label="edit" className={classes.fab} onClick={startRecording}>
                            <Mic />
                        </Fab>)}
                        { startrec && ( <Fab color="primary" aria-label="edit" className={classes.fab} onClick={stopRecording}>
                            <StopIcon />
                        </Fab>
                        )}
                        <Fab color="primary" aria-label="edit" className={classes.fab}>
                            <SkipPreviousIcon />
                        </Fab>
                        <Fab color="primary" aria-label="edit" className={classes.fab} onClick={selectNext}>
                            <SkipNextIcon />
                        </Fab>
                        <Fab aria-label="delete" className={classes.fab}>
                            <DeleteIcon />
                        </Fab>
                    </Toolbar>
                </AppBar>
            </Slide>
            </React.Fragment>
            )}
        </div>
  );
}
export default BottomBar;