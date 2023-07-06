'use client'
import styles from './selector.module.css';
import React, { useState } from 'react';

export default function Selector(props) {

  const translator = props.data

  const [selectedPassage, setSelectedPassage] = useState('Book 1 - Intro');

  const passages = Object.keys(translator.quotes);

  const handlePassageSelection = (passage) => {
    setSelectedPassage(passage);
  };

  const formatPassage = (passage) => {
    return passage?.split("\n").map((text, i) => i ? [<b key={i}/>, text] : text)
  }

  return (
    <div>
      <div className={styles.buttonRow}>
        {passages.map((passage, index) => (
          <button
            key={index}
            onClick={() => handlePassageSelection(passage)}
            className={selectedPassage === passage ? 'active' : ''}
          >
            {passage}
          </button>
        ))}
      </div>
      <p>{formatPassage(translator.quotes[selectedPassage])}</p>
    </div>
  )
}
