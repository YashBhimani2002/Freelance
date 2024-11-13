import React, { useState } from "react";

function Rating({ stars, max = 5, sendRating }) {
  const [dynamicValue, setDynamicValue] = useState(stars);
  const [value, setValue] = useState(0);

  const _colors = {
    1: "#000",
    2: "#000",
    3: "#000",
    4: "#000",
    5: "#000",
  };

  const handleClick = (newValue) => {
    setValue(newValue);
    setDynamicValue(newValue);
    sendRating(newValue);
  };

  const handleMouseEnter = (newValue) => {
    setDynamicValue(newValue);
  };

  const handleMouseLeave = () => {
    setDynamicValue(value);
  };

  const starSpans = [];
  for (let v = 1; v <= max; v++) {
    starSpans.push(
      <Star
        key={v}
        color={_colors[dynamicValue]}
        isFilled={v <= dynamicValue}
        value={v}
        handleHover={handleMouseEnter}
        handleHoverLeave={handleMouseLeave}
        handleClick={handleClick}
      />
    );
  }

  return (
    <div
      style={{ display: "inline-block" }}
      className="ml-1 cursor-pointer text-xl"
    >
      {starSpans}
    </div>
  );
}

function Star({
  value,
  color,
  handleHover,
  handleHoverLeave,
  handleClick,
  isFilled,
}) {
  if (!handleHover) {
    return (
      <span
        className="Star"
        style={{ color }}
        onMouseEnter={() => console.log("HOVERED IN")}
        onMouseLeave={() => console.log("HOVERED OUT")}
      >
        {isFilled ? "★" : "☆"}
      </span>
    );
  }
  return (
    <span
      className="Star"
      style={{ color }}
      onMouseEnter={() => handleHover(value)}
      onMouseLeave={() => handleHoverLeave(value)}
      onClick={() => handleClick(value)}
    >
      {isFilled ? "★" : "☆"}
    </span>
  );
}

export default Rating;
