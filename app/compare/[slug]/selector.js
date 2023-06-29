'use client'
import styles from './selector.module.css';
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
    return passage?.split("\n").map((text, i) => i ? [<br/>, text] : text)
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
      <div className={styles.passageContent}>
        <div>
          <h3>{t1.translator}</h3>
          <p>{formatPassage(t1.quotes[selectedPassage])}</p>
        </div>
        <div>
          <h3>{t2.translator}</h3>
          <p>{formatPassage(t2.quotes[selectedPassage])}</p>
        </div>
      </div>
    </div>
  )
}
