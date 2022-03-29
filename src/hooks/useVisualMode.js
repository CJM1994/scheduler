import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode, replace = false) {

    if (replace) {
      setHistory(prev => {
        prev.pop();
        return [...prev, newMode];
      });
      setMode(newMode);
    } else {
      setHistory(prev => ([...prev, mode]));
      return setMode(newMode);
    };

  };

  const back = function () {
    setHistory((prev) => {
      if (prev.length > 1) {
        prev.pop();
        setMode(prev[prev.length - 1]);
      };
      return prev;
    });
  };

  return { mode, transition, back };
};