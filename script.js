// DevChef Main Application
// This is the main controller for our recipe application

class DevChef {
    constructor() {
        this.recipes = recipes;
        this.currentFilter = 'all';
        this.timer = null;
        this.timerInterval = null;
        this.timerSeconds = 0;
        this.timerState = 'stopped'; // 'stopped', 'running', 'paused'
        this.timerDuration = 0;
        this.currentRecipe = null;
        this.timerStartTime = 0;
        this.timerPausedTime = 0;
        this.init();
    }

    init() {
        this.renderRecipes();
        this.bindEvents();
        this.addEasterEggs();
    }

    bindEvents() {
        // Navigation filtering
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setActiveFilter(e.target.dataset.filter);
                this.currentFilter = e.target.dataset.filter;
                this.renderRecipes();
            });
        });

        // Recipe modal
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal();
        });

        // Timer modal
        document.getElementById('closeTimer').addEventListener('click', () => {
            this.closeTimer();
        });

        // Timer controls
        document.getElementById('startTimer').addEventListener('click', () => {
            this.startTimer();
        });

        document.getElementById('pauseTimer').addEventListener('click', () => {
            this.pauseTimer();
        });

        document.getElementById('resetTimer').addEventListener('click', () => {
            this.resetTimer();
        });


        // AI Recipe Generator
        document.getElementById('generateRecipe').addEventListener('click', () => {
            this.generateCustomRecipe();
        });

        document.getElementById('recipeSearch').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.generateCustomRecipe();
            }
        });

        // Contact form
        document.getElementById('contactForm').addEventListener('submit', (e) => {
            this.handleContactForm(e);
        });

        // Close modals on outside click
        document.getElementById('recipeModal').addEventListener('click', (e) => {
            if (e.target.id === 'recipeModal') {
                this.closeModal();
            }
        });

        document.getElementById('timerModal').addEventListener('click', (e) => {
            if (e.target.id === 'timerModal') {
                this.closeTimer();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
                this.closeTimer();
            }
        });
    }

    setActiveFilter(filter) {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
    }

    renderRecipes() {
        const grid = document.getElementById('recipeGrid');
        const filteredRecipes = this.getFilteredRecipes();
        
        grid.innerHTML = filteredRecipes.map(recipe => this.createRecipeCard(recipe)).join('');
        
        // Add click events to recipe cards
        document.querySelectorAll('.recipe-card').forEach(card => {
            card.addEventListener('click', () => {
                const recipeId = card.dataset.recipeId;
                this.showRecipe(recipeId);
            });
        });

        // Add event listeners for favorite buttons on recipe cards
        document.querySelectorAll('[data-action="toggle-favorite-card"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const recipeId = btn.dataset.recipeId;
                this.toggleFavorite(recipeId);
            });
        });
    }

    getFilteredRecipes() {
        if (this.currentFilter === 'all') {
            return this.recipes;
        }
        return this.recipes.filter(recipe => recipe.complexity === this.currentFilter);
    }

    createRecipeCard(recipe) {
        const imageUrl = recipe.image || this.getDefaultImage(recipe);
        const imageAlt = recipe.imageAlt || `${recipe.title} recipe`;
        const fallbackImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMjEyNjJkIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIwMCAxNjYuNTY5IDE4Ni41NjkgMTgwIDE3MCAxODBDMTUzLjQzMSAxODAgMTQwIDE2Ni41NjkgMTQwIDE1MEMxNDAgMTMzLjQzMSAxNTMuNDMxIDEyMCAxNzAgMTIwQzE4Ni41NjkgMTIwIDIwMCAxMzMuNDMxIDIwMCAxNTBaIiBmaWxsPSIjNTBhNmZmIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOGI5NDllIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkZvb2QgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=';
        
        return `
            <div class="recipe-card" data-recipe-id="${recipe.id}">
                <div class="recipe-image-container">
                    <img src="${imageUrl}" alt="${imageAlt}" class="recipe-image" loading="lazy" 
                         onerror="this.src='${fallbackImage}'">
                    <div class="complexity-badge complexity-${recipe.complexity}">
                        ${recipe.complexity.toUpperCase()}
                    </div>
                    ${recipe.isCustom ? '<div class="custom-badge">AI Generated</div>' : ''}
                    ${window.userAuth && window.userAuth.getCurrentUser() ? `
                        <button class="favorite-btn" data-recipe-id="${recipe.id || recipe.title}" data-action="toggle-favorite-card">
                            ${window.userAuth.isFavorite(recipe) ? '❤️' : '🤍'}
                        </button>
                    ` : ''}
                </div>
                <div class="recipe-content">
                    <h3 class="recipe-title">${recipe.title}</h3>
                    <p class="recipe-description">${recipe.description}</p>
                    <div class="recipe-meta">
                        <div class="runtime">
                            <span>⏱️</span>
                            <span>${recipe.runtime}</span>
                        </div>
                        <div class="servings">
                            <span>👥</span>
                            <span>${recipe.servings}</span>
                        </div>
                    </div>
                    <div class="commit-message">
                        <code>${recipe.commitMessage}</code>
                    </div>
                </div>
            </div>
        `;
    }

    showRecipe(recipeId) {
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (!recipe) return;

        const modal = document.getElementById('recipeModal');
        const detail = document.getElementById('recipeDetail');
        
        detail.innerHTML = this.createRecipeDetail(recipe);
        modal.style.display = 'block';
        
        // Add event listeners for timer buttons
        document.querySelectorAll('.timer-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const time = e.target.dataset.time;
                this.showTimer(parseInt(time));
            });
        });

        // Add event listeners for user action buttons
        document.querySelectorAll('[data-action="mark-cooked"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const recipeId = e.target.closest('[data-recipe-id]').dataset.recipeId;
                this.markRecipeAsCooked(recipeId);
            });
        });

        document.querySelectorAll('[data-action="toggle-favorite"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const recipeId = e.target.closest('[data-recipe-id]').dataset.recipeId;
                this.toggleFavorite(recipeId);
            });
        });

        // Add easter egg interactions
        this.addRecipeEasterEggs(recipe);
    }

    createRecipeDetail(recipe) {
        const imageUrl = recipe.image || this.getDefaultImage(recipe);
        const imageAlt = recipe.imageAlt || `${recipe.title} recipe`;
        
        const ingredients = Object.entries(recipe.ingredients)
            .map(([name, amount]) => `
                <div class="ingredient">
                    <span class="ingredient-name">${name.replace(/_/g, ' ')}</span>
                    <span class="ingredient-amount">${amount}</span>
                </div>
            `).join('');

        const instructions = (recipe.instructions || [])
            .map((instruction, index) => {
                // Handle both object format and string array format
                if (typeof instruction === 'string') {
                    return `
                        <div class="instruction">
                            <div class="instruction-number">${index + 1}</div>
                            <div class="instruction-content">
                                <div class="instruction-title">Step ${index + 1}</div>
                                <div class="instruction-text">${instruction}</div>
                            </div>
                        </div>
                    `;
                } else if (instruction && instruction.title && instruction.content) {
                    return `
                        <div class="instruction">
                            <div class="instruction-number">${index + 1}</div>
                            <div class="instruction-content">
                                <div class="instruction-title">${instruction.title}</div>
                                <div class="instruction-text">${instruction.content}</div>
                            </div>
                        </div>
                    `;
                } else {
                    // Fallback for any other format
                    return `
                        <div class="instruction">
                            <div class="instruction-number">${index + 1}</div>
                            <div class="instruction-content">
                                <div class="instruction-title">Step ${index + 1}</div>
                                <div class="instruction-text">${instruction?.toString() || 'No instruction provided'}</div>
                            </div>
                        </div>
                    `;
                }
            }).join('');

        const tips = (recipe.tips || [])
            .map(tip => `<div class="tip">${tip?.toString() || 'No tip provided'}</div>`)
            .join('');

        const nutritionInfo = recipe.nutrition ? `
            <div class="nutrition-section">
                <h3 class="section-title">📊 Nutrition Facts</h3>
                <div class="nutrition-grid">
                    <div class="nutrition-item">
                        <span class="nutrition-value">${recipe.nutrition.calories}</span>
                        <span class="nutrition-label">Calories</span>
                    </div>
                    <div class="nutrition-item">
                        <span class="nutrition-value">${recipe.nutrition.protein}</span>
                        <span class="nutrition-label">Protein</span>
                    </div>
                    <div class="nutrition-item">
                        <span class="nutrition-value">${recipe.nutrition.carbs}</span>
                        <span class="nutrition-label">Carbs</span>
                    </div>
                    <div class="nutrition-item">
                        <span class="nutrition-value">${recipe.nutrition.fiber}</span>
                        <span class="nutrition-label">Fiber</span>
                    </div>
                </div>
                <div class="nutrition-benefits">
                    <strong>Benefits:</strong> ${recipe.nutrition.benefits}
                </div>
            </div>
        ` : '';

        const energyEffects = recipe.energy_effects ? `
            <div class="energy-effects-section">
                <h3 class="section-title">⚡ Energy Effects</h3>
                <div class="energy-effects">
                    ${recipe.energy_effects}
                </div>
            </div>
        ` : '';

        return `
            <div class="recipe-header">
                <div class="recipe-header-content">
                    <h2>${recipe.title}</h2>
                    <div class="complexity-badge complexity-${recipe.complexity}">
                        ${recipe.complexity.toUpperCase()}
                    </div>
                    ${recipe.isCustom ? '<div class="custom-badge">AI Generated</div>' : ''}
                </div>
                <div class="recipe-hero-image">
                    <img src="${imageUrl}" alt="${imageAlt}" class="recipe-detail-image">
                </div>
            </div>
            
            <p class="recipe-description-full">${recipe.description}</p>
            
            <div class="recipe-stats">
                <div class="stat">
                    <div class="stat-value">${recipe.runtime}</div>
                    <div class="stat-label">Runtime</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${recipe.servings}</div>
                    <div class="stat-label">Servings</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${recipe.instructions.length}</div>
                    <div class="stat-label">Steps</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${Object.keys(recipe.ingredients).length}</div>
                    <div class="stat-label">Ingredients</div>
                </div>
            </div>

            <div class="ingredients-section">
                <h3 class="section-title">📦 Dependencies (package.json)</h3>
                <div class="ingredients-list">
                    ${ingredients}
                </div>
            </div>

            <div class="instructions-section">
                <h3 class="section-title">⚙️ Functions & Commands</h3>
                ${instructions}
            </div>

            <div class="tips-section">
                <h3 class="section-title">🐛 Debugging Tips & Hotfixes</h3>
                ${tips}
            </div>

            ${nutritionInfo}

            ${energyEffects}

            <div class="timer-section">
                <h3 class="section-title">⏱️ Smart Cooking Timer</h3>
                <div class="timer-buttons">
                    <button class="timer-btn preset-timer" onclick="window.devChef.showTimer(${recipe.runtime ? recipe.runtime * 60 : 300}, ${JSON.stringify(recipe).replace(/"/g, '&quot;')})">
                        📱 Recipe Timer (${recipe.runtime || 5} min)
                    </button>
                    <button class="timer-btn preset-timer" onclick="window.devChef.showTimer(300)">
                        ⚡ Quick (5 min)
                    </button>
                    <button class="timer-btn preset-timer" onclick="window.devChef.showTimer(900)">
                        🍳 Standard (15 min)
                    </button>
                    <button class="timer-btn preset-timer" onclick="window.devChef.showTimer(1800)">
                        🕰️ Long (30 min)
                    </button>
                </div>
                <p class="timer-description">
                    💡 <strong>Smart Timer Features:</strong> Set custom times, get notifications, 
                    and track cooking steps with our enhanced timer system!
                </p>
            </div>

            ${window.userAuth && window.userAuth.getCurrentUser() ? `
                <div class="user-actions-section">
                    <h3 class="section-title">👨‍💻 Your Progress</h3>
                    <div class="user-action-buttons">
                        <button class="cooked-btn" data-recipe-id="${recipe.id || recipe.title}" data-action="mark-cooked">
                            <span>🍳 Mark as Cooked</span>
                        </button>
                        <button class="favorite-btn-large ${window.userAuth.isFavorite(recipe) ? 'favorited' : ''}" 
                                data-recipe-id="${recipe.id || recipe.title}" data-action="toggle-favorite">
                            <span>${window.userAuth.isFavorite(recipe) ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}</span>
                        </button>
                    </div>
                    <div class="user-stats-hint">
                        <p>📊 Track your cooking progress and view stats in your dashboard!</p>
                    </div>
                </div>
            ` : `
                <div class="login-prompt-section">
                    <h3 class="section-title">🔐 Sign In for More Features</h3>
                    <p>Create an account to:</p>
                    <ul>
                        <li>🤍 Save favorite recipes</li>
                        <li>🍳 Track cooking progress</li>
                        <li>📊 View personal cooking stats</li>
                        <li>⏰ Get personalized timer recommendations</li>
                        <li>🏆 Unlock cooking achievements</li>
                    </ul>
                    <div class="login-prompt-buttons">
                        <button class="auth-btn" onclick="window.userAuth.showLogin()">
                            <span>🔐 Sign In</span>
                        </button>
                        <button class="auth-btn register-btn" onclick="window.userAuth.showRegister()">
                            <span>🎉 Create Account</span>
                        </button>
                    </div>
                </div>
            `}

            ${recipe.easterEggs ? `
                <div class="easter-eggs-section">
                    <h3 class="section-title">🥚 Easter Eggs</h3>
                    <div class="easter-eggs">
                        ${recipe.easterEggs.map(egg => `<div class="easter-egg">${egg}</div>`).join('')}
                    </div>
                </div>
            ` : ''}
        `;
    }

    closeModal() {
        document.getElementById('recipeModal').style.display = 'none';
    }

    showTimer(seconds = null, recipe = null) {
        if (seconds) {
            this.setTimerPreset(Math.floor(seconds / 60), seconds % 60);
        }
        
        if (recipe) {
            this.currentRecipe = recipe;
            this.showRecipeTimer(recipe);
        }
        
        document.getElementById('timerModal').style.display = 'block';
        this.updateTimerDisplay();
        this.updateTimerStatus();
    }

    closeTimer() {
        document.getElementById('timerModal').style.display = 'none';
        this.stopTimer();
        this.hideRecipeTimer();
    }

    setTimerPreset(minutes, seconds = 0) {
        // Set timer to a preset value
        this.timerDuration = (minutes * 60) + seconds;
        this.timerSeconds = this.timerDuration;
        
        // Update input fields
        document.getElementById('timerMinutes').value = minutes;
        document.getElementById('timerSeconds').value = seconds;
        
        this.updateTimerDisplay();
        this.updateTimerStatus();
        this.resetProgress();
    }

    startTimer() {
        if (this.timerState === 'running') return;
        
        // Get values from inputs if not already set
        if (this.timerSeconds === 0) {
            const minutes = parseInt(document.getElementById('timerMinutes').value) || 0;
            const seconds = parseInt(document.getElementById('timerSeconds').value) || 0;
            this.timerDuration = (minutes * 60) + seconds;
            this.timerSeconds = this.timerDuration;
        }
        
        if (this.timerSeconds <= 0) {
            this.updateTimerStatus('⚠️ Please set a timer duration first!');
            return;
        }
        
        this.timerState = 'running';
        this.timerStartTime = Date.now();
        
        // Update UI
        this.updateControlButtons();
        this.updateTimerStatus('🍳 Cooking in progress...');
        
        // Start countdown
        this.timerInterval = setInterval(() => {
            if (this.timerSeconds > 0) {
                this.timerSeconds--;
                this.updateTimerDisplay();
                this.updateProgress();
            } else {
                this.timerComplete();
            }
        }, 1000);
    }

    pauseTimer() {
        if (this.timerState !== 'running') return;
        
        this.timerState = 'paused';
        this.timerPausedTime = Date.now();
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        
        this.updateControlButtons();
        this.updateTimerStatus('⏸️ Timer paused');
    }

    stopTimer() {
        this.timerState = 'stopped';
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        
        this.updateControlButtons();
        this.updateTimerStatus('⏹️ Timer stopped');
        this.resetProgress();
    }

    resetTimer() {
        this.stopTimer();
        this.timerSeconds = this.timerDuration;
        this.updateTimerDisplay();
        this.updateTimerStatus('🔄 Timer reset - Ready to cook!');
        this.resetProgress();
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timerSeconds / 60);
        const seconds = this.timerSeconds % 60;
        const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('timerDisplay').textContent = display;
    }

    updateTimerStatus(message = null) {
        const statusElement = document.getElementById('timerStatus');
        if (message) {
            statusElement.textContent = message;
        } else {
            switch (this.timerState) {
                case 'stopped':
                    statusElement.textContent = 'Ready to cook! 🍳';
                    break;
                case 'running':
                    statusElement.textContent = '🍳 Cooking in progress...';
                    break;
                case 'paused':
                    statusElement.textContent = '⏸️ Timer paused';
                    break;
            }
        }
    }

    updateControlButtons() {
        const startBtn = document.getElementById('startTimer');
        const pauseBtn = document.getElementById('pauseTimer');
        const stopBtn = document.getElementById('stopTimer');
        const resetBtn = document.getElementById('resetTimer');
        
        switch (this.timerState) {
            case 'stopped':
                startBtn.style.display = 'flex';
                pauseBtn.style.display = 'none';
                stopBtn.style.display = 'flex';
                resetBtn.style.display = 'flex';
                break;
            case 'running':
                startBtn.style.display = 'none';
                pauseBtn.style.display = 'flex';
                stopBtn.style.display = 'flex';
                resetBtn.style.display = 'flex';
                break;
            case 'paused':
                startBtn.style.display = 'flex';
                pauseBtn.style.display = 'none';
                stopBtn.style.display = 'flex';
                resetBtn.style.display = 'flex';
                break;
        }
    }

    updateProgress() {
        if (this.timerDuration === 0) return;
        
        const progressPercent = ((this.timerDuration - this.timerSeconds) / this.timerDuration) * 100;
        const progressBar = document.getElementById('timerProgress');
        if (progressBar) {
            progressBar.style.width = `${progressPercent}%`;
        }
    }

    resetProgress() {
        const progressBar = document.getElementById('timerProgress');
        if (progressBar) {
            progressBar.style.width = '0%';
        }
    }

    showRecipeTimer(recipe) {
        const recipeSection = document.getElementById('recipeTimerSection');
        const recipeTitleElement = document.getElementById('currentRecipeTitle');
        const stepsContainer = document.getElementById('recipeStepsContainer');
        
        if (recipeSection && recipeTitleElement && stepsContainer) {
            recipeTitleElement.textContent = recipe.title;
            
            // Create timer buttons for recipe steps
            let stepsHTML = '';
            if (recipe.instructions && recipe.instructions.length > 0) {
                recipe.instructions.forEach((step, index) => {
                    // Extract time mentions from instructions
                    const timeMatch = step.match(/(\d+)\s*(minutes?|mins?|seconds?|secs?)/i);
                    if (timeMatch) {
                        const time = parseInt(timeMatch[1]);
                        const unit = timeMatch[2].toLowerCase();
                        const timeInSeconds = unit.includes('min') ? time * 60 : time;
                        
                        stepsHTML += `
                            <div class="step-timer-item">
                                <span>Step ${index + 1}: ${step.substring(0, 50)}...</span>
                                <button class="step-timer-btn" onclick="window.devChef.setTimerPreset(${Math.floor(timeInSeconds / 60)}, ${timeInSeconds % 60})">
                                    ${time} ${unit}
                                </button>
                            </div>
                        `;
                    }
                });
            }
            
            stepsContainer.innerHTML = stepsHTML || '<p>No timed steps found in this recipe.</p>';
            recipeSection.style.display = 'block';
        }
    }

    hideRecipeTimer() {
        const recipeSection = document.getElementById('recipeTimerSection');
        if (recipeSection) {
            recipeSection.style.display = 'none';
        }
        this.currentRecipe = null;
    }

    timerComplete() {
        this.timerState = 'stopped';
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        
        // Visual completion feedback
        const timerDisplay = document.getElementById('timerDisplay');
        timerDisplay.textContent = '🎉 DONE!';
        timerDisplay.classList.add('timer-complete');
        
        // Update status
        this.updateTimerStatus('🎉 Cooking complete! Time to enjoy your meal!');
        
        // Update progress to 100%
        const progressBar = document.getElementById('timerProgress');
        if (progressBar) {
            progressBar.style.width = '100%';
        }
        
        // Show notification
        this.showTimerNotification();
        
        // Update control buttons
        this.updateControlButtons();
        
        // Reset after a few seconds
        setTimeout(() => {
            timerDisplay.classList.remove('timer-complete');
            if (this.timerState === 'stopped') {
                this.resetTimer();
            }
        }, 5000);
    }

    showTimerNotification() {
        // Try to show browser notification
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('🍳 DevChef Timer Complete!', {
                body: 'Your cooking timer has finished. Time to check your delicious creation!',
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🍳</text></svg>'
            });
        } else if ('Notification' in window && Notification.permission !== 'denied') {
            // Request permission for future notifications
            Notification.requestPermission();
        }
        
        // Show alert as fallback
        setTimeout(() => {
            const message = this.currentRecipe 
                ? `🎉 Timer complete for "${this.currentRecipe.title}"!\nYour delicious meal is ready to enjoy! 🍽️`
                : '🎉 Timer complete!\nYour cooking operation has finished successfully! 🍽️';
            
            alert(message);
        }, 1000);
        
        // Play sound if available
        this.playTimerSound();
    }

    playTimerSound() {
        try {
            // Create a simple beep sound using Web Audio API
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
            
            // Triple beep
            setTimeout(() => {
                const osc2 = audioContext.createOscillator();
                const gain2 = audioContext.createGain();
                osc2.connect(gain2);
                gain2.connect(audioContext.destination);
                osc2.frequency.setValueAtTime(800, audioContext.currentTime);
                osc2.type = 'sine';
                gain2.gain.setValueAtTime(0.3, audioContext.currentTime);
                gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                osc2.start(audioContext.currentTime);
                osc2.stop(audioContext.currentTime + 0.3);
            }, 600);
            
            setTimeout(() => {
                const osc3 = audioContext.createOscillator();
                const gain3 = audioContext.createGain();
                osc3.connect(gain3);
                gain3.connect(audioContext.destination);
                osc3.frequency.setValueAtTime(800, audioContext.currentTime);
                osc3.type = 'sine';
                gain3.gain.setValueAtTime(0.3, audioContext.currentTime);
                gain3.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                osc3.start(audioContext.currentTime);
                osc3.stop(audioContext.currentTime + 0.3);
            }, 1200);
            
        } catch (error) {
            console.log('Audio not available');
        }
    }

    // User interaction methods
    toggleFavorite(recipeId) {
        if (!window.userAuth || !window.userAuth.getCurrentUser()) {
            alert('🔐 Please sign in to save favorite recipes!');
            if (window.userAuth) {
                window.userAuth.showLogin();
            }
            return;
        }

        // Find the recipe
        const recipe = this.recipes.find(r => (r.id || r.title) === recipeId);
        if (!recipe) return;

        const isFavorite = window.userAuth.toggleFavorite(recipe);
        
        // Re-render recipes to update favorite buttons
        this.renderRecipes();
        
        const message = isFavorite 
            ? `❤️ Added "${recipe.title}" to your favorites!`
            : `💔 Removed "${recipe.title}" from favorites`;
        
        this.showToast(message);
        
        // Refresh the recipe detail view if it's currently open
        const modal = document.getElementById('recipeModal');
        if (modal && modal.style.display === 'block') {
            setTimeout(() => {
                this.showRecipe(recipe.id || recipe.title);
            }, 500);
        }
    }

    markRecipeAsCooked(recipeId) {
        if (!window.userAuth || !window.userAuth.getCurrentUser()) {
            alert('🔐 Please sign in to track your cooking progress!');
            if (window.userAuth) {
                window.userAuth.showLogin();
            }
            return;
        }

        // Find the recipe by ID or title
        const recipe = this.recipes.find(r => (r.id || r.title) === recipeId);
        if (!recipe) {
            this.showToast('❌ Recipe not found!');
            return;
        }

        window.userAuth.trackRecipeCooked(recipe);
        this.showToast(`🍳 Great job! You've cooked "${recipe.title}". Check your dashboard for updated stats!`);
        
        // Refresh the recipe detail view to update button states
        setTimeout(() => {
            this.showRecipe(recipe.id || recipe.title);
        }, 1000);
    }

    showToast(message) {
        // Simple toast notification - you can enhance this with a proper toast library
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--accent), var(--success));
            color: var(--bg-primary);
            padding: 1rem 1.5rem;
            border-radius: 10px;
            font-weight: 500;
            box-shadow: 0 8px 25px rgba(102, 252, 241, 0.4);
            z-index: 3000;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
            word-wrap: break-word;
        `;

        document.body.appendChild(toast);

        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    addEasterEggs() {
        // Add some fun easter eggs to the main page
        let clickCount = 0;
        document.querySelector('.logo h1').addEventListener('click', () => {
            clickCount++;
            if (clickCount === 5) {
                document.querySelector('.logo h1').classList.add('easter-egg');
                setTimeout(() => {
                    alert('🎉 You found the secret! You\'re now a certified DevChef!');
                }, 1000);
            }
        });

        // Add konami code easter egg
        let konamiCode = [];
        const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.code);
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (konamiCode.join(',') === konamiSequence.join(',')) {
                this.activateKonamiEasterEgg();
                konamiCode = [];
            }
        });
    }

    activateKonamiEasterEgg() {
        // Make all recipe cards rainbow
        document.querySelectorAll('.recipe-card').forEach(card => {
            card.classList.add('easter-egg');
        });
        
        setTimeout(() => {
            alert('🎮 Konami Code activated! All recipes are now in rainbow mode!');
        }, 500);
    }

    addRecipeEasterEggs(recipe) {
        // Add recipe-specific easter eggs
        if (recipe.id === 'hello-toast') {
            // Toast easter egg
            setTimeout(() => {
                const toast = document.createElement('div');
                toast.textContent = '🍞';
                toast.style.position = 'fixed';
                toast.style.top = '50%';
                toast.style.left = '50%';
                toast.style.transform = 'translate(-50%, -50%)';
                toast.style.fontSize = '3rem';
                toast.style.zIndex = '9999';
                toast.style.animation = 'fadeIn 0.5s ease-out';
                document.body.appendChild(toast);
                
                setTimeout(() => {
                    toast.remove();
                }, 2000);
            }, 2000);
        }
    }


    // AI Recipe Generator Methods
    async generateCustomRecipe() {
        const searchInput = document.getElementById('recipeSearch');
        const generateBtn = document.getElementById('generateRecipe');
        
        // Check if elements exist
        if (!searchInput || !generateBtn) {
            console.error('AI Recipe Generator elements not found');
            this.showToast('❌ Recipe generator is not available. Please refresh the page.');
            return;
        }

        const dietaryRestriction = document.getElementById('dietaryRestriction')?.value || 'none';
        const complexityLevel = document.getElementById('complexityLevel')?.value || 'intermediate';
        const servingSize = parseInt(document.getElementById('servingSize')?.value) || 4;

        const query = searchInput.value.trim();
        if (!query) {
            this.showToast('🔍 Please enter a food description to generate a recipe!');
            searchInput.focus();
            return;
        }

        if (query.length < 3) {
            this.showToast('📝 Please enter at least 3 characters for a better recipe!');
            searchInput.focus();
            return;
        }

        // Show loading state with better UX
        generateBtn.classList.add('loading');
        generateBtn.disabled = true;
        this.showToast('🤖 AI is cooking up your custom recipe...');

        try {
            // Simulate AI processing time with realistic delay
            await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

            // Generate custom recipe
            const customRecipe = this.createCustomRecipe(query, dietaryRestriction, complexityLevel, servingSize);
            
            // Validate generated recipe
            if (!customRecipe || !customRecipe.title) {
                throw new Error('Failed to generate recipe');
            }
            
            // Add to recipes array at the beginning
            this.recipes.unshift(customRecipe);
            
            // Refresh the display
            this.renderRecipes();
            
            // Show success message
            this.showToast(`🎉 Generated "${customRecipe.title}" successfully!`);
            
            // Show the new recipe after a brief delay
            setTimeout(() => {
                this.showRecipe(customRecipe.id);
            }, 500);
            
            // Clear search input
            searchInput.value = '';
            
        } catch (error) {
            console.error('Error generating recipe:', error);
            this.showToast('❌ Failed to generate recipe. Please try a different description!');
        } finally {
            // Hide loading state
            generateBtn.classList.remove('loading');
            generateBtn.disabled = false;
        }
    }

    createCustomRecipe(query, dietary, complexity, servings) {
        const recipeId = `custom-${Date.now()}`;
        const baseRecipe = this.getBaseRecipeTemplate(query, dietary, complexity, servings);
        
        return {
            id: recipeId,
            title: baseRecipe.title,
            description: baseRecipe.description,
            complexity: complexity,
            runtime: baseRecipe.runtime,
            servings: servings,
            commitMessage: baseRecipe.commitMessage,
            nutrition: baseRecipe.nutrition,
            ingredients: baseRecipe.ingredients,
            instructions: baseRecipe.instructions,
            tips: baseRecipe.tips,
            energy_effects: baseRecipe.energy_effects,
            image: baseRecipe.image,
            imageAlt: baseRecipe.imageAlt,
            isCustom: true
        };
    }

    getBaseRecipeTemplate(query, dietary, complexity, servings) {
        // AI-powered recipe generation based on query
        const foodType = this.analyzeFoodType(query);
        const cookingMethod = this.determineCookingMethod(query);
        const mainIngredients = this.extractMainIngredients(query);
        
        return {
            title: this.generateRecipeTitle(query, foodType),
            description: this.generateDescription(query, dietary, complexity),
            runtime: this.calculateRuntime(complexity, cookingMethod),
            commitMessage: this.generateCommitMessage(query, complexity),
            nutrition: this.calculateNutrition(mainIngredients, servings, dietary),
            ingredients: this.generateIngredients(mainIngredients, servings, dietary),
            instructions: this.generateInstructions(mainIngredients, cookingMethod, complexity),
            tips: this.generateTips(dietary, complexity, cookingMethod),
            energy_effects: this.generateEnergyEffects(foodType, mainIngredients),
            image: this.getDefaultImage({ title: query }),
            imageAlt: `${query} recipe`
        };
    }

    analyzeFoodType(query) {
        const lowerQuery = query.toLowerCase();
        if (lowerQuery.includes('soup') || lowerQuery.includes('stew')) return 'soup';
        if (lowerQuery.includes('salad')) return 'salad';
        if (lowerQuery.includes('pasta') || lowerQuery.includes('noodle')) return 'pasta';
        if (lowerQuery.includes('rice') || lowerQuery.includes('grain')) return 'grain';
        if (lowerQuery.includes('meat') || lowerQuery.includes('chicken') || lowerQuery.includes('beef')) return 'protein';
        if (lowerQuery.includes('cake') || lowerQuery.includes('dessert') || lowerQuery.includes('sweet')) return 'dessert';
        if (lowerQuery.includes('smoothie') || lowerQuery.includes('drink')) return 'beverage';
        return 'main';
    }

    determineCookingMethod(query) {
        const lowerQuery = query.toLowerCase();
        if (lowerQuery.includes('stir') || lowerQuery.includes('fry')) return 'stir-fry';
        if (lowerQuery.includes('bake') || lowerQuery.includes('oven')) return 'baking';
        if (lowerQuery.includes('grill') || lowerQuery.includes('bbq')) return 'grilling';
        if (lowerQuery.includes('boil') || lowerQuery.includes('simmer')) return 'boiling';
        if (lowerQuery.includes('roast')) return 'roasting';
        if (lowerQuery.includes('steam')) return 'steaming';
        return 'pan-cooking';
    }

    extractMainIngredients(query) {
        const lowerQuery = query.toLowerCase().trim();
        const ingredients = [];
        
        // Comprehensive ingredient detection - much more extensive
        const ingredientMap = {
            // Proteins
            'chicken': 'chicken breast',
            'beef': 'ground beef',
            'pork': 'pork tenderloin',
            'fish': 'white fish fillet',
            'salmon': 'salmon fillet',
            'shrimp': 'large shrimp',
            'tofu': 'firm tofu',
            'egg': 'large eggs',
            'eggs': 'large eggs',
            'turkey': 'ground turkey',
            'lamb': 'lamb chops',
            'duck': 'duck breast',
            
            // Grains & Starches
            'rice': 'jasmine rice',
            'pasta': 'whole wheat pasta',
            'noodle': 'rice noodles',
            'noodles': 'rice noodles',
            'bread': 'whole grain bread',
            'quinoa': 'quinoa',
            'oats': 'rolled oats',
            'oatmeal': 'rolled oats',
            'barley': 'pearl barley',
            'couscous': 'couscous',
            'bulgur': 'bulgur wheat',
            'potato': 'potatoes',
            'potatoes': 'potatoes',
            'sweet potato': 'sweet potatoes',
            'sweet potatoes': 'sweet potatoes',
            
            // Legumes & Beans
            'beans': 'black beans',
            'black beans': 'black beans',
            'kidney beans': 'kidney beans',
            'chickpeas': 'chickpeas',
            'lentils': 'red lentils',
            'lentil': 'red lentils',
            'peas': 'green peas',
            'edamame': 'edamame',
            'hummus': 'chickpeas',
            
            // Vegetables
            'broccoli': 'broccoli florets',
            'carrot': 'carrots',
            'carrots': 'carrots',
            'onion': 'yellow onion',
            'onions': 'yellow onion',
            'garlic': 'garlic cloves',
            'tomato': 'cherry tomatoes',
            'tomatoes': 'cherry tomatoes',
            'spinach': 'fresh spinach',
            'kale': 'kale leaves',
            'lettuce': 'romaine lettuce',
            'cucumber': 'cucumber',
            'bell pepper': 'bell peppers',
            'peppers': 'bell peppers',
            'mushroom': 'button mushrooms',
            'mushrooms': 'button mushrooms',
            'zucchini': 'zucchini',
            'eggplant': 'eggplant',
            'cabbage': 'green cabbage',
            'cauliflower': 'cauliflower florets',
            'asparagus': 'asparagus spears',
            'corn': 'sweet corn',
            'avocado': 'avocado',
            'squash': 'butternut squash',
            
            // Fruits
            'apple': 'apples',
            'apples': 'apples',
            'banana': 'bananas',
            'bananas': 'bananas',
            'orange': 'oranges',
            'oranges': 'oranges',
            'lemon': 'lemons',
            'lemons': 'lemons',
            'lime': 'limes',
            'limes': 'limes',
            'berry': 'mixed berries',
            'berries': 'mixed berries',
            'strawberry': 'strawberries',
            'strawberries': 'strawberries',
            'blueberry': 'blueberries',
            'blueberries': 'blueberries',
            'grape': 'grapes',
            'grapes': 'grapes',
            'mango': 'mango',
            'pineapple': 'pineapple',
            'peach': 'peaches',
            'peaches': 'peaches',
            
            // Dairy & Alternatives
            'cheese': 'cheddar cheese',
            'milk': 'almond milk',
            'yogurt': 'Greek yogurt',
            'butter': 'unsalted butter',
            'cream': 'heavy cream',
            'sour cream': 'sour cream',
            
            // Nuts & Seeds
            'almond': 'almonds',
            'almonds': 'almonds',
            'walnut': 'walnuts',
            'walnuts': 'walnuts',
            'cashew': 'cashews',
            'cashews': 'cashews',
            'peanut': 'peanuts',
            'peanuts': 'peanuts',
            'seed': 'mixed seeds',
            'seeds': 'mixed seeds',
            'chia': 'chia seeds',
            'flax': 'flax seeds',
            'sesame': 'sesame seeds',
            'sunflower': 'sunflower seeds',
            
            // Pantry Staples
            'flour': 'all-purpose flour',
            'sugar': 'coconut sugar',
            'honey': 'raw honey',
            'oil': 'olive oil',
            'vinegar': 'balsamic vinegar',
            'soy sauce': 'soy sauce',
            'mustard': 'Dijon mustard',
            'ketchup': 'ketchup',
            'mayo': 'mayonnaise',
            'mayonnaise': 'mayonnaise',
            
            // Spices & Herbs
            'salt': 'sea salt',
            'pepper': 'black pepper',
            'garlic powder': 'garlic powder',
            'onion powder': 'onion powder',
            'paprika': 'paprika',
            'cumin': 'ground cumin',
            'oregano': 'dried oregano',
            'basil': 'fresh basil',
            'thyme': 'fresh thyme',
            'rosemary': 'fresh rosemary',
            'cilantro': 'fresh cilantro',
            'parsley': 'fresh parsley',
            'ginger': 'fresh ginger',
            'cinnamon': 'ground cinnamon',
            'nutmeg': 'ground nutmeg',
            'vanilla': 'vanilla extract',
            
            // Chocolate & Sweets
            'chocolate': 'dark chocolate',
            'cocoa': 'cocoa powder',
            'coconut': 'shredded coconut',
            'dates': 'medjool dates',
            'maple syrup': 'pure maple syrup',
            
            // Nigerian/Yoruba Cuisine
            'jollof': 'parboiled rice',
            'jollof rice': 'parboiled rice',
            'efo riro': 'fresh spinach',
            'efo': 'fresh spinach',
            'riro': 'fresh spinach',
            'suya': 'beef strips',
            'yam': 'fresh yam',
            'plantain': 'ripe plantains',
            'plantains': 'ripe plantains',
            'palm oil': 'palm oil',
            'scotch bonnet': 'scotch bonnet peppers',
            'scotch bonnets': 'scotch bonnet peppers',
            'locust beans': 'locust beans',
            'iru': 'locust beans',
            'crayfish': 'ground crayfish',
            'egusi': 'melon seeds',
            'ogbono': 'ogbono seeds',
            'bitter leaf': 'bitter leaf',
            'uziza': 'uziza leaves',
            'stockfish': 'stockfish',
            'dried fish': 'dried fish',
            'ponmo': 'cow skin',
            'chin chin': 'all-purpose flour',
            'puff puff': 'all-purpose flour',
            'akara': 'black-eyed peas',
            'moi moi': 'black-eyed peas',
            'fufu': 'cassava flour',
            'garri': 'cassava flakes',
            'cassava': 'cassava',
            'okra': 'fresh okra',
            'ogbono': 'ogbono seeds',
            
            // DSA/Programming Themed Ingredients
            'algorithm': 'structured ingredients',
            'binary': 'black beans and white rice',
            'array': 'indexed vegetables',
            'stack': 'layered pasta',
            'queue': 'sequential vegetables',
            'tree': 'broccoli trees',
            'graph': 'connected pasta network',
            'hash': 'diced potatoes',
            'loop': 'ring pasta',
            'function': 'modular ingredients',
            'variable': 'flexible seasonings',
            'constant': 'steady base ingredients',
            'recursion': 'nested ingredients',
            'sorting': 'organized vegetables',
            'searching': 'hidden flavor gems',
            'optimization': 'efficient ingredients',
            'debugging': 'error-correcting spices',
            'compilation': 'ingredient assembly',
            'runtime': 'active cooking ingredients',
            'memory': 'memorable flavor combinations',
            'cache': 'quick-access spices',
            'database': 'ingredient storage system',
            'api': 'flavor interface components',
            'framework': 'structured cooking base',
            'library': 'collection of spices',
            'module': 'ingredient components',
            'class': 'categorized ingredients',
            'object': 'structured food items',
            'method': 'cooking technique ingredients',
            'property': 'ingredient characteristics',
            'inheritance': 'flavor lineage ingredients',
            'polymorphism': 'multi-form ingredients',
            'abstraction': 'essential flavor components',
            'encapsulation': 'contained ingredients'
        };

        // Check for exact matches first (using Set to avoid duplicates)
        const foundIngredients = new Set();
        
        for (const [key, value] of Object.entries(ingredientMap)) {
            if (lowerQuery === key || lowerQuery.includes(key)) {
                foundIngredients.add(value);
            }
        }
        
        // Convert Set back to array
        ingredients.push(...foundIngredients);

        // If still no ingredients found, try to create a recipe around the main words
        if (ingredients.length === 0) {
            // Extract meaningful words from the query
            const words = lowerQuery.split(' ').filter(word => 
                word.length > 2 && 
                !['the', 'and', 'for', 'with', 'from', 'very', 'really', 'good', 'best', 'easy', 'quick', 'simple', 'delicious'].includes(word)
            );
            
            if (words.length > 0) {
                // Use the first meaningful word as the main ingredient
                const mainIngredient = words[0];
                ingredients.push(mainIngredient);
                
                // Try to add complementary ingredients based on common patterns
                if (words.includes('salad')) {
                    ingredients.push('mixed greens', 'cherry tomatoes', 'cucumber');
                } else if (words.includes('stir') || words.includes('fry')) {
                    ingredients.push('mixed vegetables', 'soy sauce', 'garlic');
                } else if (words.includes('soup')) {
                    ingredients.push('vegetable broth', 'onion', 'celery');
                } else if (words.includes('sandwich') || words.includes('burger')) {
                    ingredients.push('bread', 'lettuce', 'tomato');
                }
            } else {
                // Fallback to a basic recipe
                ingredients.push('mixed vegetables', 'protein of choice');
            }
        }

        // Always add basic seasonings
        if (!ingredients.some(ing => ing.includes('salt'))) {
            ingredients.push('sea salt');
        }
        if (!ingredients.some(ing => ing.includes('pepper'))) {
            ingredients.push('black pepper');
        }
        if (!ingredients.some(ing => ing.includes('oil'))) {
            ingredients.push('olive oil');
        }

        return ingredients;
    }

    generateRecipeTitle(query, foodType) {
        const adjectives = [
            'Delicious', 'Amazing', 'Perfect', 'Healthy', 'Flavorful', 'Nutritious',
            'Developer\'s', 'Coder\'s', 'Productive', 'Energy-Boosting', 'Brain-Fueling',
            'Quick & Easy', 'Power-Packed', 'Focus-Enhancing', 'Coding-Fuel'
        ];
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        
        // Clean up the query and capitalize
        const cleanQuery = query.replace(/[^\w\s]/g, '').trim();
        const words = cleanQuery.split(' ');
        const capitalizedWords = words.map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        );
        
        // Add some variety to the title structure
        const titleVariations = [
            `${adjective} ${capitalizedWords.join(' ')}`,
            `${capitalizedWords.join(' ')} - ${adjective} Recipe`,
            `DevChef's ${capitalizedWords.join(' ')}`,
            `${capitalizedWords.join(' ')} for Developers`,
        ];
        
        return titleVariations[Math.floor(Math.random() * titleVariations.length)];
    }

    generateDescription(query, dietary, complexity) {
        const dietaryText = dietary !== 'none' ? ` (${dietary})` : '';
        return `A ${complexity} ${dietaryText} recipe based on your request: "${query}". Perfect for developers who need energy and focus!`;
    }

    calculateRuntime(complexity, cookingMethod) {
        const baseTime = {
            'beginner': 15,
            'intermediate': 30,
            'advanced': 45
        };
        
        const methodTime = {
            'stir-fry': 5,
            'baking': 20,
            'grilling': 15,
            'boiling': 10,
            'roasting': 25,
            'steaming': 8,
            'pan-cooking': 12
        };
        
        const totalTime = baseTime[complexity] + (methodTime[cookingMethod] || 10);
        return `${totalTime} min`;
    }

    generateCommitMessage(query, complexity) {
        const messages = {
            'beginner': `feat: implement basic ${query} recipe for quick meals`,
            'intermediate': `feat: add ${query} recipe with advanced techniques`,
            'advanced': `feat: implement complex ${query} recipe with professional methods`
        };
        return messages[complexity] || `feat: add custom ${query} recipe`;
    }

    calculateNutrition(ingredients, servings, dietary) {
        // Simplified nutrition calculation
        const baseCalories = 400;
        const protein = ingredients.some(ing => ing.includes('chicken') || ing.includes('beef') || ing.includes('fish')) ? '25g' : '15g';
        const carbs = ingredients.some(ing => ing.includes('rice') || ing.includes('pasta') || ing.includes('bread')) ? '45g' : '30g';
        const fiber = '8g';
        
        const benefits = this.generateNutritionBenefits(ingredients, dietary);
        
        return {
            calories: Math.round(baseCalories * servings / 4),
            protein: protein,
            carbs: carbs,
            fiber: fiber,
            benefits: benefits
        };
    }

    generateNutritionBenefits(ingredients, dietary) {
        const benefits = [];
        
        if (ingredients.some(ing => ing.includes('chicken') || ing.includes('fish'))) {
            benefits.push('High protein', 'Muscle building');
        }
        if (ingredients.some(ing => ing.includes('vegetable') || ing.includes('broccoli'))) {
            benefits.push('Rich in vitamins', 'Antioxidants');
        }
        if (ingredients.some(ing => ing.includes('rice') || ing.includes('pasta'))) {
            benefits.push('Sustained energy', 'Complex carbs');
        }
        if (dietary === 'vegan' || dietary === 'vegetarian') {
            benefits.push('Plant-based', 'Heart healthy');
        }
        if (dietary === 'keto') {
            benefits.push('Low carb', 'Fat burning');
        }
        
        benefits.push('Brain fuel', 'Focus enhancement');
        return benefits.join(', ');
    }

    generateIngredients(mainIngredients, servings, dietary) {
        const ingredients = {};
        const servingMultiplier = servings / 4;
        
        // Add main ingredients
        mainIngredients.forEach(ingredient => {
            const amount = this.calculateIngredientAmount(ingredient, servingMultiplier);
            ingredients[ingredient.replace(/\s+/g, '_')] = amount;
        });
        
        // Add common ingredients
        ingredients['olive_oil'] = `${Math.round(2 * servingMultiplier)} tbsp`;
        ingredients['salt'] = 'to taste';
        ingredients['black_pepper'] = 'to taste';
        ingredients['garlic_cloves'] = `${Math.round(2 * servingMultiplier)} cloves`;
        
        // Add dietary-specific ingredients
        if (dietary === 'vegan') {
            ingredients['nutritional_yeast'] = '2 tbsp';
        }
        if (dietary === 'keto') {
            ingredients['butter'] = '3 tbsp';
        }
        
        return ingredients;
    }

    calculateIngredientAmount(ingredient, multiplier) {
        const amounts = {
            // Proteins
            'chicken breast': '4 oz',
            'ground beef': '6 oz',
            'salmon fillet': '5 oz',
            'firm tofu': '8 oz',
            'large eggs': '2 eggs',
            'ground turkey': '6 oz',
            'lamb chops': '6 oz',
            'duck breast': '6 oz',
            'large shrimp': '8 oz',
            
            // Grains & Starches
            'jasmine rice': '1 cup',
            'whole wheat pasta': '8 oz',
            'rice noodles': '8 oz',
            'whole grain bread': '2 slices',
            'quinoa': '1 cup',
            'rolled oats': '1/2 cup',
            'pearl barley': '1 cup',
            'couscous': '1 cup',
            'bulgur wheat': '1 cup',
            'potatoes': '2 medium',
            'sweet potatoes': '2 medium',
            
            // Legumes & Beans
            'black beans': '1 can (15 oz)',
            'kidney beans': '1 can (15 oz)',
            'chickpeas': '1 can (15 oz)',
            'red lentils': '1 cup',
            'green peas': '1 cup',
            'edamame': '1 cup',
            
            // Vegetables
            'broccoli florets': '1 cup',
            'carrots': '2 medium',
            'yellow onion': '1 medium',
            'garlic cloves': '3 cloves',
            'cherry tomatoes': '1 cup',
            'fresh spinach': '2 cups',
            'kale leaves': '2 cups',
            'romaine lettuce': '2 cups',
            'cucumber': '1 medium',
            'bell peppers': '1 large',
            'button mushrooms': '8 oz',
            'zucchini': '1 medium',
            'eggplant': '1 small',
            'green cabbage': '1/4 head',
            'cauliflower florets': '1 cup',
            'asparagus spears': '1 bunch',
            'sweet corn': '2 ears',
            'avocado': '1 medium',
            'butternut squash': '1 small',
            
            // Fruits
            'apples': '2 medium',
            'bananas': '2 medium',
            'oranges': '2 medium',
            'lemons': '2 medium',
            'limes': '2 medium',
            'mixed berries': '1 cup',
            'strawberries': '1 cup',
            'blueberries': '1 cup',
            'grapes': '1 cup',
            'mango': '1 medium',
            'pineapple': '1 cup',
            'peaches': '2 medium',
            
            // Dairy & Alternatives
            'cheddar cheese': '1 cup shredded',
            'almond milk': '1 cup',
            'Greek yogurt': '1 cup',
            'unsalted butter': '2 tbsp',
            'heavy cream': '1/2 cup',
            'sour cream': '1/2 cup',
            
            // Nuts & Seeds
            'almonds': '1/4 cup',
            'walnuts': '1/4 cup',
            'cashews': '1/4 cup',
            'peanuts': '1/4 cup',
            'mixed seeds': '2 tbsp',
            'chia seeds': '2 tbsp',
            'flax seeds': '2 tbsp',
            'sesame seeds': '2 tbsp',
            'sunflower seeds': '2 tbsp',
            
            // Pantry Staples
            'all-purpose flour': '1 cup',
            'coconut sugar': '1/4 cup',
            'raw honey': '2 tbsp',
            'olive oil': '2 tbsp',
            'balsamic vinegar': '2 tbsp',
            'soy sauce': '2 tbsp',
            'Dijon mustard': '1 tbsp',
            'ketchup': '2 tbsp',
            'mayonnaise': '2 tbsp',
            
            // Spices & Herbs
            'sea salt': '1 tsp',
            'black pepper': '1/2 tsp',
            'garlic powder': '1 tsp',
            'onion powder': '1 tsp',
            'paprika': '1 tsp',
            'ground cumin': '1 tsp',
            'dried oregano': '1 tsp',
            'fresh basil': '1/4 cup',
            'fresh thyme': '1 tbsp',
            'fresh rosemary': '1 tbsp',
            'fresh cilantro': '1/4 cup',
            'fresh parsley': '1/4 cup',
            'fresh ginger': '1 inch',
            'ground cinnamon': '1 tsp',
            'ground nutmeg': '1/2 tsp',
            'vanilla extract': '1 tsp',
            
            // Chocolate & Sweets
            'dark chocolate': '2 oz',
            'cocoa powder': '2 tbsp',
            'shredded coconut': '1/4 cup',
            'medjool dates': '4 dates',
            'pure maple syrup': '2 tbsp'
        };
        
        const baseAmount = amounts[ingredient] || '1 cup';
        return baseAmount;
    }

    generateInstructions(mainIngredients, cookingMethod, complexity) {
        const instructions = [];
        const stepCount = complexity === 'beginner' ? 4 : complexity === 'intermediate' ? 6 : 8;
        
        // Check if it's a simple single ingredient
        const isSimpleIngredient = mainIngredients.length <= 2 && mainIngredients.some(ing => 
            ing.includes('beans') || ing.includes('rice') || ing.includes('pasta') || 
            ing.includes('eggs') || ing.includes('tofu') || ing.includes('chicken')
        );
        
        if (isSimpleIngredient) {
            return this.generateSimpleIngredientInstructions(mainIngredients, complexity);
        }
        
        instructions.push({
            title: 'prepareIngredients()',
            content: 'Wash and prepare all ingredients. This is your initial setup - make sure everything is ready before you start cooking.'
        });
        
        if (cookingMethod === 'stir-fry') {
            instructions.push({
                title: 'heatPan()',
                content: 'Heat a large pan or wok over high heat. Add oil and let it get hot - you want it smoking slightly for proper stir-frying.'
            });
            instructions.push({
                title: 'cookProtein()',
                content: 'Add your protein first and cook until almost done. Remove from pan and set aside. This prevents overcooking.'
            });
            instructions.push({
                title: 'cookVegetables()',
                content: 'Add vegetables to the hot pan. Stir constantly for 2-3 minutes until crisp-tender. This maintains their nutrients and texture.'
            });
        } else if (cookingMethod === 'baking') {
            instructions.push({
                title: 'preheatOven()',
                content: 'Preheat oven to 400°F. This is your main cooking environment - make sure it\'s ready before you start.'
            });
            instructions.push({
                title: 'prepareBakingDish()',
                content: 'Grease your baking dish and arrange ingredients. This is your deployment setup - everything should be properly configured.'
            });
        } else if (cookingMethod === 'boiling') {
            instructions.push({
                title: 'boilWater()',
                content: 'Bring a pot of water to a rolling boil. Add a pinch of salt to enhance flavor.'
            });
            instructions.push({
                title: 'addMainIngredient()',
                content: 'Add your main ingredient to the boiling water. Cook according to package directions or until tender.'
            });
        }
        
        instructions.push({
            title: 'season()',
            content: 'Add salt, pepper, and any other seasonings. Taste as you go - this is your quality control step.'
        });
        
        instructions.push({
            title: 'finalCooking()',
            content: 'Complete the cooking process according to your method. Check for doneness and adjust as needed.'
        });
        
        instructions.push({
            title: 'serve()',
            content: 'Plate your dish and enjoy! Your custom recipe is now ready to fuel your coding session.'
        });
        
        return instructions.slice(0, stepCount);
    }

    generateSimpleIngredientInstructions(mainIngredients, complexity) {
        const instructions = [];
        const mainIngredient = mainIngredients[0];
        
        if (mainIngredient.includes('beans')) {
            instructions.push({
                title: 'prepareBeans()',
                content: 'If using dried beans, soak them overnight or use the quick-soak method. If using canned beans, rinse and drain them.'
            });
            instructions.push({
                title: 'cookBeans()',
                content: 'In a pot, combine beans with water, garlic, and a bay leaf. Bring to a boil, then simmer for 1-2 hours until tender.'
            });
            instructions.push({
                title: 'season()',
                content: 'Add salt, pepper, and your favorite spices. Try cumin, paprika, or chili powder for extra flavor.'
            });
            instructions.push({
                title: 'serve()',
                content: 'Serve hot as a side dish, or use as a base for burritos, salads, or rice bowls. Perfect protein for coding energy!'
            });
        } else if (mainIngredient.includes('rice')) {
            instructions.push({
                title: 'rinseRice()',
                content: 'Rinse the rice under cold water until the water runs clear. This removes excess starch for better texture.'
            });
            instructions.push({
                title: 'cookRice()',
                content: 'Combine rice with water (1:2 ratio) in a pot. Bring to a boil, then cover and simmer for 18-20 minutes.'
            });
            instructions.push({
                title: 'fluff()',
                content: 'Remove from heat and let sit covered for 5 minutes. Then fluff with a fork to separate the grains.'
            });
            instructions.push({
                title: 'serve()',
                content: 'Serve as a side dish or base for stir-fries, curries, or grain bowls. Great complex carbs for sustained energy!'
            });
        } else if (mainIngredient.includes('eggs')) {
            instructions.push({
                title: 'heatPan()',
                content: 'Heat a non-stick pan over medium heat. Add a small amount of butter or oil.'
            });
            instructions.push({
                title: 'crackEggs()',
                content: 'Crack eggs into the pan. For scrambled, stir gently. For fried, cook until whites are set.'
            });
            instructions.push({
                title: 'season()',
                content: 'Season with salt and pepper. Add herbs like chives or parsley for extra flavor.'
            });
            instructions.push({
                title: 'serve()',
                content: 'Serve immediately with toast, or use in sandwiches, salads, or rice bowls. Perfect protein boost!'
            });
        } else if (mainIngredient.includes('pasta')) {
            instructions.push({
                title: 'boilWater()',
                content: 'Bring a large pot of salted water to a rolling boil. Use plenty of water for even cooking.'
            });
            instructions.push({
                title: 'cookPasta()',
                content: 'Add pasta and cook according to package directions, stirring occasionally. Test for doneness.'
            });
            instructions.push({
                title: 'drain()',
                content: 'Reserve 1/2 cup of pasta water, then drain the pasta. The starchy water helps with sauce.'
            });
            instructions.push({
                title: 'serve()',
                content: 'Toss with your favorite sauce, olive oil, or butter. Add cheese and herbs for extra flavor!'
            });
        } else {
            // Generic simple ingredient instructions
            instructions.push({
                title: 'prepare()',
                content: `Wash and prepare your ${mainIngredient}. Remove any stems, seeds, or inedible parts.`
            });
            instructions.push({
                title: 'cook()',
                content: `Cook the ${mainIngredient} using your preferred method - boiling, steaming, or sautéing.`
            });
            instructions.push({
                title: 'season()',
                content: 'Season with salt, pepper, and herbs. Taste and adjust seasoning as needed.'
            });
            instructions.push({
                title: 'serve()',
                content: 'Serve hot and enjoy! This simple preparation lets the natural flavors shine through.'
            });
        }
        
        return instructions;
    }

    generateTips(dietary, complexity, cookingMethod) {
        const tips = [];
        
        tips.push('Always taste your food before serving - this catches most cooking bugs');
        
        if (dietary === 'vegan') {
            tips.push('Use nutritional yeast for a cheesy flavor without dairy');
        }
        if (dietary === 'keto') {
            tips.push('Focus on healthy fats like avocado and olive oil');
        }
        if (complexity === 'advanced') {
            tips.push('Let meat rest for 5 minutes after cooking for better texture');
        }
        if (cookingMethod === 'stir-fry') {
            tips.push('Keep everything moving in the pan for even cooking');
        }
        
        tips.push('Meal prep this recipe for quick weekday meals');
        tips.push('Store leftovers in the fridge for up to 3 days');
        
        return tips;
    }

    generateEnergyEffects(foodType, mainIngredients) {
        const effects = [];
        
        if (mainIngredients.some(ing => ing.includes('chicken') || ing.includes('fish'))) {
            effects.push('High protein for muscle recovery');
        }
        if (mainIngredients.some(ing => ing.includes('rice') || ing.includes('pasta'))) {
            effects.push('Sustained energy for 4-6 hours');
        }
        if (mainIngredients.some(ing => ing.includes('vegetable'))) {
            effects.push('Vitamins and minerals for immune support');
        }
        
        effects.push('Improved focus and concentration');
        effects.push('Stable blood sugar levels');
        effects.push('Enhanced cognitive function');
        
        return effects.join(', ');
    }

    getDefaultImage(recipe) {
        // Generate appropriate placeholder images based on recipe type
        const foodType = this.analyzeFoodType(recipe.title.toLowerCase());
        const imageMap = {
            'soup': 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
            'salad': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
            'pasta': 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
            'grain': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
            'protein': 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
            'dessert': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
            'beverage': 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
            'main': 'https://images.unsplash.com/photo-1565299585323-38174c4aabaa?w=400&h=300&fit=crop&crop=center&auto=format&q=80'
        };
        
        return imageMap[foodType] || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&crop=center&auto=format&q=80';
    }

    // Contact Form Handler
    handleContactForm(e) {
        e.preventDefault();
        
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const message = document.getElementById('contactMessage').value;
        const submitBtn = e.target.querySelector('.contact-btn');
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.textContent = 'Sending...';
        
        // Create mailto link with the message
        const subject = `DevChef Contact: Message from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        const mailtoLink = `mailto:omoteloyeoluwanifemi@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Reset form after a delay
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'Send Message';
            document.getElementById('contactForm').reset();
            alert('Your email client should open with the message. Please send it from there!');
        }, 1000);
    }
}

// Global functions for footer links
function scrollToSearch() {
    // Scroll to the search section
    const searchSection = document.querySelector('.search-section');
    if (searchSection) {
        searchSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
        
        // Focus on the search input after scrolling
        setTimeout(() => {
            const searchInput = document.getElementById('recipeSearch');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }, 500);
    }
}

function showNutritionInfo() {
    // Show nutrition info popup
    const message = `🧬 Nutrition Analysis Features:

✅ Detailed nutrition facts for every recipe
✅ Calories, protein, carbs, and fiber breakdown  
✅ Health benefits and energy effects
✅ Brain fuel and productivity info
✅ Dietary restriction support

Look for the "📊 Nutrition Facts" section in each recipe to see complete nutritional information!`;

    alert(message);
}

function filterRecipes(complexity) {
    // Update navigation buttons
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Find and activate the correct button
    const targetBtn = document.querySelector(`[data-filter="${complexity}"]`);
    if (targetBtn) {
        targetBtn.classList.add('active');
        
        // Trigger the actual filtering
        targetBtn.click();
        
        // Scroll to recipes with a slight delay
        setTimeout(() => {
            const recipeGrid = document.getElementById('recipeGrid');
            if (recipeGrid) {
                // Scroll to just above the recipe grid
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = recipeGrid.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
}

function showTimer() {
    // Show the cooking timer modal
    const timerModal = document.getElementById('timerModal');
    if (timerModal) {
        timerModal.style.display = 'block';
        
        // Focus on the timer display
        const timerDisplay = document.getElementById('timerDisplay');
        if (timerDisplay) {
            timerDisplay.focus();
        }
    }
}

// Additional helper functions
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function showAllRecipes() {
    filterRecipes('all');
}

// Global timer preset function
function setTimerPreset(minutes, seconds = 0) {
    if (window.devChef) {
        window.devChef.setTimerPreset(minutes, seconds);
    }
}

// Make functions available globally
window.scrollToSearch = scrollToSearch;
window.showNutritionInfo = showNutritionInfo;
window.filterRecipes = filterRecipes;
window.showTimer = showTimer;
window.scrollToTop = scrollToTop;
window.showAllRecipes = showAllRecipes;
window.setTimerPreset = setTimerPreset;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.devChef = new DevChef();
});

// Add some fun console messages
console.log(`
🍳 Welcome to DevChef!
📚 Available recipes: ${recipes.length}
⚡ Built with vanilla JavaScript (no frameworks, just like good old recipes)
🐛 Found a bug? Check the debugging tips in each recipe!
`);

// Add a fun console command
window.devchef = {
    recipes: recipes,
    help: () => {
        console.log(`
🍳 DevChef Console Commands:
- devchef.recipes: View all recipes
- devchef.help(): Show this help
- devchef.random(): Get a random recipe
        `);
    },
    random: () => {
        const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
        console.log(`🎲 Random recipe: ${randomRecipe.title}`);
        console.log(`📝 ${randomRecipe.description}`);
        console.log(`⏱️ Runtime: ${randomRecipe.runtime}`);
        return randomRecipe;
    }
};
