import React from 'react';

function Rating({ stars, max = 5 }) {
  const starSpans = [];
  for (let v = 1; v <= max; v++) {
    starSpans.push(
      <Star
        key={v}
        isFilled={v <= stars}
      />
    );
  }

  return (
    <div style={{ display: 'inline-block' }} className='ml-1'>
      {starSpans}
    </div>
  );
}

function Star({ isFilled }) {
  return (
    <span className="Star" style={{ color: isFilled ? '#000' : '#ccc' }}>
      {isFilled ? "★" : "☆"}
    </span>
  );
}

export default Rating;
