/* ==========================================================================
   VALENTINE SURPRISE WEBSITE - COMPLETE JAVASCRIPT
   Handles all 21 pages, games, navigation, music, skip panel, and logic
   ========================================================================== */

// ======================
// GLOBAL VARIABLES & STATE
// ======================
const state = {
    currentPage: 'page1',
    completedPages: new Set(['page1']),
    heartCount: 0,
    mazeCompleted: false,
    riddles: [
        {
            question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
            answer: "echo"
        },
        {
            question: "What has keys but can't open locks?",
            answer: "piano"
        },
        {
            question: "I'm tall when I'm young and short when I'm old. What am I?",
            answer: "candle"
        },
        {
            question: "What has a heart that doesn't beat?",
            answer: "artichoke"
        },
        {
            question: "The more you take, the more you leave behind. What am I?",
            answer: "footsteps"
        }
    ],
    currentRiddle: 0,
    memoryCards: ['❤️', '🎁', '💌', '💝', '🎀', '🎊', '💖', '💕'],
    flippedCards: [],
    matchedPairs: 0,
    days: {
        1: { completed: false, unlocked: true },
        2: { completed: false, unlocked: false },
        3: { completed: false, unlocked: false },
        4: { completed: false, unlocked: false },
        5: { completed: false, unlocked: false },
        6: { completed: false, unlocked: false },
        7: { completed: false, unlocked: false }
    },
    playerPosition: { x: 10, y: 10 },
    mazeWalls: []
};

// ======================
// DOM ELEMENTS
// ======================
const elements = {
    // Page container
    pageContainer: document.getElementById('page-container'),
    
    // Skip panel elements
    skipTrigger: document.getElementById('skip-trigger'),
    skipPanel: document.getElementById('skip-panel'),
    skipOverlay: document.getElementById('skip-overlay'),
    skipPages: document.getElementById('skip-pages'),
    
    // Game elements
    heartCounter: document.querySelector('.heart-counter'),
    heartsContainer: document.getElementById('hearts-container'),
    mazeContainer: document.getElementById('maze-container'),
    player: document.getElementById('player'),
    endPoint: document.getElementById('end-point'),
    riddleContainer: document.getElementById('riddle-container'),
    riddleText: document.getElementById('riddle-text'),
    answerInput: document.getElementById('answer-input'),
    memoryGame: document.getElementById('memory-game'),
    
    // Music elements
    youtubePlayer: document.getElementById('youtube-player'),
    playBtn: document.getElementById('play-btn'),
    pauseBtn: document.getElementById('pause-btn'),
    replayBtn: document.getElementById('replay-btn'),
    
    // Day navigation
    dayNavigation: document.querySelector('.day-navigation')
};

// ======================
// PAGE NAVIGATION SYSTEM
// ======================
function navigateTo(pageId) {
    // Hide current page
    const currentPage = document.getElementById(state.currentPage);
    if (currentPage) {
        currentPage.classList.remove('active');
    }
    
    // Show new page
    const newPage = document.getElementById(pageId);
    if (newPage) {
        newPage.classList.add('active');
        state.currentPage = pageId;
        state.completedPages.add(pageId);
        
        // Update skip panel
        updateSkipPanel();
        
        // Initialize page-specific logic
        initializePage(pageId);
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
}

function initializePage(pageId) {
    switch(pageId) {
        case 'page3': // Game 1: 10 Hearts
            initializeHeartsGame();
            break;
        case 'page6': // Game 2: Maze
            initializeMaze();
            break;
        case 'page11': // Game 3: Riddles
            initializeRiddles();
            break;
        case 'page14': // Game 4: Memory Game
            initializeMemoryGame();
            break;
        case 'page16': // Music Player
            initializeMusicPlayer();
            break;
        case 'page18': // Day 1
        case 'page19': // Day 2
        case 'page20': // Day 3
        case 'page21': // Day 4
        case 'page22': // Day 5
        case 'page23': // Day 6
        case 'page24': // Day 7
            loadDayPhoto(pageId);
            break;
    }
}

// ======================
// GAME 1: 10 HEARTS
// ======================
function initializeHeartsGame() {
    state.heartCount = 0;
    updateHeartCounter();
    
    if (elements.heartsContainer) {
        elements.heartsContainer.innerHTML = '';
        
        // Create 10 hearts
        for (let i = 0; i < 10; i++) {
            const heartBtn = document.createElement('button');
            heartBtn.className = 'heart-btn';
            heartBtn.innerHTML = '🤍';
            heartBtn.style.animationDelay = `${i * 0.2}s`;
            heartBtn.onclick = () => handleHeartClick(heartBtn, i);
            
            elements.heartsContainer.appendChild(heartBtn);
        }
    }
}

function handleHeartClick(heartBtn, index) {
    if (!heartBtn.classList.contains('clicked')) {
        heartBtn.innerHTML = '❤️';
        heartBtn.classList.add('clicked');
        state.heartCount++;
        updateHeartCounter();
        
        // Add floating heart animation
        createFloatingHeart(heartBtn);
        
        // Check if all hearts are clicked
        if (state.heartCount === 10) {
            setTimeout(() => {
                alert('🎉 You collected all 10 hearts! Our love is complete!');
                navigateTo('page4');
            }, 800);
        }
    }
}

function updateHeartCounter() {
    if (elements.heartCounter) {
        elements.heartCounter.textContent = `Hearts collected: ${state.heartCount}/10 ❤️`;
    }
}

// ======================
// GAME 2: MAZE
// ======================
function initializeMaze() {
    if (!elements.mazeContainer || !elements.player || !elements.endPoint) return;
    
    state.playerPosition = { x: 10, y: 10 };
    state.mazeCompleted = false;
    
    // Clear existing walls
    document.querySelectorAll('.wall').forEach(wall => wall.remove());
    
    // Create maze walls (hardcoded for simplicity)
    const walls = [
        { x: 0, y: 0, width: 500, height: 3 }, // Top wall
        { x: 0, y: 0, width: 3, height: 400 }, // Left wall
        { x: 497, y: 0, width: 3, height: 400 }, // Right wall
        { x: 0, y: 397, width: 500, height: 3 }, // Bottom wall
        
        // Internal walls
        { x: 100, y: 0, width: 3, height: 150 },
        { x: 200, y: 100, width: 3, height: 150 },
        { x: 300, y: 50, width: 3, height: 200 },
        { x: 150, y: 200, width: 200, height: 3 },
        { x: 350, y: 150, width: 3, height: 150 },
        { x: 250, y: 300, width: 150, height: 3 },
        { x: 100, y: 250, width: 150, height: 3 }
    ];
    
    // Create wall elements
    walls.forEach(wall => {
        const wallElement = document.createElement('div');
        wallElement.className = 'wall';
        wallElement.style.left = `${wall.x}px`;
        wallElement.style.top = `${wall.y}px`;
        wallElement.style.width = `${wall.width}px`;
        wallElement.style.height = `${wall.height}px`;
        elements.mazeContainer.appendChild(wallElement);
    });
    
    // Position player at start
    elements.player.style.left = `${state.playerPosition.x}px`;
    elements.player.style.top = `${state.playerPosition.y}px`;
    
    // Position end point
    elements.endPoint.style.left = '430px';
    elements.endPoint.style.top = '340px';
    
    // Enable keyboard controls
    document.addEventListener('keydown', handleMazeKeyPress);
}

function handleMazeKeyPress(e) {
    if (state.mazeCompleted) return;
    
    const step = 15;
    let newX = state.playerPosition.x;
    let newY = state.playerPosition.y;
    
    switch(e.key) {
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
        state.playerPosition.x = newX;
        state.playerPosition.y = newY;
        elements.player.style.left = `${newX}px`;
        elements.player.style.top = `${newY}px`;
        
        // Check if reached end point
        if (checkEndPointReached(newX, newY)) {
            state.mazeCompleted = true;
            document.removeEventListener('keydown', handleMazeKeyPress);
            
            setTimeout(() => {
                alert('🎊 You found your way to my heart!');
                navigateTo('page7');
            }, 500);
        }
    }
}

function checkCollision(x, y) {
    // Simple collision detection
    // In a real implementation, you'd check against actual wall positions
    const playerSize = 30;
    
    // Check boundaries
    if (x < 0 || x > 470 || y < 0 || y > 370) {
        return true;
    }
    
    // Check internal walls (simplified)
    const walls = [
        { x: 100, y: 0, width: 3, height: 150 },
        { x: 200, y: 100, width: 3, height: 150 },
        { x: 300, y: 50, width: 3, height: 200 },
        { x: 150, y: 200, width: 200, height: 3 },
        { x: 350, y: 150, width: 3, height: 150 },
        { x: 250, y: 300, width: 150, height: 3 },
        { x: 100, y: 250, width: 150, height: 3 }
    ];
    
    return walls.some(wall => {
        return x < wall.x + wall.width &&
               x + playerSize > wall.x &&
               y < wall.y + wall.height &&
               y + playerSize > wall.y;
    });
}

function checkEndPointReached(x, y) {
    const endX = 430;
    const endY = 340;
    const endSize = 40;
    const playerSize = 30;
    
    return x < endX + endSize &&
           x + playerSize > endX &&
           y < endY + endSize &&
           y + playerSize > endY;
}

// ======================
// GAME 3: RIDDLES
// ======================
function initializeRiddles() {
    state.currentRiddle = 0;
    if (elements.riddleText && elements.answerInput) {
        elements.riddleText.textContent = state.riddles[state.currentRiddle].question;
        elements.answerInput.value = '';
        elements.answerInput.focus();
    }
}

function checkRiddleAnswer() {
    const userAnswer = elements.answerInput.value.trim().toLowerCase();
    const correctAnswer = state.riddles[state.currentRiddle].answer;
    
    if (userAnswer === correctAnswer) {
        state.currentRiddle++;
        
        if (state.currentRiddle >= state.riddles.length) {
            alert('🎯 Brilliant! You solved all the riddles!');
            navigateTo('page12');
        } else {
            elements.riddleText.textContent = state.riddles[state.currentRiddle].question;
            elements.answerInput.value = '';
            elements.answerInput.focus();
            
            // Show success feedback
            showMessage('Correct! Next riddle...', 'success');
        }
    } else {
        showMessage('Not quite right. Try again!', 'error');
        elements.answerInput.select();
    }
}

// ======================
// GAME 4: MEMORY GAME
// ======================
function initializeMemoryGame() {
    state.flippedCards = [];
    state.matchedPairs = 0;
    
    if (elements.memoryGame) {
        elements.memoryGame.innerHTML = '';
        
        // Duplicate and shuffle cards
        const cards = [...state.memoryCards, ...state.memoryCards];
        shuffleArray(cards);
        
        // Create card elements
        cards.forEach((emoji, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.dataset.index = index;
            card.dataset.emoji = emoji;
            card.innerHTML = '?';
            
            card.onclick = () => handleMemoryCardClick(card);
            elements.memoryGame.appendChild(card);
        });
    }
}

function handleMemoryCardClick(card) {
    // Ignore if already flipped or matched
    if (card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }
    
    // Ignore if two cards are already flipped
    if (state.flippedCards.length >= 2) {
        return;
    }
    
    // Flip the card
    card.classList.add('flipped');
    card.textContent = card.dataset.emoji;
    state.flippedCards.push(card);
    
    // Check for match if two cards are flipped
    if (state.flippedCards.length === 2) {
        const [card1, card2] = state.flippedCards;
        
        if (card1.dataset.emoji === card2.dataset.emoji) {
            // Match found
            card1.classList.add('matched');
            card2.classList.add('matched');
            state.flippedCards = [];
            state.matchedPairs++;
            
            // Check if game is complete
            if (state.matchedPairs === state.memoryCards.length) {
                setTimeout(() => {
                    alert('🌟 Perfect memory! Just like our love!');
                    navigateTo('page15');
                }, 500);
            }
        } else {
            // No match, flip back after delay
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.textContent = '?';
                card2.textContent = '?';
                state.flippedCards = [];
            }, 1000);
        }
    }
}

// ======================
// MUSIC PLAYER
// ======================
function initializeMusicPlayer() {
    // YouTube player will be embedded in HTML
    // These functions handle the player controls
    if (elements.playBtn) {
        elements.playBtn.onclick = playMusic;
    }
    
    if (elements.pauseBtn) {
        elements.pauseBtn.onclick = pauseMusic;
    }
    
    if (elements.replayBtn) {
        elements.replayBtn.onclick = replayMusic;
    }
    
    // Auto-play first 45 seconds if user interacts
    setTimeout(() => {
        playMusic();
        setTimeout(pauseMusic, 45000); // Stop after 45 seconds
    }, 2000);
}

function playMusic() {
    // This would control the YouTube iframe player
    // For now, we'll simulate it with console messages
    console.log('🎵 Playing: Ed Sheeran - Perfect');
    showMessage('🎶 Playing our song...', 'success');
}

function pauseMusic() {
    console.log('⏸️ Music paused');
    showMessage('Music paused', 'info');
}

function replayMusic() {
    console.log('🔄 Replaying music');
    showMessage('Replaying our song...', 'success');
    setTimeout(pauseMusic, 45000);
}

// ======================
// DAY PHOTOS & NAVIGATION
// ======================
function loadDayPhoto(pageId) {
    const dayNumber = pageId.replace('page', '');
    const photoElement = document.querySelector('.day-photo');
    
    if (photoElement) {
        // Try to load user's photo first
        const userPhoto = `assets/photos/day${dayNumber}.jpg`;
        photoElement.src = userPhoto;
        photoElement.onerror = function() {
            // Fallback to placeholder if user's photo doesn't exist
            photoElement.src = getPlaceholderPhoto(dayNumber);
            photoElement.alt = `Day ${dayNumber} - Romantic Placeholder`;
        };
        photoElement.alt = `Day ${dayNumber} - Our Special Memory`;
    }
    
    // Mark day as completed
    const dayNum = parseInt(dayNumber) - 17; // Adjust for page numbering
    if (dayNum >= 1 && dayNum <= 7) {
        state.days[dayNum].completed = true;
        if (dayNum < 7) {
            state.days[dayNum + 1].unlocked = true;
        }
        updateDayNavigation();
    }
}

function getPlaceholderPhoto(dayNumber) {
    // Return placeholder images based on day
    const placeholders = [
        'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=600&h=400&fit=crop'
    ];
    return placeholders[dayNumber - 18] || placeholders[0];
}

function updateDayNavigation() {
    if (elements.dayNavigation) {
        elements.dayNavigation.innerHTML = '';
        
        for (let day = 1; day <= 7; day++) {
            const dayBtn = document.createElement('button');
            dayBtn.className = 'day-btn';
            if (state.days[day].unlocked) {
                dayBtn.classList.add('active');
            }
            if (state.days[day].completed) {
                dayBtn.classList.add('completed');
            }
            dayBtn.textContent = day;
            dayBtn.onclick = () => navigateToDay(day);
            elements.dayNavigation.appendChild(dayBtn);
        }
    }
}

function navigateToDay(day) {
    if (state.days[day].unlocked) {
        navigateTo(`page${day + 17}`); // Adjust for page numbering
    } else {
        showMessage(`Day ${day} is still locked! Complete previous days first.`, 'error');
    }
}

// ======================
// SKIP PANEL FUNCTIONALITY
// ======================
function initializeSkipPanel() {
    // Triple-click trigger area
    let clickCount = 0;
    let clickTimer;
    
    elements.skipTrigger.onclick = () => {
        clickCount++;
        
        if (clickCount === 1) {
            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 500);
        }
        
        if (clickCount === 3) {
            clearTimeout(clickTimer);
            clickCount = 0;
            toggleSkipPanel();
        }
    };
    
    // Close panel when clicking overlay
    elements.skipOverlay.onclick = () => {
        toggleSkipPanel();
    };
    
    // Populate skip pages
    updateSkipPanel();
}

function updateSkipPanel() {
    if (!elements.skipPages) return;
    
    elements.skipPages.innerHTML = '';
    
    // Create buttons for all pages
    for (let i = 1; i <= 24; i++) {
        const pageId = `page${i}`;
        const pageBtn = document.createElement('button');
        pageBtn.className = 'skip-page-btn';
        pageBtn.textContent = getPageName(pageId);
        
        if (state.completedPages.has(pageId)) {
            pageBtn.classList.add('completed');
        }
        
        if (pageId === state.currentPage) {
            pageBtn.classList.add('current');
        }
        
        pageBtn.onclick = () => {
            navigateTo(pageId);
            toggleSkipPanel();
        };
        
        elements.skipPages.appendChild(pageBtn);
    }
}

function getPageName(pageId) {
    const pageNames = {
        'page1': 'Start',
        'page2': 'Question',
        'page3': 'Game 1: 10 Hearts',
        'page4': 'Transition 1',
        'page5': 'Game Intro',
        'page6': 'Game 2: Maze',
        'page7': 'Transition 2',
        'page8': 'Days Intro',
        'page9': 'Day 1 Intro',
        'page10': 'Transition 3',
        'page11': 'Game 3: Riddles',
        'page12': 'Transition 4',
        'page13': 'Game 4 Intro',
        'page14': 'Game 4: Memory',
        'page15': 'Transition 5',
        'page16': 'Music & Dance',
        'page17': 'Transition 6',
        'page18': 'Day 1',
        'page19': 'Day 2',
        'page20': 'Day 3',
        'page21': 'Day 4',
        'page22': 'Day 5',
        'page23': 'Day 6',
        'page24': 'Day 7 & Final'
    };
    
    return pageNames[pageId] || `Page ${pageId.replace('page', '')}`;
}

function toggleSkipPanel() {
    elements.skipPanel.classList.toggle('active');
    elements.skipOverlay.classList.toggle('active');
    
    if (elements.skipPanel.classList.contains('active')) {
        updateSkipPanel();
    }
}

// ======================
// UTILITY FUNCTIONS
// ======================
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createFloatingHeart(sourceElement) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '❤️';
    heart.style.left = `${sourceElement.offsetLeft + sourceElement.offsetWidth / 2}px`;
    heart.style.top = `${sourceElement.offsetTop}px`;
    heart.style.fontSize = `${Math.random() * 20 + 20}px`;
    heart.style.animationDuration = `${Math.random() * 2 + 3}s`;
    
    document.querySelector('.floating-hearts').appendChild(heart);
    
    // Remove after animation
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

function showMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 15px 30px;
        background: ${type === 'error' ? '#ff6b6b' : type === 'success' ? '#4cd964' : '#5dade2'};
        color: white;
        border-radius: 25px;
        z-index: 3000;
        font-weight: bold;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        animation: slideInDown 0.5s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideInDown 0.5s ease reverse';
        setTimeout(() => messageDiv.remove(), 500);
    }, 3000);
}

// ======================
// EVENT LISTENERS & INIT
// ======================
document.addEventListener('DOMContentLoaded', () => {
    console.log('💝 Valentine Surprise Website Initialized');
    
    // Initialize skip panel
    initializeSkipPanel();
    
    // Initialize day navigation
    updateDayNavigation();
    
    // Set up initial page
    navigateTo('page1');
    
    // Add keyboard shortcuts for skip panel (Ctrl+Shift+S)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'S') {
            e.preventDefault();
            toggleSkipPanel();
        }
    });
    
    // Add answer input enter key support
    if (elements.answerInput) {
        elements.answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkRiddleAnswer();
            }
        });
    }
    
    // Add touch support for maze (mobile/tablet)
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
        if (state.currentPage !== 'page6') return; // Only in maze game
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        
        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Horizontal swipe
            if (diffX > 50) {
                // Swipe right
                handleMazeKeyPress({ key: 'ArrowRight', preventDefault: () => {} });
            } else if (diffX < -50) {
                // Swipe left
                handleMazeKeyPress({ key: 'ArrowLeft', preventDefault: () => {} });
            }
        } else {
            // Vertical swipe
            if (diffY > 50) {
                // Swipe down
                handleMazeKeyPress({ key: 'ArrowDown', preventDefault: () => {} });
            } else if (diffY < -50) {
                // Swipe up
                handleMazeKeyPress({ key: 'ArrowUp', preventDefault: () => {} });
            }
        }
    });
    
    // Preload placeholder images
    preloadImages();
});

function preloadImages() {
    // Preload placeholder images for better UX
    for (let i = 1; i <= 7; i++) {
        const img = new Image();
        img.src = getPlaceholderPhoto(i + 17);
    }
}

// ======================
// GLOBAL EXPORTS (for debugging)
// ======================
window.valentineApp = {
    state,
    navigateTo,
    toggleSkipPanel,
    checkRiddleAnswer,
    playMusic,
    pauseMusic,
    replayMusic
};

console.log('💖 Valentine Surprise Website Ready! Use window.valentineApp for debugging.');
