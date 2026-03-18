export default function ConfigPanel({
  isOpen,
  title,
  options,
  onClose,
  onSelect,
  feedback,
  selectedIndex,
}) {
  if (!isOpen) return null;

  return (
    <div className="panel">
      <div className="panel__backdrop" onClick={onClose} />
      <div className="panel__card" role="dialog" aria-modal="true">
        <div className="panel__header">
          <h2 className="panel__title">
            Mejorar {title ? title.toLowerCase() : ""}
          </h2>
          <button className="panel__close" onClick={onClose} type="button">
            Cerrar
          </button>
        </div>
        <div className="panel__options">
          {options.map((option, index) => (
            <button
              key={option.text}
              className={`panel__option ${
                selectedIndex === index ? "panel__option--selected" : ""
              }`}
              onClick={() => onSelect(option, index)}
              type="button"
            >
              {option.text}
            </button>
          ))}
        </div>
        {feedback && (
          <div className={`panel__feedback panel__feedback--${feedback.type}`}>
            {feedback.text}
          </div>
        )}
      </div>
    </div>
  );
}
