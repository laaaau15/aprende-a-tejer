import React from 'react'

export function VideoEmbed({ videoId, title }) {
  if (!videoId) return null
  return (
    <div className="rounded-xl overflow-hidden aspect-video bg-black">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
