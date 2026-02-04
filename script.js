/* ============================================
   VALENTINE SURPRISE - COMPLETE JAVASCRIPT
   UPDATED: Annoying NO button and removed Memory boxes
   ============================================ */

console.log("💝 Valentine Surprise Started!");

// ======================
// GLOBAL VARIABLES
// ======================
let currentPage = 1;
let autoTransitionTimers = [];
let noButtonInterval = null;
let noButtonPosition = { x: 50, y: 50 }; // Starting position

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

// Game 2: LOVE SCRAMBLE
let scrambleGame = {
    originalSentence: [
        "Under", "the", "moon", "I", "want", "to", "trace", "every", 
        "curve", "of", "your", "body", "with", "my", "lips", "until", 
        "you", "whisper", "my", "name", "breathlessly"
    ],
    scrambledWords: [],
    selectedWords: [],
    hintUsed: false,
    startTime: null,
    timerInterval: null
};

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
// PAGE NAVIGATION
// ======================

function goToPage(pageNumber) {
    console.log("Navigating to page", pageNumber);
    currentPage = pageNumber;
    
    // Clear all auto-transition timers
    clearAllAutoTimers();
    
    // Stop any running games
    stopGame1();
    stopScrambleTimer();
    
    // Stop NO button movement if leaving page 2
    if (pageNumber !== 2 && noButtonInterval) {
        clearInterval(noButtonInterval);
        noButtonInterval = null;
    }
    
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
        case 2: // Question page - setup annoying NO button
            setTimeout(() => {
                setupAnnoyingNoButton();
            }, 100);
            break;
        case 3: // Transition 1
            startAutoTransition(8, 4, 'countdown1');
            break;
        case 4: // Game 1
            setupGame1();
            break;
        case 5: // Transition 2
            startAutoTransition(8, 6, 'countdown2');
            break;
        case 7: // GAME 2 - LOVE SCRAMBLE
            setTimeout(() => {
                setupScrambleGame();
            }, 100);
            break;
        case 8: // Transition 3
            startAutoTransition(8, 9, 'countdown3');
            break;
        case 9: // Valentine's Week Intro
            updateDayNavigation(0);
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
// ANNOYING NO BUTTON FUNCTIONALITY
// ======================

function setupAnnoyingNoButton() {
    const noButton = document.getElementById('floating-no-btn');
    if (!noButton) return;
    
    // Reset position
    noButtonPosition = { x: 50, y: 50 };
    updateNoButtonPosition();
    
    // Set up click event
    noButton.onclick = function(event) {
        event.preventDefault();
        event.stopPropagation();
        showToast("Nice try! But you can't catch me that easily! 😜");
        moveNoButtonAway();
        return false;
    };
    
    // Start moving the button randomly
    if (noButtonInterval) {
        clearInterval(noButtonInterval);
    }
    
    noButtonInterval = setInterval(() => {
        moveNoButtonRandomly();
    }, 1500); // Move every 1.5 seconds
    
    // Also move on mouse hover
    noButton.addEventListener('mouseenter', function() {
        moveNoButtonAway();
    });
}

function moveNoButtonRandomly() {
    // Generate random position (within bounds)
    const newX = 20 + Math.random() * 60; // 20% to 80%
    const newY = 20 + Math.random() * 60; // 20% to 80%
    
    noButtonPosition = { x: newX, y: newY };
    updateNoButtonPosition();
}

function moveNoButtonAway() {
    // Move button away from current position
    const directionX = Math.random() > 0.5 ? 1 : -1;
    const directionY = Math.random() > 0.5 ? 1 : -1;
    
    const newX = Math.max(10, Math.min(90, noButtonPosition.x + (directionX * 30)));
    const newY = Math.max(10, Math.min(90, noButtonPosition.y + (directionY * 30)));
    
    noButtonPosition = { x: newX, y: newY };
    updateNoButtonPosition();
}

function updateNoButtonPosition() {
    const noButton = document.getElementById('floating-no-btn');
    if (noButton) {
        noButton.style.position = 'absolute';
        noButton.style.left = `${noButtonPosition.x}%`;
        noButton.style.top = `${noButtonPosition.y}%`;
        noButton.style.transform = 'translate(-50%, -50%)';
        noButton.style.transition = 'left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        noButton.style.zIndex = '1000';
        noButton.style.cursor = 'pointer';
    }
}

// ======================
// GAME 2: LOVE SCRAMBLE
// ======================

function setupScrambleGame() {
    console.log("🔤 Setting up Love Scramble Game...");
    
    // Reset game state
    scrambleGame.selectedWords = [];
    scrambleGame.hintUsed = false;
    scrambleGame.startTime = new Date();
    
    // Create shuffled copy of words
    scrambleGame.scrambledWords = [...scrambleGame.originalSentence];
    shuffleArray(scrambleGame.scrambledWords);
    
    // Clear previous display
    const scrambleArea = document.getElementById('scramble-area');
    const sentenceArea = document.getElementById('sentence-area');
    
    if (scrambleArea && sentenceArea) {
        scrambleArea.innerHTML = '';
        sentenceArea.innerHTML = '<p id="empty-message">Click words below to build the sentence...</p>';
        
        // Create word tiles
        scrambleGame.scrambledWords.forEach((word, index) => {
            const wordTile = document.createElement('div');
            wordTile.className = 'word-tile';
            wordTile.textContent = word;
            wordTile.dataset.index = index;
            wordTile.onclick = () => selectWord(word, index);
            scrambleArea.appendChild(wordTile);
        });
        
        // Update stats
        updateScrambleStats();
        
        // Start timer
        startScrambleTimer();
        
        // Reset success message
        const successMsg = document.getElementById('success-message');
        if (successMsg) successMsg.style.display = 'none';
        
        // Enable buttons
        const hintBtn = document.getElementById('hint-btn');
        const checkBtn = document.getElementById('check-btn');
        if (hintBtn) hintBtn.disabled = false;
        if (checkBtn) checkBtn.disabled = false;
        
        console.log("✅ Love Scramble ready! 20 words to arrange.");
    }
}

function selectWord(word, originalIndex) {
    // Check if word is already used
    const wordTile = document.querySelector(`.word-tile[data-index="${originalIndex}"]`);
    if (wordTile.classList.contains('used')) {
        return; // Word already used
    }
    
    // Add to selected words
    scrambleGame.selectedWords.push(word);
    
    // Mark word as used
    wordTile.classList.add('used');
    wordTile.classList.remove('selected');
    
    // Update sentence area
    const sentenceArea = document.getElementById('sentence-area');
    const emptyMessage = document.getElementById('empty-message');
    
    if (emptyMessage) emptyMessage.remove();
    
    const sentenceWord = document.createElement('div');
    sentenceWord.className = 'sentence-word';
    sentenceWord.textContent = word;
    sentenceWord.style.animation = 'wordAppear 0.5s ease';
    sentenceArea.appendChild(sentenceWord);
    
    // Update stats
    updateScrambleStats();
    
    // Scroll to show new word
    sentenceWord.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function updateScrambleStats() {
    const placedCount = document.getElementById('placed-count');
    const wordCount = document.getElementById('word-count');
    const hintStatus = document.getElementById('hint-status');
    const progress = (scrambleGame.selectedWords.length / scrambleGame.originalSentence.length) * 100;
    
    if (placedCount) placedCount.textContent = scrambleGame.selectedWords.length;
    if (wordCount) wordCount.textContent = `${scrambleGame.selectedWords.length}/20`;
    if (hintStatus) hintStatus.textContent = scrambleGame.hintUsed ? '❌ Used' : '🌙 Available';
    
    // Update progress bar
    updateLoveBar('love-fill-2', 'love-percent-2', progress);
}

function startScrambleTimer() {
    stopScrambleTimer();
    
    scrambleGame.timerInterval = setInterval(() => {
        const now = new Date();
        const elapsed = Math.floor((now - scrambleGame.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        
        const timerElement = document.getElementById('scramble-timer');
        if (timerElement) {
            timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }, 1000);
}

function stopScrambleTimer() {
    if (scrambleGame.timerInterval) {
        clearInterval(scrambleGame.timerInterval);
        scrambleGame.timerInterval = null;
    }
}

function useHint() {
    if (scrambleGame.hintUsed) {
        showToast("You've already used your moonlight hint! 🌙");
        return;
    }
    
    scrambleGame.hintUsed = true;
    
    // Show first 3 words in correct order
    const hintWords = scrambleGame.originalSentence.slice(0, 3);
    showToast(`Moonlight hint: Start with "${hintWords.join(' ')}..." 🌙`);
    
    // Update hint status
    updateScrambleStats();
    
    // Disable hint button
    const hintBtn = document.getElementById('hint-btn');
    if (hintBtn) {
        hintBtn.disabled = true;
        hintBtn.innerHTML = '<i class="fas fa-moon"></i> Hint Used';
    }
}

function checkScramble() {
    // Check if all words are placed
    if (scrambleGame.selectedWords.length !== scrambleGame.originalSentence.length) {
        showToast(`Place all ${scrambleGame.originalSentence.length} words first! ❤️`);
        return;
    }
    
    // Check if sentence is correct
    const isCorrect = scrambleGame.selectedWords.join(' ') === scrambleGame.originalSentence.join(' ');
    
    if (isCorrect) {
        // SUCCESS!
        stopScrambleTimer();
        
        // Calculate time taken
        const endTime = new Date();
        const timeTaken = Math.floor((endTime - scrambleGame.startTime) / 1000);
        const minutes = Math.floor(timeTaken / 60);
        const seconds = timeTaken % 60;
        
        // Show success message
        const successMsg = document.getElementById('success-message');
        const revealedSentence = document.getElementById('revealed-sentence');
        
        if (successMsg && revealedSentence) {
            revealedSentence.innerHTML = `
                <div style="font-size: 1.5rem; color: #e74c89; font-style: italic; margin: 20px 0; padding: 20px; background: rgba(255, 255, 255, 0.9); border-radius: 15px; border: 2px solid #ffccd5;">
                    "${scrambleGame.originalSentence.join(' ')}"
                </div>
                <p>You decoded my desire in ${minutes}:${seconds.toString().padStart(2, '0')}! 🎯</p>
                <p style="font-style: italic; color: #666;">That's exactly what I dream about under the moonlight...</p>
            `;
            successMsg.style.display = 'block';
            
            // Scroll to success message
            setTimeout(() => {
                successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
        }
        
        // Disable game buttons
        const hintBtn = document.getElementById('hint-btn');
        const checkBtn = document.getElementById('check-btn');
        if (hintBtn) hintBtn.disabled = true;
        if (checkBtn) checkBtn.disabled = true;
        
        // Add success animation
        document.querySelector('.page-content').classList.add('success-flash');
        setTimeout(() => {
            document.querySelector('.page-content').classList.remove('success-flash');
        }, 500);
        
        console.log("✅ Love Scramble completed successfully!");
        
    } else {
        // WRONG - gentle feedback
        showToast("Not quite right... Try rearranging the words! 💭");
        
        // Shake the sentence area
        const sentenceArea = document.getElementById('sentence-area');
        if (sentenceArea) {
            sentenceArea.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                sentenceArea.style.animation = '';
            }, 500);
        }
    }
}

function resetScramble() {
    if (confirm("Start over? Your current progress will be lost.")) {
        setupScrambleGame();
        showToast("Scrambled words reset! Try again 🌙");
    }
}

// ======================
// GAME 1: TAP HEARTS (Unchanged)
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
// GAME 3: RIDDLES (Unchanged)
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
            goToPage(19);
        }, 1500);
        return;
    }
    
    const riddle = riddles[currentRiddle];
    document.getElementById('riddle-text').textContent = riddle.question;
    document.getElementById('riddle-number').textContent = currentRiddle + 1;
    
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
// GAME 4: LOVE STORY MATCH (Unchanged)
// ======================

function initializeMatchGame() {
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
        
        const pictureElement = document.getElementById('memory-picture');
        const placeholderElement = document.getElementById('picture-placeholder');
        const captionElement = document.getElementById('picture-caption');
        
        if (questionData.image) {
            pictureElement.src = questionData.image;
            pictureElement.classList.add('active');
            placeholderElement.style.display = 'none';
            captionElement.textContent = "This beautiful memory 💖";
            captionElement.classList.add('active');
        }
    }
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
        
        if (matchGameState.completedPairs.length === loveStoryMatchData.length) {
            setTimeout(() => {
                showRomanticReveal("🎉 Perfect! You've matched all our beautiful memories! ❤️", '💖');
            }, 1000);
        }
        
    } else {
        selectedAnswerItem.classList.add('wrong');
        
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
}

function resetMatchGame() {
    initializeMatchGame();
}

// ======================
// VALENTINE'S WEEK FUNCTIONS
// ======================

function updateDayNavigation(dayNumber) {
    // Update all day buttons in the navigation
    const dayButtons = document.querySelectorAll('.day-btn');
    dayButtons.forEach((btn, index) => {
        if (index === dayNumber - 1) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
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

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
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
        6: "Love Scramble Intro",
        7: "Game 2: Love Scramble",
        8: "Transition 3",
        9: "Valentine's Week Intro",
        10: "Day 1: Rose Day",
        11: "Day 2: Propose Day",
        12: "Day 3: Chocolate Day",
        13: "Day 4: Teddy Day",
        14: "Day 5: Promise Day",
        15: "Day 6: Hug Day",
        16: "Day 7: Kiss Day",
        17: "Transition 4",
        18: "Game 3: Riddles",
        19: "Transition 5",
        20: "Game 4: Memory Match",
        22: "Final Message"
    };
    
    for (let i = 1; i <= 22; i++) {
        // Skip page 21 (removed video page)
        if (i === 21) continue;
        
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
    window.useHint = useHint;
    window.checkScramble = checkScramble;
    window.resetScramble = resetScramble;
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
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
    `;
    document.head.appendChild(style);
}

// Add message animation
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
