import React from 'react'
import bus from '../UTILS/bus'


const useFlashMessage = () => {
  return (
    function setFlashMessage(msg, type) {
      bus.emit('flash', {
        message: msg,
        type: type,
      })

    }
  )
}

export default useFlashMessage