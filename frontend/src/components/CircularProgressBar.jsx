import { useTheme } from '../contexts/ThemeContext';

const CircularProgressBar = ({
  TotalTasks = 0,
  testCompleted = 0,
  strockColor = '',
  size = 50,
  strokeWidth = 5,
}) => {
  const { isDark } = useTheme()

  // Theme-aware default colors
  const trackColor = isDark ? 'stroke-zinc-700' : 'stroke-gray-200'
  const progressColor = strockColor || 'stroke-blue-500'

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Safe ratio calculation
  const progressRatio = TotalTasks > 0 ? Math.min(Math.max(testCompleted / TotalTasks, 0), 1) : 0;
  const strokeDashoffset = circumference - progressRatio * circumference;

  return (
    <div className="flex items-center gap-2">
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
            className={`${trackColor} stroke-current`}
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
            className={`${progressColor} transition-all duration-500 ease-out`}
            fill="transparent"
          />
        </svg>
      </div>
    </div>
  );
};

export default CircularProgressBar;