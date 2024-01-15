import "./index.css";
import DefaultGameTheme from './logic/themes/DefaultGameTheme';
import GameModel from "./model";
import { Move } from "./logic/constants/Move";
import SpanStats from "./logic/adapters/SpanStats";
import { Stats } from "./logic/constants/Stats";
import GameTheme from "./models/AGameTheme";
import GameThemesFactory from "./logic/themes/GameThemesFactory";
import SelectStats from "./logic/adapters/SelectStats";
import CategoryService from "./services/CategoryService";

// await CategoryServiceFactory.initializeCategoryService();




// const categoryNavigator = document.getElementById('category-navigator') as HTMLDivElement;
// let categoryId = 1;
// while (categoryId <= CategoryServiceFactory.totalCategoriesCount()) {
//     const categoryButton = document.createElement('button');
//     categoryButton.innerText = `${categoryId}`;
//     (function (id) {
//         categoryButton.addEventListener('click', () => {
//             gameModel.changeCategory(id);
//         });
//     })(categoryId);
//     categoryNavigator.appendChild(categoryButton);
//     categoryId++;
// }

const gameModel = new GameModel();


/* --------------- CLICK CONTROLS--------------- */
const undoButton = document.getElementById('undo-button') as HTMLButtonElement;
undoButton.addEventListener('click', () => gameModel.undoMove());

const redoButton = document.getElementById('redo-button') as HTMLButtonElement;
redoButton.addEventListener('click', () => gameModel.redoMove());

const resetButton = document.getElementById('reset-button') as HTMLButtonElement;
resetButton.addEventListener('click', () => gameModel.reset());

const aiButton = document.getElementById('ai-button') as HTMLButtonElement;
aiButton.addEventListener('click', () => gameModel.solve());

const upButton = document.getElementById('up-button') as HTMLButtonElement;
upButton.addEventListener('click', () => gameModel.move(Move.UP));

const leftButton = document.getElementById('left-button') as HTMLButtonElement;
leftButton.addEventListener('click', () => gameModel.move(Move.LEFT));

const downButton = document.getElementById('down-button') as HTMLButtonElement;
downButton.addEventListener('click', () => gameModel.move(Move.DOWN));

const rightButton = document.getElementById('right-button') as HTMLButtonElement;
rightButton.addEventListener('click', () => gameModel.move(Move.RIGHT));

const volumeButton = document.getElementById('volume-button') as HTMLButtonElement;
const icon = document.getElementById('volume-icon') as HTMLSpanElement;
const audio = document.querySelector("audio") as HTMLAudioElement;

volumeButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.volume = 0.1;
    audio.play();
    icon.classList.remove('volume-mute');
    icon.classList.add('volume-up');
    
  } else {
    audio.pause();
    icon.classList.remove('volume-up');
    icon.classList.add('volume-mute');
    
  }
});

const themeButton = document.getElementById('theme-button') as HTMLButtonElement;
themeButton.addEventListener("click", () => {
     GameThemesFactory.changeTheme();
     gameModel.triggerUpdateView();
});

// const categoryButton = document.getElementById('category-button') as HTMLButtonElement;


/* --------------- SWIPE CONTROLS--------------- */

let [x1, y1, x2, y2] = [0, 0, 0, 0];

function handleTouchStart(event: TouchEvent) {
  const touch = event.touches[0];
  [x1, y1, x2, y2] = [touch.clientX, touch.clientY, touch.clientX, touch.clientY];
}

function handleTouchMove(event: TouchEvent) {
    event.preventDefault();
  const touch = event.touches[0];
  [x2, y2] = [touch.clientX, touch.clientY];
}

function handleTouchEnd() {
    const dx = x2 - x1;
    const dy = y2 - y1;

    if (Math.max(Math.abs(dx), Math.abs(dy)) < 50) {
        return;
    } 
    
    let angle = Math.atan2(dy, dx) * 180 / Math.PI;
    if (angle >= -45 && angle < 45) gameModel.move(Move.RIGHT);
    else if (angle >= 45 && angle < 135) gameModel.move(Move.DOWN);
    else if (angle >= 135 && angle < 225) gameModel.move(Move.LEFT);
    else if (angle >= 225 || angle < -45) gameModel.move(Move.UP);
    else console.log('wtf');

}

const canvasContainer = document.getElementById("canvas-container")! as HTMLDivElement;

canvasContainer.addEventListener('touchstart', handleTouchStart);
canvasContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
canvasContainer.addEventListener('touchend', handleTouchEnd);



/* --------------- KEYBOARD CONTROLS--------------- */

document.addEventListener('keydown', (event) => { if (event.key === 'z') gameModel.undoMove() });
document.addEventListener('keydown', (event) => { if (event.key === 'y') gameModel.redoMove() });
document.addEventListener('keydown', (event) => { if (event.key === 'r') gameModel.reset() });
document.addEventListener('keydown', (event) => { if (event.key === 's') gameModel.solve() });
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        event.preventDefault();
        gameModel.move(Move.UP)
    }
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        event.preventDefault();
        gameModel.move(Move.LEFT)
    }
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
        event.preventDefault();
        gameModel.move(Move.DOWN)
    }
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        event.preventDefault();
        gameModel.move(Move.RIGHT)
    }
});


/// SETTING UP STATS ///
const service = CategoryService.getInstance();
// category stats
const categorySelect = document.getElementById('category-select') as HTMLSelectElement;
for (let i = 1; i <= service.totalCategoriesCount(); i++) {
    const option = document.createElement('option');
    option.value = i.toString();
    option.innerText = i.toString();
    categorySelect.appendChild(option);
}
const categoryStats = new SelectStats(categorySelect, 1);
await service.fetchCategory(parseInt(categorySelect.value));

categorySelect.addEventListener('change', async () => {
    const categoryId = parseInt(categorySelect.value);
    await service.fetchCategory(categoryId);
    gameModel.changeCategory(categoryId);
});
gameModel.stats.set(Stats.CATEGORY, categoryStats);

// level stats
const levelSelect = document.getElementById('level-select') as HTMLSelectElement;
const categoryId = parseInt(categorySelect.value);
for (let i = 1; i <= service.totalLevelsCount(categoryId); i++) {
    const option = document.createElement('option');
    option.value = i.toString();
    option.innerText = i.toString();
    levelSelect.appendChild(option);
}
const levelStats = new SelectStats(levelSelect, 1);
levelSelect.addEventListener('change', () => gameModel.changeLevel(parseInt(levelSelect.value)));
gameModel.stats.set(Stats.LEVEL, levelStats);


// moves stats
const moveStats = new SpanStats(document.getElementById('moves') as HTMLSpanElement, 0);
gameModel.stats.set(Stats.MOVES, moveStats);

// push stats
const pushStats = new SpanStats(document.getElementById('pushes') as HTMLSpanElement, 0);
gameModel.stats.set(Stats.PUSHES, pushStats);

window.addEventListener('resize', updateView);


function updateView() {
    const map = gameModel.map;
    const [height, width] = [map.length, map[0].length];

    // Clear the canvas
    const playground = document.getElementById("game-canvas")! as HTMLDivElement;
    while (playground.firstChild) {
        playground.removeChild(playground.firstChild);
    }
    const widthRatio = canvasContainer.offsetWidth / (width + 1);
    const heightRatio = canvasContainer.offsetHeight / (height + 1);
    const ratio = Math.round(Math.min(widthRatio, heightRatio));


    const playground_style = {
        'display': 'grid',
        'grid-template-columns': `repeat(${width}, 1fr)`,
        'grid-template-rows': `repeat(${height}, 1fr)`,
        'gap': '1px',
        'width': `${width * ratio}px`,
        'height': `${height * ratio}px`,
        'margin': 'auto',
        'justify-content': 'center',
        'border': 'solid 1px black',
        'backgroundColor': 'black'
    };

    const square_style = {
        'backgroundColor': '#1F2937',
        'border': "solid 1px #1F2937",
        'display': 'flex',
        'justifyContent': 'center',
        'alignItems': 'center'
    };

    const styler = GameThemesFactory.currentTheme;
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const square = document.createElement("div");
            Object.assign(square.style, square_style);
            square.appendChild(styler.render(map[row][col]));
            playground.appendChild(square);
        }
    }

    Object.assign(playground.style, playground_style);
}

gameModel.constructInitialMap();
gameModel.setUpdateCallback(updateView);
gameModel.triggerUpdateView();






