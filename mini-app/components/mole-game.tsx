"use client";

import { useEffect, useState } from "react";

export default function MoleGame() {
  const gridSize = 5;
  const totalCells = gridSize * gridSize;
  const [moles, setMoles] = useState<boolean[]>(Array(totalCells).fill(false));
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newMoles = Array(totalCells).fill(false);
      const randomIndex = Math.floor(Math.random() * totalCells);
      newMoles[randomIndex] = true;
      setMoles(newMoles);
    }, 800);

    return () => clearInterval(interval);
  }, [totalCells]);

  const handleClick = (index: number) => {
    if (moles[index]) {
      setScore((s) => s + 1);
      setMoles((prev) => {
        const updated = [...prev];
        updated[index] = false;
        return updated;
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold">Score: {score}</h2>
      <div
        className="grid grid-cols-5 gap-2"
        style={{ width: "250px", height: "250px" }}
      >
        {moles.map((hasMole, idx) => (
          <div
            key={idx}
            className="relative w-full h-full bg-gray-200 rounded-md flex items-center justify-center cursor-pointer"
            onClick={() => handleClick(idx)}
          >
            {hasMole && (
              <div className="w-8 h-8 bg-brown-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Tap the mole before it disappears!
      </p>
    </div>
  );
}
