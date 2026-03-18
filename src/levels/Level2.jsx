const COURSES = [
  {
    id: 1,
    title: "Curso 1",
    subtitle: "Planetas y sistema solar",
    description:
      "Aprender sobre los planetas puede ser muy divertido. Hay muchos datos interesantes sobre los que componen el sistema solar, sus características y curiosidades que quizá no conocías. Además, puedes descubrir cómo se mueven y cuáles de ellos tienen satélites.",
    buttonLabel: "Ver curso de planetas",
  },
  {
    id: 2,
    title: "Curso 2",
    subtitle: "Historia del arte",
    description:
      "La historia del arte es fascinante y está llena de sorpresas. Desde las pinturas rupestres hasta los museos modernos, hay mucho que explorar. Cada época tiene estilos distintos y artistas que cambiaron la forma de ver el mundo.",
    buttonLabel: "Ver curso de arte",
  },
  {
    id: 3,
    title: "Curso 3",
    subtitle: "Experimentos en casa",
    description:
      "Los experimentos de ciencia en casa son geniales para aprender jugando. Puedes probar mezclas de colores, pequeñas reacciones químicas y observar fenómenos físicos sencillos que explican cómo funciona el mundo.",
    buttonLabel: "Ver curso de ciencia",
  },
];

function KeyAccessible({
  onActivate,
  children,
  className,
  ariaLabel,
  stopPropagation = false,
}) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onActivate();
    }
  };

  const handleClick = (event) => {
    if (stopPropagation) {
      event.stopPropagation();
    }
    onActivate();
  };

  return (
    <div
      className={className}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
}

export default function Level2({ selections, onElementClick }) {
  const structureChoice = selections.structure ?? 0;
  const textChoice = selections.text ?? 0;
  const spacingChoice = selections.spacing ?? 0;
  const buttonsDistanceChoice = selections.buttonsDistance ?? 0;
  const buttonsBlinkChoice = selections.buttonsBlink ?? 0;
  const buttonsLabelChoice = selections.buttonsLabel ?? 0;
  const buttonsColorChoice = selections.buttonsColor ?? 0;

  const isButtonsNear = buttonsDistanceChoice === 1;
  const isButtonsFar = buttonsDistanceChoice !== 1;
  const isButtonsBlink = buttonsBlinkChoice !== 1;
  const isButtonsDescriptive = buttonsLabelChoice === 1;
  const isButtonsColorCorrect = buttonsColorChoice === 1;

  const listClass =
    structureChoice === 1
      ? "level2__list--plain"
      : structureChoice === 2
      ? "level2__list--cards"
      : "level2__list--mixed";

  const textClass =
    textChoice === 1
      ? "level2__text--readable"
      : textChoice === 2
      ? "level2__text--huge"
      : "level2__text--tiny";

  const spacingClass =
    spacingChoice === 1
      ? "level2__list--spaced"
      : spacingChoice === 2
      ? "level2__list--loose"
      : "level2__list--tight";

  return (
    <section className="level level--home level--calm level2">
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
          className={`level2__list ${listClass} ${spacingClass}`}
          ariaLabel="Editar estructura, espacios y tamaño del texto"
          onActivate={() => onElementClick("content")}
        >
          {structureChoice === 2 ? (
            COURSES.map((course) => (
              <article key={course.id} className="level2__course-card">
                <div className="level2__course-title">{course.title}</div>
                <div className="level2__course-subtitle">{course.subtitle}</div>
                <KeyAccessible
                  className={`level2__course-text ${textClass}`}
                  ariaLabel="Editar tamaño del texto"
                  onActivate={() => onElementClick("content")}
                  stopPropagation
                >
                  {course.description}
                </KeyAccessible>
                {isButtonsNear && structureChoice === 2 && (
                  <div
                    className={`level2__course-button ${
                      isButtonsBlink ? "level2__button--blink" : ""
                    } ${
                      isButtonsColorCorrect
                        ? "level2__course-button--good"
                        : "level2__course-button--bad"
                    }`}
                    onClick={(event) => {
                      event.stopPropagation();
                      onElementClick("buttons");
                    }}
                    onKeyDown={(event) => {
                      event.stopPropagation();
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onElementClick("buttons");
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    {isButtonsDescriptive
                      ? course.buttonLabel
                      : `Ver curso ${course.id}`}
                  </div>
                )}
              </article>
            ))
          ) : structureChoice === 1 ? (
            <KeyAccessible
              className={`level2__plain-list ${textClass}`}
              ariaLabel="Editar tamaño del texto"
              onActivate={() => onElementClick("content")}
              stopPropagation
            >
              {COURSES.map((course) => (
                <p key={course.id}>{course.description}</p>
              ))}
            </KeyAccessible>
          ) : (
            <KeyAccessible
              className={`level2__mixed ${textClass}`}
              ariaLabel="Editar tamaño del texto"
              onActivate={() => onElementClick("content")}
              stopPropagation
            >
              <p>
                {COURSES[0].description} {COURSES[1].description}{" "}
                {COURSES[2].description}
              </p>
            </KeyAccessible>
          )}
        </KeyAccessible>

        {isButtonsNear && structureChoice !== 2 && (
          <div
            className={`level2__standalone-buttons ${
              isButtonsBlink ? "level2__button--blink" : ""
            } ${
              isButtonsColorCorrect
                ? "level2__course-button--good"
                : "level2__course-button--bad"
            }`}
            onClick={() => onElementClick("buttons")}
            role="button"
            tabIndex={0}
          >
            {COURSES.map((course) => (
              <button key={course.id} type="button">
                {isButtonsDescriptive
                  ? course.buttonLabel
                  : `Ver curso ${course.id}`}
              </button>
            ))}
          </div>
        )}

        {isButtonsFar && (
          <div
            className={`level2__floating-buttons ${
              isButtonsBlink ? "level2__floating-buttons--blink" : ""
            } ${
              isButtonsColorCorrect
                ? "level2__course-button--good"
                : "level2__course-button--bad"
            }`}
            onClick={() => onElementClick("buttons")}
            role="button"
            tabIndex={0}
          >
            {COURSES.map((course) => (
              <button key={course.id} type="button">
                {isButtonsDescriptive
                  ? course.buttonLabel
                  : `Ver curso ${course.id}`}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
