import React from "react"
import _ from "lodash"
import WaveformPlaylist from "../../library/waveform-playlist/src/app"
import loadLocalStorageAudioTracks from "../../library/utils/localStorageAudioTracks"
import keyboardShortCut from "../../library/utils/keyboardShortcut"

function WavePlayer({
  setPlayoutPromises,
  setEmitter,
  tracks,
  shortCuts = [],
  timeSignature = {
    bpm: 60,
    beatsPerMeasure: 4,
    noteValue: 4,
  },
  selections = [],
  name = "",
}) {
  const waveFormRef = React.useRef(null)

  React.useEffect(() => {
    const waveFormNode = waveFormRef.current

    const init = async () => {
      let playlist = WaveformPlaylist({
        samplesPerPixel: 3000,
        mono: true,
        waveHeight: 70,
        container: waveFormNode,
        state: "cursor",
        colors: {
          waveOutlineColor: "#E0EFF1",
          timeColor: "grey",
          fadeColor: "black"
        },
        controls: {
          show: false,
          width: 150,
        },
        zoomLevels: [500, 1000, 3000, 5000]
      })

  playlist.load([
    {
      src: "../../../public/media/everbe.mp3",
      name: "Vocals",
      gain: 0.5
    },
    {
      src: "../../../public/media/Guitar30.mp3",
      name: "Guitar",
      start: 23.5,
      fadeOut: {
        shape: "linear",
        duration: 0.5
      },
      cuein: 15
    }
  ])
  .then(function() {
    // can do stuff with the playlist.
    const ee = playlist.getEventEmitter()
    setEmitter(ee)
  });


    }
    init()
  }, [waveFormRef])

  return <div ref={waveFormRef}></div>
}

export default React.memo(WavePlayer)
