import React, { createContext, Component } from 'react';
import * as sampleBible from '../components/VerseGrid/verse'

export const StoreContext = createContext();

class StoreContextProvider extends Component {
    state = {
        isOpen: true,
        onselect: 1,
        bible: sampleBible.default,
        record: false,
        recordedFiles: {},
        recVerse: [],
        isWarning: false
    }
    toggleOpen = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }
    selectNext = () => {
        if (this.state.onselect <= sampleBible.default.length)
            this.setState({ onselect: (this.state.onselect) + 1 })
    }
    selectPrev = () => {
        if (this.state.onselect > 0)
            this.setState({ onselect: (this.state.onselect) - 1 })
    }
    resetVal = (value, event, index) => {
        this.setState({ onselect: value })
    }
    startRecording = () => {
        this.setState({ record: true });
        (this.state.recVerse).map((value, index) => {
            (value === this.state.onselect) ? this.setState({ isWarning: true }) : this.setState({ isWarning: false })
        })
    }
    stopRecording = () => {
        this.setState({ record: false })
    }
    saveRecord = (value, event) => {
        value["verse"] = this.state.onselect;
        if (this.state.isWarning === false)
            this.state.recVerse.push(this.state.onselect);
        this.setState({ recordedFiles: value })
    }
    render() {
        return (
            <StoreContext.Provider
                value={{
                    ...this.state,
                    toggleOpen: this.toggleOpen,
                    selectNext: this.selectNext,
                    selectPrev: this.selectPrev,
                    resetVal: this.resetVal,
                    startRecording: this.startRecording,
                    stopRecording: this.stopRecording,
                    saveRecord: this.saveRecord,
                }} >
                {this.props.children}
            </StoreContext.Provider>
        );
    }
}

export default StoreContextProvider;