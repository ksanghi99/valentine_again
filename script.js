/* ============================================
   VALENTINE SURPRISE - COMPLETE JAVASCRIPT
   All 4 games working with beautiful UI
   ============================================ */

console.log("💝 Valentine Surprise Started!");

// ======================
// GLOBAL VARIABLES
// ======================
let currentPage = 1;
let autoTransitionTimers = [];

// Game 1: Tap Hearts
let heartsCollected = 0;
let totalHearts = 10;
let game1Timer = null;
let currentHeart = null;
const compliments = [
    "You have the most beautiful smile!",
    "Your eyes sparkle like stars!",
    "You make my heart skip a beat!",
    "You're the best thing that ever happened to me!",
    "Your laugh is my favorite sound!",
    "You're more amazing than you know!",
    "Being with you feels like home!",
    "You make every day brighter!",
    "You're my dream come true!",
    "I fall for you more every day!"
];

// Game 2: Maze
let playerPosition = { x: 15, y: 15 };
let mazeCompleted = false;

// Game 3: Riddles
let currentRiddle = 0;
let riddleScore = 0;
const riddles = [
    {
        section: "Cheesy",
        question: "What's my favorite midnight snack?",
        options: [
            "Your kisses under moonlight 🌙",
            "You 😉", 
            "Cold leftovers from dinner 🍕"
        ],
        correct: [0, 1],
        hint: "It's definitely not C!"
    },
    {
        section: "Cheesy",
        question: "If we were alone right now in a room, what would we be doing?",
        options: [
            "Slow dancing to silent music 💃",
            "Playing a game of 'who can stay quiet longest' 😏",
            "Watching paint dry 🎨"
        ],
        correct: [1],
        hint: "You Think too loud"
    },
    {
        section: "Romantic",
        question: "What's the most exciting sound I love to hear?",
        options: [
            "The whisper of sheets moving 🌙",
            "Your heartbeat against mine 💓",
            "Traffic noise outside 🚗"
        ],
        correct: [0, 1],
        hint: "It's definitely not boring!"
    },
    {
        section: "Romantic", 
        question: "What's the best way to warm up on a cold night?",
        options: [
            "Making our own heat ❤️🔥",
            "Skin-to-skin cuddles 🥵",
            "An electric blanket 🔌"
        ],
        correct: [0, 1],
        hint: "It's a good thing!"
    },
    {
        section: "Romantic",
        question: "What should be our secret code for 'I want you'?",
        options: [
            "Have you seen my socks? 🧦",
            "I'm feeling... adventurous 😈",
            "The moon looks beautiful tonight 🌝"
        ],
        correct: [1, 2],
        hint: "Too easy"
    },
    {
        section: "Naughty/Adult Teasing",
        question: "What's my favorite kind of workout?",
        options: [
            "The kind where we're both breathless 😮💨",
            "Late night cardio in bed 🛏️",
            "Doing laundry 💪"
        ],
        correct: [0, 1],
        hint: "Somewhere cozy..."
    },
    {
        section: "Naughty/Adult Teasing",
        question: "What's the most delicious thing I've ever tasted?",
        options: [
            "Apple Pie 🍑",
            "The nape of your neck 😘",
            "Store-bought cookies 🍪"
        ],
        correct: [0, 1],
        hint: "Definitely not cookies!"
    },
    {
        section: "Naughty/Adult Teasing",
        question: "What's the secret ingredient in our recipe for love?",
        options: [
            "Spice and everything nice 🌶️",
            "Late nights and soft whispers 🌙",
            "Boring routines ⏰"
        ],
        correct: [0, 1],
        hint: "Nothing boring about us!"
    },
    {
        section: "Naughty/Adult Teasing",
        question: "What's the game I'd never get tired of playing?",
        options: [
            "How many kisses before sunrise? 🌅",
            "Guess where I'm touching 👆",
            "Solitaire"
        ],
        correct: [0, 1],
        hint: "We're definitely exciting!"
    },
    {
        section: "Naughty/Adult Teasing",
        question: "What's the game I always want to play with you?",
        options: [
            "Hide and seek under covers 🙈",
            "Staring contest that ends with kisses 👄",
            "Monopoly (and argue about rules) 🎲"
        ],
        correct: [0, 1],
        hint: "It's more fun than board games!"
    }
];

// Game 4: Memory
const loveStoryMatchData = [
    {   id: 1,
        question: "🎯 What do I remember as our first meeting?",
        answer: "Mechanical Workshop 🔧",
        reveal: "Saloni, tera number dena! The start of everything...",
        hint: "Think about where things really began for us",
        image: "images/memory1.jpg"
    },
    {
        id: 2,
        question: "💖 Our first date - what was your favorite order?",
        answer: "Kathi King: Kaju Curry & Malai Kofta 🍛",
        reveal: "Watching you enjoy that food... I was already falling",
        hint: "Remember our first restaurant date?",
        image: "images/memory2.jpg"
    },
    {
        id: 3,
        question: "First trip?",
        answer: "✈️ Kasauli trip",
        reveal: "Tried to... you know 😂😂..... Adventures with you are always unforgettable!",
        hint: "Our first trip together had some firsts...",
        image: "images/memory3.jpg"
    },
    {
        id: 4,
        question: "our inside joke?",
        answer: "Krishna had fever, and in bukhar halat mein... bhi nahi baksha! 🤒",
        reveal: "Our laughs are my favorite soundtrack",
        hint: "Our funniest inside joke about being stubborn",
        image: "images/memory4.jpg"
    },
    {
        id: 5,
        question: "🛋️ What's my favorite cuddle spot?",
        answer: "Anywhere with you 🥰",
        reveal: "All spots are magical when you're in my arms",
        hint: "It's not about the place, but the company",
        image: "images/memory5.jpg"
    },
    {
        id: 6,
        question: "How our future looks like?",
        answer: "👶 One day we'll marry and have kids",
        reveal: "then...My son will take revenge from you! 😈. Can't wait for our chaotic, beautiful future",
        hint: "Our playful future parenting plans",
        image: "images/memory6.jpg"
    },
    {
        id: 7,
        question: "💝 Why do I love you the most?",
        answer: "Because you're MINE 👑",
        reveal: "You're my everything, always and forever",
        hint: "It's a possessive but loving reason",
        image: "images/memory7.jpg"
    },
    {
        id: 8,
        question: "❓ What's your most memorable moment?",
        answer: "Tosh trip ❄️",
        reveal: "Snow and you are the most deadly combination! ⛄",
        hint: "Think about our most adventurous trip",
        image: "images/memory8.jpg"
    }
];

// Game 4 state
let matchGameState = {
    selectedQuestion: null,
    completedPairs: [],
    wrongAttempts: {},
    shuffledAnswers: []
};

// ======================
// HELPER FUNCTIONS
// ======================

function clearConnections() {
    console.log("clearConnections called");
}

function resetConnectGame() {
    console.log("resetConnectGame called");
}

// ======================
// PAGE NAVIGATION
// ======================

function goToPage(pageNumber) {
    console.log("Navigating to page", pageNumber);
    currentPage = pageNumber;
    
    // Clear all auto-transition timers
    clearAllAutoTimers();
    
    // Stop any running games
    stopGame1();
    stopMazeControls();
    
    // Hide all pages
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById('page' + pageNumber);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Initialize the page
        initializePage(pageNumber);
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Update skip panel
        updateSkipPanel();
    }
}

function initializePage(pageNumber) {
    console.log("Initializing page", pageNumber);
    
    switch(pageNumber) {
        case 3: // Transition 1
            startAutoTransition(8, 4, 'countdown1');
            break;
        case 4: // Game 1
            setupGame1();
            break;
        case 5: // Transition 2
            startAutoTransition(8, 6, 'countdown2');
            break;
        case 7: // Game 2 - MAZE (FIXED)
            setupMaze();
            break;
        case 8: // Transition 3
            startAutoTransition(8, 9, 'countdown3');
            break;
        case 10: case 11: case 12: case 13: case 14: case 15: case 16:
            updateDayNavigation(pageNumber - 9);
            break;
        case 18: // Transition 4
            startAutoTransition(8, 19, 'countdown4');
            break;
        case 19: // Game 3
            setupRiddles();
            break;
        case 20: // Transition 5
            startAutoTransition(8, 21, 'countdown5');
            break;
        case 21: // Game 4
            initializeMatchGame();
            break;
        case 22: // Video Page
            console.log("🎬 Video page initialized");
            break;
    }
}

function startAutoTransition(seconds, nextPage, countdownId) {
    let countdown = seconds;
    const countdownElement = document.getElementById(countdownId);
    
    if (countdownElement) {
        const updateCountdown = () => {
            countdownElement.textContent = countdown;
            countdown--;
            
            if (countdown < 0) {
                clearInterval(timer);
                goToPage(nextPage);
            }
        };
        
        updateCountdown();
        const timer = setInterval(updateCountdown, 1000);
        
        autoTransitionTimers.push({
            timer: timer,
            timeout: setTimeout(() => {
                clearInterval(timer);
                goToPage(nextPage);
            }, seconds * 1000)
        });
    } else {
        const timeout = setTimeout(() => {
            goToPage(nextPage);
        }, seconds * 1000);
        autoTransitionTimers.push({ timeout: timeout });
    }
}

function clearAllAutoTimers() {
    autoTransitionTimers.forEach(timerObj => {
        if (timerObj.timer) clearInterval(timerObj.timer);
        if (timerObj.timeout) clearTimeout(timerObj.timeout);
    });
    autoTransitionTimers = [];
}

// ======================
// PAGE 2: FUNNY NO BUTTON
// ======================

function funnyNo() {
    const messages = [
        "Are you sure? 🥺",
        "Think about it again! 💖",
        "Pretty please? 🥰",
        "I'll wait forever for you! ⏳",
        "Try the YES button! 😊",
        "My heart says you mean YES! ❤️",
        "Let's try that again... 😉",
        "You know you want to say YES! 💕"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    const messageDiv = document.createElement('div');
    messageDiv.textContent = randomMessage;
    messageDiv.className = 'floating-message';
    
    if (!document.querySelector('#funnyNoStyle')) {
        const style = document.createElement('style');
        style.id = 'funnyNoStyle';
        style.textContent = `
            .floating-message {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(45deg, #e74c89, #ff6b8b);
                color: white;
                padding: 20px 40px;
                border-radius: 50px;
                font-size: 1.5rem;
                font-weight: bold;
                z-index: 9999;
                animation: floatMessage 2s ease forwards;
                box-shadow: 0 15px 35px rgba(231, 76, 137, 0.4);
                text-align: center;
                min-width: 300px;
                max-width: 80%;
            }
            
            @keyframes floatMessage {
                0% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.5);
                }
                20% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1.1);
                }
                40% {
                    transform: translate(-50%, -50%) scale(1);
                }
                80% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.8);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(messageDiv);
    setTimeout(() => {
        if (messageDiv.parentNode) messageDiv.remove();
    }, 2000);
}

// ======================
// GAME 1: TAP HEARTS
// ======================

function setupGame1() {
    heartsCollected = 0;
    updateLoveBar('love-fill-1', 'love-percent-1', 0);
    updateHeartCounter();
    
    const container = document.getElementById('game1-container');
    const complimentDisplay = document.getElementById('compliment-display');
    
    if (container) {
        container.innerHTML = '';
        if (complimentDisplay) {
            complimentDisplay.innerHTML = '';
            complimentDisplay.classList.remove('show');
        }
        
        setTimeout(() => {
            showNextHeart();
        }, 500);
    }
}

function showNextHeart() {
    if (heartsCollected >= totalHearts) {
        setTimeout(() => {
            goToPage(5);
        }, 2000);
        return;
    }
    
    const container = document.getElementById('game1-container');
    if (!container) return;
    
    if (currentHeart) currentHeart.remove();
    if (game1Timer) clearTimeout(game1Timer);
    
    currentHeart = document.createElement('button');
    currentHeart.className = 'floating-heart-btn';
    currentHeart.innerHTML = '❤️';
    currentHeart.title = 'Tap me!';
    
    const containerRect = container.getBoundingClientRect();
    const maxX = containerRect.width - 85;
    const maxY = containerRect.height - 85;
    const minPadding = 20;
    
    const randomX = minPadding + Math.random() * (maxX - 2 * minPadding);
    const randomY = minPadding + Math.random() * (maxY - 2 * minPadding);
    
    currentHeart.style.left = `${randomX}px`;
    currentHeart.style.top = `${randomY}px`;
    currentHeart.style.animationDelay = `${Math.random() * 2}s`;
    currentHeart.onclick = collectHeart;
    
    container.appendChild(currentHeart);
    
    game1Timer = setTimeout(() => {
        showNextHeart();
    }, 4000);
}

function collectHeart() {
    if (!currentHeart) return;
    
    heartsCollected++;
    showCompliment(compliments[heartsCollected - 1]);
    updateHeartCounter();
    const percent = (heartsCollected / totalHearts) * 100;
    updateLoveBar('love-fill-1', 'love-percent-1', percent);
    
    currentHeart.style.animation = 'pop 0.5s ease forwards';
    
    setTimeout(() => {
        if (currentHeart && currentHeart.parentNode) {
            currentHeart.remove();
            currentHeart = null;
        }
    }, 500);
    
    if (game1Timer) {
        clearTimeout(game1Timer);
        game1Timer = null;
    }
    
    setTimeout(() => {
        showNextHeart();
    }, 3000);
}

function showCompliment(text) {
    const complimentDisplay = document.getElementById('compliment-display');
    if (complimentDisplay) {
        complimentDisplay.innerHTML = `<i class="fas fa-heart" style="color:#e74c89; margin-right:10px;"></i> ${text}`;
        complimentDisplay.classList.add('show');
        
        setTimeout(() => {
            complimentDisplay.classList.remove('show');
        }, 3000);
    }
}

function updateHeartCounter() {
    const counter = document.getElementById('heart-count');
    if (counter) {
        counter.textContent = heartsCollected;
        counter.style.animation = 'none';
        setTimeout(() => {
            counter.style.animation = 'pop 0.3s ease';
        }, 10);
    }
}

function stopGame1() {
    if (game1Timer) {
        clearTimeout(game1Timer);
        game1Timer = null;
    }
    if (currentHeart) {
        currentHeart.remove();
        currentHeart = null;
    }
}

// ======================
// GAME 2: MAZE (FIXED)
// ======================

function setupMaze() {
    playerPosition = { x: 15, y: 15 };
    mazeCompleted = false;
    
    const container = document.getElementById('maze-container');
    const player = document.getElementById('player');
    
    if (container && player) {
        // FIX: Call drawMazeWalls to create the maze
        drawMazeWalls();
        
        player.style.left = '15px';
        player.style.top = '15px';
        
        const endPoint = document.getElementById('end-point');
        if (endPoint) {
            endPoint.style.left = '550px';
            endPoint.style.top = '400px';
        }
        
        // FIX: Add event listener for keyboard controls
        document.addEventListener('keydown', handleMazeKeyPress);
        
        console.log("✅ Maze initialized with keyboard controls");
    }
}

function drawMazeWalls() {
    const container = document.getElementById('maze-container');
    if (!container) return;
    
    const walls = [
        // Outer walls
        [0, 0, 650, 12],
        [0, 0, 12, 500],
        [638, 0, 12, 500],
        [0, 488, 650, 12],
        
        // Maze structure
        [80, 0, 12, 120],
        [160, 40, 12, 160],
        [80, 120, 100, 12],
        [240, 0, 12, 80],
        [320, 0, 12, 120],
        [240, 80, 100, 12],
        [400, 0, 12, 100],
        [480, 40, 12, 140],
        [400, 100, 100, 12],
        [120, 160, 12, 100],
        [200, 200, 12, 120],
        [280, 160, 12, 80],
        [360, 200, 12, 100],
        [440, 160, 12, 120],
        [0, 200, 120, 12],
        [160, 240, 120, 12],
        [320, 200, 120, 12],
        [480, 240, 120, 12],
        [40, 280, 12, 100],
        [120, 320, 12, 80],
        [40, 380, 100, 12],
        [200, 320, 12, 100],
        [280, 360, 12, 80],
        [200, 420, 100, 12],
        [360, 300, 12, 120],
        [440, 360, 12, 80],
        [360, 420, 100, 12],
        
        // Path to end
        [520, 350, 100, 12],
        [580, 400, 60, 12],
        [500, 450, 100, 12],
        [550, 300, 12, 50],
        [600, 300, 12, 100],
    ];
    
    container.querySelectorAll('.maze-wall').forEach(wall => wall.remove());
    
    walls.forEach(([x, y, width, height]) => {
        const wall = document.createElement('div');
        wall.className = 'maze-wall';
        wall.style.left = `${x}px`;
        wall.style.top = `${y}px`;
        wall.style.width = `${width}px`;
        wall.style.height = `${height}px`;
        container.appendChild(wall);
    });
}

function handleMazeKeyPress(event) {
    if (mazeCompleted) return;
    
    const step = 20;
    let newX = playerPosition.x;
    let newY = playerPosition.y;
    
    switch(event.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
            newY -= step;
            break;
        case 'arrowdown':
        case 's':
            newY += step;
            break;
        case 'arrowleft':
        case 'a':
            newX -= step;
            break;
        case 'arrowright':
        case 'd':
            newX += step;
            break;
        default:
            return;
    }
    
    event.preventDefault();
    
    if (!checkMazeCollision(newX, newY)) {
        playerPosition.x = newX;
        playerPosition.y = newY;
        
        const player = document.getElementById('player');
        if (player) {
            player.style.left = `${newX}px`;
            player.style.top = `${newY}px`;
            player.style.transition = 'left 0.1s linear, top 0.1s linear';
        }
        
        const endPoint = document.getElementById('end-point');
        if (endPoint) {
            const endRect = endPoint.getBoundingClientRect();
            const playerRect = player.getBoundingClientRect();
            
            const distance = Math.sqrt(
                Math.pow(endRect.left - playerRect.left, 2) +
                Math.pow(endRect.top - playerRect.top, 2)
            );
            
            if (distance < 40) {
                mazeCompleted = true;
                stopMazeControls();
                
                player.style.animation = 'pop 0.5s ease infinite';
                setTimeout(() => {
                    player.style.animation = '';
                    alert('🎉 You found your way to my heart! ❤️');
                    setTimeout(() => {
                        goToPage(8);
                    }, 500);
                }, 1000);
            }
        }
    }
}

function checkMazeCollision(x, y) {
    const playerSize = 45;
    
    if (x < 10 || x > 595 || y < 10 || y > 435) {
        return true;
    }
    
    const walls = document.querySelectorAll('.maze-wall');
    for (const wall of walls) {
        const wallRect = wall.getBoundingClientRect();
        const containerRect = document.getElementById('maze-container').getBoundingClientRect();
        
        const wallX = wallRect.left - containerRect.left;
        const wallY = wallRect.top - containerRect.top;
        const wallWidth = wallRect.width;
        const wallHeight = wallRect.height;
        
        if (x < wallX + wallWidth &&
            x + playerSize > wallX &&
            y < wallY + wallHeight &&
            y + playerSize > wallY) {
            return true;
        }
    }
    
    return false;
}

function stopMazeControls() {
    document.removeEventListener('keydown', handleMazeKeyPress);
}

function resetMaze() {
    stopMazeControls();
    setupMaze();
}

// ======================
// DAY NAVIGATION
// ======================

function updateDayNavigation(activeDay) {
    const dayButtons = document.querySelectorAll('.day-btn');
    dayButtons.forEach((btn, index) => {
        btn.classList.remove('active');
        if (index + 1 === activeDay) {
            btn.classList.add('active');
        }
    });
}

// ======================
// MUSIC PLAYER
// ======================

function setupMusicPlayer() {
    console.log("Music player ready");
}

function playMusic() {
    showToast('🎵 Playing our song...');
}

function pauseMusic() {
    showToast('⏸️ Music paused');
}

function replayMusic() {
    showToast('🔄 Replaying our song!');
}

// ======================
// GAME 3: RIDDLES
// ======================

function setupRiddles() {
    currentRiddle = 0;
    riddleScore = 0;
    updateLoveBar('love-fill-3', 'love-percent-3', 0);
    showRiddle();
}

function showRiddle() {
    if (currentRiddle >= riddles.length) {
        setTimeout(() => {
            goToPage(20);
        }, 1500);
        return;
    }
    
    const riddle = riddles[currentRiddle];
    document.getElementById('riddle-text').textContent = riddle.question;
    document.getElementById('riddle-number').textContent = currentRiddle + 1;
    
    const riddleBox = document.querySelector('.riddle-box');
    if (riddleBox) {
        riddleBox.style.borderColor = getSectionColor(riddle.section);
        riddleBox.style.background = getSectionBackground(riddle.section);
    }
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    riddle.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.setAttribute('data-option', ['A', 'B', 'C'][index]);
        button.innerHTML = option;
        button.onclick = () => checkRiddleAnswer(index);
        optionsContainer.appendChild(button);
    });
    
    const hintBtn = document.getElementById('hint-btn');
    if (hintBtn) {
        hintBtn.innerHTML = `Need a hint? <i class="fas fa-lightbulb"></i>`;
        hintBtn.style.display = 'inline-block';
        hintBtn.style.pointerEvents = 'auto';
        hintBtn.onclick = showHint;
    }
}

function getSectionColor(section) {
    switch(section) {
        case 'Cheesy': return '#ff9900';
        case 'Romantic': return '#e74c89';
        case 'Naughty/Adult Teasing': return '#9b59b6';
        default: return '#ffcc00';
    }
}

function getSectionBackground(section) {
    switch(section) {
        case 'Cheesy': return '#fff9e6';
        case 'Romantic': return '#fff9fa';
        case 'Naughty/Adult Teasing': return '#f9f0ff';
        default: return '#fff9e6';
    }
}

function checkRiddleAnswer(selectedIndex) {
    const riddle = riddles[currentRiddle];
    const buttons = document.querySelectorAll('.option-btn');
    
    buttons.forEach(btn => {
        btn.style.pointerEvents = 'none';
    });
    
    buttons.forEach((btn, index) => {
        if (riddle.correct.includes(index)) {
            btn.classList.add('correct');
        } else if (index === selectedIndex && !riddle.correct.includes(index)) {
            btn.classList.add('wrong');
        }
    });
    
    if (riddle.correct.includes(selectedIndex)) {
        riddleScore++;
        const percent = (riddleScore / riddles.length) * 100;
        updateLoveBar('love-fill-3', 'love-percent-3', percent);
        
        setTimeout(() => {
            currentRiddle++;
            showRiddle();
        }, 1500);
    } else {
        setTimeout(() => {
            buttons.forEach(btn => {
                btn.classList.remove('wrong');
                btn.style.pointerEvents = 'auto';
            });
            
            buttons.forEach((btn, index) => {
                if (riddle.correct.includes(index)) {
                    btn.classList.add('correct');
                }
            });
        }, 2000);
    }
}

function showHint() {
    const riddle = riddles[currentRiddle];
    const hintBtn = document.getElementById('hint-btn');
    
    if (hintBtn && riddle) {
        hintBtn.innerHTML = `Hint: ${riddle.hint} <i class="fas fa-lightbulb"></i>`;
        hintBtn.style.pointerEvents = 'none';
        
        setTimeout(() => {
            hintBtn.innerHTML = `Need a hint? <i class="fas fa-lightbulb"></i>`;
            hintBtn.style.pointerEvents = 'auto';
        }, 5000);
    }
}

// ======================
// GAME 4: LOVE STORY MATCH
// ======================

function initializeMatchGame() {
    console.log("Initializing Love Match Game...");
    
    matchGameState = {
        selectedQuestion: null,
        completedPairs: [],
        wrongAttempts: {},
        shuffledAnswers: []
    };
    
    const answers = loveStoryMatchData.map(item => item.answer);
    matchGameState.shuffledAnswers = shuffleArray([...answers]);
    
    renderQuestions();
    renderAnswers();
    updateProgress();
    clearQuestionDisplay();
    hideHint();
    
    document.getElementById('match-next-btn').style.display = 'none';
}

function renderQuestions() {
    const container = document.getElementById('question-items');
    container.innerHTML = '';
    
    loveStoryMatchData.forEach(item => {
        const questionItem = document.createElement('div');
        questionItem.className = 'match-item question-item';
        
        if (matchGameState.completedPairs.includes(item.id)) {
            questionItem.classList.add('completed');
        }
        
        questionItem.dataset.id = item.id;
        questionItem.onclick = () => selectQuestion(item.id);
        
        questionItem.innerHTML = `
            <div class="question-number">${item.id}</div>
            <div class="question-text">
                ${matchGameState.completedPairs.includes(item.id) ? '✓ Matched!' : 'Click to select'}
            </div>
        `;
        
        container.appendChild(questionItem);
    });
}

function renderAnswers() {
    const container = document.getElementById('answer-items');
    container.innerHTML = '';
    
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    
    matchGameState.shuffledAnswers.forEach((answer, index) => {
        const answerItem = document.createElement('div');
        answerItem.className = 'match-item answer-item';
        answerItem.dataset.index = index;
        answerItem.onclick = () => selectAnswer(index);
        
        const completedItem = loveStoryMatchData.find(item => 
            matchGameState.completedPairs.includes(item.id) && 
            matchGameState.shuffledAnswers[index] === item.answer
        );
        
        if (completedItem) {
            answerItem.classList.add('completed');
        }
        
        answerItem.innerHTML = `
            <div class="answer-letter">${letters[index]}</div>
            <div class="answer-text">${answer}</div>
        `;
        
        container.appendChild(answerItem);
    });
}

function selectQuestion(questionId) {
    if (matchGameState.completedPairs.includes(questionId)) return;
    
    matchGameState.selectedQuestion = questionId;
    
    document.querySelectorAll('.question-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    const selectedItem = document.querySelector(`.question-item[data-id="${questionId}"]`);
    if (selectedItem) {
        selectedItem.classList.add('selected');
    }
    
    const questionData = loveStoryMatchData.find(item => item.id === questionId);
    if (questionData) {
        document.getElementById('current-question-text').textContent = questionData.question;
        document.querySelector('.question-icon').textContent = '💭';
        document.getElementById('question-hint').textContent = '';
        
        const pictureElement = document.getElementById('memory-picture');
        const placeholderElement = document.getElementById('picture-placeholder');
        const captionElement = document.getElementById('picture-caption');
        
        if (questionData.image) {
            pictureElement.src = questionData.image;
            pictureElement.classList.add('active');
            placeholderElement.style.display = 'none';
            captionElement.textContent = "This beautiful memory 💖";
            captionElement.classList.add('active');
        } else {
            pictureElement.classList.remove('active');
            placeholderElement.style.display = 'flex';
            captionElement.textContent = "No picture available for this memory";
            captionElement.classList.add('active');
        }
    }
    
    document.querySelectorAll('.answer-item.wrong').forEach(item => {
        item.classList.remove('wrong');
    });
}

function selectAnswer(answerIndex) {
    if (!matchGameState.selectedQuestion) {
        showHint("First select a question number from the left!");
        return;
    }
    
    const questionId = matchGameState.selectedQuestion;
    const questionData = loveStoryMatchData.find(item => item.id === questionId);
    const selectedAnswer = matchGameState.shuffledAnswers[answerIndex];
    
    const answerItems = document.querySelectorAll('.answer-item');
    const selectedAnswerItem = answerItems[answerIndex];
    
    if (questionData.answer === selectedAnswer) {
        if (!matchGameState.completedPairs.includes(questionId)) {
            matchGameState.completedPairs.push(questionId);
        }
        
        updateQuestionItem(questionId, 'completed');
        updateAnswerItem(answerIndex, 'completed');
        
        showRomanticReveal(questionData.reveal, '💖');
        updateProgress();
        
        matchGameState.selectedQuestion = null;
        clearQuestionDisplay();
        
        document.querySelectorAll('.question-item.selected').forEach(item => {
            item.classList.remove('selected');
        });
        
        if (matchGameState.completedPairs.length === loveStoryMatchData.length) {
            setTimeout(() => {
                document.getElementById('match-next-btn').style.display = 'inline-block';
                showRomanticReveal("🎉 Perfect! You've matched all our beautiful memories! Our love story is now complete... ❤️", '💖');
            }, 1000);
        }
        
    } else {
        selectedAnswerItem.classList.add('wrong');
        
        if (!matchGameState.wrongAttempts[questionId]) {
            matchGameState.wrongAttempts[questionId] = 0;
        }
        matchGameState.wrongAttempts[questionId]++;
        
        if (matchGameState.wrongAttempts[questionId] >= 2) {
            showHint(questionData.hint);
        }
        
        document.getElementById('question-hint').textContent = "Not quite right! Try another answer.";
        document.getElementById('question-hint').style.color = "#ff6b6b";
        
        setTimeout(() => {
            selectedAnswerItem.classList.remove('wrong');
        }, 1000);
    }
}

function showRomanticReveal(message, icon) {
    const popup = document.getElementById('romantic-reveal-popup');
    const messageElement = document.getElementById('reveal-message');
    const iconElement = document.getElementById('reveal-icon');
    
    messageElement.textContent = message;
    iconElement.textContent = icon || '💖';
    popup.classList.add('active');
    
    setTimeout(() => {
        if (popup.classList.contains('active')) {
            closeReveal();
        }
    }, 5000);
}

function closeReveal() {
    document.getElementById('romantic-reveal-popup').classList.remove('active');
}

function showHint(hintText) {
    const hintBox = document.getElementById('hint-box');
    const hintTextElement = document.getElementById('hint-text');
    
    hintTextElement.textContent = hintText;
    hintBox.style.display = 'flex';
    
    setTimeout(() => {
        hideHint();
    }, 8000);
}

function hideHint() {
    document.getElementById('hint-box').style.display = 'none';
}

function updateProgress() {
    const connected = matchGameState.completedPairs.length;
    const total = loveStoryMatchData.length;
    const percent = (connected / total) * 100;
    
    document.getElementById('connected-count').textContent = connected;
    updateLoveBar('love-fill-4', 'love-percent-4', percent);
}

function updateQuestionItem(questionId, state) {
    const item = document.querySelector(`.question-item[data-id="${questionId}"]`);
    if (item) {
        item.className = 'match-item question-item';
        if (state === 'completed') {
            item.classList.add('completed');
            const textElement = item.querySelector('.question-text');
            if (textElement) {
                textElement.innerHTML = '✓ Matched!';
            }
        }
    }
}

function updateAnswerItem(answerIndex, state) {
    const item = document.querySelector(`.answer-item[data-index="${answerIndex}"]`);
    if (item) {
        item.className = 'match-item answer-item';
        if (state === 'completed') {
            item.classList.add('completed');
        }
    }
}

function clearQuestionDisplay() {
    document.getElementById('current-question-text').textContent = 'Click a question number to begin';
    document.querySelector('.question-icon').textContent = '💭';
    document.getElementById('question-hint').textContent = '';
    document.getElementById('question-hint').style.color = "#888";
}

function resetMatchGame() {
    initializeMatchGame();
}

// ======================
// UTILITY FUNCTIONS
// ======================

function updateLoveBar(fillId, percentId, percent) {
    const fill = document.getElementById(fillId);
    const percentElement = document.getElementById(percentId);
    
    if (fill && percentElement) {
        fill.style.width = `${percent}%`;
        
        let currentPercent = parseInt(percentElement.textContent) || 0;
        const targetPercent = Math.round(percent);
        const step = Math.ceil(Math.abs(targetPercent - currentPercent) / 10);
        
        const animatePercent = () => {
            if (currentPercent < targetPercent) {
                currentPercent = Math.min(currentPercent + step, targetPercent);
            } else if (currentPercent > targetPercent) {
                currentPercent = Math.max(currentPercent - step, targetPercent);
            }
            
            percentElement.textContent = `${currentPercent}%`;
            
            if (currentPercent !== targetPercent) {
                requestAnimationFrame(animatePercent);
            }
        };
        
        animatePercent();
    }
}

function showToast(message) {
    const existingToast = document.querySelector('.toast-message');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(231, 76, 137, 0.9);
        color: white;
        padding: 15px 30px;
        border-radius: 50px;
        font-size: 1.2rem;
        font-weight: bold;
        z-index: 9999;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        animation: toastSlideUp 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'toastSlideDown 0.3s ease forwards';
        setTimeout(() => {
            if (toast.parentNode) toast.remove();
        }, 300);
    }, 3000);
}

if (!document.querySelector('#toastStyles')) {
    const style = document.createElement('style');
    style.id = 'toastStyles';
    style.textContent = `
        @keyframes toastSlideUp {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(100%);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
        
        @keyframes toastSlideDown {
            from {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            to {
                opacity: 0;
                transform: translateX(-50%) translateY(100%);
            }
        }
    `;
    document.head.appendChild(style);
}

// ======================
// SKIP PANEL (FIXED)
// ======================

function setupSkipPanel() {
    let clickCount = 0;
    let clickTimer;
    
    const skipTrigger = document.getElementById('skip-trigger');
    if (skipTrigger) {
        skipTrigger.onclick = function() {
            clickCount++;
            
            if (clickCount === 1) {
                clickTimer = setTimeout(() => {
                    clickCount = 0;
                }, 500);
            }
            
            if (clickCount === 3) {
                clearTimeout(clickTimer);
                clickCount = 0;
                openSkipPanel();
            }
        };
    }
    
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 's') {
            event.preventDefault();
            openSkipPanel();
        }
    });
    
    const overlay = document.getElementById('skip-overlay');
    if (overlay) {
        overlay.onclick = closeSkipPanel;
    }
}

function openSkipPanel() {
    document.getElementById('skip-overlay').classList.add('active');
    document.getElementById('skip-panel').classList.add('active');
    updateSkipPanel();
}

function closeSkipPanel() {
    document.getElementById('skip-overlay').classList.remove('active');
    document.getElementById('skip-panel').classList.remove('active');
}

function updateSkipPanel() {
    const skipPages = document.getElementById('skip-pages');
    if (!skipPages) return;
    
    skipPages.innerHTML = '';
    
    const pageNames = {
        1: "Start",
        2: "Question",
        3: "Transition 1",
        4: "Game 1: Tap Hearts",
        5: "Transition 2",
        6: "Maze Intro",
        7: "Game 2: Maze",
        8: "Transition 3",
        9: "7 Days Intro",
        10: "Day 1",
        11: "Day 2",
        12: "Day 3",
        13: "Day 4",
        14: "Day 5",
        15: "Day 6",
        16: "Day 7",
        17: "Music Player",
        18: "Transition 4",
        19: "Game 3: Riddles",
        20: "Transition 5",
        21: "Game 4: Memory",
        22: "Nostalgic Dance Video",
        23: "Final Message"
    };
    
    for (let i = 1; i <= 23; i++) {
        const btn = document.createElement('button');
        btn.className = 'skip-page-btn';
        btn.textContent = `${i}. ${pageNames[i] || `Page ${i}`}`;
        
        if (i === currentPage) {
            btn.classList.add('current');
        }
        
        btn.onclick = function() {
            goToPage(i);
            closeSkipPanel();
        };
        
        skipPages.appendChild(btn);
    }
}

// ======================
// HELPER FUNCTIONS
// ======================

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    if (!container) return;
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.cssText = `
            position: absolute;
            font-size: ${20 + Math.random() * 30}px;
            opacity: ${0.3 + Math.random() * 0.4};
            left: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 7}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            z-index: 1;
            pointer-events: none;
        `;
        container.appendChild(heart);
    }
    
    if (!document.querySelector('#floatingHeartsStyle')) {
        const style = document.createElement('style');
        style.id = 'floatingHeartsStyle';
        style.textContent = `
            @keyframes float {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 0.7;
                }
                90% {
                    opacity: 0.7;
                }
                100% {
                    transform: translateY(-100px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ======================
// INITIALIZATION
// ======================

document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ Valentine Website Loaded!");
    
    setupSkipPanel();
    
    window.goToPage = goToPage;
    window.funnyNo = funnyNo;
    window.resetMaze = resetMaze;
    window.playMusic = playMusic;
    window.pauseMusic = pauseMusic;
    window.replayMusic = replayMusic;
    window.showHint = showHint;
    window.resetMatchGame = resetMatchGame;
    window.closeReveal = closeReveal;
    window.closeSkipPanel = closeSkipPanel;
    
    createFloatingHearts();
    
    console.log("🎉 Everything ready! Enjoy the Valentine's surprise!");
});

window.onerror = function(message, source, lineno, colno, error) {
    console.error("Script Error:", message);
    return true;
};
