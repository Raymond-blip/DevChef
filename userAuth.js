// User Authentication System for DevChef
// This handles login, registration, and user data management

class UserAuth {
    constructor() {
        this.currentUser = null;
        this.userDatabase = this.loadUserDatabase();
        this.userStats = this.loadUserStats();
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkAuthState();
        this.createDemoAccount();
    }

    // Create demo account if it doesn't exist

    createDemoAccount() {
        const demoEmail = 'demo@devchef.com';
        if (!this.userDatabase[demoEmail]) {
            this.userDatabase[demoEmail] = {
                id: 'demo-user',
                name: 'Demo Developer',
                email: demoEmail,
                password: this.hashPassword('demo123'),
                developerType: 'fullstack',
                createdAt: new Date().toISOString(),
                avatar: '👨‍💻'
            };
            this.saveUserDatabase();
        }
    }

    // Load user database from localStorage
    loadUserDatabase() {
        const stored = localStorage.getItem('devchef_users');
        return stored ? JSON.parse(stored) : {};
    }

    // Save user database to localStorage
    saveUserDatabase() {
        localStorage.setItem('devchef_users', JSON.stringify(this.userDatabase));
    }

    // Load user stats from localStorage
    loadUserStats() {
        const stored = localStorage.getItem('devchef_user_stats');
        return stored ? JSON.parse(stored) : {};
    }

    // Save user stats to localStorage
    saveUserStats() {
        localStorage.setItem('devchef_user_stats', JSON.stringify(this.userStats));
    }

    // Simple password hashing (in production, use proper bcrypt or similar)
    hashPassword(password) {
        // Simple hash for demo purposes - in production use proper hashing
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString();
    }

    // Generate user ID
    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Bind event listeners
    bindEvents() {
        // Header buttons
        document.getElementById('loginBtn').addEventListener('click', () => this.showLogin());
        document.getElementById('registerBtn').addEventListener('click', () => this.showRegister());

        // Modal close buttons
        document.getElementById('closeAuth').addEventListener('click', () => this.closeAuth());
        document.getElementById('closeDashboard').addEventListener('click', () => this.closeDashboard());

        // Form switch buttons
        document.getElementById('showRegister').addEventListener('click', (e) => {
            e.preventDefault();
            this.switchToRegister();
        });
        document.getElementById('showLogin').addEventListener('click', (e) => {
            e.preventDefault();
            this.switchToLogin();
        });

        // Form submissions
        document.getElementById('loginFormElement').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('registerFormElement').addEventListener('submit', (e) => this.handleRegister(e));

        // Close modals when clicking outside
        document.getElementById('loginModal').addEventListener('click', (e) => {
            if (e.target.id === 'loginModal') this.closeAuth();
        });
        document.getElementById('userDashboard').addEventListener('click', (e) => {
            if (e.target.id === 'userDashboard') this.closeDashboard();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAuth();
                this.closeDashboard();
            }
        });
    }

    // Check if user is already logged in
    checkAuthState() {
        const savedUser = localStorage.getItem('devchef_current_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.showUserProfile();
        }
    }

    // Show login modal
    showLogin() {
        document.getElementById('loginModal').style.display = 'block';
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginEmail').focus();
    }

    // Show register modal
    showRegister() {
        document.getElementById('loginModal').style.display = 'block';
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
        document.getElementById('registerName').focus();
    }

    // Switch to register form
    switchToRegister() {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
        document.getElementById('registerName').focus();
    }

    // Switch to login form
    switchToLogin() {
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginEmail').focus();
    }

    // Close auth modal
    closeAuth() {
        document.getElementById('loginModal').style.display = 'none';
        this.clearForms();
    }

    // Close dashboard modal
    closeDashboard() {
        document.getElementById('userDashboard').style.display = 'none';
    }

    // Clear form inputs
    clearForms() {
        document.getElementById('loginFormElement').reset();
        document.getElementById('registerFormElement').reset();
    }

    // Handle login form submission
    async handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        if (!email || !password) {
            this.showError('Please fill in all fields');
            return;
        }

        // Check if user exists
        const user = this.userDatabase[email];
        if (!user) {
            this.showError('Account not found. Please check your email or create an account.');
            return;
        }

        // Verify password
        if (user.password !== this.hashPassword(password)) {
            this.showError('Incorrect password. Please try again.');
            return;
        }

        // Login successful
        this.currentUser = user;
        localStorage.setItem('devchef_current_user', JSON.stringify(user));
        
        this.showUserProfile();
        this.closeAuth();
        this.showSuccess(`Welcome back, ${user.name}! 🍳`);
        
        // Update last login
        user.lastLogin = new Date().toISOString();
        this.saveUserDatabase();
    }

    // Handle register form submission
    async handleRegister(e) {
        e.preventDefault();
        
        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const developerType = document.getElementById('developerType').value;

        // Validation
        if (!name || !email || !password || !confirmPassword || !developerType) {
            this.showError('Please fill in all fields');
            return;
        }

        if (password.length < 6) {
            this.showError('Password must be at least 6 characters long');
            return;
        }

        if (password !== confirmPassword) {
            this.showError('Passwords do not match');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showError('Please enter a valid email address');
            return;
        }

        // Check if user already exists
        if (this.userDatabase[email]) {
            this.showError('An account with this email already exists. Please sign in instead.');
            return;
        }

        // Create new user
        const newUser = {
            id: this.generateUserId(),
            name: name,
            email: email,
            password: this.hashPassword(password),
            developerType: developerType,
            createdAt: new Date().toISOString(),
            avatar: this.getAvatarForDeveloperType(developerType)
        };

        // Save user to database
        this.userDatabase[email] = newUser;
        this.saveUserDatabase();

        // Initialize user stats
        this.userStats[newUser.id] = {
            recipesCooked: 0,
            totalCookingTime: 0,
            favoriteRecipes: [],
            cookingLevel: 'Beginner',
            achievements: [],
            cookingHistory: []
        };
        this.saveUserStats();

        // Auto-login the new user
        this.currentUser = newUser;
        localStorage.setItem('devchef_current_user', JSON.stringify(newUser));
        
        this.showUserProfile();
        this.closeAuth();
        this.showSuccess(`Welcome to DevChef, ${name}! 🎉 Your account has been created successfully!`);
    }

    // Get avatar emoji based on developer type
    getAvatarForDeveloperType(type) {
        const avatars = {
            frontend: '🎨',
            backend: '⚙️',
            fullstack: '👨‍💻',
            mobile: '📱',
            devops: '🚀',
            data: '📊',
            other: '💻'
        };
        return avatars[type] || '👨‍💻';
    }

    // Email validation
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show user profile in header
    showUserProfile() {
        if (!this.currentUser) return;

        // Hide auth buttons, show profile
        document.getElementById('userAuth').style.display = 'none';
        document.getElementById('userProfile').style.display = 'flex';

        // Update profile info
        document.getElementById('userProfileName').textContent = this.currentUser.name.split(' ')[0];
        document.getElementById('userProfileAvatar').textContent = this.currentUser.avatar;
    }

    // Show dashboard
    showDashboard() {
        if (!this.currentUser) return;

        const stats = this.userStats[this.currentUser.id] || {
            recipesCooked: 0,
            totalCookingTime: 0,
            favoriteRecipes: [],
            cookingLevel: 'Beginner'
        };

        // Update dashboard info
        document.getElementById('userName').textContent = this.currentUser.name;
        document.getElementById('userEmail').textContent = this.currentUser.email;
        document.getElementById('userAvatar').textContent = this.currentUser.avatar;
        document.getElementById('userType').textContent = this.formatDeveloperType(this.currentUser.developerType);

        // Update stats
        document.getElementById('recipesCooked').textContent = stats.recipesCooked;
        document.getElementById('cookingTime').textContent = this.formatCookingTime(stats.totalCookingTime);
        document.getElementById('favoriteRecipes').textContent = stats.favoriteRecipes.length;
        document.getElementById('userLevel').textContent = stats.cookingLevel;

        // Show dashboard
        document.getElementById('userDashboard').style.display = 'block';
    }

    // Format developer type for display
    formatDeveloperType(type) {
        const types = {
            frontend: 'Frontend Developer',
            backend: 'Backend Developer',
            fullstack: 'Full Stack Developer',
            mobile: 'Mobile Developer',
            devops: 'DevOps Engineer',
            data: 'Data Scientist',
            other: 'Software Developer'
        };
        return types[type] || 'Software Developer';
    }

    // Format cooking time for display
    formatCookingTime(minutes) {
        if (minutes < 60) return `${minutes}m`;
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        if (remainingMinutes === 0) return `${hours}h`;
        return `${hours}h ${remainingMinutes}m`;
    }

    // Logout user
    logout() {
        this.currentUser = null;
        localStorage.removeItem('devchef_current_user');
        
        // Show auth buttons, hide profile
        document.getElementById('userAuth').style.display = 'flex';
        document.getElementById('userProfile').style.display = 'none';
        
        this.closeDashboard();
        this.showSuccess('Successfully logged out. See you next time! 👋');
    }

    // Track user cooking activity
    trackRecipeCooked(recipe) {
        if (!this.currentUser) return;

        const userId = this.currentUser.id;
        if (!this.userStats[userId]) {
            this.userStats[userId] = {
                recipesCooked: 0,
                totalCookingTime: 0,
                favoriteRecipes: [],
                cookingLevel: 'Beginner',
                achievements: [],
                cookingHistory: []
            };
        }

        const stats = this.userStats[userId];
        stats.recipesCooked++;
        
        // Parse runtime - handle both string ("30 min") and number formats
        let cookingTime = 15; // default
        if (recipe.runtime) {
            if (typeof recipe.runtime === 'number') {
                cookingTime = recipe.runtime;
            } else if (typeof recipe.runtime === 'string') {
                const match = recipe.runtime.match(/(\d+)/);
                cookingTime = match ? parseInt(match[1]) : 15;
            }
        }
        
        stats.totalCookingTime += cookingTime;
        stats.cookingHistory.push({
            recipeId: recipe.id || recipe.title,
            recipeName: recipe.title,
            cookedAt: new Date().toISOString(),
            cookingTime: cookingTime
        });

        // Update cooking level based on recipes cooked
        if (stats.recipesCooked >= 20) stats.cookingLevel = 'Expert';
        else if (stats.recipesCooked >= 10) stats.cookingLevel = 'Intermediate';
        else if (stats.recipesCooked >= 5) stats.cookingLevel = 'Advanced Beginner';

        this.saveUserStats();
    }

    // Add recipe to favorites
    toggleFavorite(recipe) {
        if (!this.currentUser) return false;

        const userId = this.currentUser.id;
        if (!this.userStats[userId]) {
            this.userStats[userId] = {
                recipesCooked: 0,
                totalCookingTime: 0,
                favoriteRecipes: [],
                cookingLevel: 'Beginner',
                achievements: [],
                cookingHistory: []
            };
        }

        const stats = this.userStats[userId];
        const recipeId = recipe.id || recipe.title;
        const index = stats.favoriteRecipes.findIndex(fav => fav.id === recipeId);

        if (index > -1) {
            // Remove from favorites
            stats.favoriteRecipes.splice(index, 1);
            this.saveUserStats();
            return false;
        } else {
            // Add to favorites
            stats.favoriteRecipes.push({
                id: recipeId,
                title: recipe.title,
                addedAt: new Date().toISOString()
            });
            this.saveUserStats();
            return true;
        }
    }

    // Check if recipe is favorite
    isFavorite(recipe) {
        if (!this.currentUser) return false;

        const userId = this.currentUser.id;
        if (!this.userStats[userId]) {
            this.userStats[userId] = {
                recipesCooked: 0,
                totalCookingTime: 0,
                favoriteRecipes: [],
                cookingLevel: 'Beginner',
                achievements: [],
                cookingHistory: []
            };
            return false;
        }

        const stats = this.userStats[userId];
        const recipeId = recipe.id || recipe.title;
        return stats.favoriteRecipes.some(fav => fav.id === recipeId);
    }

    // Show error message
    showError(message) {
        // You can replace this with a nicer toast notification
        alert(`❌ Error: ${message}`);
    }

    // Show success message
    showSuccess(message) {
        // You can replace this with a nicer toast notification
        alert(`✅ ${message}`);
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Get user stats
    getUserStats() {
        if (!this.currentUser) return null;
        return this.userStats[this.currentUser.id] || null;
    }
}

// Global functions for use in HTML
function showDashboard() {
    if (window.userAuth) {
        window.userAuth.showDashboard();
    }
}

function closeDashboard() {
    if (window.userAuth) {
        window.userAuth.closeDashboard();
    }
}

function logout() {
    if (window.userAuth) {
        window.userAuth.logout();
    }
}

// Export functions
window.showDashboard = showDashboard;
window.closeDashboard = closeDashboard;
window.logout = logout;

// Initialize auth system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.userAuth = new UserAuth();
});
