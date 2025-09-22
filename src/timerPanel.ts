import * as vscode from 'vscode';
import * as path from 'path';

export class TimerPanel {
    public static currentPanel: TimerPanel | undefined;
    public static readonly viewType = 'timerPanel';
    private readonly _panel: vscode.WebviewPanel;
    private readonly _extensionUri: vscode.Uri;
    private _disposables: vscode.Disposable[] = [];

    public static createOrShow(extensionUri: vscode.Uri) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        // If we already have a panel, show it.
        if (TimerPanel.currentPanel) {
            TimerPanel.currentPanel._panel.reveal(column);
            return;
        }

        // Otherwise, create a new panel.
        const panel = vscode.window.createWebviewPanel(
            TimerPanel.viewType,
            '⏰ DevChef Cooking Timer',
            column || vscode.ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [
                    vscode.Uri.joinPath(extensionUri, 'media'),
                    vscode.Uri.joinPath(extensionUri, 'out/compiled')
                ]
            }
        );

        TimerPanel.currentPanel = new TimerPanel(panel, extensionUri);
    }

    public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
        TimerPanel.currentPanel = new TimerPanel(panel, extensionUri);
    }

    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
        this._panel = panel;
        this._extensionUri = extensionUri;

        // Set the webview's initial html content
        this._update();

        // Listen for when the panel is disposed
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

        // Handle messages from the webview
        this._panel.webview.onDidReceiveMessage(
            message => {
                switch (message.command) {
                    case 'timerComplete':
                        vscode.window.showInformationMessage('🍳 Timer finished! Your food is ready!');
                        // Show notification
                        vscode.window.showInformationMessage(
                            'Timer Complete!',
                            'Open DevChef'
                        ).then(selection => {
                            if (selection === 'Open DevChef') {
                                vscode.commands.executeCommand('devchef.openDevChef');
                            }
                        });
                        return;
                    case 'timerStart':
                        vscode.window.showInformationMessage(`⏰ Timer started: ${message.duration}`);
                        return;
                    case 'timerPause':
                        vscode.window.showInformationMessage('⏸️ Timer paused');
                        return;
                    case 'timerStop':
                        vscode.window.showInformationMessage('⏹️ Timer stopped');
                        return;
                }
            },
            null,
            this._disposables
        );
    }

    public setRecipeTimer(minutes: number, recipeName: string) {
        this._panel.webview.postMessage({ 
            command: 'setRecipeTimer', 
            minutes: minutes, 
            recipeName: recipeName 
        });
    }

    public dispose() {
        TimerPanel.currentPanel = undefined;

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
        const stylePathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'styles.css');
        const styleUri = webview.asWebviewUri(stylePathOnDisk);

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DevChef Cooking Timer</title>
    <link rel="stylesheet" href="${styleUri}">
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        body {
            margin: 0;
            padding: 20px;
            background: var(--bg-primary);
            color: var(--text-primary);
            font-family: 'Inter', sans-serif;
        }
        .timer-container {
            max-width: 500px;
            margin: 0 auto;
            text-align: center;
        }
        .timer-header {
            margin-bottom: 30px;
        }
        .timer-header h1 {
            color: var(--accent-primary);
            margin-bottom: 10px;
        }
        .timer-display {
            font-size: 4rem;
            font-weight: 600;
            color: var(--accent-primary);
            margin: 30px 0;
            font-family: 'JetBrains Mono', monospace;
        }
        .timer-status {
            font-size: 1.2rem;
            margin-bottom: 30px;
            color: var(--text-secondary);
        }
        .timer-progress-container {
            width: 100%;
            height: 8px;
            background: var(--bg-secondary);
            border-radius: 4px;
            margin: 20px 0;
            overflow: hidden;
        }
        .timer-progress {
            height: 100%;
            background: var(--accent-primary);
            width: 0%;
            transition: width 0.3s ease;
        }
        .timer-presets {
            margin: 30px 0;
        }
        .preset-buttons {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 10px;
            margin-top: 15px;
        }
        .preset-btn {
            padding: 10px 15px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            color: var(--text-primary);
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.9rem;
        }
        .preset-btn:hover {
            background: var(--accent-primary);
            color: white;
        }
        .timer-inputs {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin: 20px 0;
        }
        .input-group {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .input-group label {
            margin-bottom: 5px;
            font-size: 0.9rem;
            color: var(--text-secondary);
        }
        .input-group input {
            width: 80px;
            padding: 10px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            background: var(--bg-secondary);
            color: var(--text-primary);
            text-align: center;
            font-size: 1.1rem;
        }
        .timer-controls {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin: 30px 0;
        }
        .timer-btn {
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 500;
            transition: all 0.3s ease;
            min-width: 100px;
        }
        .start-btn {
            background: var(--accent-primary);
            color: white;
        }
        .start-btn:hover {
            background: var(--accent-hover);
        }
        .pause-btn {
            background: #ffa500;
            color: white;
        }
        .pause-btn:hover {
            background: #ff8c00;
        }
        .stop-btn {
            background: #ff4444;
            color: white;
        }
        .stop-btn:hover {
            background: #ff2222;
        }
        .reset-btn {
            background: var(--bg-secondary);
            color: var(--text-primary);
            border: 1px solid var(--border-color);
        }
        .reset-btn:hover {
            background: var(--bg-tertiary);
        }
    </style>
</head>
<body>
    <div class="timer-container">
        <div class="timer-header">
            <h1>⏰ DevChef Cooking Timer</h1>
            <p>Perfect timing for perfect cooking!</p>
        </div>
        
        <!-- Quick Timer Presets -->
        <div class="timer-presets">
            <h3>⚡ Quick Presets</h3>
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
            <h3>🎯 Custom Timer</h3>
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
    </div>

    <script>
        const vscode = acquireVsCodeApi();
        
        let timerInterval;
        let totalSeconds = 300; // 5 minutes default
        let remainingSeconds = totalSeconds;
        let isRunning = false;
        let isPaused = false;

        function updateDisplay() {
            const minutes = Math.floor(remainingSeconds / 60);
            const seconds = remainingSeconds % 60;
            document.getElementById('timerDisplay').textContent = 
                minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
            
            const progress = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
            document.getElementById('timerProgress').style.width = progress + '%';
        }

        function setTimerPreset(minutes, seconds) {
            totalSeconds = minutes * 60 + seconds;
            remainingSeconds = totalSeconds;
            isRunning = false;
            isPaused = false;
            updateDisplay();
            updateControls();
            document.getElementById('timerStatus').textContent = 'Ready to cook! 🍳';
        }

        function startTimer() {
            if (!isRunning && !isPaused) {
                const minutes = parseInt(document.getElementById('timerMinutes').value) || 0;
                const seconds = parseInt(document.getElementById('timerSeconds').value) || 0;
                totalSeconds = minutes * 60 + seconds;
                remainingSeconds = totalSeconds;
            }
            
            isRunning = true;
            isPaused = false;
            
            timerInterval = setInterval(() => {
                remainingSeconds--;
                updateDisplay();
                
                if (remainingSeconds <= 0) {
                    clearInterval(timerInterval);
                    isRunning = false;
                    document.getElementById('timerStatus').textContent = 'Time\'s up! 🍳';
                    vscode.postMessage({ command: 'timerComplete' });
                    updateControls();
                }
            }, 1000);
            
            vscode.postMessage({ command: 'timerStart', duration: Math.floor(totalSeconds/60) + ':' + (totalSeconds%60).toString().padStart(2, '0') });
            updateControls();
        }

        function pauseTimer() {
            if (isRunning) {
                clearInterval(timerInterval);
                isRunning = false;
                isPaused = true;
                document.getElementById('timerStatus').textContent = 'Timer paused ⏸️';
                vscode.postMessage({ command: 'timerPause' });
                updateControls();
            }
        }

        function stopTimer() {
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
            }
            isRunning = false;
            isPaused = false;
            remainingSeconds = totalSeconds;
            updateDisplay();
            document.getElementById('timerStatus').textContent = 'Timer stopped ⏹️';
            vscode.postMessage({ command: 'timerStop' });
            updateControls();
        }

        function resetTimer() {
            stopTimer();
            document.getElementById('timerMinutes').value = Math.floor(totalSeconds / 60);
            document.getElementById('timerSeconds').value = totalSeconds % 60;
            document.getElementById('timerStatus').textContent = 'Ready to cook! 🍳';
        }

        function updateControls() {
            const startBtn = document.getElementById('startTimer');
            const pauseBtn = document.getElementById('pauseTimer');
            
            if (isRunning) {
                startBtn.style.display = 'none';
                pauseBtn.style.display = 'inline-block';
            } else {
                startBtn.style.display = 'inline-block';
                pauseBtn.style.display = 'none';
            }
        }

        // Event listeners
        document.getElementById('startTimer').addEventListener('click', startTimer);
        document.getElementById('pauseTimer').addEventListener('click', pauseTimer);
        document.getElementById('stopTimer').addEventListener('click', stopTimer);
        document.getElementById('resetTimer').addEventListener('click', resetTimer);

        // Function to set timer from recipe data
        function setTimerFromRecipe(minutes, recipeName) {
            totalSeconds = minutes * 60;
            remainingSeconds = totalSeconds;
            isRunning = false;
            isPaused = false;
            updateDisplay();
            updateControls();
            document.getElementById('timerStatus').textContent = 'Ready to cook: ' + recipeName + ' 🍳';
            document.getElementById('timerMinutes').value = minutes;
            document.getElementById('timerSeconds').value = 0;
        }

        // Listen for messages from VS Code
        window.addEventListener('message', event => {
            const message = event.data;
            switch (message.command) {
                case 'setRecipeTimer':
                    setTimerFromRecipe(message.minutes, message.recipeName);
                    break;
            }
        });

        // Initialize
        updateDisplay();
        updateControls();
    </script>
</body>
</html>`;
    }
}



