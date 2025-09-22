import * as vscode from 'vscode';
import * as path from 'path';
import { TimerPanel } from './timerPanel';

export class DevChefPanel {
    public static currentPanel: DevChefPanel | undefined;
    public static readonly viewType = 'devchefPanel';
    private readonly _panel: vscode.WebviewPanel;
    private readonly _extensionUri: vscode.Uri;
    private _disposables: vscode.Disposable[] = [];

    public static createOrShow(extensionUri: vscode.Uri) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        // If we already have a panel, show it.
        if (DevChefPanel.currentPanel) {
            DevChefPanel.currentPanel._panel.reveal(column);
            return;
        }

        // Otherwise, create a new panel.
        const panel = vscode.window.createWebviewPanel(
            DevChefPanel.viewType,
            '🍳 DevChef - Recipes for Coders',
            column || vscode.ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [
                    vscode.Uri.joinPath(extensionUri, 'media'),
                    vscode.Uri.joinPath(extensionUri, 'out/compiled')
                ]
            }
        );

        DevChefPanel.currentPanel = new DevChefPanel(panel, extensionUri);
    }

    public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
        DevChefPanel.currentPanel = new DevChefPanel(panel, extensionUri);
    }

    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
        this._panel = panel;
        this._extensionUri = extensionUri;

        // Set the webview's initial html content
        this._update();

        // Listen for when the panel is disposed
        // This happens when the user closes the panel or when the panel is closed programmatically
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

        // Handle messages from the webview
        this._panel.webview.onDidReceiveMessage(
            message => {
                switch (message.command) {
                    case 'alert':
                        vscode.window.showErrorMessage(message.text);
                        return;
                    case 'info':
                        vscode.window.showInformationMessage(message.text);
                        return;
                    case 'generateRecipe':
                        this._handleRecipeGeneration(message.data);
                        return;
                    case 'openTimer':
                        vscode.commands.executeCommand('devchef.openTimer');
                        return;
                    case 'setRecipeTimer':
                        this._handleRecipeTimer(message.recipeName, message.minutes);
                        return;
                }
            },
            null,
            this._disposables
        );
    }

    public focusRecipeGenerator() {
        this._panel.webview.postMessage({ command: 'focusRecipeGenerator' });
    }

    public generateQuickRecipe(query: string) {
        this._panel.webview.postMessage({ 
            command: 'generateQuickRecipe', 
            query: query 
        });
    }

    private _handleRecipeGeneration(data: any) {
        // Handle recipe generation logic here
        vscode.window.showInformationMessage(`Generating recipe: ${data.query}`);
    }

    private _handleRecipeTimer(recipeName: string, minutes: number) {
        // Open timer panel and set the recipe timer
        vscode.commands.executeCommand('devchef.openTimer').then(() => {
            // Send timer data to the timer panel
            setTimeout(() => {
                if (TimerPanel.currentPanel) {
                    TimerPanel.currentPanel.setRecipeTimer(minutes, recipeName);
                }
            }, 500);
        });
    }

    public dispose() {
        DevChefPanel.currentPanel = undefined;

        // Clean up our resources
        this._panel.dispose();

        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }

    private _update() {
        const webview = this._panel.webview;
        this._panel.webview.html = this._getHtmlForWebview(webview);
    }

    private _getHtmlForWebview(webview: vscode.Webview) {
        // Get the path to the resource on disk
        const scriptPathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'script.js');
        const stylePathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'styles.css');
        const recipesPathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'recipes.js');
        const userAuthPathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'userAuth.js');

        // And the uri we use to load this script in the webview
        const scriptUri = webview.asWebviewUri(scriptPathOnDisk);
        const styleUri = webview.asWebviewUri(stylePathOnDisk);
        const recipesUri = webview.asWebviewUri(recipesPathOnDisk);
        const userAuthUri = webview.asWebviewUri(userAuthPathOnDisk);

        // Read the HTML content and replace the script sources
        const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>DevChef: Recipes for Coders</title>
    <link rel="stylesheet" href="${styleUri}">
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Login Modal -->
    <div id="loginModal" class="auth-modal">
        <div class="auth-content">
            <span class="close-auth" id="closeAuth">&times;</span>
            
            <!-- Login Form -->
            <div id="loginForm" class="auth-form">
                <h2>🔐 Welcome Back to DevChef</h2>
                <p class="auth-subtitle">Sign in to access your personalized cooking experience</p>
                
                <form id="loginFormElement">
                    <div class="input-group">
                        <label for="loginEmail">📧 Email</label>
                        <input type="email" id="loginEmail" placeholder="developer@devchef.com" required>
                    </div>
                    
                    <div class="input-group">
                        <label for="loginPassword">🔒 Password</label>
                        <input type="password" id="loginPassword" placeholder="Your secure password" required>
                    </div>
                    
                    <button type="submit" class="auth-btn login-btn">
                        <span>🚀 Sign In</span>
                    </button>
                    
                    <div class="auth-switch">
                        <p>New to DevChef? <a href="#" id="showRegister">Create an account</a></p>
                    </div>
                </form>
                
                <div class="demo-account">
                    <p>🎮 <strong>Demo Account:</strong></p>
                    <p>Email: demo@devchef.com | Password: demo123</p>
                </div>
            </div>
            
            <!-- Register Form -->
            <div id="registerForm" class="auth-form" style="display: none;">
                <h2>🍳 Join DevChef</h2>
                <p class="auth-subtitle">Create your developer cooking account</p>
                
                <form id="registerFormElement">
                    <div class="input-group">
                        <label for="registerName">👨‍💻 Full Name</label>
                        <input type="text" id="registerName" placeholder="John Developer" required>
                    </div>
                    
                    <div class="input-group">
                        <label for="registerEmail">📧 Email</label>
                        <input type="email" id="registerEmail" placeholder="john@devcompany.com" required>
                    </div>
                    
                    <div class="input-group">
                        <label for="registerPassword">🔒 Password</label>
                        <input type="password" id="registerPassword" placeholder="Strong password (min 6 chars)" minlength="6" required>
                    </div>
                    
                    <div class="input-group">
                        <label for="confirmPassword">🔒 Confirm Password</label>
                        <input type="password" id="confirmPassword" placeholder="Confirm your password" required>
                    </div>
                    
                    <div class="input-group">
                        <label for="developerType">💻 Developer Type</label>
                        <select id="developerType" required>
                            <option value="">Select your specialty</option>
                            <option value="frontend">Frontend Developer</option>
                            <option value="backend">Backend Developer</option>
                            <option value="fullstack">Full Stack Developer</option>
                            <option value="mobile">Mobile Developer</option>
                            <option value="devops">DevOps Engineer</option>
                            <option value="data">Data Scientist</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <button type="submit" class="auth-btn register-btn">
                        <span>🎉 Create Account</span>
                    </button>
                    
                    <div class="auth-switch">
                        <p>Already have an account? <a href="#" id="showLogin">Sign in here</a></p>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- User Dashboard Modal -->
    <div id="userDashboard" class="auth-modal">
        <div class="auth-content dashboard-content">
            <span class="close-auth" id="closeDashboard">&times;</span>
            
            <div class="dashboard-header">
                <h2>👨‍💻 Your DevChef Dashboard</h2>
                <div class="user-info">
                    <div class="user-avatar">
                        <span id="userAvatar">👨‍💻</span>
                    </div>
                    <div class="user-details">
                        <h3 id="userName">Developer</h3>
                        <p id="userEmail">developer@devchef.com</p>
                        <span class="user-type" id="userType">Full Stack Developer</span>
                    </div>
                </div>
            </div>
            
            <div class="dashboard-stats">
                <div class="stat-card">
                    <div class="stat-icon">🍳</div>
                    <div class="stat-info">
                        <h4 id="recipesCooked">0</h4>
                        <p>Recipes Cooked</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">⏰</div>
                    <div class="stat-info">
                        <h4 id="cookingTime">0h</h4>
                        <p>Total Cooking Time</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">❤️</div>
                    <div class="stat-info">
                        <h4 id="favoriteRecipes">0</h4>
                        <p>Favorite Recipes</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🏆</div>
                    <div class="stat-info">
                        <h4 id="userLevel">Beginner</h4>
                        <p>Cooking Level</p>
                    </div>
                </div>
            </div>
            
            <div class="dashboard-actions">
                <button class="dashboard-btn" onclick="closeDashboard()">
                    <span>🍳 Continue Cooking</span>
                </button>
                <button class="dashboard-btn secondary" onclick="logout()">
                    <span>🚪 Sign Out</span>
                </button>
            </div>
        </div>
    </div>

    <div class="container">
        <header class="header">
            <div class="header-left">
                <div class="logo">
                    <h1>🍳 DevChef</h1>
                    <p class="tagline">Recipes for Coders</p>
                </div>
            </div>
            
            <div class="header-center">
                <!-- AI Recipe Generator Search Bar -->
                <div class="search-section">
                <div class="search-container">
                    <h3 class="search-title">🤖 AI Recipe Generator</h3>
                    <p class="search-subtitle">Describe any food and get a custom recipe with nutrition info!</p>
                    <div class="search-bar-container">
                        <input type="text" id="recipeSearch" class="search-input" placeholder="e.g., 'healthy chicken stir fry', 'vegan chocolate cake', 'spicy ramen'">
                        <button id="generateRecipe" class="generate-btn">
                            <span class="btn-text">Generate Recipe</span>
                            <span class="btn-icon">⚡</span>
                        </button>
                    </div>
                    <div class="search-options">
                        <div class="option-group">
                            <label>Dietary:</label>
                            <select id="dietaryRestriction" class="option-select">
                                <option value="none">None</option>
                                <option value="vegetarian">Vegetarian</option>
                                <option value="vegan">Vegan</option>
                                <option value="keto">Keto</option>
                                <option value="paleo">Paleo</option>
                                <option value="gluten-free">Gluten-Free</option>
                            </select>
                        </div>
                        <div class="option-group">
                            <label>Complexity:</label>
                            <select id="complexityLevel" class="option-select">
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </div>
                        <div class="option-group">
                            <label>Servings:</label>
                            <select id="servingSize" class="option-select">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="4" selected>4</option>
                                <option value="6">6</option>
                                <option value="8">8</option>
                            </select>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            
            <div class="header-right">
                <!-- User Auth Section -->
                <div class="user-auth" id="userAuth">
                    <button class="auth-header-btn" id="loginBtn">
                        🔐 Sign In
                    </button>
                    <button class="auth-header-btn secondary" id="registerBtn">
                        🎉 Sign Up
                    </button>
                </div>
                
                <!-- User Profile (when logged in) -->
                <div class="user-profile" id="userProfile" style="display: none;">
                    <div class="user-profile-info" onclick="showDashboard()">
                        <span class="user-profile-avatar" id="userProfileAvatar">👨‍💻</span>
                        <span class="user-profile-name" id="userProfileName">Developer</span>
                    </div>
                    <button class="user-menu-btn" onclick="showDashboard()">
                        <span>⚙️</span>
                    </button>
                </div>
            </div>
        </header>
        
        <nav class="nav">
                <button class="nav-btn active" data-filter="all">All Recipes</button>
                <button class="nav-btn" data-filter="beginner">Beginner</button>
                <button class="nav-btn" data-filter="intermediate">Intermediate</button>
                <button class="nav-btn" data-filter="advanced">Advanced</button>
            </nav>

        <main class="main">
            <div class="recipe-grid" id="recipeGrid">
                <!-- Recipes will be dynamically loaded here -->
            </div>
        </main>

        <div class="recipe-modal" id="recipeModal">
            <div class="modal-content">
                <button class="close-btn" id="closeModal">&times;</button>
                <div class="recipe-detail" id="recipeDetail">
                    <!-- Recipe details will be loaded here -->
                </div>
            </div>
        </div>

        <div class="timer-modal" id="timerModal">
            <div class="timer-content">
                <span class="close-timer" id="closeTimer">&times;</span>
                <h3>⏰ DevChef Cooking Timer</h3>
                
                <!-- Quick Timer Presets -->
                <div class="timer-presets">
                    <h4>⚡ Quick Presets</h4>
                    <div class="preset-buttons">
                        <button class="preset-btn" onclick="setTimerPreset(2, 0)">2min - Eggs</button>
                        <button class="preset-btn" onclick="setTimerPreset(5, 0)">5min - Toast</button>
                        <button class="preset-btn" onclick="setTimerPreset(10, 0)">10min - Pasta</button>
                        <button class="preset-btn" onclick="setTimerPreset(15, 0)">15min - Rice</button>
                        <button class="preset-btn" onclick="setTimerPreset(20, 0)">20min - Chicken</button>
                        <button class="preset-btn" onclick="setTimerPreset(30, 0)">30min - Baking</button>
                    </div>
                </div>
                
                <!-- Timer Display -->
                <div class="timer-display-container">
                    <div class="timer-display" id="timerDisplay">05:00</div>
                    <div id="timerStatus" class="timer-status">Ready to cook! 🍳</div>
                    <div class="timer-progress-container">
                        <div id="timerProgress" class="timer-progress"></div>
                    </div>
                </div>
                
                <!-- Custom Timer Input -->
                <div class="timer-input-section">
                    <h4>🎯 Custom Timer</h4>
                    <div class="timer-inputs">
                        <div class="input-group">
                            <label>Minutes</label>
                            <input type="number" id="timerMinutes" placeholder="0" min="0" max="180" value="5">
                        </div>
                        <div class="input-group">
                            <label>Seconds</label>
                            <input type="number" id="timerSeconds" placeholder="0" min="0" max="59" value="0">
                        </div>
                    </div>
                </div>
                
                <!-- Timer Controls -->
                <div class="timer-controls">
                    <button id="startTimer" class="timer-btn start-btn">
                        <span>▶️ Start</span>
                    </button>
                    <button id="pauseTimer" class="timer-btn pause-btn" style="display: none;">
                        <span>⏸️ Pause</span>
                    </button>
                    <button id="stopTimer" class="timer-btn stop-btn">
                        <span>⏹️ Stop</span>
                    </button>
                    <button id="resetTimer" class="timer-btn reset-btn">
                        <span>🔄 Reset</span>
                    </button>
                </div>
                
                <!-- Recipe Timer Integration -->
                <div id="recipeTimerSection" class="recipe-timer-section" style="display: none;">
                    <h4>📝 Current Recipe: <span id="currentRecipeTitle"></span></h4>
                    <div class="recipe-steps-timer">
                        <div id="recipeStepsContainer"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="${recipesUri}"></script>
    <script src="${userAuthUri}"></script>
    <script src="${scriptUri}"></script>
    
    <script>
        // VS Code API integration
        const vscode = acquireVsCodeApi();
        
        // Override some functions to work with VS Code
        function showTimer() {
            vscode.postMessage({ command: 'openTimer' });
        }
        
        // Override recipe click to send timer data
        function openRecipeWithTimer(recipeId) {
            // Find the recipe data
            const recipe = recipes.find(r => r.id === recipeId);
            if (recipe && recipe.runtime) {
                // Send timer data to VS Code
                vscode.postMessage({ 
                    command: 'setRecipeTimer', 
                    recipeName: recipe.title, 
                    minutes: recipe.runtime 
                });
            }
        }
        
        // Listen for messages from VS Code
        window.addEventListener('message', event => {
            const message = event.data;
            switch (message.command) {
                case 'focusRecipeGenerator':
                    document.getElementById('recipeSearch').focus();
                    break;
                case 'generateQuickRecipe':
                    document.getElementById('recipeSearch').value = message.query;
                    document.getElementById('generateRecipe').click();
                    break;
            }
        });
        
        // Override the original showRecipe function to include timer integration
        const originalShowRecipe = window.showRecipe;
        if (originalShowRecipe) {
            window.showRecipe = function(recipeId) {
                originalShowRecipe(recipeId);
                // Also set up timer for this recipe
                openRecipeWithTimer(recipeId);
            };
        }
    </script>
</body>
</html>`;

        return htmlContent;
    }
}



