import { useState } from "react";

// Manages state for Appointment component to transition between various component views
export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace) {
    setHistory(prev =>
      replace ? [...prev.slice(0, prev.length - 1), mode] : [...prev, mode]
    );
  };

  function back() {
    if (history.length < 2) return;
    setHistory(prev => [...prev.slice(0, prev.length - 1)]);
  };

  return { mode: history[history.length - 1], transition, back };
};