import { pixelsToSeconds } from "../../utils/conversions"

export default class {
  constructor(track) {
    this.track = track
  }

  setup(samplesPerPixel, sampleRate) {
    this.samplesPerPixel = samplesPerPixel
    this.sampleRate = sampleRate
  }

  click(e) {
    e.preventDefault()

    window.confirm("Are you sure you want to delete this track?") &&
      this.track.ee.emit("removeTrack", this.track)
  }

  mouseenter(e) {
    e.preventDefault()
    this.track.setCustomClass("to-delete")
    this.track.ee.emit("applyclass", (0, 0, this.track))
  }

  mouseleave(e) {
    e.preventDefault()
    this.track.setCustomClass("")
    this.track.ee.emit("applyclass", (0, 0, this.track))
  }

  static getClass() {
    return ".state-delete"
  }

  static getEvents() {
    return ["click", "mouseleave", "mouseenter"]
  }
}
