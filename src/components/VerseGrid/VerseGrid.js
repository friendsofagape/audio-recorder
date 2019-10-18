import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import StarIcon from '@material-ui/icons/Star';
import Mic from '@material-ui/icons/Mic';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import * as sampleBible1 from "./verse";
import { StoreContext } from "../../context/StoreContext";
import { Grow } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

const sampleBible = sampleBible1.default;

export default function CheckboxList() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);
  const { onselect } = useContext(StoreContext);
  const { isOpen } = useContext(StoreContext);
  const { selectNext } =useContext(StoreContext);
  const [ selected , setSelected ] = useState(onselect);

  useEffect(() => {
    setSelected(onselect)
  },[onselect]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    setSelected(value)
    selectNext(value)
    console.log("versgss",value)
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  return (
    <List className={classes.root}>
    {sampleBible.map((value, index) => {
      {/* {[0, 1, 2, 3].map((value, index) => { */}
        const labelId = `checkbox-list-label-${value.id}`;
        return (
          <ListItem
            key={value.id}
            role={undefined}
            dense
            button
            style ={{marginBottom:"10px"}}
            selected={selected === index+1}
            onClick={handleToggle(value.id)}
          > 
            { isOpen ? 
            <Grow
            in={isOpen}
            style={{ transformOrigin: '0 0 0' }}
            {...(isOpen ? { timeout: 1000 } : {})} >     
            <ListItemIcon>
            <PlayCircleOutlineIcon 
            edge="start"
            tabIndex={-1}
            style ={{color:"red"}}
             />
            </ListItemIcon>
            </Grow>
            : <span style={{marginRight:"56px"}} ></span>}
            
            <ListItemText id={labelId} primary={`${value.id} ${value.verse}`} />
          </ListItem>
        );
      })}
    </List>
  );
}
