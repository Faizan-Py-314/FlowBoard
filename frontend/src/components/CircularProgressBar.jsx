import React from 'react';

const CircularProgressBar = ({
  TotalTasks = 0,
  testCompleted = 0,
  strockColor = 'text-blue-500',
  size = 50,
  strokeWidth = 5,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Safe ratio calculation
  const progressRatio = TotalTasks > 0 ? Math.min(Math.max(testCompleted / TotalTasks, 0), 1) : 0;
  const strokeDashoffset = circumference - progressRatio * circumference;

  return (
    <div className="inline-flex items-center gap-3">
      {/* Left-side Text Label */}
      <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
        {testCompleted} of {TotalTasks}
      </span>

      {/* Right-side SVG Circular Ring */}
      <div
        className="relative shrink-0"
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} className="-rotate-90">
          {/* Track Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className="text-gray-200 stroke-current"
            fill="transparent"
          />
          {/* Progress Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${strockColor} stroke-current transition-all duration-500 ease-out`}
            fill="transparent"
          />
        </svg>
      </div>
    </div>
  );
};

export default CircularProgressBar;