// Team Meal Planning System for DevChef
// Handles team creation, meal planning, and collaboration features

class TeamPlanning {
    constructor() {
        this.teams = this.loadTeams();
        this.currentTeam = null;
        this.mealPlans = this.loadMealPlans();
        this.selectedMealSlot = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.createSampleTeams(); // Create some sample teams for demo
    }

    // Load teams from localStorage
    loadTeams() {
        const stored = localStorage.getItem('devchef_teams');
        return stored ? JSON.parse(stored) : {};
    }

    // Save teams to localStorage
    saveTeams() {
        localStorage.setItem('devchef_teams', JSON.stringify(this.teams));
    }

    // Load meal plans from localStorage
    loadMealPlans() {
        const stored = localStorage.getItem('devchef_meal_plans');
        return stored ? JSON.parse(stored) : {};
    }

    // Save meal plans to localStorage
    saveMealPlans() {
        localStorage.setItem('devchef_meal_plans', JSON.stringify(this.mealPlans));
    }

    // Create sample teams for demonstration
    createSampleTeams() {
        if (Object.keys(this.teams).length === 0) {
            this.teams = {
                'frontend-squad': {
                    id: 'frontend-squad',
                    name: 'Frontend Squad',
                    description: 'React wizards and CSS ninjas',
                    type: 'startup',
                    members: ['john@dev.com', 'jane@dev.com', 'alex@dev.com'],
                    createdBy: 'demo@devchef.com',
                    createdAt: new Date().toISOString(),
                    stats: {
                        plannedMeals: 5,
                        totalRecipes: 12,
                        activeWeeks: 3
                    }
                },
                'backend-bros': {
                    id: 'backend-bros',
                    name: 'Backend Bros',
                    description: 'API architects and database masters',
                    type: 'corporate',
                    members: ['mike@dev.com', 'sarah@dev.com'],
                    createdBy: 'demo@devchef.com',
                    createdAt: new Date().toISOString(),
                    stats: {
                        plannedMeals: 3,
                        totalRecipes: 8,
                        activeWeeks: 2
                    }
                }
            };
            this.saveTeams();
        }
    }

    // Bind event listeners
    bindEvents() {
        // Modal close buttons
        document.getElementById('closeTeamPlanning').addEventListener('click', () => this.closeTeamPlanning());
        document.getElementById('closeMealPlan').addEventListener('click', () => this.closeMealPlanModal());

        // Team creation form
        document.getElementById('createTeamForm').addEventListener('submit', (e) => this.handleCreateTeam(e));

        // Close modals when clicking outside
        document.getElementById('teamPlanningModal').addEventListener('click', (e) => {
            if (e.target.id === 'teamPlanningModal') this.closeTeamPlanning();
        });
        document.getElementById('mealPlanModal').addEventListener('click', (e) => {
            if (e.target.id === 'mealPlanModal') this.closeMealPlanModal();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeTeamPlanning();
                this.closeMealPlanModal();
            }
        });
    }

    // Show team planning modal
    showTeamPlanning() {
        if (!window.userAuth || !window.userAuth.getCurrentUser()) {
            window.userAuth.showLogin();
            window.userAuth.showToast('Please sign in to access team planning features!');
            return;
        }

        document.getElementById('teamPlanningModal').style.display = 'block';
        this.showTeamSelection();
    }

    // Close team planning modal
    closeTeamPlanning() {
        document.getElementById('teamPlanningModal').style.display = 'none';
        this.currentTeam = null;
    }

    // Show team selection screen
    showTeamSelection() {
        document.getElementById('teamSelection').style.display = 'block';
        document.getElementById('teamDashboard').style.display = 'none';
        this.renderTeamsList();
    }

    // Render teams list
    renderTeamsList() {
        const teamsList = document.getElementById('teamsList');
        const currentUser = window.userAuth.getCurrentUser();
        
        if (!currentUser) return;

        // Filter teams where user is member or creator
        const userTeams = Object.values(this.teams).filter(team => 
            team.createdBy === currentUser.email || team.members.includes(currentUser.email)
        );

        if (userTeams.length === 0) {
            teamsList.innerHTML = `
                <div class="no-teams">
                    <p>🏢 You haven't joined any teams yet.</p>
                    <p>Create your first team or ask a colleague to invite you!</p>
                </div>
            `;
            return;
        }

        teamsList.innerHTML = userTeams.map(team => `
            <div class="team-item" onclick="window.teamPlanning.selectTeam('${team.id}')">
                <div class="team-item-header">
                    <span class="team-item-name">${team.name}</span>
                    <span class="team-item-type">${team.type}</span>
                </div>
                <div class="team-item-desc">${team.description}</div>
                <div class="team-item-stats">
                    <span>👥 ${team.members.length} members</span>
                    <span>📅 ${team.stats.plannedMeals} planned meals</span>
                    <span>🍳 ${team.stats.totalRecipes} recipes</span>
                </div>
            </div>
        `).join('');
    }

    // Handle team creation
    handleCreateTeam(e) {
        e.preventDefault();
        
        const currentUser = window.userAuth.getCurrentUser();
        if (!currentUser) return;

        const teamName = document.getElementById('teamName').value.trim();
        const teamDescription = document.getElementById('teamDescription').value.trim();
        const teamType = document.getElementById('teamType').value;

        if (!teamName || !teamType) {
            this.showToast('Please fill in team name and type!');
            return;
        }

        const teamId = teamName.toLowerCase().replace(/[^a-z0-9]/g, '-');
        
        if (this.teams[teamId]) {
            this.showToast('A team with this name already exists!');
            return;
        }

        const newTeam = {
            id: teamId,
            name: teamName,
            description: teamDescription || 'A awesome dev team',
            type: teamType,
            members: [currentUser.email],
            createdBy: currentUser.email,
            createdAt: new Date().toISOString(),
            stats: {
                plannedMeals: 0,
                totalRecipes: 0,
                activeWeeks: 0
            }
        };

        this.teams[teamId] = newTeam;
        this.saveTeams();

        // Clear form
        document.getElementById('createTeamForm').reset();
        
        // Refresh teams list and show success
        this.renderTeamsList();
        this.showToast(`🎉 Team "${teamName}" created successfully!`);
    }

    // Select and show team dashboard
    selectTeam(teamId) {
        this.currentTeam = this.teams[teamId];
        if (!this.currentTeam) return;

        // Switch to dashboard view
        document.getElementById('teamSelection').style.display = 'none';
        document.getElementById('teamDashboard').style.display = 'block';

        // Update dashboard content
        this.renderTeamDashboard();
    }

    // Render team dashboard
    renderTeamDashboard() {
        if (!this.currentTeam) return;

        // Update team header
        document.getElementById('currentTeamName').textContent = this.currentTeam.name;

        // Update stats
        document.getElementById('teamMemberCount').textContent = this.currentTeam.members.length;
        document.getElementById('plannedMealsCount').textContent = this.currentTeam.stats.plannedMeals;
        document.getElementById('teamRecipesCount').textContent = this.currentTeam.stats.totalRecipes;

        // Load meal plans for this team
        this.renderMealCalendar();
    }

    // Render meal calendar
    renderMealCalendar() {
        // Get meal plans for current team and week
        const teamMealPlans = this.mealPlans[this.currentTeam.id] || {};
        const currentWeek = this.getCurrentWeek();
        const weekPlans = teamMealPlans[currentWeek] || {};

        // Update calendar slots
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
        days.forEach(day => {
            const slot = document.querySelector(`[data-day="${day}"]`);
            const mealContent = slot.querySelector('.meal-content');
            
            if (weekPlans[day]) {
                const plan = weekPlans[day];
                mealContent.innerHTML = `
                    <div class="planned-meal">${plan.recipeName}</div>
                    <div class="meal-participants">${plan.participants.length} people</div>
                `;
                slot.classList.add('planned');
            } else {
                mealContent.innerHTML = `<span class="add-meal">+ Plan Meal</span>`;
                slot.classList.remove('planned');
            }
        });
    }

    // Get current week identifier
    getCurrentWeek() {
        const now = new Date();
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1));
        return startOfWeek.toISOString().split('T')[0];
    }

    // Plan meal for specific day
    planMeal(day, time) {
        if (!this.currentTeam) return;

        this.selectedMealSlot = { day, time };
        
        // Show meal planning modal
        document.getElementById('mealPlanModal').style.display = 'block';
        
        // Update selected time display
        const dayName = day.charAt(0).toUpperCase() + day.slice(1);
        document.getElementById('selectedDateTime').textContent = `${dayName} ${time}`;
        
        // Load team members as participants
        this.renderParticipants();
        
        // Setup recipe search
        this.setupRecipeSearch();
    }

    // Render participants list
    renderParticipants() {
        const participantsList = document.getElementById('participantsList');
        
        participantsList.innerHTML = this.currentTeam.members.map(email => `
            <div class="participant-tag">
                <span>${email.split('@')[0]}</span>
                <span>✓</span>
            </div>
        `).join('');
    }

    // Setup recipe search functionality
    setupRecipeSearch() {
        const searchInput = document.querySelector('#mealPlanModal #recipeSearch');
        const resultsContainer = document.getElementById('recipeResults');

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length < 2) {
                resultsContainer.innerHTML = '';
                return;
            }

            // Search recipes
            const results = window.devChef.recipes.filter(recipe => 
                recipe.title.toLowerCase().includes(query) ||
                recipe.description.toLowerCase().includes(query)
            ).slice(0, 5);

            resultsContainer.innerHTML = results.map(recipe => `
                <div class="recipe-result-item" onclick="window.teamPlanning.selectRecipe('${recipe.id || recipe.title}', '${recipe.title}')">
                    <strong>${recipe.title}</strong>
                    <div style="font-size: 0.8rem; color: var(--text-secondary);">${recipe.description}</div>
                </div>
            `).join('');
        });
    }

    // Select recipe for meal plan
    selectRecipe(recipeId, recipeName) {
        this.selectedRecipe = { id: recipeId, name: recipeName };
        
        // Update search input
        document.querySelector('#mealPlanModal #recipeSearch').value = recipeName;
        document.getElementById('recipeResults').innerHTML = '';
    }

    // Save meal plan
    saveMealPlan() {
        if (!this.currentTeam || !this.selectedMealSlot || !this.selectedRecipe) {
            this.showToast('Please select a recipe first!');
            return;
        }

        const notes = document.getElementById('mealNotes').value.trim();
        const currentWeek = this.getCurrentWeek();

        // Initialize meal plans structure
        if (!this.mealPlans[this.currentTeam.id]) {
            this.mealPlans[this.currentTeam.id] = {};
        }
        if (!this.mealPlans[this.currentTeam.id][currentWeek]) {
            this.mealPlans[this.currentTeam.id][currentWeek] = {};
        }

        // Save meal plan
        this.mealPlans[this.currentTeam.id][currentWeek][this.selectedMealSlot.day] = {
            recipeId: this.selectedRecipe.id,
            recipeName: this.selectedRecipe.name,
            time: this.selectedMealSlot.time,
            participants: this.currentTeam.members,
            notes: notes,
            plannedBy: window.userAuth.getCurrentUser().email,
            plannedAt: new Date().toISOString()
        };

        // Update team stats
        this.currentTeam.stats.plannedMeals++;
        this.teams[this.currentTeam.id] = this.currentTeam;

        // Save to localStorage
        this.saveMealPlans();
        this.saveTeams();

        // Close modal and refresh
        this.closeMealPlanModal();
        this.renderTeamDashboard();
        
        this.showToast(`🍽️ Meal planned for ${this.selectedMealSlot.day}!`);
    }

    // Close meal plan modal
    closeMealPlanModal() {
        document.getElementById('mealPlanModal').style.display = 'none';
        this.selectedMealSlot = null;
        this.selectedRecipe = null;
        
        // Clear form
        document.querySelector('#mealPlanModal #recipeSearch').value = '';
        document.getElementById('recipeResults').innerHTML = '';
        document.getElementById('mealNotes').value = '';
    }

    // AI meal suggestion
    suggestTeamMeal() {
        const suggestions = [
            "🍕 Friday Pizza Party - Perfect for team bonding!",
            "🥗 Healthy Monday Salads - Start the week right!",
            "🌮 Taco Tuesday - Fun and customizable!",
            "🍜 Ramen Wednesday - Comfort food for midweek blues!",
            "🍱 Bento Box Thursday - Organized and nutritious!"
        ];
        
        const suggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
        this.showToast(`💡 AI Suggestion: ${suggestion}`);
    }

    // Create team poll
    createTeamPoll() {
        this.showToast('🗳️ Food polling feature coming soon! For now, discuss options in your team chat.');
    }

    // View shopping list
    viewShoppingList() {
        if (!this.currentTeam) return;

        const currentWeek = this.getCurrentWeek();
        const weekPlans = this.mealPlans[this.currentTeam.id]?.[currentWeek] || {};
        
        if (Object.keys(weekPlans).length === 0) {
            this.showToast('📝 No meals planned this week. Plan some meals first!');
            return;
        }

        // Generate shopping list from planned meals
        let shoppingList = "🛒 Team Shopping List\n\n";
        Object.entries(weekPlans).forEach(([day, plan]) => {
            shoppingList += `${day.charAt(0).toUpperCase() + day.slice(1)}: ${plan.recipeName}\n`;
        });
        
        shoppingList += "\n📋 Ingredients needed:\n• Check individual recipes for details\n• Coordinate with team members for quantities";
        
        alert(shoppingList);
    }

    // Invite team members
    inviteTeamMembers() {
        const email = prompt('Enter email address to invite:');
        if (!email || !this.isValidEmail(email)) {
            this.showToast('Please enter a valid email address!');
            return;
        }

        if (this.currentTeam.members.includes(email)) {
            this.showToast('This person is already a team member!');
            return;
        }

        this.currentTeam.members.push(email);
        this.teams[this.currentTeam.id] = this.currentTeam;
        this.saveTeams();

        this.renderTeamDashboard();
        this.showToast(`📧 Invitation sent to ${email}!`);
    }

    // Email validation
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show toast notification
    showToast(message) {
        if (window.devChef && window.devChef.showToast) {
            window.devChef.showToast(message);
        } else {
            alert(message);
        }
    }
}

// Global functions for HTML onclick handlers
function showTeamPlanning() {
    if (window.teamPlanning) {
        window.teamPlanning.showTeamPlanning();
    }
}

function showTeamSelection() {
    if (window.teamPlanning) {
        window.teamPlanning.showTeamSelection();
    }
}

function planMeal(day, time) {
    if (window.teamPlanning) {
        window.teamPlanning.planMeal(day, time);
    }
}

function saveMealPlan() {
    if (window.teamPlanning) {
        window.teamPlanning.saveMealPlan();
    }
}

function closeMealPlanModal() {
    if (window.teamPlanning) {
        window.teamPlanning.closeMealPlanModal();
    }
}

function suggestTeamMeal() {
    if (window.teamPlanning) {
        window.teamPlanning.suggestTeamMeal();
    }
}

function createTeamPoll() {
    if (window.teamPlanning) {
        window.teamPlanning.createTeamPoll();
    }
}

function viewShoppingList() {
    if (window.teamPlanning) {
        window.teamPlanning.viewShoppingList();
    }
}

function inviteTeamMembers() {
    if (window.teamPlanning) {
        window.teamPlanning.inviteTeamMembers();
    }
}

// Make functions available globally
window.showTeamPlanning = showTeamPlanning;
window.showTeamSelection = showTeamSelection;
window.planMeal = planMeal;
window.saveMealPlan = saveMealPlan;
window.closeMealPlanModal = closeMealPlanModal;
window.suggestTeamMeal = suggestTeamMeal;
window.createTeamPoll = createTeamPoll;
window.viewShoppingList = viewShoppingList;
window.inviteTeamMembers = inviteTeamMembers;

// Initialize team planning system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.teamPlanning = new TeamPlanning();
});
