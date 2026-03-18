export default function GameMessage({ show, message, actionLabel, onAction }) {
  if (!show) return null;

  return (
    <div className="game-message-overlay" role="dialog" aria-modal="true">
      <div className="game-message__backdrop" />
      <div className="game-message">
        <h3 className="game-message__title">{message}</h3>
        {actionLabel && (
          <button
            className="game-message__button"
            type="button"
            onClick={onAction}
            disabled={!onAction}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
