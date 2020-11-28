import { useEffect, useRef } from 'react'

export default (cb, delay) => {
  const savedCb = useRef()

  useEffect(() => {
    savedCb.current = cb
  }, [cb])

  useEffect(() => {
    if (delay) {
      const id = setInterval(() => {
        savedCb.current()
      }, delay)
      return () => {
        clearInterval(id)
      }
    }
  }, [cb, delay])
}
