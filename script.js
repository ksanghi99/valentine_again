/* ============================================
   VALENTINE SURPRISE - COMPLETE FIXED VERSION
   ============================================ */

console.log("💝 Valentine Surprise Started!");

// ======================
// GLOBAL VARIABLES
// ======================
let currentPage = 1;
let autoTransitionTimer = null;

// Game 1 variables
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

// Game 2 variables
let playerPosition = { x: 10, y: 10 };
let mazeCompleted = false;
const mazeWalls = [];

// Game 3 variables
let currentRiddle = 0;
let riddleScore = 0;
const riddles = [
    {
        question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
        options: ["Wind", "Echo", "Whisper", "Silence"],
        correct: 1,
        hint: "It's what you hear in mountains"
    },
    {
        question: "What has keys but can't open locks?",
        options: ["Door", "Piano", "Keyboard", "Map"],
        correct: 1,
        hint: "You play music with it"
    },
    {
        question: "The more you take, the more you leave behind. What am I?",
        options: ["Memory", "Time", "Footsteps", "Love"],
        correct: 2,
        hint: "You make them when you walk"
    }
];

// Game 4 variables
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;

// ======================
// PAGE NAVIGATION
// ======================

function goToPage(pageNumber) {
    console.log("Going to page", pageNumber);
    currentPage = pageNumber;
    
    // Clear any auto-transition timer
    if (autoTransitionTimer) {
        clearTimeout(autoTransitionTimer);
        autoTransitionTimer = null;
    }
    
    // Stop Game 1 if active
    stopGame1();
    
    // Hide all pages
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show the target page
    const targetPage = document.getElementById('page' + pageNumber);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Initialize page
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
        case 3: // Transition 1 (auto to game 1)
            startAutoTransition(8, 4);
            break;
        case 4: // Game 1
            setupGame1();
            break;
        case 5: // Transition 2 (auto to maze intro)
            startAutoTransition(8, 6);
            break;
        case 7: // Game 2
            setupMaze();
            break;
        case 8: // Transition 3 (auto to days intro)
            startAutoTransition(8, 9);
            break;
        case 18: // Transition 4 (auto to riddles)
            startAutoTransition(8, 19);
            break;
        case 19: // Game 3
            setupRiddles();
            break;
        case 20: // Transition 5 (auto to memory game)
            startAutoTransition(8, 21);
            break;
        case 21: // Game 4
            setupMemoryGame();
            break;
        case 17: // Music
            setupMusicPlayer();
            break;
    }
}

function startAutoTransition(seconds, nextPage) {
    let countdown = seconds;
    const countdownElement = document.querySelector(`#page${currentPage} .countdown span`);
    
    if (countdownElement) {
        const timer = setInterval(() => {
            countdown--;
            countdownElement.textContent = countdown;
            
            if (countdown <= 0) {
                clearInterval(timer);
                goToPage(nextPage);
            }
        }, 1000);
        
        autoTransitionTimer = setTimeout(() => {
            clearInterval(timer);
            goToPage(nextPage);
        }, seconds * 1000);
    } else {
        autoTransitionTimer = setTimeout(() => {
            goToPage(nextPage);
        }, seconds * 1000);
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
        "Try the YES button! 😊"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    const messageDiv = document.createElement('div');
    messageDiv.textContent = randomMessage;
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(231, 76, 137, 0.9);
        color: white;
        padding: 20px 40px;
        border-radius: 50px;
        font-size: 1.5rem;
        z-index: 9999;
        animation: fadeInOut 2s ease;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 2000);
}

// ======================
// GAME 1: TAP HEARTS
// ======================

function setupGame1() {
    heartsCollected = 0;
    updateLoveBar('love-fill', 'love-percent', 0);
    updateHeartCounter();
    
    const container = document.getElementById('game1-container');
    const complimentDisplay = document.getElementById('compliment-display');
    
    if (container && complimentDisplay) {
        container.innerHTML = '';
        complimentDisplay.innerHTML = '';
        complimentDisplay.classList.remove('show');
        
        // Start the game
        showNextHeart();
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
    
    // Create new heart at random position
    currentHeart = document.createElement('button');
    currentHeart.className = 'floating-heart-btn';
    currentHeart.innerHTML = '❤️';
    currentHeart.style.animationDelay = '0s';
    
    // Random position (avoid edges)
    const containerWidth = container.clientWidth - 80;
    const containerHeight = container.clientHeight - 80;
    const randomX = Math.floor(Math.random() * containerWidth);
    const randomY = Math.floor(Math.random() * containerHeight);
    
    currentHeart.style.left = `${randomX}px`;
    currentHeart.style.top = `${randomY}px`;
    
    // Add click handler
    currentHeart.onclick = function() {
        collectHeart();
    };
    
    container.appendChild(currentHeart);
    
    // Auto move to new position after 3 seconds if not clicked
    game1Timer = setTimeout(() => {
        showNextHeart();
    }, 3000);
}

function collectHeart() {
    if (currentHeart) {
        heartsCollected++;
        
        // Show compliment
        showCompliment(compliments[heartsCollected - 1]);
        
        // Update UI
        updateHeartCounter();
        const percent = (heartsCollected / totalHearts) * 100;
        updateLoveBar('love-fill', 'love-percent', percent);
        
        // Remove current heart with animation
        currentHeart.style.animation = 'pop 0.5s ease';
        setTimeout(() => {
            if (currentHeart) {
                currentHeart.remove();
                currentHeart = null;
            }
        }, 500);
        
        // Clear auto-move timer
        if (game1Timer) {
            clearTimeout(game1Timer);
        }
        
        // Show next heart after compliment
        setTimeout(() => {
            showNextHeart();
        }, 3000);
    }
}

function showCompliment(text) {
    const complimentDisplay = document.getElementById('compliment-display');
    if (complimentDisplay) {
        complimentDisplay.innerHTML = text;
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
    playerPosition = { x: 10, y: 10 };
    mazeCompleted = false;
    
    const container = document.getElementById('maze-container');
    const player = document.getElementById('player');
    
    if (container && player) {
        // Clear previous walls
        container.querySelectorAll('.maze-wall').forEach(wall => wall.remove());
        
        // Draw maze walls
        drawMazeWalls();
        
        // Position player
        player.style.left = '10px';
        player.style.top = '10px';
        
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
        [0, 0, 600, 10],
        [0, 0, 10, 450],
        [590, 0, 10, 450],
        [0, 440, 600, 10],
        
        // Inner walls
        [100, 0, 10, 150],
        [200, 50, 10, 200],
        [300, 0, 10, 180],
        [400, 100, 10, 250],
        [150, 100, 150, 10],
        [250, 200, 150, 10],
        [100, 250, 200, 10],
        [350, 300, 150, 10],
        [200, 350, 200, 10]
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
    
    const step = 15;
    let newX = playerPosition.x;
    let newY = playerPosition.y;
    
    switch(event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            newY -= step;
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            newY += step;
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            newX -= step;
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            newX += step;
            break;
        default:
            return;
    }
    
    // Check collision with walls
    if (!checkCollision(newX, newY)) {
        playerPosition.x = newX;
        playerPosition.y = newY;
        
        const player = document.getElementById('player');
        if (player) {
            player.style.left = newX + 'px';
            player.style.top = newY + 'px';
        }
        
        // Check if reached end (550, 380)
        if (newX > 550 && newY > 380) {
            mazeCompleted = true;
            document.removeEventListener('keydown', handleMazeKeyPress);
            
            setTimeout(() => {
                alert('🎉 You found your way to my heart!');
                goToPage(8); // Auto go to transition 3
            }, 500);
        }
    }
}

function checkCollision(x, y) {
    const playerSize = 40;
    
    // Check against all walls
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

function resetMaze() {
    document.removeEventListener('keydown', handleMazeKeyPress);
    setupMaze();
}

// ======================
// GAME 3: RIDDLES
// ======================

function setupRiddles() {
    currentRiddle = 0;
    riddleScore = 0;
    updateLoveBar('riddle-love-fill', 'riddle-love-percent', 0);
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
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    // Create option buttons
    riddle.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => checkRiddleAnswer(index);
        optionsContainer.appendChild(button);
    });
    
    // Reset hint button
    const hintBtn = document.getElementById('hint-btn');
    if (hintBtn) {
        hintBtn.style.display = 'inline-block';
    }
}

function checkRiddleAnswer(selectedIndex) {
    const riddle = riddles[currentRiddle];
    const buttons = document.querySelectorAll('.option-btn');
    
    // Disable all buttons
    buttons.forEach(btn => {
        btn.style.pointerEvents = 'none';
    });
    
    // Mark correct/wrong
    buttons.forEach((btn, index) => {
        if (index === riddle.correct) {
            btn.classList.add('correct');
        } else if (index === selectedIndex && index !== riddle.correct) {
            btn.classList.add('wrong');
        }
    });
    
    if (selectedIndex === riddle.correct) {
        riddleScore++;
        
        // Update love bar
        const percent = (riddleScore / riddles.length) * 100;
        updateLoveBar('riddle-love-fill', 'riddle-love-percent', percent);
        
        // Show success and move to next riddle
        setTimeout(() => {
            currentRiddle++;
            showRiddle();
        }, 1500);
    } else {
        // Show failure and stay on same riddle
        setTimeout(() => {
            buttons.forEach(btn => {
                btn.classList.remove('correct', 'wrong');
                btn.style.pointerEvents = 'auto';
            });
        }, 1500);
    }
}

function showHint() {
    const riddle = riddles[currentRiddle];
    const hintBtn = document.getElementById('hint-btn');
    
    if (hintBtn && riddle) {
        hintBtn.innerHTML = `Hint: ${riddle.hint} <i class="fas fa-lightbulb"></i>`;
        hintBtn.style.pointerEvents = 'none';
    }
}

// ======================
// GAME 4: MEMORY GAME
// ======================

function setupMemoryGame() {
    const symbols = ['❤️', '🎁', '💌', '💝', '🎀', '🎊', '💖', '💕'];
    memoryCards = [...symbols, ...symbols]; // Duplicate for pairs
    
    // Shuffle
    for (let i = memoryCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [memoryCards[i], memoryCards[j]] = [memoryCards[j], memoryCards[i]];
    }
    
    flippedCards = [];
    matchedPairs = 0;
    updateLoveBar('memory-love-fill', 'memory-love-percent', 0);
    
    const container = document.getElementById('memory-game');
    if (!container) return;
    
    container.innerHTML = '';
    
    memoryCards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        card.textContent = '?';
        
        card.onclick = function() {
            if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
                flipCard(card);
            }
        };
        
        container.appendChild(card);
    });
    
    document.getElementById('memory-next-btn').style.display = 'none';
}

function flipCard(card) {
    card.classList.add('flipped');
    card.textContent = card.dataset.emoji;
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;
        
        if (card1.dataset.emoji === card2.dataset.emoji) {
            // Match found
            setTimeout(() => {
                card1.classList.add('matched');
                card2.classList.add('matched');
                flippedCards = [];
                matchedPairs++;
                
                // Update love bar
                const percent = (matchedPairs / 8) * 100;
                updateLoveBar('memory-love-fill', 'memory-love-percent', percent);
                
                if (matchedPairs === 8) {
                    document.getElementById('memory-next-btn').style.display = 'inline-block';
                }
            }, 500);
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
    // YouTube iframe will handle playback
}

function playMusic() {
    const iframe = document.querySelector('iframe');
    if (iframe) {
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
}

function pauseMusic() {
    const iframe = document.querySelector('iframe');
    if (iframe) {
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
}

function replayMusic() {
    const iframe = document.querySelector('iframe');
    if (iframe) {
        iframe.contentWindow.postMessage('{"event":"command","func":"seekTo","args":[0,true]}', '*');
        setTimeout(() => {
            iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        }, 100);
    }
}

// ======================
// UTILITY FUNCTIONS
// ======================

function updateLoveBar(fillId, percentId, percent) {
    const fill = document.getElementById(fillId);
    const percentElement = document.getElementById(percentId);
    
    if (fill && percentElement) {
        fill.style.width = `${percent}%`;
        percentElement.textContent = `${Math.round(percent)}%`;
    }
}

// ======================
// SKIP PANEL
// ======================

function setupSkipPanel() {
    let clickCount = 0;
    let clickTimer;
    
    document.getElementById('skip-trigger').onclick = function() {
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
    
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.shiftKey && event.key === 'S') {
            event.preventDefault();
            openSkipPanel();
        }
    });
    
    document.getElementById('skip-overlay').onclick = closeSkipPanel;
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
    
    for (let i = 1; i <= 22; i++) {
        const btn = document.createElement('button');
        btn.className = 'skip-page-btn';
        btn.textContent = getPageName(i);
        
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

function getPageName(pageNumber) {
    const names = {
        1: "Start",
        2: "Question",
        3: "Transition 1",
        4: "Tap Hearts Game",
        5: "Transition 2",
        6: "Maze Intro",
        7: "Maze Game",
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
        19: "Riddles Game",
        20: "Transition 5",
        21: "Memory Game",
        22: "Final Message"
    };
    
    return names[pageNumber] || `Page ${pageNumber}`;
}

// ======================
// INITIALIZE EVERYTHING
// ======================

document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ Website loaded!");
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
            40% { transform: translate(-50%, -50%) scale(1); }
            80% { opacity: 1; }
            100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Setup skip panel
    setupSkipPanel();
    
    // Make functions available globally
    window.goToPage = goToPage;
    window.funnyNo = funnyNo;
    window.resetMaze = resetMaze;
    window.playMusic = playMusic;
    window.pauseMusic = pauseMusic;
    window.replayMusic = replayMusic;
    window.checkRiddleAnswer = checkRiddleAnswer;
    window.showHint = showHint;
    window.resetMemoryGame = resetMemoryGame;
    window.closeSkipPanel = closeSkipPanel;
    
    console.log("🎉 Everything ready! Starting on page 1");
});

// Error handler
window.onerror = function(message) {
    console.error("Error:", message);
    return true;
};
