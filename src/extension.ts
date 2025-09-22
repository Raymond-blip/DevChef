import * as vscode from 'vscode';
import { DevChefPanel } from './devchefPanel';
import { TimerPanel } from './timerPanel';
import { RecipeProvider } from './recipeProvider';

export function activate(context: vscode.ExtensionContext) {
    console.log('DevChef extension is now active! 🍳');

    // Register commands
    const openDevChefCommand = vscode.commands.registerCommand('devchef.openDevChef', () => {
        DevChefPanel.createOrShow(context.extensionUri);
    });

    const openTimerCommand = vscode.commands.registerCommand('devchef.openTimer', () => {
        TimerPanel.createOrShow(context.extensionUri);
    });

    const generateRecipeCommand = vscode.commands.registerCommand('devchef.generateRecipe', () => {
        DevChefPanel.createOrShow(context.extensionUri);
        // Focus on the AI recipe generator
        setTimeout(() => {
            DevChefPanel.currentPanel?.focusRecipeGenerator();
        }, 500);
    });

    const quickRecipeCommand = vscode.commands.registerCommand('devchef.quickRecipe', async () => {
        const query = await vscode.window.showInputBox({
            prompt: 'What would you like to cook?',
            placeHolder: 'e.g., "healthy chicken stir fry", "vegan chocolate cake"',
            ignoreFocusOut: true
        });

        if (query) {
            DevChefPanel.createOrShow(context.extensionUri);
            setTimeout(() => {
                DevChefPanel.currentPanel?.generateQuickRecipe(query);
            }, 500);
        }
    });

    // Add commands to context
    context.subscriptions.push(
        openDevChefCommand,
        openTimerCommand,
        generateRecipeCommand,
        quickRecipeCommand
    );

    // Check if auto-open is enabled
    const config = vscode.workspace.getConfiguration('devchef');
    if (config.get('autoOpenOnStartup')) {
        DevChefPanel.createOrShow(context.extensionUri);
    }

    // Register tree data provider for recipes (optional)
    const recipeProvider = new RecipeProvider();
    vscode.window.registerTreeDataProvider('devchefRecipes', recipeProvider);

    // Add status bar item
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = "$(heart) DevChef";
    statusBarItem.tooltip = "Open DevChef - Recipes for Coders";
    statusBarItem.command = 'devchef.openDevChef';
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

    // Show welcome message
    vscode.window.showInformationMessage(
        '🍳 DevChef is ready! Use Ctrl+Shift+P and search for "DevChef" to get started.',
        'Open DevChef'
    ).then(selection => {
        if (selection === 'Open DevChef') {
            vscode.commands.executeCommand('devchef.openDevChef');
        }
    });
}

export function deactivate() {
    console.log('DevChef extension is now deactivated');
}

