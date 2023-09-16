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
      <div className='mx-auto flex'>
        {passages.map((passage, index) => (
          <button
            key={index}
            onClick={() => handlePassageSelection(passage)}
            className={selectedPassage === passage ? 'text-base ml-2 border-2 rounded-md border-red-900 p-1' : 'text-base ml-2 border-2 border-gray-300 hover:bg-gray-100 rounded-md p-1'}
          >
            {passage}
          </button>
        ))}
      </div>
      <p className='my-2'>{formatPassage(translator.quotes[selectedPassage])}</p>
    </div>
  )
}
