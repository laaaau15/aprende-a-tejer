import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 'aprende-a-tejer:v1'

function defaultState() {
  return {
    learned: {},
    favorites: { stitch: [], technique: [], project: [], video: [], pattern: [], cstitch: [] },
    videosSeen: {},
    projectsInProgress: {},
    patterns: [],
    yarns: [],
    patternProgress: {},
    firstTime: false,
    swatch: null // { stsPer10cm, rowsPer10cm, hookMm, yarnName, updatedAt }
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    const parsed = JSON.parse(raw)
    return { ...defaultState(), ...parsed }
  } catch {
    return defaultState()
  }
}

function persist(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // localStorage lleno o no disponible: seguimos solo en memoria
  }
}

let state = loadState()
const subscribers = new Set()

function notify() {
  subscribers.forEach((cb) => cb())
}

function update(fn) {
  state = fn(state)
  persist(state)
  notify()
}

function subscribe(cb) {
  subscribers.add(cb)
  return () => subscribers.delete(cb)
}

function getSnapshot() {
  return state
}

export function useStore() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

export function getState() {
  return state
}

// --- Acciones ---

export function toggleLearned(id) {
  update((s) => ({ ...s, learned: { ...s.learned, [id]: !s.learned[id] } }))
}

export function toggleFavorite(kind, id) {
  update((s) => {
    const list = s.favorites[kind] ?? []
    const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
    return { ...s, favorites: { ...s.favorites, [kind]: next } }
  })
}

export function setFirstTime(v) {
  update((s) => ({ ...s, firstTime: v }))
}

export function toggleProjectInProgress(id) {
  update((s) => ({ ...s, projectsInProgress: { ...s.projectsInProgress, [id]: !s.projectsInProgress[id] } }))
}

export function markVideoSeen(id) {
  update((s) => ({ ...s, videosSeen: { ...s.videosSeen, [id]: true } }))
}

export function addPattern(pattern) {
  update((s) => ({ ...s, patterns: [...s.patterns, pattern] }))
}

export function removePattern(id) {
  update((s) => {
    const { [id]: _drop, ...restProgress } = s.patternProgress
    return {
      ...s,
      patterns: s.patterns.filter((p) => p.id !== id),
      patternProgress: restProgress,
      favorites: { ...s.favorites, pattern: s.favorites.pattern.filter((x) => x !== id) }
    }
  })
}

export function addYarn(yarn) {
  update((s) => ({ ...s, yarns: [...s.yarns, yarn] }))
}

export function removeYarn(id) {
  update((s) => ({ ...s, yarns: s.yarns.filter((y) => y.id !== id) }))
}

export function getPatternProgress(id) {
  return state.patternProgress[id] ?? { doneRows: [], teacherStep: 0, counted: 0 }
}

export function setPatternProgress(id, fn) {
  update((s) => ({
    ...s,
    patternProgress: {
      ...s.patternProgress,
      [id]: fn(s.patternProgress[id] ?? { doneRows: [], teacherStep: 0, counted: 0 })
    }
  }))
}

export function saveSwatch(swatch) {
  update((s) => ({ ...s, swatch: { ...swatch, updatedAt: Date.now() } }))
}

export function resetAll() {
  update(() => defaultState())
}

// --- Exportar / importar (mejora: nunca perder el progreso) ---

export function exportStateAsJSON() {
  return JSON.stringify(state, null, 2)
}

export function importStateFromJSON(json) {
  const parsed = JSON.parse(json)
  update(() => ({ ...defaultState(), ...parsed }))
}
