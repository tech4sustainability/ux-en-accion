import { useState } from "react";

const CHAPTERS = [
  {
    id: 1,
    title: "Capítulo 1: Planetas",
    text:
      "Mercurio es el planeta más cercano al Sol y Venus tiene una atmósfera muy densa y caliente. La Tierra es nuestro hogar y la conocemos muy bien, pero los otros planetas tienen secretos que todavía estamos descubriendo. Marte tiene volcanes enormes y cañones gigantes, mientras que Júpiter es el planeta más grande del sistema solar y tiene una tormenta enorme conocida como la Gran Mancha Roja. Saturno destaca por sus impresionantes anillos, Urano gira de lado y Neptuno es un planeta frío y azul.",
    imageLabel: "NT4F3",
    imageCaption: "Imagen sobre planetas o el Sistema Solar",
  },
  {
    id: 2,
    title: "Capítulo 2: Satélites",
    text:
      "Muchos planetas tienen lunas que orbitan a su alrededor. La Luna es la más cercana a la Tierra y nos influye en fenómenos como las mareas. Júpiter tiene más de 90 satélites y Saturno 274 , cada uno con características propias. Algunos satélites tienen hielo, volcanes o incluso océanos ocultos bajo su superficie. Observar los satélites nos ayuda a entender mejor la diversidad y complejidad de nuestro sistema solar.",
    imageLabel: "NT4F4",
    imageCaption: "Imagen sobre algún planeta con sus satélites",
  },
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

export default function Level3({ selections, onElementClick }) {
  const [userTextSize, setUserTextSize] = useState("normal");
  const [activeChapterId, setActiveChapterId] = useState(1);
  const layoutChoice = selections.layout ?? 0;
  const contrastChoice = selections.contrast ?? 0;
  const spacingChoice = selections.spacing ?? 0;
  const videoChoice = selections.video;
  const textSizeChoice = selections.textSize ?? 0;
  const baseUrl = import.meta.env.BASE_URL;

  const isSingleChapter = layoutChoice === 1;
  const isGoodContrast = contrastChoice === 1;
  const isGoodSpacing = spacingChoice === 1;
  const isVideoTop = videoChoice === 0 && videoChoice != null;
  const isTextSizeEnabled = textSizeChoice === 1;
  const userTextClass = isTextSizeEnabled
    ? `level3__text--${userTextSize}`
    : "level3__text--tiny";

  const activeChapter =
    CHAPTERS.find((chapter) => chapter.id === activeChapterId) || CHAPTERS[0];

  return (
    <section className="level level--home level3">
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
            <div className="level2__header-title">Lista de cursos</div>
          </div>
        </header>

        <KeyAccessible
          className={`level3__panel ${
            isGoodContrast ? "level3__panel--good" : "level3__panel--bad"
          } ${isGoodSpacing ? "level3__panel--spaced" : "level3__panel--tight"}`}
          ariaLabel="Editar contenido del curso"
          onActivate={() => onElementClick("content")}
        >
          {isSingleChapter ? (
            <div className="level3__single">
              <div className="level3__menu">
                {CHAPTERS.map((chapter) => (
                  <button
                    key={chapter.id}
                    type="button"
                    className={
                      activeChapterId === chapter.id
                        ? "level3__menu-button level3__menu-button--active"
                        : "level3__menu-button"
                    }
                    onClick={(event) => {
                      event.stopPropagation();
                      setActiveChapterId(chapter.id);
                    }}
                  >
                    {chapter.title}
                  </button>
                ))}
              </div>

              <div className="level3__chapter">
                <div className="level3__chapter-title">{activeChapter.title}</div>

                {isTextSizeEnabled && (
                  <div className="level3__text-menu" aria-label="Ajuste de texto">
                    <button
                      type="button"
                      className={
                        userTextSize === "small"
                          ? "level3__text-menu-button level3__text-menu-button--active"
                          : "level3__text-menu-button"
                      }
                      onClick={(event) => {
                        event.stopPropagation();
                        setUserTextSize("small");
                      }}
                    >
                      A-
                    </button>
                    <button
                      type="button"
                      className={
                        userTextSize === "normal"
                          ? "level3__text-menu-button level3__text-menu-button--active"
                          : "level3__text-menu-button"
                      }
                      onClick={(event) => {
                        event.stopPropagation();
                        setUserTextSize("normal");
                      }}
                    >
                      A
                    </button>
                    <button
                      type="button"
                      className={
                        userTextSize === "large"
                          ? "level3__text-menu-button level3__text-menu-button--active"
                          : "level3__text-menu-button"
                      }
                      onClick={(event) => {
                        event.stopPropagation();
                        setUserTextSize("large");
                      }}
                    >
                      A+
                    </button>
                  </div>
                )}

                {isVideoTop && activeChapter.id === 1 && (
                  <div className="level3__video">
                    <div className="level3__video-screen">
                      <div className="level3__video-play" />
                    </div>
                    <div className="level3__video-controls">
                      <div className="level3__video-timeline">
                        <span />
                      </div>
                      <div className="level3__video-buttons">
                        <span className="level3__video-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24">
                            <path d="M8 5l11 7-11 7V5z" />
                          </svg>
                        </span>
                        <span className="level3__video-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24">
                            <path d="M4 9h4l5-4v14l-5-4H4V9zm12.5-2.5a4 4 0 0 1 0 11" />
                          </svg>
                        </span>
                        <span className="level3__video-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24">
                            <path d="M12 8.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5zm8.5 3.5a6.6 6.6 0 0 0-.1-1l2-1.6-2-3.4-2.4 1a6.6 6.6 0 0 0-1.7-1l-.3-2.6h-4l-.3 2.6a6.6 6.6 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.6a6.6 6.6 0 0 0 0 2L4.6 14l2 3.4 2.4-1a6.6 6.6 0 0 0 1.7 1l.3 2.6h4l.3-2.6a6.6 6.6 0 0 0 1.7-1l2.4 1 2-3.4-2-1.6a6.6 6.6 0 0 0 .1-1z" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className={`level3__text ${userTextClass}`}>
                  {activeChapter.text}
                </div>

                {!isVideoTop && activeChapter.id === 1 && (
                  <div className="level3__video level3__video--overlay">
                    <div className="level3__video-screen">
                      <div className="level3__video-play" />
                    </div>
                    <div className="level3__video-controls">
                      <div className="level3__video-timeline">
                        <span />
                      </div>
                      <div className="level3__video-buttons">
                        <span className="level3__video-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24">
                            <path d="M8 5l11 7-11 7V5z" />
                          </svg>
                        </span>
                        <span className="level3__video-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24">
                            <path d="M4 9h4l5-4v14l-5-4H4V9zm12.5-2.5a4 4 0 0 1 0 11" />
                          </svg>
                        </span>
                        <span className="level3__video-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24">
                            <path d="M12 8.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5zm8.5 3.5a6.6 6.6 0 0 0-.1-1l2-1.6-2-3.4-2.4 1a6.6 6.6 0 0 0-1.7-1l-.3-2.6h-4l-.3 2.6a6.6 6.6 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.6a6.6 6.6 0 0 0 0 2L4.6 14l2 3.4 2.4-1a6.6 6.6 0 0 0 1.7 1l.3 2.6h4l.3-2.6a6.6 6.6 0 0 0 1.7-1l2.4 1 2-3.4-2-1.6a6.6 6.6 0 0 0 .1-1z" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="level3__image">
                  <img
                    src={
                      activeChapter.id === 1
                        ? `${baseUrl}sistema-solar.jpg`
                        : `${baseUrl}luna.jpg`
                    }
                    alt={
                      activeChapter.id === 1
                        ? "Imagen del sistema solar"
                        : "Imagen de la Luna y sus satélites"
                    }
                    className="level3__image-img"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="level3__columns">
              {CHAPTERS.map((chapter) => (
                <div key={chapter.id} className="level3__column">
                  <div className={`level3__text ${userTextClass}`}>
                    {chapter.text}
                  </div>
                  <div className="level3__image level3__image--inline">
                    <img
                      src={
                        chapter.id === 1
                          ? `${baseUrl}sistema-solar.jpg`
                          : `${baseUrl}luna.jpg`
                      }
                      alt={
                        chapter.id === 1
                          ? "Imagen del sistema solar"
                          : "Imagen de la Luna y sus satélites"
                      }
                      className="level3__image-img"
                    />
                  </div>
                </div>
              ))}
              <div className="level3__video level3__video--overlay">
                Reproductor de vídeo
              </div>
            </div>
          )}
        </KeyAccessible>

      </div>
    </section>
  );
}
