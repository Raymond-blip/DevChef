# 🍳 DevChef - AI-Powered Recipe Generator

A modern, interactive web application **AND VS Code Extension** that combines traditional cooking with AI-powered recipe generation. Perfect for developers who love to cook!

[![VS Code Extension](https://img.shields.io/badge/VS%20Code-Extension-blue?logo=visualstudiocode)](https://marketplace.visualstudio.com/items?itemName=devchef.devchef)
[![Web App](https://img.shields.io/badge/Web-App-green)](https://raymond-blip.github.io/devchef)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)

## ✨ Features

### 🤖 AI Recipe Generator
- **Smart Recipe Creation**: Generate custom recipes based on your ingredients or preferences
- **Intelligent Suggestions**: AI suggests complementary ingredients and cooking techniques
- **Dynamic Titles**: Creative, appetizing recipe names generated automatically

### 👨‍💻 Developer-Focused Features
- **User Authentication**: Secure login system with user profiles
- **Progress Tracking**: Mark recipes as cooked and track your cooking journey
- **Favorites System**: Save your favorite recipes for easy access
- **Cooking Timers**: Built-in timers for different cooking stages
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### 🍽️ Recipe Management
- **Rich Recipe Database**: Curated collection of delicious recipes
- **Detailed Instructions**: Step-by-step cooking guides with tips
- **Nutritional Information**: Track calories, protein, carbs, and more
- **Complexity Levels**: Easy, Medium, and Hard recipes for all skill levels
- **Cooking Times**: Accurate prep and cook time estimates

### 🎨 Modern UI/UX
- **Dark Theme**: Easy on the eyes for long coding sessions
- **Smooth Animations**: Beautiful transitions and loading states
- **Interactive Elements**: Hover effects, toast notifications, and more
- **Accessibility**: Keyboard navigation and screen reader friendly

## 🚀 Quick Start

### 🌐 Web Application

#### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software required!

#### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Raymond-blip/devchef.git
   cd devchef
   ```

2. **Open the application**
   ```bash
   # Simply open index.html in your browser
   open index.html
   # or double-click index.html in your file explorer
   ```

3. **Start cooking!**
   - Create an account or use the demo account: `demo@devchef.com` / `demo123`
   - Browse recipes or generate new ones with AI
   - Track your cooking progress and build your recipe collection

### 🔌 VS Code Extension

#### Installation
1. **Open VS Code**
2. **Go to Extensions** (`Ctrl+Shift+X`)
3. **Search for "DevChef"**
4. **Click Install**

#### Usage
- **Command Palette**: `Ctrl+Shift+P` → "DevChef: Open DevChef"
- **Status Bar**: Click "❤️ DevChef" in bottom-right corner
- **Quick Timer**: `Ctrl+Shift+P` → "DevChef: Open Cooking Timer"
- **AI Recipe**: `Ctrl+Shift+P` → "DevChef: Generate AI Recipe"

#### Features
- ✅ **Seamless Integration**: Your cooking companion right inside VS Code
- ✅ **Smart Timer**: Auto-sets cooking time when clicking recipes
- ✅ **VS Code Notifications**: Timer completion alerts
- ✅ **Command Palette**: Quick access to all features
- ✅ **Tree View**: Browse recipes in Explorer sidebar

## 🎯 How to Use

### Getting Started
1. **Sign Up/Login**: Create your account or use the demo credentials
2. **Browse Recipes**: Explore the curated recipe collection
3. **Generate AI Recipes**: Use the AI generator to create custom recipes
4. **Track Progress**: Mark recipes as cooked and add favorites
5. **View Stats**: Check your cooking progress in the dashboard

### AI Recipe Generator
1. Click the "🤖 AI Recipe Generator" section
2. Enter your ingredients or describe what you want to cook
3. Click "Generate Recipe" and wait for the AI magic
4. Review and customize the generated recipe
5. Save it to your collection!

### Demo Account
- **Email**: `demo@devchef.com`
- **Password**: `demo123`

## 🛠️ Technical Details

### Architecture
- **Frontend**: Pure HTML5, CSS3, and Vanilla JavaScript
- **VS Code Extension**: TypeScript with VS Code Extension API
- **Storage**: Local Storage for user data and preferences
- **AI Simulation**: Realistic AI processing simulation with delays
- **Responsive**: Mobile-first design with CSS Grid and Flexbox

### VS Code Extension Structure
```
src/
├── extension.ts          # Main extension entry point
├── devchefPanel.ts       # Main DevChef webview panel
├── timerPanel.ts         # Cooking timer panel
└── recipeProvider.ts     # Recipe tree view provider

out/                      # Compiled JavaScript files
├── extension.js
├── devchefPanel.js
├── timerPanel.js
└── recipeProvider.js
```

### File Structure
```
devchef/
├── index.html          # Main web application file
├── styles.css          # All styling and animations
├── script.js           # Core application logic
├── userAuth.js         # Authentication system
├── recipes.js          # Recipe database and management
├── package.json        # Extension configuration
├── tsconfig.json       # TypeScript configuration
├── src/                # VS Code extension source
│   ├── extension.ts    # Main extension entry point
│   ├── devchefPanel.ts # Main DevChef panel
│   ├── timerPanel.ts   # Cooking timer panel
│   └── recipeProvider.ts # Recipe tree view
├── out/                # Compiled extension files
├── README.md           # This file
└── .gitignore          # Git ignore rules
```

### Key Components
- **DevChef Class**: Main application controller
- **UserAuth Class**: Authentication and user management
- **Recipe Database**: Curated collection of recipes
- **AI Generator**: Simulated AI recipe creation
- **Timer System**: Cooking time management
- **Progress Tracking**: User statistics and achievements

## 🛠️ Development

### Building the VS Code Extension

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Compile TypeScript**
   ```bash
   npm run compile
   ```

3. **Package extension**
   ```bash
   npm run package
   ```

4. **Install locally**
   ```bash
   code --install-extension devchef-1.0.0.vsix
   ```

### Publishing to Marketplace

1. **Install VSCE**
   ```bash
   npm install -g @vscode/vsce
   ```

2. **Login to publisher account**
   ```bash
   vsce login your-publisher-name
   ```

3. **Publish extension**
   ```bash
   vsce publish
   ```

## 🎨 Customization

### Adding New Recipes
Edit `recipes.js` to add your own recipes to the database:

```javascript
{
    id: 'your-recipe-id',
    title: 'Your Recipe Name',
    description: 'Delicious description',
    ingredients: ['ingredient1', 'ingredient2'],
    instructions: [
        { title: 'Step 1', content: 'Do this first' },
        { title: 'Step 2', content: 'Then do this' }
    ],
    runtime: 30,
    complexity: 'medium',
    nutrition: { calories: 350, protein: 25, carbs: 30, fat: 15 }
}
```

### Styling
Modify `styles.css` to customize the appearance:
- Change color schemes in CSS variables
- Adjust animations and transitions
- Modify layout and spacing
- Add your own themes

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Ideas for Contributions
- 🍳 Add more recipes to the database
- 🎨 Improve the UI/UX design
- 🐛 Fix bugs and improve performance
- 📱 Enhance mobile responsiveness
- 🌍 Add internationalization support
- 🔧 Add new features (meal planning, shopping lists, etc.)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Recipe Database**: Curated collection of delicious recipes
- **Icons**: Emoji icons for a fun, modern look
- **Inspiration**: Built for developers who love to cook
- **Community**: Thanks to all contributors and users!

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/devchef/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/devchef/discussions)
- **Email**: your-email@example.com

## 🎉 Features Roadmap

- [ ] Real AI integration (OpenAI API)
- [ ] Recipe sharing and social features
- [ ] Meal planning and shopping lists
- [ ] Nutrition tracking and health insights
- [ ] Recipe scaling and conversion tools
- [ ] Voice commands and accessibility
- [ ] Offline mode and PWA support
- [ ] Multi-language support

---

**Made with ❤️ for developers who love to cook!**

*Star ⭐ this repository if you find it helpful!*