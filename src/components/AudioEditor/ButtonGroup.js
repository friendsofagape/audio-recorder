import React, { PureComponent } from 'react'

const ButtonGroup = ({ children }) => {
  return (
    <div
      className="btn-group btn-playlist-state-group"
      style={{ marginRight: "3px" }}
    >
      {children}
    </div>
  )
}

export default ButtonGroup
