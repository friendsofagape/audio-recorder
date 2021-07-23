import { pixelsToSeconds } from "../../utils/conversions"

export default class {
  constructor(track) {
    this.track = track
  }

  setup(samplesPerPixel, sampleRate) {
    this.samplesPerPixel = samplesPerPixel
    this.sampleRate = sampleRate
  }

  mouseenter(e) {
    e.preventDefault()
    console.log("ENTERING", e.offsetX)
  }

  mousemove(e) {
    e.preventDefault()
    console.log("MOVING", e.offsetX)
    const startX = e.offsetX
    const startTime = pixelsToSeconds(
      startX,
      this.samplesPerPixel,
      this.sampleRate
    )

    this.track.ee.emit("select", startTime, startTime, this.track)
  }

  click(e) {
    e.preventDefault()
    this.track.ee.emit("consoletime")

    const startX = e.offsetX
    const startTime = pixelsToSeconds(
      startX,
      this.samplesPerPixel,
      this.sampleRate
    )

    this.track.ee.emit("select", startTime, startTime, this.track)
  }
  onmouseover(e) {
    console.log("mouseover")
    e.preventDefault()

    const startX = e.offsetX
    const startTime = pixelsToSeconds(
      startX,
      this.samplesPerPixel,
      this.sampleRate
    )
  }

  static getClass() {
    return ".state-cursor"
  }

  static getEvents() {
    return ["click"]
  }
}
