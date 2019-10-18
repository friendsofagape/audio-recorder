import React ,{ useContext } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Typography, AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Mic from '@material-ui/icons/Mic';
import { StoreContext } from "../../context/StoreContext";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Recorder() {
  const classes = useStyles();
//   const [anchorEl, setAnchorEl] = React.useState(null);

  const { toggleOpen } = useContext(StoreContext);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Recorder
          </Typography>
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
