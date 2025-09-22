import * as vscode from 'vscode';

export class RecipeProvider implements vscode.TreeDataProvider<RecipeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<RecipeItem | undefined | null | void> = new vscode.EventEmitter<RecipeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<RecipeItem | undefined | null | void> = this._onDidChangeTreeData.event;

    constructor() {
        // Initialize with some sample recipes
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: RecipeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: RecipeItem): Thenable<RecipeItem[]> {
        if (!element) {
            // Return root level items
            return Promise.resolve([
                new RecipeItem('🍳 All Recipes', 'all', vscode.TreeItemCollapsibleState.Collapsed),
                new RecipeItem('👶 Beginner Recipes', 'beginner', vscode.TreeItemCollapsibleState.Collapsed),
                new RecipeItem('👨‍🍳 Intermediate Recipes', 'intermediate', vscode.TreeItemCollapsibleState.Collapsed),
                new RecipeItem('👨‍💼 Advanced Recipes', 'advanced', vscode.TreeItemCollapsibleState.Collapsed),
                new RecipeItem('❤️ Favorite Recipes', 'favorites', vscode.TreeItemCollapsibleState.Collapsed),
            ]);
        } else {
            // Return recipes based on category
            return this.getRecipesForCategory(element.category || 'all');
        }
    }

    private getRecipesForCategory(category: string): Thenable<RecipeItem[]> {
        // This would typically load from your recipes database
        // For now, returning sample recipes
        const sampleRecipes: { [key: string]: RecipeItem[] } = {
            'all': [
                new RecipeItem('🍝 Spaghetti Carbonara', 'carbonara', vscode.TreeItemCollapsibleState.None, 'intermediate'),
                new RecipeItem('🥗 Caesar Salad', 'caesar', vscode.TreeItemCollapsibleState.None, 'beginner'),
                new RecipeItem('🍕 Margherita Pizza', 'pizza', vscode.TreeItemCollapsibleState.None, 'advanced'),
            ],
            'beginner': [
                new RecipeItem('🥗 Caesar Salad', 'caesar', vscode.TreeItemCollapsibleState.None, 'beginner'),
                new RecipeItem('🍳 Scrambled Eggs', 'eggs', vscode.TreeItemCollapsibleState.None, 'beginner'),
                new RecipeItem('🥪 Grilled Cheese', 'grilled-cheese', vscode.TreeItemCollapsibleState.None, 'beginner'),
            ],
            'intermediate': [
                new RecipeItem('🍝 Spaghetti Carbonara', 'carbonara', vscode.TreeItemCollapsibleState.None, 'intermediate'),
                new RecipeItem('🍗 Chicken Parmesan', 'chicken-parm', vscode.TreeItemCollapsibleState.None, 'intermediate'),
                new RecipeItem('🍲 Beef Stew', 'beef-stew', vscode.TreeItemCollapsibleState.None, 'intermediate'),
            ],
            'advanced': [
                new RecipeItem('🍕 Margherita Pizza', 'pizza', vscode.TreeItemCollapsibleState.None, 'advanced'),
                new RecipeItem('🥩 Beef Wellington', 'beef-wellington', vscode.TreeItemCollapsibleState.None, 'advanced'),
                new RecipeItem('🍰 Tiramisu', 'tiramisu', vscode.TreeItemCollapsibleState.None, 'advanced'),
            ],
            'favorites': [
                new RecipeItem('🍝 Spaghetti Carbonara', 'carbonara', vscode.TreeItemCollapsibleState.None, 'intermediate'),
                new RecipeItem('🥗 Caesar Salad', 'caesar', vscode.TreeItemCollapsibleState.None, 'beginner'),
            ]
        };

        return Promise.resolve(sampleRecipes[category] || []);
    }
}

export class RecipeItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly recipeId: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly category?: string
    ) {
        super(label, collapsibleState);
        
        this.tooltip = `${this.label} - Click to open in DevChef`;
        this.command = {
            command: 'devchef.openDevChef',
            title: 'Open Recipe',
            arguments: [this.recipeId]
        };
        
        // Set icon based on category
        if (category) {
            switch (category) {
                case 'beginner':
                    this.iconPath = new vscode.ThemeIcon('symbol-numeric', new vscode.ThemeColor('charts.green'));
                    break;
                case 'intermediate':
                    this.iconPath = new vscode.ThemeIcon('symbol-numeric', new vscode.ThemeColor('charts.orange'));
                    break;
                case 'advanced':
                    this.iconPath = new vscode.ThemeIcon('symbol-numeric', new vscode.ThemeColor('charts.red'));
                    break;
                default:
                    this.iconPath = new vscode.ThemeIcon('heart');
            }
        }
    }
}



