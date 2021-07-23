import React from 'react';
import _ from "lodash"
import WavePlayer from "./WavePlayer"
import AudioToolBar from "./AudioToolBar"

const tracks = [
  {
    src: "../../../public/media/everbe.mp3",
    zoomLevels: [50, 100, 200, 500, 1000, 3000, 5000],
    name: "Vocals",
    colorSelections: [
      {
        color: "green",
        name: "I",
        timeSelection: {
          start: 1,
          end: 4,
        },
      },
    ],
  },
  {
    src: "../../../public/media/106.Metro.mp3",
    zoomLevels: [50, 100, 200, 500, 1000, 3000, 5000],
    hidden: true,
    states: {
      shift: false,
    },
    name: "metronome",
  },
  {
    src: "../../../public/media/106.Brushes.mp3",
    zoomLevels: [50, 100, 200, 500, 1000, 3000, 5000],
    hidden: true,
    states: {
      shift: false,
    },
    name: "backing",
  },
]
const shortCuts = [
  { key: "space", command: "play" },
  { key: "x", command: "cutchannel" },
  { key: "c", command: "trim" },
  { key: "m", command: "startaudiorendering", opts: ["wav"] },
  { key: "s", command: "identify" },
]

const timeSignature = {
  bpm: 106,
  beatsPerMeasure: 4,
  noteValue: 4,
}
export default function AudioEditor() {
  const [emitter, setEmitter] = React.useState(null)
  const [playoutPromises, setPlayoutPromises] = React.useState(null)

  return (
    <>
    <div className="wrapper">
          <div className="post-content">
            <AudioToolBar 
            emitter={emitter} 
            playoutPromises={playoutPromises}
            />
            <WavePlayer
              setEmitter={setEmitter}
              setPlayoutPromises={setPlayoutPromises}
              tracks={tracks}
              shortCuts={shortCuts}
              timeSignature={timeSignature}
              name="Test"
            />
          </div>
      </div>
    </>
  );
}
