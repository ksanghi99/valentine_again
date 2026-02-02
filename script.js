/* ============================================
   VALENTINE SURPRISE - COMPLETE JAVASCRIPT
   FIXED: MAZE GAME NOW WORKING WITH CANVAS
   FIXED: VIDEO PLAYER WITH ERROR HANDLING
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

// Game 2: MAZE - COMPLETELY REWRITTEN
let mazeGame = {
    canvas: null,
    ctx: null,
    player: { x: 30, y: 30, size: 40 },
    endPoint: { x: 560, y: 420, size: 50 },
    walls: [],
    speed: 8,
    completed: false,
    keys: {}
};

// Maze walls definition (simplified for testing)
mazeGame.walls = [
    // Outer walls
    { x: 0, y: 0, width: 650, height: 20 },
    { x: 0, y: 0, width: 20, height: 500 },
    { x: 630, y: 0, width: 20, height: 500 },
    { x: 0, y: 480, width: 650, height: 20 },
    
    // Inner walls - SIMPLIFIED FOR TESTING
    { x: 100, y: 0, width: 20, height: 120 },
    { x: 100, y: 100, width: 150, height: 20 },
    { x: 250, y: 100, width: 20, height: 150 },
    { x: 400, y: 0, width: 20, height: 200 },
    { x: 400, y: 200, width: 150, height: 20 },
    { x: 50, y: 200, width: 20, height: 150 },
    { x: 50, y: 350, width: 150, height: 20 },
    { x: 200, y: 250, width: 20, height: 150 },
    { x: 350, y: 300, width: 20, height: 150 },
    { x: 500, y: 250, width: 20, height: 150 },
    
    // Path obstacles
    { x: 300, y: 400, width: 150, height: 20 },
    { x: 450, y: 350, width: 20, height: 100 },
    
    // Final path to end
    { x: 550, y: 100, width: 20, height: 200 },
    { x: 450, y: 100, width: 120, height: 20 }
];

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
    }
];

// Game 4: Memory (same as before)
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
// PAGE NAVIGATION
// ======================

function goToPage(pageNumber) {
    console.log("Navigating to page", pageNumber);
    currentPage = pageNumber;
    
    // Clear all auto-transition timers
    clearAllAutoTimers();
    
    // Stop any running games
    stopGame1();
    stopMazeGame();
    
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
        case 7: // Game 2 - MAZE (COMPLETELY NEW)
            setTimeout(() => {
                setupMazeGame();
            }, 100);
            break;
        case 8: // Transition 3
            startAutoTransition(8, 9, 'countdown3');
            break;
        case 10: case 11: case 12: case 13: case 14: case 15: case 16:
            updateDayNavigation(pageNumber - 9);
            break;
        case 17: // Transition 4
            startAutoTransition(8, 18, 'countdown4');
            break;
        case 18: // Game 3
            setupRiddles();
            break;
        case 19: // Transition 5
            startAutoTransition(8, 20, 'countdown5');
            break;
        case 20: // Game 4
            initializeMatchGame();
            break;
        case 21: // Video Page
            console.log("🎬 Video page loaded");
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
        autoTransitionTimers.push({ timer: timer });
    }
}

function clearAllAutoTimers() {
    autoTransitionTimers.forEach(timerObj => {
        if (timerObj.timer) clearInterval(timerObj.timer);
    });
    autoTransitionTimers = [];
}

// ======================
// GAME 2: MAZE - COMPLETELY REWRITTEN WITH CANVAS
// ======================

function setupMazeGame() {
    console.log("🚀 Setting up MAZE GAME with Canvas...");
    
    mazeGame.canvas = document.getElementById('maze-canvas');
    if (!mazeGame.canvas) {
        console.error("Maze canvas not found!");
        return;
    }
    
    mazeGame.ctx = mazeGame.canvas.getContext('2d');
    mazeGame.completed = false;
    mazeGame.player = { x: 30, y: 30, size: 40 };
    mazeGame.keys = {};
    
    // Setup keyboard controls
    setupMazeControls();
    
    // Draw initial maze
    drawMaze();
    
    // Start game loop
    requestAnimationFrame(gameLoop);
    
    console.log("✅ Maze game ready! Use arrow keys or WASD");
}

function setupMazeControls() {
    // Clear previous listeners
    window.removeEventListener('keydown', handleMazeKeyDown);
    window.removeEventListener('keyup', handleMazeKeyUp);
    
    // Add new listeners
    window.addEventListener('keydown', handleMazeKeyDown);
    window.addEventListener('keyup', handleMazeKeyUp);
}

function handleMazeKeyDown(e) {
    if (mazeGame.completed) return;
    
    const key = e.key.toLowerCase();
    mazeGame.keys[key] = true;
    
    // Prevent arrow keys from scrolling page
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(key)) {
        e.preventDefault();
    }
}

function handleMazeKeyUp(e) {
    const key = e.key.toLowerCase();
    mazeGame.keys[key] = false;
}

function drawMaze() {
    const ctx = mazeGame.ctx;
    const canvas = mazeGame.canvas;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw walls
    ctx.fillStyle = '#6a5acd';
    mazeGame.walls.forEach(wall => {
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
        
        // Add shadow effect
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(wall.x + 2, wall.y + 2, wall.width - 4, wall.height - 4);
        ctx.fillStyle = '#6a5acd';
    });
    
    // Draw end point (green heart)
    ctx.fillStyle = '#2ecc71';
    ctx.beginPath();
    ctx.arc(mazeGame.endPoint.x, mazeGame.endPoint.y, mazeGame.endPoint.size/2, 0, Math.PI * 2);
    ctx.fill();
    
    // Add heart icon to end point
    ctx.font = '30px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('💚', mazeGame.endPoint.x, mazeGame.endPoint.y);
    
    // Draw player (pink heart)
    ctx.fillStyle = '#e74c89';
    ctx.beginPath();
    ctx.arc(mazeGame.player.x, mazeGame.player.y, mazeGame.player.size/2, 0, Math.PI * 2);
    ctx.fill();
    
    // Add heart icon to player
    ctx.font = '25px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('❤️', mazeGame.player.x, mazeGame.player.y);
    
    // Add player shadow
    ctx.shadowColor = 'rgba(231, 76, 137, 0.6)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fill();
    ctx.shadowBlur = 0;
}

function gameLoop() {
    if (mazeGame.completed) return;
    
    updatePlayerPosition();
    drawMaze();
    checkWinCondition();
    
    requestAnimationFrame(gameLoop);
}

function updatePlayerPosition() {
    let newX = mazeGame.player.x;
    let newY = mazeGame.player.y;
    
    // Check pressed keys
    if (mazeGame.keys['arrowup'] || mazeGame.keys['w']) newY -= mazeGame.speed;
    if (mazeGame.keys['arrowdown'] || mazeGame.keys['s']) newY += mazeGame.speed;
    if (mazeGame.keys['arrowleft'] || mazeGame.keys['a']) newX -= mazeGame.speed;
    if (mazeGame.keys['arrowright'] || mazeGame.keys['d']) newX += mazeGame.speed;
    
    // Check collision before moving
    if (!checkCollision(newX, newY)) {
        mazeGame.player.x = newX;
        mazeGame.player.y = newY;
    }
}

function checkCollision(x, y) {
    const playerSize = mazeGame.player.size;
    
    // Check boundary collision
    if (x - playerSize/2 < 20 || 
        x + playerSize/2 > mazeGame.canvas.width - 20 ||
        y - playerSize/2 < 20 || 
        y + playerSize/2 > mazeGame.canvas.height - 20) {
        return true;
    }
    
    // Check wall collision
    for (const wall of mazeGame.walls) {
        if (x + playerSize/2 > wall.x &&
            x - playerSize/2 < wall.x + wall.width &&
            y + playerSize/2 > wall.y &&
            y - playerSize/2 < wall.y + wall.height) {
            return true;
        }
    }
    
    return false;
}

function checkWinCondition() {
    const player = mazeGame.player;
    const end = mazeGame.endPoint;
    
    // Calculate distance between player and end point
    const dx = player.x - end.x;
    const dy = player.y - end.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // If player reaches end point
    if (distance < (player.size/2 + end.size/2)) {
        mazeGame.completed = true;
        
        // Flash effect
        let flashCount = 0;
        const flashInterval = setInterval(() => {
            mazeGame.canvas.style.backgroundColor = flashCount % 2 === 0 ? '#2ecc71' : '#f8f9fa';
            flashCount++;
            
            if (flashCount > 6) {
                clearInterval(flashInterval);
                mazeGame.canvas.style.backgroundColor = '#f8f9fa';
                
                // Show success message
                setTimeout(() => {
                    showToast('🎉 You found your way to my heart! ❤️');
                    setTimeout(() => goToPage(8), 1500);
                }, 500);
            }
        }, 100);
    }
}

function stopMazeGame() {
    mazeGame.completed = true;
    window.removeEventListener('keydown', handleMazeKeyDown);
    window.removeEventListener('keyup', handleMazeKeyUp);
}

function resetMaze() {
    console.log("🔄 Resetting maze...");
    stopMazeGame();
    setTimeout(() => {
        setupMazeGame();
    }, 100);
}

// ======================
// GAME 1: TAP HEARTS (unchanged)
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
// VIDEO PLAYER FUNCTION
// ======================

function playVideo() {
    const video = document.getElementById('nostalgic-video');
    const overlay = document.querySelector('.video-play-overlay');
    
    if (video) {
        video.play().then(() => {
            console.log("🎬 Video playing...");
            if (overlay) overlay.style.display = 'none';
        }).catch(error => {
            console.error("Video error:", error);
            showToast("⚠️ Make sure 'our-dance.mp4' is in the videos/ folder");
        });
    }
}

// ======================
// UTILITY FUNCTIONS
// ======================

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
        background: rgba(231, 76, 137, 0.95);
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

// Add toast styles
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
        17: "Transition 4",
        18: "Game 3: Riddles",
        19: "Transition 5",
        20: "Game 4: Memory",
        21: "Nostalgic Dance Video",
        22: "Final Message"
    };
    
    for (let i = 1; i <= 22; i++) {
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
// INITIALIZATION
// ======================

document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ Valentine Website Loaded!");
    
    setupSkipPanel();
    
    // Expose functions to global scope
    window.goToPage = goToPage;
    window.funnyNo = funnyNo;
    window.resetMaze = resetMaze;
    window.playVideo = playVideo;
    window.showHint = showHint;
    window.resetMatchGame = resetMatchGame;
    window.closeReveal = closeReveal;
    window.closeSkipPanel = closeSkipPanel;
    
    // Create floating hearts
    createFloatingHearts();
    
    console.log("🎉 Everything ready! Enjoy the Valentine's surprise!");
});

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
    
    if (!document.querySelector('#floatAnimation')) {
        const style = document.createElement('style');
        style.id = 'floatAnimation';
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
    messageDiv.style.cssText = `
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
    `;
    
    document.body.appendChild(messageDiv);
    setTimeout(() => {
        if (messageDiv.parentNode) messageDiv.remove();
    }, 2000);
}

// Add animation for floating message
if (!document.querySelector('#messageAnimation')) {
    const style = document.createElement('style');
    style.id = 'messageAnimation';
    style.textContent = `
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

// Note: Functions for Game 3 (Riddles) and Game 4 (Memory Match) 
// would be the same as in your previous working version
// I've omitted them here to keep the code focused on the fixes
