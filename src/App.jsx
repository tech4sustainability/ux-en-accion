import { useEffect, useMemo, useState } from "react";
import ProgressBar from "./components/ProgressBar.jsx";
import ConfigPanel from "./components/ConfigPanel.jsx";
import GameMessage from "./components/GameMessage.jsx";
import MultiConfigPanel from "./components/MultiConfigPanel.jsx";
import Level1 from "./levels/Level1.jsx";
import Level2 from "./levels/Level2.jsx";
import Level3 from "./levels/Level3.jsx";
import "./styles.css";

const INITIAL_STATE = {
  level: 1,
  score: 0,
  fixesCompleted: {},
  selections: {},
};

const JUSTIFICATION_BY_FIX_KEY = {
  title:
    "Claridad visual: usamos tamaños legibles y coherentes, y hacemos los títulos más grandes para facilitar la lectura.",
  text:
    "Claridad visual: usamos un tamaño de texto legible para reducir el esfuerzo y comprender mejor la información.",
  buttons:
    "Botones y acciones: añadimos texto o iconos claros en los botones para que se entienda qué ocurre al pulsarlos.",
  background:
    "Claridad visual: usamos fondos claros y neutros con contraste suficiente para evitar cansancio visual.",
  image:
    "Imágenes y gráficos: usamos imágenes relevantes que aporten valor y evitamos imágenes sin relación con el contenido.",
  structure:
    "Organización y estructura: usamos títulos, subtítulos y agrupación por bloques para encontrar la información más rápido.",
  spacing:
    "Espacios: usamos márgenes y espacios en blanco para separar secciones y evitar saturación visual.",
  buttonsDistance:
    "Botones y acciones: ajustamos tamaño y posición de los botones para facilitar su uso.",
  buttonsBlink:
    "Botones y acciones: evitamos animaciones demasiado llamativas para no distraer ni molestar.",
  buttonsLabel:
    "Botones y acciones: usamos textos claros y descriptivos para indicar qué acción se realizará.",
  buttonsColor:
    "Botones y acciones y Navegación y consistencia: mantenemos estilo y color consistentes para mejorar reconocimiento y uso.",
  layout:
    "Organización y estructura: dividimos el contenido en capítulos o secciones para evitar sobrecarga y mejorar la comprensión.",
  contrast:
    "Accesibilidad: verificamos contrastes adecuados entre texto y fondo para asegurar la legibilidad.",
  video:
    "Claridad visual e Imágenes y gráficos: colocamos el contenido multimedia para que no tape el texto ni distraiga de la información principal.",
  textSize:
    "Accesibilidad: permitimos ajustar el tamaño de la letra para adaptarnos a diferentes necesidades.",
};

export default function App() {
  const [gameState, setGameState] = useState(INITIAL_STATE);
  const [activeFixKey, setActiveFixKey] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showIntroModal, setShowIntroModal] = useState(true);

  const levelConfigs = useMemo(
    () => ({
      1: {
        component: Level1,
        fixes: {
          title: {
            label: "Título",
            options: [
              { text: "Pequeño", correct: false },
              { text: "Normal", correct: true },
              { text: "Grande", correct: false },
            ],
          },
          text: {
            label: "Texto",
            options: [
              { text: "Pequeño", correct: false },
              { text: "Normal", correct: true },
              { text: "Grande", correct: false },
            ],
          },
          buttons: {
            label: "Botones",
            options: [
              { text: "Vacíos", correct: false },
              { text: "Con texto", correct: false },
              { text: "Con texto e iconos", correct: true },
            ],
          },
          background: {
            label: "Fondo",
            options: [
              { text: "Colores chillones", correct: false },
              { text: "Colores neutros con buen contraste", correct: true },
              { text: "Color negro", correct: false },
            ],
          },
          image: {
            label: "Imagen",
            options: [
              { text: "Imagen aleatoria", correct: false },
              { text: "Imagen relacionada con aprendizaje o ciencia", correct: true },
              { text: "Quitar imagen", correct: false },
            ],
          },
        },
      },
      2: {
        component: Level2,
        fixes: {
          structure: {
            label: "Estructura",
            options: [
              { text: "Párrafo", correct: false },
              { text: "Listado", correct: false },
              { text: "Bloques con título", correct: true },
            ],
          },
          text: {
            label: "Tamaño",
            options: [
              { text: "Pequeño", correct: false },
              { text: "Normal", correct: true },
              { text: "Grande", correct: false },
            ],
          },
          spacing: {
            label: "Separación",
            options: [
              { text: "Sin separación", correct: false },
              { text: "Espacios pequeños", correct: true },
              { text: "Espacios grandes", correct: false },
            ],
          },
          buttonsDistance: {
            label: "Ubicación",
            options: [
              { text: "Lejos del curso", correct: false },
              { text: "Cerca del curso", correct: true },
            ],
          },
          buttonsBlink: {
            label: "Parpadeo",
            options: [
              { text: "Parpadeo activado", correct: false },
              { text: "Sin parpadeo", correct: true },
            ],
          },
          buttonsLabel: {
            label: "Texto",
            options: [
              { text: "No descriptivos", correct: false },
              { text: "Descriptivos", correct: true },
            ],
          },
          buttonsColor: {
            label: "Color",
            options: [
              { text: "Color llamativo", correct: false },
              { text: "Color adaptado al diseño", correct: true },
            ],
          },
        },
      },
      3: {
        component: Level3,
        fixes: {
          layout: {
            label: "Estructura",
            options: [
              { text: "Columnas", correct: false },
              { text: "Capítulos", correct: true },
            ],
          },
          contrast: {
            label: "Colores",
            options: [
              { text: "Contraste bajo", correct: false },
              { text: "Contraste alto", correct: true },
            ],
          },
          spacing: {
            label: "Espacios",
            options: [
              { text: "Sin espacios", correct: false },
              { text: "Con espacios", correct: true },
            ],
          },
          video: {
            label: "Vídeo",
            options: [
              { text: "Encima del texto", correct: true },
              { text: "Tapando el texto", correct: false },
            ],
          },
          textSize: {
            label: "Ajuste del tamaño del texto",
            options: [
              { text: "Desactivado", correct: false },
              { text: "Activado", correct: true },
            ],
          },
        },
      },
    }),
    []
  );

  const currentLevelConfig = levelConfigs[gameState.level] || levelConfigs[1];
  const FixComponent = currentLevelConfig.component;
  const fixDefinitions = currentLevelConfig.fixes;

  const totalFixes = Object.keys(fixDefinitions).length;
  const completedFixes = Object.values(gameState.fixesCompleted).filter(Boolean)
    .length;
  const progress = Math.min(completedFixes / totalFixes, 1);
  const levelCompleted = completedFixes === totalFixes;
  const maxLevel = Math.max(...Object.keys(levelConfigs).map(Number));
  const isLastLevel = gameState.level === maxLevel;
  const finalSummary = Object.entries(levelConfigs).map(([level, config]) => {
    const fixes = Object.entries(config.fixes).map(([fixKey, fixConfig]) => {
      const correctOption = fixConfig.options.find((option) => option.correct);
      return {
        key: fixKey,
        label: fixConfig.label,
        appliedChange: correctOption?.text ?? "Sin opción correcta definida",
        justification:
          JUSTIFICATION_BY_FIX_KEY[fixKey] ??
          "Justificación pendiente de vincular con la guía.",
      };
    });

    return {
      level,
      fixes,
    };
  });

  const openFixPanel = (fixKey) => {
    setActiveFixKey(fixKey);
    setFeedback(null);
  };

  const closeFixPanel = () => {
    setActiveFixKey(null);
    setFeedback(null);
  };

  useEffect(() => {
    if (levelCompleted) {
      closeFixPanel();
    }
  }, [levelCompleted]);

  const applySelection = (fixKey, option, index) => {
    setGameState((prev) => {
      const selections = {
        ...prev.selections,
        [fixKey]: index,
      };

      const fixesCompleted = Object.keys(fixDefinitions).reduce((acc, key) => {
        if (!Object.prototype.hasOwnProperty.call(selections, key)) {
          acc[key] = false;
          return acc;
        }
        const choiceIndex = selections[key];
        const isCorrect = Boolean(
          fixDefinitions[key].options[choiceIndex]?.correct
        );
        acc[key] = isCorrect;
        return acc;
      }, {});

      const score =
        Object.values(fixesCompleted).filter(Boolean).length * 20;

      return {
        ...prev,
        selections,
        fixesCompleted,
        score,
      };
    });

    setFeedback(null);
  };

  const handleOptionSelect = (option, index) => {
    if (!activeFixKey) return;
    applySelection(activeFixKey, option, index);
  };

  const handleMultiSelect = (fixKey, option, index) => {
    applySelection(fixKey, option, index);
  };

  const activeFix = activeFixKey ? fixDefinitions[activeFixKey] : null;
  const isLevel2ContentPanel =
    gameState.level === 2 && activeFixKey === "content";
  const isLevel2ButtonsPanel =
    gameState.level === 2 && activeFixKey === "buttons";
  const isLevel3ContentPanel =
    gameState.level === 3 && activeFixKey === "content";
  const selectionsWithDefaults = Object.keys(fixDefinitions).reduce(
    (acc, key) => {
      if (Object.prototype.hasOwnProperty.call(gameState.selections, key)) {
        acc[key] = gameState.selections[key];
        return acc;
      }
      if (key === "video" && gameState.level === 3) {
        acc[key] = 1;
        return acc;
      }
      acc[key] = 0;
      return acc;
    },
    {}
  );
  const contentSections =
    gameState.level === 2
      ? [
          { key: "structure", ...fixDefinitions.structure },
          { key: "spacing", ...fixDefinitions.spacing },
          { key: "text", ...fixDefinitions.text },
        ]
      : [];
  const level3ContentSections =
    gameState.level === 3
      ? [
          { key: "layout", ...fixDefinitions.layout },
          { key: "video", ...fixDefinitions.video },
          { key: "contrast", ...fixDefinitions.contrast },
          { key: "spacing", ...fixDefinitions.spacing },
          { key: "textSize", ...fixDefinitions.textSize },
        ]
      : [];
  const buttonSections =
    gameState.level === 2
      ? [
          { key: "buttonsDistance", ...fixDefinitions.buttonsDistance },
          { key: "buttonsBlink", ...fixDefinitions.buttonsBlink },
          { key: "buttonsLabel", ...fixDefinitions.buttonsLabel },
          { key: "buttonsColor", ...fixDefinitions.buttonsColor },
        ]
      : [];

  const handleNextLevel = () => {
    if (!levelConfigs[gameState.level + 1]) return;
    setGameState((prev) => ({
      ...prev,
      level: prev.level + 1,
      score: 0,
      fixesCompleted: {},
      selections: {},
    }));
    closeFixPanel();
  };

  const resetLevel = (level) => {
    setGameState((prev) => ({
      ...prev,
      level,
      score: 0,
      fixesCompleted: {},
      selections: {},
    }));
    closeFixPanel();
  };

  useEffect(() => {
    const handleKey = (event) => {
      if (showIntroModal && event.key === "Escape") {
        setShowIntroModal(false);
        return;
      }
      const tag = event.target?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return;

      const key = event.key.toLowerCase();
      if (key === "r" && event.altKey) {
        resetLevel(gameState.level);
      }
      if (key === "n" && event.altKey) {
        const nextLevel = gameState.level + 1;
        if (levelConfigs[nextLevel]) {
          resetLevel(nextLevel);
        }
      }
      if (key === "b" && event.altKey) {
        const prevLevel = gameState.level - 1;
        if (levelConfigs[prevLevel]) {
          resetLevel(prevLevel);
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameState.level, levelConfigs, showIntroModal]);

  return (
    <div className="app">
      {showIntroModal && (
        <div className="game-message-overlay" role="dialog" aria-modal="true">
          <div
            className="game-message__backdrop"
            onClick={() => setShowIntroModal(false)}
          />
          <div
            className="game-message game-message--summary game-message--summary-intro"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 className="game-message__title">
              Misión: mejorar la web de cursos de la biblioteca
            </h3>
            <div className="game-message__content">
              <section className="summary-level">
                <p className="game-message__subtitle game-message__subtitle--intro">
                  Mejora esta interfaz detectando y corrigiendo decisiones de
                  diseño. Haz clic en los elementos interactivos, elige la
                  mejor opción en cada panel y completa todas las correcciones
                  del nivel para avanzar.
                </p>
              </section>
            </div>
            <div className="game-message__actions">
              <button
                type="button"
                className="game-message__button game-message__button--summary"
                onClick={() => setShowIntroModal(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="hud">
        <div className="hud__level">Nivel {gameState.level}</div>
        <ProgressBar
          progress={progress}
          completed={completedFixes}
          total={totalFixes}
        />
      </div>

      <FixComponent
        selections={gameState.selections}
        onElementClick={openFixPanel}
      />

      <GameMessage
        show={levelCompleted}
        title={
          isLastLevel
            ? "¡Enhorabuena! Has completado el juego."
            : undefined
        }
        message={
          isLastLevel
            ? "¿Qué has corregido?"
            : "¡Has mejorado la página!"
        }
        actionLabel={
          isLastLevel
            ? "Volver a empezar"
            : levelConfigs[gameState.level + 1]
            ? "Siguiente nivel"
            : "Siguiente nivel (próximamente)"
        }
        onAction={
          isLastLevel
            ? () => resetLevel(1)
            : levelConfigs[gameState.level + 1]
            ? handleNextLevel
            : undefined
        }
      >
        {isLastLevel &&
          finalSummary.map((levelData) => (
            <section key={levelData.level} className="summary-level">
              <h4 className="summary-level__title">Nivel {levelData.level}</h4>
              <ul className="summary-level__list">
                {levelData.fixes.map((fix) => (
                  <li key={fix.key} className="summary-level__item">
                    <div>
                      <strong>{fix.label}:</strong> {fix.appliedChange}
                    </div>
                    <div className="summary-level__justification">
                      {fix.justification}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
      </GameMessage>

      <MultiConfigPanel
        isOpen={isLevel2ContentPanel}
        title="Mejorar contenido de cursos"
        sections={contentSections}
        onClose={closeFixPanel}
        onSelect={handleMultiSelect}
        feedback={feedback}
        selections={selectionsWithDefaults}
      />

      <MultiConfigPanel
        isOpen={isLevel2ButtonsPanel}
        title="Mejorar botones"
        sections={buttonSections}
        onClose={closeFixPanel}
        onSelect={handleMultiSelect}
        feedback={feedback}
        selections={selectionsWithDefaults}
      />

      <MultiConfigPanel
        isOpen={isLevel3ContentPanel}
        title="Mejorar contenido del curso"
        sections={level3ContentSections}
        onClose={closeFixPanel}
        onSelect={handleMultiSelect}
        feedback={feedback}
        selections={selectionsWithDefaults}
      />

      <ConfigPanel
        isOpen={
          Boolean(activeFix) &&
          !isLevel2ContentPanel &&
          !isLevel2ButtonsPanel &&
          !isLevel3ContentPanel
        }
        title={activeFix?.label}
        options={activeFix?.options ?? []}
        onClose={closeFixPanel}
        onSelect={handleOptionSelect}
        feedback={feedback}
        selectedIndex={
          activeFixKey != null ? selectionsWithDefaults[activeFixKey] : null
        }
      />
    </div>
  );
}
