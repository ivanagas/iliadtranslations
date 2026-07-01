'use client'
import React, { useState } from 'react';

export default function Selector(props) {

  const translator = props.data

  const [selectedPassage, setSelectedPassage] = useState('Book 1 - Intro');

  const passages = Object.keys(translator.quotes);

  const handlePassageSelection = (passage) => {
    setSelectedPassage(passage);
  };

  const formatPassage = (passage) => {
    return passage?.split("\n").map((text, i) => i ? [<br key={i}/>, text] : text)
  }

  return (
    <div>
      <div className='mx-auto flex flex-wrap gap-2'>
        {passages.map((passage, index) => (
          <button
            key={index}
            onClick={() => handlePassageSelection(passage)}
            className={selectedPassage === passage ? 'text-base border-2 rounded-md border-red-900 px-3 py-2' : 'text-base border-2 border-gray-300 hover:bg-gray-100 rounded-md px-3 py-2'}
          >
            {passage}
          </button>
        ))}
      </div>
      <p className='my-2 leading-relaxed'>{formatPassage(translator.quotes[selectedPassage])}</p>
    </div>
  )
}
