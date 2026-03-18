const BUTTON_LABELS = ["Cursos", "Experimentos", "Historia del arte"];
const BUTTON_ICONS = [
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    key="book"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 4.5c0-.8.7-1.5 1.5-1.5H18a1 1 0 0 1 1 1v15.2c0 .5-.4.8-.9.7-2.4-.4-5-.6-7.1-.6-2 0-4.5.2-6.9.6-.5.1-.9-.3-.9-.7V4.5zM7 6h9v1.8H7V6zm0 3.2h9V11H7V9.2z" />
  </svg>,
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    key="flask"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 3h6v2h-1v4.3l3.9 6.8A3 3 0 0 1 15.3 20H8.7a3 3 0 0 1-2.6-3.9L10 9.3V5H9V3zm2 6.4-3.6 6.4c-.3.6.1 1.2.7 1.2h6.2c.7 0 1.1-.7.7-1.2L11 9.4z" />
  </svg>,
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    key="palette"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3a9 9 0 0 0 0 18h1.8a2.2 2.2 0 0 0 0-4.4h-1.4a1.6 1.6 0 1 1 0-3.2h4.2a4.4 4.4 0 0 0 0-8.8H12zm-4.2 7A1.6 1.6 0 1 1 7.8 6.8 1.6 1.6 0 0 1 7.8 10zm4.2-1.6A1.6 1.6 0 1 1 12 5.2a1.6 1.6 0 0 1 0 3.2zm4.2 1.6a1.6 1.6 0 1 1 1.6-1.6 1.6 1.6 0 0 1-1.6 1.6z" />
  </svg>,
];

function KeyAccessible({ onActivate, children, className, ariaLabel }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onActivate();
    }
  };

  return (
    <div
      className={className}
      role="button"
      tabIndex={0}
      onClick={onActivate}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
}

export default function Level1({ selections, onElementClick }) {
  const titleChoice = selections.title ?? 0;
  const textChoice = selections.text ?? 0;
  const buttonsChoice = selections.buttons ?? 0;
  const backgroundChoice = selections.background ?? 0;
  const imageChoice = selections.image ?? 0;
  const baseUrl = import.meta.env.BASE_URL;

  const backgroundClass =
    backgroundChoice === 1
      ? "level--calm"
      : backgroundChoice === 2
      ? "level--dark"
      : "level--loud";

  const titleClass =
    titleChoice === 0
      ? "level__title--tiny"
      : titleChoice === 1
      ? "level__title--balanced"
      : "level__title--huge";

  const textClass =
    textChoice === 1
      ? "level__text--readable"
      : textChoice === 2
      ? "level__text--huge"
      : "level__text--tiny";

  const imageClass =
    imageChoice === 1
      ? "level__image--fixed"
      : imageChoice === 2
      ? "level__image--removed"
      : "level__image--broken";

  return (
    <section
      className={`level level--home ${backgroundClass}`}
    >
      <div className="level__content">
        <header className="level__header">
          <div className="level__header-top">
            <div className="level__brand">
              <span className="level__brand-mark">AE</span>
              Aula Educa
            </div>
            <nav className="level__nav" aria-label="Navegación principal">
              <span className="level__nav-link">Inicio</span>
              <span className="level__nav-link">Cursos</span>
              <span className="level__nav-link">Recursos</span>
              <span className="level__nav-link">Comunidad</span>
            </nav>
          </div>
          <div className="level__header-main level__header-main--solo">
            <div className="level2__header-title">Inicio</div>
          </div>
        </header>

        <div className="level__grid">
          <div className="level__copy">
            <div className="level__main">
              <div className="level__copy-card">
                <KeyAccessible
                  className={`level__title ${titleClass}`}
                  ariaLabel="Editar título"
                  onActivate={() => onElementClick("title")}
                >
                  Aprende sobre el mundo
                </KeyAccessible>

                <KeyAccessible
                  className={`level__text ${textClass}`}
                  ariaLabel="Editar texto"
                  onActivate={() => onElementClick("text")}
                >
                  En esta web puedes aprender cosas nuevas sobre muchos temas interesantes como astronomía, historia del arte o incluso experimentos científicos que puedes hacer en casa de forma segura y divertida. Mira las secciones y encuentra información que quizá no sabías.
                </KeyAccessible>
              </div>

              <KeyAccessible
                className={`level__image level__image--photo ${imageClass}`}
                ariaLabel="Editar imagen"
                onActivate={() => onElementClick("image")}
              >
                {imageChoice === 1 ? (
                  <img
                    src={`${baseUrl}libros.jpg`}
                    alt="Libros y material educativo"
                    className="level__image-img"
                  />
                ) : imageChoice === 2 ? null : (
                  <img
                    src={`${baseUrl}perro.jpg`}
                    alt="Un perro sin relación con el contenido"
                    className="level__image-img"
                  />
                )}
              </KeyAccessible>
            </div>

            <div className="level__buttons">
              {BUTTON_LABELS.map((label, index) => (
                <button
                  key={label}
                  type="button"
                  className="level__button level__button--labeled"
                  onClick={() => onElementClick("buttons")}
                >
                  {buttonsChoice === 1 ? (
                    label
                  ) : buttonsChoice === 2 ? (
                    <span className="level__button-content">
                      <span className="level__button-icon">
                        {BUTTON_ICONS[index]}
                      </span>
                      {label}
                    </span>
                  ) : (
                    ""
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      <button
        type="button"
        className={`level__background-fab ${
          backgroundChoice === 1
            ? "level__background-fab--fixed"
            : "level__background-fab--broken"
        }`}
        onClick={() => onElementClick("background")}
        aria-label="Editar fondo"
      >
        Fondo
      </button>
    </section>
  );
}
