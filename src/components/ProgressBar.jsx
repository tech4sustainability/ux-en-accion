export default function ProgressBar({ progress, completed, total }) {
  const percentage = Math.round(progress * 100);

  return (
    <div className="progress">
      <div className="progress__label">
        Progreso: {percentage}%
      </div>
      <div className="progress__track">
        <div
          className="progress__fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
