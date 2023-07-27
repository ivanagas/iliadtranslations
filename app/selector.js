'use client'
import styles from './selector.module.css';
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
      <br/>
      <div className={styles.passageContent}>
        <div>
          <select onChange={(e) => setTranslator1(props.data[e.target.value])}>
            {Object.keys(translators).map((translator, index) => (
              <option key={index} value={translator}>{translators[translator]}</option>
            ))}
          </select>
          <p>{formatPassage(t1.quotes[selectedPassage])}</p>
        </div>
        <div>
          <select onChange={(e) => setTranslator2(props.data[e.target.value])}>
            {Object.keys(translators).map((translator, index) => (
              <option key={index} value={translator}>{translators[translator]}</option>
            ))}
          </select>
          <p>{formatPassage(t2.quotes[selectedPassage])}</p>
        </div>
      </div>
    </div>
  )
}
