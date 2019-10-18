import React from 'react';
import StoreContextProvider from './context/StoreContext';
import Recorder from './components/Recorder';
import BottomBar from './components/BottomBar';
import VerseGrid from './components/VerseGrid';

const App = () => {
    return ( 
        <div>
            <StoreContextProvider>
            <Recorder />
            <BottomBar />
            <VerseGrid />
            </StoreContextProvider>
        </div>
     );
}

export default App;