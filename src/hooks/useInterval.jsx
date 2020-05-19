import { useEffect, useRef } from 'react'

function useInterval(callback, delay) {
  const callbackRef = useRef(callback)

  // Remember the latest callback.
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      callbackRef.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export default useInterval
