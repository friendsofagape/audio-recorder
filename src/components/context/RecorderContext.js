import React from 'react';
import PropTypes from 'prop-types';

export const RecorderContext = React.createContext();

const RecorderContextProvider = ({ children }) => {
    const [snackBar, setSnackBar] = React.useState(false) 
    const [snackText,setSnackText] = React.useState('')
    const value = {
        state: {
            snackBar,
            snackText
        },
        actions: {
            setSnackBar,
            setSnackText
        }
    }
    return (
      <RecorderContext.Provider value={value}>
        {children}
      </RecorderContext.Provider>
    );
};

export default RecorderContextProvider;

RecorderContextProvider.propTypes = {
  children: PropTypes.node,
};