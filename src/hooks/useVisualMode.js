import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  // transition function ALWAYS adds to the history array
  const transition = (initial, replace = false) => {
    
    setMode(initial);
    
    // Replace is to go back to the previous previous state by bypassing previous state
    if(replace) {
      setHistory(prev => {
        return [...prev.slice(0, prev.length - 1), initial]
      })
    } else {
      setHistory(prev => {
        return [...prev, initial]
      });
    }
  }

  // back function ALWAYS deletes the last value in history
  const back = () => {
    setHistory(prev => {
      if(prev.length > 1) {
        let newHistory = [...prev.slice(0, prev.length - 1)];
        
        setMode(newHistory[newHistory.length-1]);
  
        return newHistory;
      }
      else {
        return prev;
      }
    })
  }

  return { mode, transition, back }
}