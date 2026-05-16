"use client";

import React from "react";
import { FullStar, HalfStar, EmptyStar } from "./stars";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  readOnly?: boolean;
  size?: number;
  gap?: number;
}

export default function StarRating({
  value,
  onChange,
  max = 5,
  readOnly = false,
  size = 18,
  gap = 6,
}: StarRatingProps) {
  const isControlled = !!onChange;

  const [internalValue, setInternalValue] = React.useState(value);
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);
  const [focusIndex, setFocusIndex] = React.useState<number>(-1);

  const currentValue = isControlled ? value : internalValue;
  const displayValue = hoverValue ?? currentValue;

  const setValue = (val: number) => {
    if (readOnly) return;

    if (isControlled) {
      onChange?.(val);
    } else {
      setInternalValue(val);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (readOnly) return;

    let newValue = currentValue;

    switch (e.key) {
      case "ArrowRight":
      case "ArrowUp":
        newValue = Math.min(max, currentValue + 0.5);
        break;

      case "ArrowLeft":
      case "ArrowDown":
        newValue = Math.max(0, currentValue - 0.5);
        break;

      case "Home":
        newValue = 0;
        break;

      case "End":
        newValue = max;
        break;

      case "Enter":
      case " ":
        setValue(index + 1);
        return;

      default:
        return;
    }

    e.preventDefault();
    setValue(newValue);
  };

  return (
    <div
      role="slider"
      aria-label="Star rating"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={currentValue}
      tabIndex={readOnly ? -1 : 0}
      className="flex items-center"
      style={{ gap }}
      onKeyDown={(e) => handleKeyDown(e, focusIndex)}
    >
      {Array.from({ length: max }).map((_, index) => {
        const starNumber = index + 1;

        const isFull = displayValue >= starNumber;
        const isHalf = !isFull && displayValue >= starNumber - 0.5;

        return (
          <button
            key={index}
            type="button"
            disabled={readOnly}
            onFocus={() => setFocusIndex(index)}
            onMouseEnter={() => setHoverValue(index + 1)}
            onMouseLeave={() => setHoverValue(null)}
            onClick={() => setValue(index + 1)}
            className="relative focus:outline-none"
            aria-label={`${index + 1} star`}
          >
            {isFull ? (
              <FullStar size={size} />
            ) : isHalf ? (
              <HalfStar size={size} />
            ) : (
              <EmptyStar size={size} />
            )}
          </button>
        );
      })}
    </div>
  );
}