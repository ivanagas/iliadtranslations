'use client'
import React, { useState } from 'react';

export default function Selector(props) {
  
  const [t1, setTranslator1] = useState(props.data[Object.keys(props.data)[0]]);
  const [t2, setTranslator2] = useState(props.data[Object.keys(props.data)[0]]);

  const passages = Object.keys(t1.quotes);
  const [selectedPassage, setSelectedPassage] = useState('Book 1 - Intro');

  // Create a object of last names and full names of translators
  const formattedTranslators = () => {
    const data = props.data;
    const extractedTranslators = {};
  
    for (const translator in data) {
      if (data.hasOwnProperty(translator)) {
        extractedTranslators[translator] = data[translator].translator;
      }
    }
  
    return extractedTranslators;
  }
  const translators = formattedTranslators();

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
            className={`text-base border-2 rounded-md px-3 py-2 plausible-event-name=Compare+Click ${selectedPassage === passage ? 'border-red-900' : 'border-gray-300 hover:bg-gray-100'}`}
          >
            {passage}
          </button>
        ))}
      </div>
      <br/>
      <div className='flex flex-col md:flex-row md:justify-center gap-6'>
        <div className='max-w-2xl'>
          <select
            onChange={(e) => setTranslator1(props.data[e.target.value])}
            className="text-2xl border-2 border-gray-300 hover:bg-gray-100 rounded-md my-2"
          >
            {Object.keys(translators).map((translator, index) => (
              <option
                key={index}
                value={translator}
              >
                {translators[translator]}
              </option>
            ))}
          </select>
          <p className='leading-relaxed'>{formatPassage(t1.quotes[selectedPassage])}</p>
        </div>
        <div className='max-w-2xl justify-center'>
          <select
            onChange={(e) => setTranslator2(props.data[e.target.value])}
            className='text-2xl border-2 border-gray-300 hover:bg-gray-100 rounded-md my-2'
          >
            {Object.keys(translators).map((translator, index) => (
              <option key={index} value={translator}>{translators[translator]}</option>
            ))}
          </select>
          <p className='leading-relaxed'>{formatPassage(t2.quotes[selectedPassage])}</p>
        </div>
      </div>
    </div>
  )
}
