import React, { useEffect } from "react"
import {
  faArrowCircleRight,
  faArrowLeft,
  faArrowRight,
  faArrowsAltH,
  faHeadphones,
  faItalic,
  faPause,
  faPlay,
  faRedo,
  faSearchMinus,
  faSearchPlus,
  faStop,
  faTrash,
  faVolumeDown,
  faVolumeMute,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons"

import ButtonGroup from "./ButtonGroup"
import Button from "./Button"

import '../../../styles/globals.css'

const STATE_CURSOR = "STATE_CURSOR"
const STATE_SELECT = "STATE_SELECT"
const STATE_SHIFT = "STATE_SHIFT"
const STATE_FADEIN = "STATE_FADEIN"
const STATE_FADEOUT = "STATE_FADEOUT"
const STATE_RESIZE_LEFT = "STATE_RESIZE_LEFT"
const STATE_RESIZE_RIGHT = "STATE_RESIZE_RIGHT"
const STATE_DELETE_TRACK = "STATE_DELETE_TRACK"

let isLooping = false;
const AudioToolBar = ({ playoutPromises, emitter }) => {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [isMutedMetronome, setIsMutedMetronome] = React.useState(false)
  const [isMutedBacking, setIsMutedBacking] = React.useState(false)
  const [stateButton, setStateButton] = React.useState(STATE_CURSOR)
  const [startTime, setStartTime] = React.useState(0)
  const [endTime, setEndTime] = React.useState(0)

  const updateSelect = (startTime, endTime) => {
    
    setStartTime(startTime)
    setEndTime(endTime)
    console.log("startTime",startTime,"endTime", endTime)
    emitter.on("play", updateSelect)
  };

  useEffect(() => {
    if(emitter){
      emitter.on("select", updateSelect);
      isLooping = true
      updateSelect(startTime, endTime);
    }
  })

  return (
    <div id="top-bar" className="playlist-top-bar">
      <div className="playlist-toolbar">
        <div style={{ marginBottom: "3px" }}>
          <ButtonGroup>
            <Button
              title="Pause"
              onClick={() => {
                emitter.emit("splitchannels")
                emitter.emit("pause")
                setIsPlaying(false)
              }}
              icon={faPause}
              className={`btn-outline-warning ${!isPlaying ? "hidden" : ""}`}
            />
            <Button
              title="Play"
              className={`btn-outline-success rounded-left ${
                isPlaying ? "hidden" : ""
              }`}
              icon={faPlay}
              onClick={() => {
                setStateButton(STATE_CURSOR)
                emitter.emit("mergechannels")
                emitter.emit("play")
                setIsPlaying(true)
              }}
            />
            <Button
              title="Stop"
              icon={faStop}
              className="btn-outline-danger"
              onClick={() => {
                emitter.emit("splitchannels")
                emitter.emit("stop")
                setIsPlaying(false)
              }}
            />
          </ButtonGroup>

          <ButtonGroup>
            <Button
              title="Zoom in"
              className={`btn-outline-dark`}
              onClick={e => {
                emitter.emit("zoomin")
              }}
              icon={faSearchPlus}
            />
            <Button
              title="Zoom out"
              className={`btn-outline-dark`}
              onClick={e => {
                emitter.emit("zoomout")
              }}
              icon={faSearchMinus}
            />
          </ButtonGroup>

          <ButtonGroup>
            <Button
              title="Select cursor"
              className={`btn-outline-dark ${
                stateButton === STATE_CURSOR && "active"
              }`}
              onClick={e => {
                emitter.emit("splitchannels")
                emitter.emit("statechange", "cursor")
                setStateButton(STATE_CURSOR)
              }}
              icon={faHeadphones}
            />
            <Button
              title="Select audio region"
              className={`btn-outline-dark ${
                stateButton === STATE_SELECT && "active"
              }`}
              onClick={e => {
                emitter.emit("splitchannels")
                emitter.emit("statechange", "select")
                setStateButton(STATE_SELECT)
              }}
              icon={faItalic}
            />
            <Button
              title="Shift audio in time"
              className={`btn-outline-dark ${
                stateButton === STATE_SHIFT && " active"
              }`}
              onClick={e => {
                emitter.emit("splitchannels")
                emitter.emit("statechange", "shift")
                setStateButton(STATE_SHIFT)
              }}
              icon={faArrowsAltH}
            />

            <Button
              className={`btn-outline-dark ${
                stateButton === STATE_RESIZE_LEFT && "active"
              }`}
              title="Resize audio clip from the left"
              onClick={e => {
                emitter.emit("splitchannels")
                emitter.emit("statechange", "resizeleft")
                setStateButton(STATE_RESIZE_LEFT)
              }}
              icon={faArrowLeft}
            />
            <Button
              className={`btn-outline-dark ${
                stateButton === STATE_RESIZE_RIGHT && "active"
              }`}
              title="Resize audio clip from the right"
              onClick={e => {
                emitter.emit("splitchannels")
                emitter.emit("statechange", "resizeright")
                setStateButton(STATE_RESIZE_RIGHT)
              }}
              icon={faArrowRight}
            />
            <Button
              title="Delete clip"
              className={`btn-outline-danger ${
                stateButton === STATE_DELETE_TRACK && "active"
              }`}
              icon={faTrash}
              onClick={() => {
                emitter.emit("splitchannels")
                emitter.emit("statechange", "deletetrack")
                setStateButton(STATE_DELETE_TRACK)
              }}
            />
          </ButtonGroup>
        </div>

        <div style={{ marginBottom: "3px" }}>
          <ButtonGroup>
            <Button
              title="Reset"
              className="btn-outline-primary"
              onClick={() => emitter.emit("resettracks")}
            />
             <Button
              title="Cut"
              className="btn-outline-primary"
              onClick={() => emitter.emit("trim")}
            />
            <Button
              title="Finish"
              className="btn-outline-primary"
              onClick={() => emitter.emit("finished")}
            />
          </ButtonGroup>
          <ButtonGroup>
            <Button
              title={isMutedBacking ? "Mixing1 On" : "Mixing1 Off"}
              className={`btn-outline-dark`}
              onClick={e => {
                setIsMutedBacking(!isMutedBacking)
                emitter.emit("mutebacking")
              }}
            />

            {/* <Button
              title={`${isMutedMetronome ? "Mixing2 On" : "Mixing2 Off"}`}
              className={`btn-outline-dark`}
              onClick={e => {
                setIsMutedMetronome(!isMutedMetronome)
                emitter.emit("mutemetro")
              }}
            /> */}
          </ButtonGroup>
        </div>
      </div>
    </div>
  )
}

export default AudioToolBar
