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
        correct: [0, 1], // Both A and B are correct
        hint: "It's definitely not C!"
    },
    {
        section: "Cheesy",
        question: "f we were alone right now in a room, what would we be doing?",
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
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
const memorySymbols = ['❤️', '💖', '💕', '💝', '💌', '🎁', '💑', '🎀'];

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
        case 7: // Game 2
            setupMaze();
            break;
        case 8: // Transition 3
            startAutoTransition(8, 9, 'countdown3');
            break;
        case 10: // Day 1
        case 11: // Day 2
        case 12: // Day 3
        case 13: // Day 4
        case 14: // Day 5
        case 15: // Day 6
        case 16: // Day 7
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
            setupMemoryGame();
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
        
        // Update immediately
        updateCountdown();
        
        // Then update every second
        const timer = setInterval(updateCountdown, 1000);
        
        // Store timer for cleanup
        autoTransitionTimers.push({
            timer: timer,
            timeout: setTimeout(() => {
                clearInterval(timer);
                goToPage(nextPage);
            }, seconds * 1000)
        });
    } else {
        // Fallback if countdown element not found
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
    
    // Create floating message
    const messageDiv = document.createElement('div');
    messageDiv.textContent = randomMessage;
    messageDiv.className = 'floating-message';
    
    // Add CSS for animation
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
    
    // Remove after animation
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
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
        
        // Start the game after a short delay
        setTimeout(() => {
            showNextHeart();
        }, 500);
    }
}

function showNextHeart() {
    if (heartsCollected >= totalHearts) {
        // Game completed
        setTimeout(() => {
            goToPage(5); // Auto go to transition 2
        }, 2000);
        return;
    }
    
    const container = document.getElementById('game1-container');
    if (!container) return;
    
    // Remove previous heart
    if (currentHeart) {
        currentHeart.remove();
    }
    
    // Clear any existing timer
    if (game1Timer) {
        clearTimeout(game1Timer);
    }
    
    // Create new heart
    currentHeart = document.createElement('button');
    currentHeart.className = 'floating-heart-btn';
    currentHeart.innerHTML = '❤️';
    currentHeart.title = 'Tap me!';
    
    // Random position (avoid edges)
    const containerRect = container.getBoundingClientRect();
    const maxX = containerRect.width - 85;
    const maxY = containerRect.height - 85;
    const minPadding = 20;
    
    const randomX = minPadding + Math.random() * (maxX - 2 * minPadding);
    const randomY = minPadding + Math.random() * (maxY - 2 * minPadding);
    
    currentHeart.style.left = `${randomX}px`;
    currentHeart.style.top = `${randomY}px`;
    
    // Random animation delay
    currentHeart.style.animationDelay = `${Math.random() * 2}s`;
    
    // Add click handler
    currentHeart.onclick = collectHeart;
    
    container.appendChild(currentHeart);
    
    // Auto move to new position after 4 seconds if not clicked
    game1Timer = setTimeout(() => {
        showNextHeart();
    }, 4000);
}

function collectHeart() {
    if (!currentHeart) return;
    
    heartsCollected++;
    
    // Show compliment
    showCompliment(compliments[heartsCollected - 1]);
    
    // Update UI
    updateHeartCounter();
    const percent = (heartsCollected / totalHearts) * 100;
    updateLoveBar('love-fill-1', 'love-percent-1', percent);
    
    // Animate heart collection
    currentHeart.style.animation = 'pop 0.5s ease forwards';
    
    // Remove heart after animation
    setTimeout(() => {
        if (currentHeart && currentHeart.parentNode) {
            currentHeart.remove();
            currentHeart = null;
        }
    }, 500);
    
    // Clear auto-move timer
    if (game1Timer) {
        clearTimeout(game1Timer);
        game1Timer = null;
    }
    
    // Show next heart after compliment shows
    setTimeout(() => {
        showNextHeart();
    }, 3000);
}

function showCompliment(text) {
    const complimentDisplay = document.getElementById('compliment-display');
    if (complimentDisplay) {
        complimentDisplay.innerHTML = `<i class="fas fa-heart" style="color:#e74c89; margin-right:10px;"></i> ${text}`;
        complimentDisplay.classList.add('show');
        
        // Hide after 3 seconds
        setTimeout(() => {
            complimentDisplay.classList.remove('show');
        }, 3000);
    }
}

function updateHeartCounter() {
    const counter = document.getElementById('heart-count');
    if (counter) {
        counter.textContent = heartsCollected;
        // Add animation
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
// GAME 2: MAZE
// ======================

function setupMaze() {
    playerPosition = { x: 15, y: 15 };
    mazeCompleted = false;
    
    const container = document.getElementById('maze-container');
    const player = document.getElementById('player');
    
    if (container && player) {
        // Clear previous walls
        container.querySelectorAll('.maze-wall').forEach(wall => wall.remove());
        
        // Draw maze walls
        drawMazeWalls();
        
        // Position player
        player.style.left = `${playerPosition.x}px`;
        player.style.top = `${playerPosition.y}px`;
        
        // Position end point
        const endPoint = document.getElementById('end-point');
        if (endPoint) {
            endPoint.style.left = '550px';
            endPoint.style.top = '400px';
        }
        
        // Add keyboard controls
        document.addEventListener('keydown', handleMazeKeyPress);
    }
}

function drawMazeWalls() {
    const container = document.getElementById('maze-container');
    if (!container) return;
    
    // Define walls [x, y, width, height]
    const walls = [
        // Outer walls
        [0, 0, 650, 10],      // Top
        [0, 0, 10, 500],      // Left
        [640, 0, 10, 500],    // Right
        [0, 490, 650, 10],    // Bottom
        
        // Inner maze walls
        [100, 0, 10, 150],
        [200, 50, 10, 200],
        [300, 0, 10, 180],
        [400, 100, 10, 250],
        [150, 100, 150, 10],
        [250, 200, 150, 10],
        [100, 250, 200, 10],
        [350, 300, 150, 10],
        [200, 350, 200, 10],
        [450, 150, 10, 100],
        [500, 200, 10, 150],
        [150, 400, 100, 10]
    ];
    
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
    
    // Determine movement direction
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
            return; // Ignore other keys
    }
    
    // Prevent default for game keys
    event.preventDefault();
    
    // Check collision with walls
    if (!checkMazeCollision(newX, newY)) {
        playerPosition.x = newX;
        playerPosition.y = newY;
        
        const player = document.getElementById('player');
        if (player) {
            player.style.left = `${newX}px`;
            player.style.top = `${newY}px`;
            
            // Add movement animation
            player.style.transition = 'left 0.1s linear, top 0.1s linear';
        }
        
        // Check if reached end (within 30px of end point)
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
                
                // Celebration
                player.style.animation = 'pop 0.5s ease infinite';
                setTimeout(() => {
                    player.style.animation = '';
                    alert('🎉 You found your way to my heart! ❤️');
                    setTimeout(() => {
                        goToPage(8); // Auto go to transition 3
                    }, 500);
                }, 1000);
            }
        }
    }
}

function checkMazeCollision(x, y) {
    const playerSize = 45;
    
    // Check boundaries
    if (x < 10 || x > 595 || y < 10 || y > 435) {
        return true;
    }
    
    // Check against all walls
    const walls = document.querySelectorAll('.maze-wall');
    for (const wall of walls) {
        const wallRect = wall.getBoundingClientRect();
        const containerRect = document.getElementById('maze-container').getBoundingClientRect();
        
        const wallX = wallRect.left - containerRect.left;
        const wallY = wallRect.top - containerRect.top;
        const wallWidth = wallRect.width;
        const wallHeight = wallRect.height;
        
        // Simple AABB collision detection
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
        // All riddles completed
        setTimeout(() => {
            goToPage(20); // Auto go to transition 5
        }, 1500);
        return;
    }
    
    const riddle = riddles[currentRiddle];
    document.getElementById('riddle-text').textContent = riddle.question;
    document.getElementById('riddle-number').textContent = currentRiddle + 1;
    
    // Update section indicator
    const riddleBox = document.querySelector('.riddle-box');
    if (riddleBox) {
        riddleBox.style.borderColor = getSectionColor(riddle.section);
        riddleBox.style.background = getSectionBackground(riddle.section);
    }
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    // Create option buttons
    riddle.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.setAttribute('data-option', ['A', 'B', 'C'][index]);
        button.innerHTML = option;
        button.onclick = () => checkRiddleAnswer(index);
        optionsContainer.appendChild(button);
    });
    
    // Reset hint button
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
        case 'Cheesy': return '#ff9900'; // Orange
        case 'Romantic': return '#e74c89'; // Pink
        case 'Naughty/Adult Teasing': return '#9b59b6'; // Purple
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
    
    // Disable all buttons
    buttons.forEach(btn => {
        btn.style.pointerEvents = 'none';
    });
    
    // Mark correct options (A or B)
    buttons.forEach((btn, index) => {
        if (riddle.correct.includes(index)) {
            btn.classList.add('correct');
        } else if (index === selectedIndex && !riddle.correct.includes(index)) {
            btn.classList.add('wrong');
        }
    });
    
    // Check if answer is correct (either A or B)
    if (riddle.correct.includes(selectedIndex)) {
        riddleScore++;
        
        // Update love bar
        const percent = (riddleScore / riddles.length) * 100;
        updateLoveBar('love-fill-3', 'love-percent-3', percent);
        
        // Show success and move to next riddle after delay
        setTimeout(() => {
            currentRiddle++;
            showRiddle();
        }, 1500);
    } else {
        // Wrong answer - show correct options
        setTimeout(() => {
            // Remove wrong class and re-enable buttons
            buttons.forEach(btn => {
                btn.classList.remove('wrong');
                btn.style.pointerEvents = 'auto';
            });
            
            // Keep correct options marked
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
        
        // Reset hint button after 5 seconds
        setTimeout(() => {
            hintBtn.innerHTML = `Need a hint? <i class="fas fa-lightbulb"></i>`;
            hintBtn.style.pointerEvents = 'auto';
        }, 5000);
    }
}

// ======================
// GAME 4: MEMORY GAME
// ======================

function setupMemoryGame() {
    // Create pairs
    memoryCards = [...memorySymbols, ...memorySymbols];
    
    // Shuffle
    for (let i = memoryCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [memoryCards[i], memoryCards[j]] = [memoryCards[j], memoryCards[i]];
    }
    
    flippedCards = [];
    matchedPairs = 0;
    updateLoveBar('love-fill-4', 'love-percent-4', 0);
    
    const container = document.getElementById('memory-game');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Create cards
    memoryCards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = index;
        card.dataset.symbol = symbol;
        card.textContent = '?';
        
        card.onclick = function() {
            if (flippedCards.length < 2 && 
                !card.classList.contains('flipped') && 
                !card.classList.contains('matched')) {
                flipCard(card);
            }
        };
        
        container.appendChild(card);
    });
    
    document.getElementById('memory-next-btn').style.display = 'none';
}

function flipCard(card) {
    card.classList.add('flipped');
    card.textContent = card.dataset.symbol;
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;
        
        if (card1.dataset.symbol === card2.dataset.symbol) {
            // Match found
            setTimeout(() => {
                card1.classList.add('matched');
                card2.classList.add('matched');
                flippedCards = [];
                matchedPairs++;
                
                // Update love bar
                const percent = (matchedPairs / memorySymbols.length) * 100;
                updateLoveBar('love-fill-4', 'love-percent-4', percent);
                
                // Check if game is complete
                if (matchedPairs === memorySymbols.length) {
                    document.getElementById('memory-next-btn').style.display = 'inline-block';
                }
            }, 600);
        } else {
            // No match, flip back
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.textContent = '?';
                card2.textContent = '?';
                flippedCards = [];
            }, 1000);
        }
    }
}

function resetMemoryGame() {
    setupMemoryGame();
}

// ======================
// MUSIC PLAYER
// ======================

function setupMusicPlayer() {
    console.log("Music player ready");
    // YouTube iframe handles playback
}

function playMusic() {
    const iframe = document.querySelector('iframe');
    if (iframe) {
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        showToast('🎵 Playing our song...');
    } else {
        showToast('🎵 Music playing!');
    }
}

function pauseMusic() {
    const iframe = document.querySelector('iframe');
    if (iframe) {
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        showToast('⏸️ Music paused');
    } else {
        showToast('⏸️ Music paused');
    }
}

function replayMusic() {
    const iframe = document.querySelector('iframe');
    if (iframe) {
        iframe.contentWindow.postMessage('{"event":"command","func":"seekTo","args":[0,true]}', '*');
        setTimeout(() => {
            iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        }, 100);
        showToast('🔄 Replaying our song!');
    } else {
        showToast('🔄 Replaying our song!');
    }
}

// ======================
// UTILITY FUNCTIONS
// ======================

function updateLoveBar(fillId, percentId, percent) {
    const fill = document.getElementById(fillId);
    const percentElement = document.getElementById(percentId);
    
    if (fill && percentElement) {
        // Animate the fill
        fill.style.width = `${percent}%`;
        
        // Animate the percentage text
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
    // Remove existing toast
    const existingToast = document.querySelector('.toast-message');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create new toast
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
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'toastSlideDown 0.3s ease forwards';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, 3000);
}

// Add toast animation styles
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
// SKIP PANEL
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
    
    // Keyboard shortcut (Ctrl+Shift+S)
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 's') {
            event.preventDefault();
            openSkipPanel();
        }
    });
    
    // Close when clicking overlay
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
    
    // Page names for display
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
        22: "Final Message"
    };
    
    // Create buttons for all pages
    for (let i = 1; i <= 22; i++) {
        const btn = document.createElement('button');
        btn.className = 'skip-page-btn';
        btn.textContent = `${i}. ${pageNames[i] || `Page ${i}`}`;
        
        // Mark current page
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
// INITIALIZATION
// ======================

document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ Valentine Website Loaded!");
    
    // Setup skip panel
    setupSkipPanel();
    
    // Make functions available globally
    window.goToPage = goToPage;
    window.funnyNo = funnyNo;
    window.resetMaze = resetMaze;
    window.playMusic = playMusic;
    window.pauseMusic = pauseMusic;
    window.replayMusic = replayMusic;
    window.showHint = showHint;
    window.resetMemoryGame = resetMemoryGame;
    window.closeSkipPanel = closeSkipPanel;
    
    // Add floating hearts animation
    createFloatingHearts();
    
    console.log("🎉 Everything ready! Enjoy the Valentine's surprise!");
});

function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    if (!container) return;
    
    // Create 20 floating hearts
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
    
    // Add floating animation
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

// Global error handler
window.onerror = function(message, source, lineno, colno, error) {
    console.error("Script Error:", message);
    // Don't show alerts to avoid disturbing user experience
    return true;
};
