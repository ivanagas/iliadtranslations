'use client'
import React, { useState } from 'react';

export default function Selector(props) {

  const t1 = props.data[Object.keys(props.data)[0]]
  const t2 = props.data[Object.keys(props.data)[1]]

  const [selectedPassage, setSelectedPassage] = useState('Book 1 - Intro');

  const passages = Object.keys(t1.quotes);

  const handlePassageSelection = (passage) => {
    setSelectedPassage(passage);
  };

  const formatPassage = (passage) => {
    return passage?.split("\n").map((text, i) => i ? [<br key={i}/>, text] : text)
  }

  return (
    <div>
      <div className='max-w-2xl mx-auto flex'>
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
      <div className="flex justify-center space-x-3 ms-5">
        <div className='max-w-2xl'>
          <h3 className='text-2xl my-2'>{t1.translator}</h3>
          <p>{formatPassage(t1.quotes[selectedPassage])}</p>
        </div>
        <div className='max-w-2xl'>
          <h3 className='text-2xl my-2'>{t2.translator}</h3>
          <p>{formatPassage(t2.quotes[selectedPassage])}</p>
        </div>
      </div>
    </div>
  )
}
