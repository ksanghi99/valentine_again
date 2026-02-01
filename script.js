/* ==========================================================================
   DEBUG VERSION - SIMPLE FIXES FIRST
   ========================================================================== */

console.log("🚀 Valentine Script Loading...");

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ DOM Loaded!");
    
    // ======================
    // SIMPLE PAGE NAVIGATION
    // ======================
    const pages = document.querySelectorAll('.page');
    console.log(`Found ${pages.length} pages`);
    
    // Show only page1 initially
    pages.forEach(page => {
        if (page.id === 'page1') {
            page.classList.add('active');
            console.log(`Activated: ${page.id}`);
        } else {
            page.classList.remove('active');
        }
    });
    
    // ======================
    // SIMPLE BUTTON CLICKS
    // ======================
    document.addEventListener('click', function(e) {
        // Check if it's a navigation button
        if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
            const button = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');
            const targetPage = button.getAttribute('data-target');
            
            if (targetPage) {
                console.log(`Button clicked! Going to: ${targetPage}`);
                navigateTo(targetPage);
            }
        }
    });
    
    // ======================
    // SIMPLE NAVIGATION FUNCTION
    // ======================
    function navigateTo(pageId) {
        console.log(`Navigating to: ${pageId}`);
        
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            console.log(`✅ Successfully navigated to: ${pageId}`);
            
            // Scroll to top
            window.scrollTo(0, 0);
        } else {
            console.error(`❌ Page not found: ${pageId}`);
        }
    }
    
    // ======================
    // SIMPLE SKIP PANEL (Triple Click)
    // ======================
    let clickCount = 0;
    let clickTimer;
    
    // Create skip trigger if it doesn't exist
    if (!document.getElementById('skip-trigger')) {
        const skipTrigger = document.createElement('div');
        skipTrigger.id = 'skip-trigger';
        skipTrigger.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 50px;
            height: 50px;
            background: rgba(255, 0, 0, 0.1);
            z-index: 1000;
            cursor: pointer;
        `;
        document.body.appendChild(skipTrigger);
        console.log("✅ Created skip trigger");
    }
    
    document.getElementById('skip-trigger').onclick = function() {
        clickCount++;
        console.log(`Skip trigger clicked: ${clickCount} times`);
        
        if (clickCount === 1) {
            clickTimer = setTimeout(() => {
                clickCount = 0;
                console.log("Click timeout reset");
            }, 500);
        }
        
        if (clickCount === 3) {
            clearTimeout(clickTimer);
            clickCount = 0;
            toggleSkipPanel();
        }
    };
    
    // Create skip panel HTML if it doesn't exist
    if (!document.getElementById('skip-panel')) {
        createSkipPanelHTML();
    }
    
    function createSkipPanelHTML() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'skip-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 1999;
            display: none;
        `;
        overlay.onclick = toggleSkipPanel;
        
        // Create panel
        const panel = document.createElement('div');
        panel.id = 'skip-panel';
        panel.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            width: 80%;
            max-width: 600px;
            max-height: 70vh;
            background: white;
            border-radius: 20px;
            padding: 30px;
            z-index: 2000;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            transition: transform 0.3s;
            overflow-y: auto;
        `;
        
        panel.innerHTML = `
            <div class="skip-panel-header">
                <h2 style="color: #e74c89; margin-bottom: 10px;">Jump to Page</h2>
                <p style="color: #666;">Triple-click top-left corner to open</p>
            </div>
            <div id="skip-pages" style="margin: 20px 0;">
                <!-- Pages will be added here -->
            </div>
            <button onclick="toggleSkipPanel()" style="
                background: #e74c89;
                color: white;
                border: none;
                padding: 10px 30px;
                border-radius: 25px;
                cursor: pointer;
                font-size: 16px;
            ">Close</button>
        `;
        
        document.body.appendChild(overlay);
        document.body.appendChild(panel);
        console.log("✅ Created skip panel HTML");
    }
    
    function toggleSkipPanel() {
        const panel = document.getElementById('skip-panel');
        const overlay = document.getElementById('skip-overlay');
        
        if (panel.style.transform.includes('scale(0)')) {
            // Open panel
            panel.style.transform = 'translate(-50%, -50%) scale(1)';
            overlay.style.display = 'block';
            populateSkipPages();
            console.log("✅ Skip panel opened");
        } else {
            // Close panel
            panel.style.transform = 'translate(-50%, -50%) scale(0)';
            overlay.style.display = 'none';
            console.log("✅ Skip panel closed");
        }
    }
    
    function populateSkipPages() {
        const skipPages = document.getElementById('skip-pages');
        skipPages.innerHTML = '';
        
        // Create buttons for first 5 pages (for testing)
        for (let i = 1; i <= 5; i++) {
            const pageId = `page${i}`;
            const pageBtn = document.createElement('button');
            pageBtn.textContent = `Page ${i}`;
            pageBtn.style.cssText = `
                display: block;
                width: 100%;
                padding: 15px;
                margin: 10px 0;
                background: #f8f9fa;
                border: 2px solid #e9ecef;
                border-radius: 10px;
                cursor: pointer;
                font-size: 16px;
                transition: all 0.3s;
            `;
            pageBtn.onmouseenter = function() {
                this.style.background = '#e74c89';
                this.style.color = 'white';
                this.style.borderColor = '#e74c89';
            };
            pageBtn.onmouseleave = function() {
                this.style.background = '#f8f9fa';
                this.style.color = 'black';
                this.style.borderColor = '#e9ecef';
            };
            pageBtn.onclick = function() {
                navigateTo(pageId);
                toggleSkipPanel();
            };
            
            skipPages.appendChild(pageBtn);
        }
        
        console.log("✅ Populated skip pages");
    }
    
    // ======================
    // KEYBOARD SHORTCUT
    // ======================
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'S') {
            e.preventDefault();
            console.log("📝 Ctrl+Shift+S pressed - Opening skip panel");
            toggleSkipPanel();
        }
    });
    
    console.log("🎉 Valentine Website Ready!");
    
    // Make navigation function available globally for testing
    window.navigateTo = navigateTo;
    window.toggleSkipPanel = toggleSkipPanel;
});

// Global error handler
window.onerror = function(message, source, lineno, colno, error) {
    console.error("❌ JavaScript Error:", message, "at", source, "line", lineno);
    alert("JavaScript Error: " + message + "\nCheck console for details.");
    return true;
};

console.log("📄 Script file loaded (but not executed yet)");
