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

export default function App() {
  const [gameState, setGameState] = useState(INITIAL_STATE);
  const [activeFixKey, setActiveFixKey] = useState(null);
  const [feedback, setFeedback] = useState(null);

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
              { text: "Color adecuado", correct: true },
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
  }, [gameState.level, levelConfigs]);

  return (
    <div className="app">
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
        message={
          isLastLevel
            ? "Felicidades! Has completado el juego."
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
      />

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
