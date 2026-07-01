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
      <div className='max-w-2xl mx-auto flex flex-wrap gap-2'>
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
      <div className="flex flex-col md:flex-row md:justify-center gap-6">
        <div className='max-w-2xl'>
          <h3 className='text-2xl my-2'>{t1.translator}</h3>
          <p className='leading-relaxed'>{formatPassage(t1.quotes[selectedPassage])}</p>
        </div>
        <div className='max-w-2xl'>
          <h3 className='text-2xl my-2'>{t2.translator}</h3>
          <p className='leading-relaxed'>{formatPassage(t2.quotes[selectedPassage])}</p>
        </div>
      </div>
    </div>
  )
}
