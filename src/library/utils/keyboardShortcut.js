const keyboardShortCut = emitter => (key, action, opts) => {
  document.addEventListener("keyup", e => {
    if (e.key === key) {
      emitter.emit(action, opts)
    }
  })
}

export default keyboardShortCut
