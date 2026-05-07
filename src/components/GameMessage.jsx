export default function GameMessage({
  show,
  title,
  message,
  actionLabel,
  onAction,
  actionClassName,
  children,
}) {
  if (!show) return null;

  const hasDetails = Boolean(children);

  return (
    <div className="game-message-overlay" role="dialog" aria-modal="true">
      <div className="game-message__backdrop" />
      <div className={`game-message ${hasDetails ? "game-message--summary" : ""}`}>
        <h3 className="game-message__title">{title ?? message}</h3>
        {message && title ? (
          <p className="game-message__subtitle">{message}</p>
        ) : null}
        {hasDetails ? <div className="game-message__content">{children}</div> : null}
        {actionLabel && (
          <button
            className={`${actionClassName ?? "game-message__button"} ${
              hasDetails ? "game-message__button--summary" : ""
            }`}
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
