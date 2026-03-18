export default function MultiConfigPanel({
  isOpen,
  title,
  sections,
  onClose,
  onSelect,
  feedback,
  selections = {},
}) {
  if (!isOpen) return null;

  return (
    <div className="panel">
      <div className="panel__backdrop" onClick={onClose} />
      <div className="panel__card" role="dialog" aria-modal="true">
        <div className="panel__header">
          <h2 className="panel__title">{title}</h2>
          <button className="panel__close" onClick={onClose} type="button">
            Cerrar
          </button>
        </div>
        <div className="panel__sections">
          {sections.map((section) => (
            <div key={section.key} className="panel__section">
              <div className="panel__section-title">{section.label}</div>
              <div className="panel__options">
                {section.options.map((option, index) => (
                  <button
                    key={option.text}
                    className={`panel__option ${
                      selections[section.key] === index
                        ? "panel__option--selected"
                        : ""
                    }`}
                    onClick={() => onSelect(section.key, option, index)}
                    type="button"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
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
