import { pixelsToSeconds } from "../../utils/conversions"

export default class {
  constructor(track) {
    this.track = track
    this.active = false
  }

  setup(samplesPerPixel, sampleRate) {
    this.samplesPerPixel = samplesPerPixel
    this.sampleRate = sampleRate
  }

  emitResizeRight(x) {
    const deltaX = x - this.prevX
    const deltaTime = pixelsToSeconds(
      deltaX,
      this.samplesPerPixel,
      this.sampleRate
    )
    this.prevX = x
    this.track.ee.emit("resizeright", deltaTime, this.track)
  }

  complete(x) {
    this.emitResizeRight(x) // test
    this.active = false
  }

  mousedown(e) {
    e.preventDefault()

    this.active = true
    this.el = e.target
    this.prevX = e.offsetX
  }

  mousemove(e) {
    if (this.active) {
      e.preventDefault()
      this.emitResizeRight(e.offsetX)
    }
  }

  mouseup(e) {
    if (this.active) {
      e.preventDefault()
      this.complete(e.offsetX)
    }
  }

  mouseleave(e) {
    if (this.active) {
      e.preventDefault()
      this.complete(e.offsetX)
    }
  }

  static getClass() {
    return ".state-resize-right"
  }

  static getEvents() {
    return ["mousedown", "mousemove", "mouseup", "mouseleave"]
  }
}
