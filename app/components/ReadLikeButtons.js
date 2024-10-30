'use client'

import { useState, useEffect } from 'react'
import { usePostHog } from 'posthog-js/react'

export default function LikeButton({ slug }) {

  const posthog = usePostHog()

  const [read, setRead] = useState(false)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const existingRead = JSON.parse(localStorage.getItem('read') || '[]')
    const existingLiked = JSON.parse(localStorage.getItem('liked') || '[]')

    setRead(existingRead.includes(slug))
    setLiked(existingLiked.includes(slug))
  }, [slug])
  
  const handleRead = () => {
    if (!read) {
      setRead(true)
      posthog.capture('read it', { slug })
      const existingRead = JSON.parse(localStorage.getItem('read') || '[]')
      if (!existingRead.includes(slug)) {
        existingRead.push(slug)
        localStorage.setItem('read', JSON.stringify(existingRead))
      }
    }
  }
  
  const handleLike = () => {
    if (!liked) {
      setLiked(true)
      posthog.capture('liked it', { slug })
      const existingLiked = JSON.parse(localStorage.getItem('liked') || '[]')
      if (!existingLiked.includes(slug)) {
      existingLiked.push(slug)
        localStorage.setItem('liked', JSON.stringify(existingLiked))
      }
    }
  }
  
  return <>
    <button 
      onClick={handleRead}
      className={read ? 'text-lg ml-2 border-2 rounded-md border-red-900 p-2 bg-gray-100' : 'text-lg ml-2 border-2 border-gray-300 hover:bg-gray-100 rounded-md p-2'}
    >
      Read it
    </button>
    <button 
      onClick={handleLike}
      className={`${liked ? 'text-lg ml-2 border-2 rounded-md border-red-900 p-2 bg-gray-100' : 'text-lg ml-2 border-2 border-gray-300 hover:bg-gray-100 rounded-md p-2'} ml-2`}
    >
      Liked it
    </button>
  </>
}
