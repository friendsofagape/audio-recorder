import React, { createContext, Component } from 'react';
import * as sampleBible from '../components/VerseGrid/verse'

export const StoreContext = createContext();

class StoreContextProvider extends Component {
    state = { 
        isOpen: true,
        onselect: 1,
        verse: sampleBible.default, 
     }
    toggleOpen = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }
    selectNext = (value,event,index) => {
        value ? this.setState({ onselect: value }) : this.setState({ onselect: (this.state.onselect)+1 })
        // console.log(this.state.onselect)
        console.log(value)
    }
    render() { 
        return ( 
            <StoreContext.Provider value={{ ...this.state, toggleOpen: this.toggleOpen, selectNext: this.selectNext }} >
                {this.props.children}
            </StoreContext.Provider>
         );
    }
}
 
export default StoreContextProvider;