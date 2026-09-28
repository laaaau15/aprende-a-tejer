import { useCallback, useEffect, useRef, useState } from 'react'

// Mantiene la pantalla encendida mientras tejes (Screen Wake Lock API).
// Se libera automáticamente al salir de la página o si la pestaña pierde el foco.
export function useWakeLock() {
  const sentinelRef = useRef(null)
  const [active, setActive] = useState(false)
  const [supported] = useState(() => typeof navigator !== 'undefined' && 'wakeLock' in navigator)

  const request = useCallback(async () => {
    if (!supported) return
    try {
      sentinelRef.current = await navigator.wakeLock.request('screen')
      setActive(true)
      sentinelRef.current.addEventListener('release', () => setActive(false))
    } catch {
      setActive(false)
    }
  }, [supported])

  const release = useCallback(async () => {
    try {
      await sentinelRef.current?.release()
    } catch {
      // ya liberado
    }
    sentinelRef.current = null
    setActive(false)
  }, [])

  useEffect(() => {
    const onVisibility = async () => {
      if (document.visibilityState === 'visible' && sentinelRef.current === null && active) {
        await request()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      sentinelRef.current?.release().catch(() => {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { supported, active, request, release }
}

export function vibrate(pattern = 15) {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(pattern)
  }
}
