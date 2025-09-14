// DevChef Recipe Database
// Each recipe is a "module" with proper documentation
// Focus on real food that fuels productivity and energy

const recipes = [
    {
        id: "hello-toast",
        title: "Hello, Toast!",
        description: "Your first cooking program. Perfect for debugging hunger at 2 AM.",
        complexity: "beginner",
        runtime: "5 min",
        servings: 1,
        commitMessage: "feat: implement basic toast functionality",
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
        imageAlt: "Golden toast with butter",
        ingredients: {
            "bread": "2 slices",
            "butter": "1 tbsp",
            "salt": "pinch (optional)",
            "patience": "1 unit"
        },
        instructions: [
            {
                title: "initializeBread()",
                content: "Place bread slices in toaster slots. Ensure proper alignment - no bread should be hanging out of the toaster (this will cause a runtime error)."
            },
            {
                title: "executeToast()",
                content: "Set toaster to medium heat (level 3-4). Press down the lever to start the toasting process. This is a blocking operation - do not attempt to multitask."
            },
            {
                title: "awaitCompletion()",
                content: "Wait for the toaster to complete its cycle. You'll hear a 'pop' sound when the operation finishes. Do not interrupt this process."
            },
            {
                title: "applyButter()",
                content: "Remove toast from toaster (be careful, it's hot!). Spread butter evenly across the surface. If you're feeling adventurous, add a pinch of salt."
            },
            {
                title: "serve()",
                content: "Place on plate and enjoy your first successful cooking operation! 🎉"
            }
        ],
        tips: [
            "If your toast burns, use the rollback() function: scrape off the burnt parts with a knife",
            "For debugging: if toast doesn't pop up, check if the toaster is plugged in",
            "Hotfix: if butter won't spread, let the toast cool for 30 seconds first",
            "Pro tip: You can fork this recipe by adding jam, cheese, or avocado"
        ],
        easterEggs: [
            "Try saying 'Hello, World!' while your toast is cooking",
            "This recipe has 100% uptime - it never fails!"
        ]
    },
    {
        id: "bug-free-pasta",
        title: "Bug-Free Pasta",
        description: "A robust pasta implementation with proper error handling and debugging features.",
        complexity: "intermediate",
        runtime: "20 min",
        servings: 2,
        commitMessage: "fix: resolve pasta overflow issues and improve sauce integration",
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
        imageAlt: "Delicious pasta with tomato sauce",
        ingredients: {
            "pasta": "200g (any type)",
            "water": "1L",
            "salt": "1 tbsp",
            "olive_oil": "2 tbsp",
            "garlic": "2 cloves",
            "tomato_sauce": "400ml",
            "parmesan": "50g",
            "basil": "handful",
            "debugging_skills": "1 unit"
        },
        instructions: [
            {
                title: "boilWater()",
                content: "Fill a large pot with water and add salt. Bring to a rolling boil. This is your main cooking thread - it needs to be running before you can execute other operations."
            },
            {
                title: "addPasta()",
                content: "Add pasta to boiling water. Stir immediately to prevent sticking (this prevents a common pasta bug). Set a timer for the package's recommended time minus 2 minutes."
            },
            {
                title: "prepareSauce()",
                content: "While pasta cooks, heat olive oil in a pan. Add minced garlic and cook until fragrant (about 30 seconds). Add tomato sauce and let it simmer."
            },
            {
                title: "testPasta()",
                content: "Test pasta for doneness by tasting a piece. It should be 'al dente' - firm but not crunchy. This is your integration test."
            },
            {
                title: "drainAndCombine()",
                content: "Drain pasta, reserving 1/2 cup of pasta water. Add pasta to the sauce pan along with a splash of pasta water. Toss to combine."
            },
            {
                title: "deploy()",
                content: "Serve immediately with grated parmesan and fresh basil. Your pasta application is now live! 🚀"
            }
        ],
        tips: [
            "If pasta is too salty, add more sauce to dilute (this is a hotfix)",
            "For debugging: if sauce is too thick, add more pasta water",
            "Rollback tip: if you overcook the pasta, you can't undo it, but you can make it into a pasta salad",
            "Performance optimization: cook pasta in batches if serving many people",
            "Error handling: always taste before serving - this catches most bugs"
        ],
        easterEggs: [
            "Try saying 'git add pasta' while adding ingredients",
            "This recipe has been tested in production kitchens worldwide"
        ]
    },
    {
        id: "git-commit-chicken",
        title: "Git Commit Chicken",
        description: "An advanced recipe that demonstrates proper version control in the kitchen. Multiple commits required.",
        complexity: "advanced",
        runtime: "45 min",
        servings: 4,
        commitMessage: "feat: implement advanced chicken roasting with proper branching strategy",
        image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
        imageAlt: "Roasted chicken with vegetables",
        ingredients: {
            "whole_chicken": "1.5kg",
            "olive_oil": "3 tbsp",
            "garlic": "6 cloves",
            "rosemary": "3 sprigs",
            "thyme": "3 sprigs",
            "lemon": "1 whole",
            "salt": "2 tbsp",
            "black_pepper": "1 tbsp",
            "potatoes": "500g",
            "carrots": "300g",
            "onion": "1 large",
            "git_skills": "advanced level"
        },
        instructions: [
            {
                title: "git checkout main",
                content: "Preheat oven to 200°C (400°F). This is your main branch - everything else will be merged here."
            },
            {
                title: "git branch prepare-chicken",
                content: "Create a new branch for chicken preparation. Pat chicken dry with paper towels. This removes any unwanted moisture (like uncommitted changes)."
            },
            {
                title: "git add seasonings",
                content: "Mix salt, pepper, and herbs. Rub this mixture all over the chicken, including under the skin. This is your first commit - seasonings are now staged."
            },
            {
                title: "git commit -m 'feat: add seasoning layer'",
                content: "Let the chicken rest for 15 minutes. This allows the seasonings to penetrate (like letting changes settle)."
            },
            {
                title: "git branch prepare-vegetables",
                content: "Create another branch for vegetables. Cut potatoes, carrots, and onion into chunks. Toss with olive oil, salt, and pepper."
            },
            {
                title: "git merge prepare-vegetables",
                content: "Place vegetables in roasting pan. Add chicken on top. This merges your vegetable branch into the main cooking process."
            },
            {
                title: "git push to oven",
                content: "Place in oven and roast for 45 minutes. This pushes your changes to the production environment (the oven)."
            },
            {
                title: "git log --oneline",
                content: "Check chicken temperature with a meat thermometer. It should read 75°C (165°F) in the thickest part. This is your deployment verification."
            },
            {
                title: "git tag v1.0.0",
                content: "Remove from oven and let rest for 10 minutes. Your chicken application is now tagged and ready for production! 🎯"
            }
        ],
        tips: [
            "If chicken is undercooked, create a hotfix branch: return to oven for 10 more minutes",
            "For debugging: if skin is too dark, reduce oven temperature by 25°C",
            "Rollback strategy: if you burn the chicken, you can still salvage the vegetables",
            "Performance monitoring: baste chicken every 15 minutes for optimal results",
            "Code review: have someone else taste-test before serving to guests",
            "Documentation: take notes on cooking time for future iterations"
        ],
        easterEggs: [
            "Try saying 'git status' every time you check the chicken",
            "This recipe follows the GitFlow branching model",
            "The chicken is the main branch, vegetables are feature branches"
        ]
    },
    {
        id: "debugging-soup",
        title: "Debugging Soup",
        description: "A therapeutic soup for when your code won't compile and you need comfort food.",
        complexity: "beginner",
        runtime: "30 min",
        servings: 3,
        commitMessage: "fix: resolve compilation errors in soup recipe",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
        imageAlt: "Comforting chicken noodle soup",
        ingredients: {
            "chicken_broth": "1L",
            "noodles": "100g",
            "carrots": "2 medium",
            "celery": "2 stalks",
            "onion": "1 small",
            "garlic": "2 cloves",
            "salt": "to taste",
            "pepper": "to taste",
            "debugging_patience": "unlimited"
        },
        instructions: [
            {
                title: "console.log('Starting soup compilation')",
                content: "Dice carrots, celery, and onion into small pieces. This is your initial data preparation."
            },
            {
                title: "try { heatBroth() }",
                content: "Heat chicken broth in a large pot over medium heat. This is your main execution environment."
            },
            {
                title: "catch (Error) { addMoreBroth() }",
                content: "Add vegetables to the broth. If the broth seems too little, add more water or broth."
            },
            {
                title: "setTimeout(() => addNoodles(), 10000)",
                content: "Simmer vegetables for 10 minutes, then add noodles. This is a delayed execution."
            },
            {
                title: "while (noodles.cooked === false) { wait() }",
                content: "Continue cooking until noodles are tender. This is your main cooking loop."
            },
            {
                title: "return soup",
                content: "Season with salt and pepper. Your debugging soup is ready to console your soul! 🍲"
            }
        ],
        tips: [
            "If soup is too salty, add more broth (this is a hotfix)",
            "For debugging: if noodles are mushy, you cooked them too long",
            "Rollback: if you add too much salt, add more vegetables",
            "Performance tip: you can make this soup in batches and freeze for later"
        ],
        easterEggs: [
            "This soup has been known to fix broken code through osmosis",
            "Try saying 'console.log(soup)' before eating"
        ]
    },
    {
        id: "api-pizza",
        title: "API Pizza",
        description: "A modular pizza system with pluggable toppings. Highly extensible and customizable.",
        complexity: "intermediate",
        runtime: "25 min",
        servings: 2,
        commitMessage: "feat: implement modular pizza architecture with configurable toppings",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
        imageAlt: "Delicious pizza with various toppings",
        ingredients: {
            "pizza_dough": "1 ball (store-bought or homemade)",
            "tomato_sauce": "1/2 cup",
            "mozzarella": "200g",
            "toppings": "as needed (pepperoni, mushrooms, peppers, etc.)",
            "olive_oil": "2 tbsp",
            "basil": "fresh leaves",
            "modular_thinking": "1 unit"
        },
        instructions: [
            {
                title: "initializeDough()",
                content: "Preheat oven to 250°C (480°F). Roll out pizza dough on a floured surface. This is your base class initialization."
            },
            {
                title: "applySauce()",
                content: "Spread tomato sauce evenly over the dough, leaving a 1cm border. This is your base layer - everything else builds on this."
            },
            {
                title: "addCheese()",
                content: "Sprinkle mozzarella cheese over the sauce. This is your core functionality - without it, you just have bread with sauce."
            },
            {
                title: "configureToppings()",
                content: "Add your chosen toppings. This is where the modularity shines - you can plug in any toppings you want (pepperoni, mushrooms, peppers, etc.)."
            },
            {
                title: "deployToOven()",
                content: "Transfer pizza to a preheated pizza stone or baking sheet. Bake for 12-15 minutes until crust is golden and cheese is bubbly."
            },
            {
                title: "serve()",
                content: "Remove from oven, let cool for 2 minutes, then slice and serve with fresh basil. Your pizza API is now live! 🍕"
            }
        ],
        tips: [
            "If crust is too thick, roll it thinner next time (this is a configuration issue)",
            "For debugging: if toppings slide off, you used too much sauce",
            "Hotfix: if pizza is too salty, add more cheese to balance",
            "Performance optimization: preheat your pizza stone for better results",
            "Error handling: always check if oven is preheated before deploying"
        ],
        easterEggs: [
            "This pizza follows RESTful principles - you can GET toppings, POST new ones, PUT different ones, and DELETE what you don't like",
            "Try saying 'npm install toppings' while adding ingredients"
        ]
    },
    {
        id: "energy-overnight-oats",
        title: "Energy Overnight Oats",
        description: "Fuel your morning coding session with sustained energy. Perfect for busy developers who need brain power.",
        complexity: "beginner",
        runtime: "5 min prep + 8 hours rest",
        servings: 1,
        commitMessage: "feat: implement sustained energy system for morning productivity",
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
        imageAlt: "Healthy overnight oats with berries and nuts",
        nutrition: {
            calories: 450,
            protein: "18g",
            carbs: "65g",
            fiber: "12g",
            benefits: "Sustained energy, brain fuel, digestive health, muscle recovery"
        },
        ingredients: {
            "rolled_oats": "1/2 cup",
            "greek_yogurt": "1/2 cup",
            "almond_milk": "1/2 cup",
            "chia_seeds": "1 tbsp",
            "honey": "1 tbsp",
            "banana": "1/2 medium",
            "blueberries": "1/4 cup",
            "almonds": "10 pieces",
            "cinnamon": "1/2 tsp"
        },
        instructions: [
            {
                title: "initializeOats()",
                content: "In a mason jar or bowl, combine rolled oats, chia seeds, and cinnamon. These complex carbs will provide sustained energy for 4-6 hours."
            },
            {
                title: "addLiquidBase()",
                content: "Add Greek yogurt and almond milk. The protein in yogurt helps with muscle recovery and keeps you full longer."
            },
            {
                title: "sweeten()",
                content: "Drizzle honey for natural sweetness. Honey provides quick energy and has antioxidants that support brain function."
            },
            {
                title: "addFruits()",
                content: "Slice banana and add blueberries. Bananas provide potassium for muscle function, blueberries boost brain power with antioxidants."
            },
            {
                title: "addCrunch()",
                content: "Top with almonds for healthy fats and protein. Nuts provide sustained energy and help with focus."
            },
            {
                title: "refrigerate()",
                content: "Cover and refrigerate overnight. The oats will absorb liquid and become creamy. Ready to eat in the morning!"
            }
        ],
        tips: [
            "Make 3-4 jars on Sunday for the whole week",
            "Add protein powder for extra muscle fuel",
            "If too thick, add more milk in the morning",
            "Try different fruits: strawberries, mango, or apple"
        ],
        energy_effects: "Provides 4-6 hours of sustained energy, improves focus and concentration, supports muscle recovery, boosts brain function with antioxidants"
    },
    {
        id: "brain-power-smoothie",
        title: "Brain Power Smoothie",
        description: "A nutrient-dense smoothie that boosts cognitive function and provides instant energy for coding marathons.",
        complexity: "beginner",
        runtime: "3 min",
        servings: 1,
        commitMessage: "feat: implement instant brain boost system with omega-3 and antioxidants",
        image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
        imageAlt: "Colorful berry smoothie in a glass",
        nutrition: {
            calories: 320,
            protein: "15g",
            carbs: "45g",
            fiber: "8g",
            benefits: "Instant energy, brain function, focus, anti-inflammatory, heart health"
        },
        ingredients: {
            "frozen_berries": "1 cup",
            "spinach": "1 handful",
            "banana": "1 medium",
            "almond_butter": "1 tbsp",
            "flax_seeds": "1 tbsp",
            "protein_powder": "1 scoop",
            "almond_milk": "1 cup",
            "ice": "1/2 cup"
        },
        instructions: [
            {
                title: "loadAntioxidants()",
                content: "Add frozen berries to blender. Berries are packed with antioxidants that protect brain cells and improve memory."
            },
            {
                title: "addGreens()",
                content: "Add spinach (you won't taste it!). Spinach provides iron for oxygen transport to your brain and folate for cognitive function."
            },
            {
                title: "addFruit()",
                content: "Add banana for natural sweetness and potassium. Potassium helps with nerve function and muscle contractions."
            },
            {
                title: "addHealthyFats()",
                content: "Add almond butter and flax seeds. These provide omega-3 fatty acids that are essential for brain health and focus."
            },
            {
                title: "addProtein()",
                content: "Add protein powder for muscle support and sustained energy. Protein helps stabilize blood sugar levels."
            },
            {
                title: "blend()",
                content: "Add almond milk and ice, then blend until smooth. Drink immediately for maximum nutrient absorption."
            }
        ],
        tips: [
            "Drink within 30 minutes for best results",
            "Add a handful of nuts for extra crunch",
            "Freeze in ice cube trays for quick morning smoothies",
            "Add ginger for extra anti-inflammatory benefits"
        ],
        energy_effects: "Provides instant energy boost, improves focus and concentration, supports brain health, reduces inflammation, stabilizes blood sugar"
    },
    {
        id: "productivity-power-bowl",
        title: "Productivity Power Bowl",
        description: "A complete meal that provides all nutrients needed for sustained coding sessions. Balanced macros for optimal performance.",
        complexity: "intermediate",
        runtime: "20 min",
        servings: 1,
        commitMessage: "feat: implement complete nutrition system for extended work sessions",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&crop=center",
        imageAlt: "Healthy power bowl with quinoa, vegetables, and protein",
        nutrition: {
            calories: 580,
            protein: "35g",
            carbs: "55g",
            fiber: "15g",
            benefits: "Complete nutrition, sustained energy, muscle building, brain function, digestive health"
        },
        ingredients: {
            "quinoa": "1/2 cup cooked",
            "chicken_breast": "4 oz",
            "sweet_potato": "1 medium",
            "broccoli": "1 cup",
            "avocado": "1/2 medium",
            "black_beans": "1/2 cup",
            "olive_oil": "1 tbsp",
            "lemon": "1/2",
            "garlic": "2 cloves",
            "salt": "to taste",
            "pepper": "to taste"
        },
        instructions: [
            {
                title: "cookQuinoa()",
                content: "Cook quinoa according to package directions. Quinoa is a complete protein with all essential amino acids for muscle building and brain function."
            },
            {
                title: "roastSweetPotato()",
                content: "Dice sweet potato and roast at 400°F for 20 minutes. Sweet potatoes provide complex carbs for sustained energy and beta-carotene for eye health."
            },
            {
                title: "steamBroccoli()",
                content: "Steam broccoli until tender. Broccoli provides vitamin C for immune support and folate for cognitive function."
            },
            {
                title: "cookChicken()",
                content: "Season chicken with garlic, salt, and pepper. Cook in olive oil until done. Chicken provides lean protein for muscle maintenance and satiety."
            },
            {
                title: "prepareBeans()",
                content: "Heat black beans with a splash of water. Beans provide fiber for digestive health and plant protein for sustained energy."
            },
            {
                title: "assemble()",
                content: "Arrange all ingredients in a bowl. Top with sliced avocado and lemon juice. The healthy fats in avocado help absorb fat-soluble vitamins."
            }
        ],
        tips: [
            "Meal prep components separately for quick assembly",
            "Add different vegetables based on what's in season",
            "Use different proteins: salmon, tofu, or tempeh",
            "Store dressing separately to keep ingredients fresh"
        ],
        energy_effects: "Provides 6-8 hours of sustained energy, supports muscle building and recovery, improves focus and concentration, boosts immune system, supports digestive health"
    },
    {
        id: "focus-fish-tacos",
        title: "Focus Fish Tacos",
        description: "Omega-3 rich fish tacos that boost brain function and provide clean energy for deep work sessions.",
        complexity: "intermediate",
        runtime: "25 min",
        servings: 2,
        commitMessage: "feat: implement omega-3 brain boost system with clean protein",
        image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
        imageAlt: "Fresh fish tacos with cabbage slaw and avocado",
        nutrition: {
            calories: 420,
            protein: "28g",
            carbs: "35g",
            fiber: "8g",
            benefits: "Brain health, heart health, anti-inflammatory, muscle building, sustained energy"
        },
        ingredients: {
            "white_fish": "8 oz (cod, tilapia, or mahi-mahi)",
            "corn_tortillas": "4 small",
            "cabbage": "1 cup shredded",
            "avocado": "1 medium",
            "lime": "1 whole",
            "cilantro": "1/4 cup",
            "red_onion": "1/4 cup",
            "olive_oil": "2 tbsp",
            "cumin": "1 tsp",
            "paprika": "1 tsp",
            "salt": "to taste"
        },
        instructions: [
            {
                title: "seasonFish()",
                content: "Season fish with cumin, paprika, and salt. Fish provides omega-3 fatty acids that are essential for brain function and focus."
            },
            {
                title: "cookFish()",
                content: "Heat olive oil in a pan and cook fish for 3-4 minutes per side. The healthy fats help with nutrient absorption and brain health."
            },
            {
                title: "prepareSlaw()",
                content: "Mix shredded cabbage with lime juice and salt. Cabbage provides vitamin C and fiber for digestive health."
            },
            {
                title: "makeGuacamole()",
                content: "Mash avocado with lime juice, cilantro, and diced red onion. Avocado provides healthy fats that support brain function."
            },
            {
                title: "warmTortillas()",
                content: "Warm tortillas in a dry pan for 30 seconds each side. Corn tortillas provide complex carbs for sustained energy."
            },
            {
                title: "assemble()",
                content: "Flake fish and assemble tacos with slaw and guacamole. Top with extra cilantro and lime. Ready for maximum focus!"
            }
        ],
        tips: [
            "Use fresh fish for best results",
            "Add hot sauce for extra flavor",
            "Serve with black beans for extra protein",
            "Make extra guacamole for snacking"
        ],
        energy_effects: "Boosts brain function and focus, provides clean energy, supports heart health, reduces inflammation, improves cognitive performance"
    },
    {
        id: "energy-trail-mix",
        title: "Energy Trail Mix",
        description: "A portable snack that provides instant energy and brain fuel. Perfect for coding sessions and meetings.",
        complexity: "beginner",
        runtime: "5 min",
        servings: 8,
        commitMessage: "feat: implement portable energy system for on-the-go productivity",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
        imageAlt: "Mixed nuts, dried fruits, and dark chocolate trail mix",
        nutrition: {
            calories: "200 per serving",
            protein: "6g",
            carbs: "20g",
            fiber: "4g",
            benefits: "Instant energy, brain fuel, heart health, muscle support, portable nutrition"
        },
        ingredients: {
            "almonds": "1 cup",
            "walnuts": "1/2 cup",
            "cashews": "1/2 cup",
            "dried_cranberries": "1/2 cup",
            "dark_chocolate_chips": "1/4 cup",
            "pumpkin_seeds": "1/4 cup",
            "coconut_flakes": "1/4 cup"
        },
        instructions: [
            {
                title: "selectNuts()",
                content: "Choose a variety of nuts. Almonds provide vitamin E for brain health, walnuts have omega-3s for focus, cashews provide magnesium for muscle function."
            },
            {
                title: "addFruits()",
                content: "Add dried cranberries for natural sweetness and antioxidants. These help with brain function and provide quick energy."
            },
            {
                title: "addChocolate()",
                content: "Add dark chocolate chips (70% cacao or higher). Dark chocolate provides flavonoids that improve blood flow to the brain."
            },
            {
                title: "addSeeds()",
                content: "Add pumpkin seeds for zinc and magnesium. These minerals support immune function and muscle recovery."
            },
            {
                title: "addCoconut()",
                content: "Add coconut flakes for healthy fats and natural sweetness. Coconut provides medium-chain triglycerides for quick energy."
            },
            {
                title: "mix()",
                content: "Mix all ingredients in a large bowl. Store in an airtight container. Perfect for snacking during coding sessions!"
            }
        ],
        tips: [
            "Make a large batch and store in the fridge",
            "Portion into small bags for easy grabbing",
            "Add different dried fruits for variety",
            "Use unsalted nuts to control sodium intake"
        ],
        energy_effects: "Provides instant energy boost, improves focus and concentration, supports brain health, provides sustained energy, portable and convenient"
    },
    {
        id: "recovery-protein-shake",
        title: "Recovery Protein Shake",
        description: "Post-workout or post-coding session shake that helps with muscle recovery and mental clarity.",
        complexity: "beginner",
        runtime: "3 min",
        servings: 1,
        commitMessage: "feat: implement muscle recovery system with mental clarity boost",
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop&crop=center",
        imageAlt: "Green protein smoothie in a glass",
        nutrition: {
            calories: 280,
            protein: "25g",
            carbs: "30g",
            fiber: "5g",
            benefits: "Muscle recovery, mental clarity, hydration, immune support, energy restoration"
        },
        ingredients: {
            "protein_powder": "1 scoop (whey or plant-based)",
            "banana": "1 medium",
            "almond_milk": "1 cup",
            "spinach": "1 handful",
            "chia_seeds": "1 tbsp",
            "cinnamon": "1/2 tsp",
            "ice": "1/2 cup"
        },
        instructions: [
            {
                title: "addProtein()",
                content: "Add protein powder to blender. Protein is essential for muscle recovery and helps with mental clarity and focus."
            },
            {
                title: "addFruit()",
                content: "Add banana for natural sweetness and potassium. Potassium helps with muscle function and nerve transmission."
            },
            {
                title: "addLiquid()",
                content: "Add almond milk for hydration and calcium. Proper hydration is crucial for brain function and energy levels."
            },
            {
                title: "addGreens()",
                content: "Add spinach for iron and folate. Iron helps with oxygen transport to muscles and brain, folate supports cognitive function."
            },
            {
                title: "addSeeds()",
                content: "Add chia seeds for omega-3s and fiber. These support brain health and help with sustained energy."
            },
            {
                title: "blend()",
                content: "Add cinnamon and ice, then blend until smooth. Cinnamon helps with blood sugar regulation. Drink immediately for best results."
            }
        ],
        tips: [
            "Drink within 30 minutes of finishing work",
            "Add different fruits for variety",
            "Use plant-based protein for vegan option",
            "Add a tablespoon of nut butter for extra healthy fats"
        ],
        energy_effects: "Supports muscle recovery, improves mental clarity, restores energy levels, provides hydration, boosts immune system"
    },
    {
        id: "brain-boost-salad",
        title: "Brain Boost Salad",
        description: "A nutrient-dense salad packed with brain-boosting ingredients that improve focus and cognitive function.",
        complexity: "intermediate",
        runtime: "15 min",
        servings: 2,
        commitMessage: "feat: implement cognitive enhancement system with leafy greens and healthy fats",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&crop=center",
        imageAlt: "Fresh green salad with salmon, nuts, and berries",
        nutrition: {
            calories: 350,
            protein: "15g",
            carbs: "25g",
            fiber: "12g",
            benefits: "Brain function, focus, memory, anti-inflammatory, heart health, eye health"
        },
        ingredients: {
            "kale": "2 cups",
            "spinach": "2 cups",
            "walnuts": "1/4 cup",
            "blueberries": "1/2 cup",
            "avocado": "1 medium",
            "salmon": "4 oz (cooked)",
            "olive_oil": "2 tbsp",
            "lemon": "1 whole",
            "garlic": "1 clove",
            "salt": "to taste",
            "pepper": "to taste"
        },
        instructions: [
            {
                title: "prepareGreens()",
                content: "Wash and chop kale and spinach. Massage kale with a little olive oil to make it more tender. Leafy greens provide folate and iron for brain function."
            },
            {
                title: "addNuts()",
                content: "Add chopped walnuts. Walnuts are rich in omega-3 fatty acids that are essential for brain health and cognitive function."
            },
            {
                title: "addBerries()",
                content: "Add fresh blueberries. Blueberries are packed with antioxidants that protect brain cells and improve memory and focus."
            },
            {
                title: "addAvocado()",
                content: "Slice avocado and add to salad. Avocado provides healthy fats that support brain function and help with nutrient absorption."
            },
            {
                title: "addProtein()",
                content: "Add flaked salmon. Salmon provides omega-3s and protein for brain health and sustained energy."
            },
            {
                title: "makeDressing()",
                content: "Whisk together olive oil, lemon juice, garlic, salt, and pepper. Drizzle over salad and toss gently. Ready for maximum brain power!"
            }
        ],
        tips: [
            "Use wild-caught salmon for best omega-3 content",
            "Add different berries based on season",
            "Make dressing separately and store in fridge",
            "Add hemp seeds for extra protein and omega-3s"
        ],
        energy_effects: "Boosts brain function and focus, improves memory and cognitive performance, provides sustained energy, supports heart health, reduces inflammation"
    },
    {
        id: "morning-energy-bowl",
        title: "Morning Energy Bowl",
        description: "A power-packed breakfast bowl that fuels your entire morning coding session with sustained energy.",
        complexity: "beginner",
        runtime: "10 min",
        servings: 1,
        commitMessage: "feat: implement morning energy boost system with superfoods",
        image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
        imageAlt: "Colorful breakfast bowl with fruits and granola",
        nutrition: {
            calories: 380,
            protein: "12g",
            carbs: "55g",
            fiber: "10g",
            benefits: "Morning energy, brain fuel, antioxidants, fiber, vitamins"
        },
        ingredients: {
            "greek_yogurt": "1 cup",
            "granola": "1/2 cup",
            "banana": "1 medium",
            "strawberries": "1/2 cup",
            "blueberries": "1/4 cup",
            "chia_seeds": "1 tbsp",
            "honey": "1 tbsp",
            "almonds": "10 pieces"
        },
        instructions: [
            {
                title: "prepareBase()",
                content: "Add Greek yogurt to a bowl. This provides protein and probiotics for gut health and sustained energy."
            },
            {
                title: "addGranola()",
                content: "Top with granola for crunch and complex carbs. This gives you sustained energy for 3-4 hours."
            },
            {
                title: "addFruits()",
                content: "Slice banana and add strawberries and blueberries. These provide natural sugars and antioxidants for brain health."
            },
            {
                title: "addSuperfoods()",
                content: "Sprinkle chia seeds and almonds on top. These provide omega-3s and healthy fats for brain function."
            },
            {
                title: "sweeten()",
                content: "Drizzle with honey for natural sweetness and extra energy. Ready to fuel your morning coding session!"
            }
        ],
        tips: [
            "Make this the night before for a quick morning meal",
            "Add different fruits based on what's in season",
            "Use plant-based yogurt for a vegan version",
            "Add protein powder for extra muscle fuel"
        ],
        energy_effects: "Provides 4-5 hours of sustained morning energy, boosts brain function, supports gut health, provides antioxidants for focus"
    },
    {
        id: "quick-ramen-upgrade",
        title: "Quick Ramen Upgrade",
        description: "Transform instant ramen into a nutritious meal that's perfect for late-night coding sessions.",
        complexity: "beginner",
        runtime: "8 min",
        servings: 1,
        commitMessage: "feat: implement instant ramen optimization with nutritional enhancements",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
        imageAlt: "Upgraded ramen with vegetables and egg",
        nutrition: {
            calories: 420,
            protein: "18g",
            carbs: "45g",
            fiber: "6g",
            benefits: "Quick energy, protein boost, comfort food, late-night fuel"
        },
        ingredients: {
            "instant_ramen": "1 packet",
            "egg": "1 large",
            "green_onions": "2 stalks",
            "spinach": "1 handful",
            "mushrooms": "1/4 cup",
            "soy_sauce": "1 tbsp",
            "sesame_oil": "1 tsp",
            "sriracha": "to taste"
        },
        instructions: [
            {
                title: "boilWater()",
                content: "Bring water to a boil in a pot. This is your main cooking environment - make sure it's ready."
            },
            {
                title: "addRamen()",
                content: "Add ramen noodles and cook for 2 minutes. Don't overcook - you want them al dente."
            },
            {
                title: "addVegetables()",
                content: "Add mushrooms and spinach to the pot. These add nutrients and fiber to your instant meal."
            },
            {
                title: "addEgg()",
                content: "Crack an egg into the pot and let it poach for 2 minutes. This adds protein and makes it more filling."
            },
            {
                title: "season()",
                content: "Add soy sauce, sesame oil, and sriracha. Taste and adjust - this is your quality control step."
            },
            {
                title: "serve()",
                content: "Garnish with green onions and serve hot. Perfect fuel for your late-night coding session!"
            }
        ],
        tips: [
            "Use only half the seasoning packet to reduce sodium",
            "Add leftover vegetables from your fridge",
            "Try different hot sauces for variety",
            "Add a slice of cheese for extra creaminess"
        ],
        energy_effects: "Provides quick energy boost, comfort food for stress relief, protein for muscle support, perfect for late-night coding"
    },
    {
        id: "protein-power-sandwich",
        title: "Protein Power Sandwich",
        description: "A hearty sandwich packed with protein and nutrients to keep you focused during long coding sessions.",
        complexity: "beginner",
        runtime: "12 min",
        servings: 1,
        commitMessage: "feat: implement protein-packed sandwich system for sustained focus",
        image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
        imageAlt: "Hearty sandwich with chicken, vegetables, and avocado",
        nutrition: {
            calories: 520,
            protein: "32g",
            carbs: "35g",
            fiber: "8g",
            benefits: "High protein, sustained energy, muscle building, brain fuel"
        },
        ingredients: {
            "whole_grain_bread": "2 slices",
            "chicken_breast": "4 oz",
            "avocado": "1/2 medium",
            "lettuce": "2 leaves",
            "tomato": "2 slices",
            "red_onion": "2 slices",
            "mayo": "1 tbsp",
            "mustard": "1 tsp",
            "salt": "to taste",
            "pepper": "to taste"
        },
        instructions: [
            {
                title: "cookChicken()",
                content: "Season chicken with salt and pepper, then cook in a pan for 4-5 minutes per side. This provides lean protein for muscle support."
            },
            {
                title: "prepareVegetables()",
                content: "Slice tomato and red onion, wash lettuce. Fresh vegetables add vitamins and crunch to your sandwich."
            },
            {
                title: "mashAvocado()",
                content: "Mash avocado with a pinch of salt. This provides healthy fats that help with nutrient absorption and brain function."
            },
            {
                title: "assemble()",
                content: "Spread mayo and mustard on bread, then layer with chicken, vegetables, and avocado. This creates a balanced meal."
            },
            {
                title: "serve()",
                content: "Cut in half and serve immediately. Perfect for a quick lunch that keeps you focused for hours!"
            }
        ],
        tips: [
            "Use leftover chicken from dinner for meal prep",
            "Add different vegetables based on what you have",
            "Toast the bread for extra crunch",
            "Wrap in foil for easy eating while coding"
        ],
        energy_effects: "Provides 4-5 hours of sustained energy, high protein for muscle building, healthy fats for brain function, perfect for long coding sessions"
    },
    
    // Yoruba Cuisine Collection
    {
        id: "jollof-rice-ultimate",
        title: "Ultimate Jollof Rice",
        description: "The legendary one-pot Nigerian rice dish that brings communities together. Perfect fuel for long coding sessions.",
        complexity: "intermediate",
        runtime: "45 min",
        servings: 4,
        commitMessage: "feat: implement legendary Nigerian rice algorithm with community-driven flavor system",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
        imageAlt: "Colorful Nigerian Jollof rice with vegetables",
        nutrition: {
            calories: 380,
            protein: "12g",
            carbs: "65g",
            fiber: "4g",
            benefits: "Complex carbs for sustained energy, B-vitamins for brain function, lycopene from tomatoes for antioxidants"
        },
        ingredients: [
            "2 cups long-grain parboiled rice",
            "3 tbsp palm oil or vegetable oil",
            "1 large onion, chopped",
            "3 large tomatoes, blended",
            "2 tbsp tomato paste",
            "1 tsp curry powder",
            "1 tsp thyme",
            "2 bay leaves",
            "1 tsp ginger-garlic paste",
            "2 cups chicken or vegetable stock",
            "1 tsp salt",
            "1/2 tsp black pepper",
            "Optional: cooked chicken, prawns, or vegetables"
        ],
        instructions: [
            "🔥 Heat oil in a large pot over medium heat",
            "🧅 Sauté chopped onions until translucent (3-4 minutes)",
            "🍅 Add blended tomatoes and tomato paste, cook for 10 minutes until reduced",
            "🌶️ Add curry powder, thyme, bay leaves, and ginger-garlic paste",
            "🍚 Add washed rice and stir to coat with tomato mixture (2-3 minutes)",
            "💧 Pour in hot stock gradually, ensuring rice is covered by 1 inch",
            "🧂 Season with salt and pepper, bring to boil",
            "🔥 Reduce heat to low, cover and simmer for 20-25 minutes",
            "🍖 Add cooked proteins in last 5 minutes if using",
            "⏰ Let rest for 5 minutes before serving",
            "🎉 Serve hot with plantains or salad"
        ],
        tips: [
            "💡 Use parboiled rice for best texture and separate grains",
            "🔧 Don't stir too much during cooking to prevent mushy rice",
            "🐛 If rice looks dry, add hot water gradually",
            "⚡ Taste and adjust seasoning before final rest"
        ],
        energy_effects: "Provides steady energy for 5-6 hours, complex carbs fuel brain function, antioxidants support immune system, comfort food that boosts mood and productivity"
    },
    {
        id: "efo-riro-energy",
        title: "Efo Riro Energy Stew",
        description: "Nutrient-packed Nigerian spinach stew loaded with proteins and vegetables. A debugging session's best friend.",
        complexity: "intermediate",
        runtime: "35 min",
        servings: 3,
        commitMessage: "feat: implement green leafy vegetable microservice with protein load balancing",
        image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
        imageAlt: "Rich green Nigerian spinach stew with meat and fish",
        nutrition: {
            calories: 320,
            protein: "25g",
            carbs: "15g",
            fiber: "8g",
            benefits: "Iron for oxygen transport, folate for brain health, omega-3s from fish, complete proteins for muscle maintenance"
        },
        ingredients: [
            "4 cups fresh spinach (Efo tete) or kale, chopped",
            "200g assorted meat (beef, goat meat), cooked",
            "100g smoked fish, deboned",
            "2 tbsp palm oil",
            "1 large onion, chopped",
            "3 tomatoes, blended",
            "2 tbsp ground crayfish",
            "2 scotch bonnet peppers, chopped",
            "1 tsp locust beans (iru)",
            "1 stock cube",
            "Salt to taste",
            "Optional: boiled eggs, ponmo (cow skin)"
        ],
        instructions: [
            "🔥 Heat palm oil in a large pot over medium heat",
            "🧅 Fry onions until golden brown (4-5 minutes)",
            "🍅 Add blended tomatoes and cook for 8 minutes until reduced",
            "🌶️ Add scotch bonnet peppers and locust beans",
            "🍖 Add cooked meat and smoked fish, stir for 3 minutes",
            "🦐 Sprinkle ground crayfish and stock cube",
            "🥬 Add chopped spinach in batches, stirring gently",
            "💧 Add small amount of meat stock if needed",
            "🧂 Season with salt and cook for 5-7 minutes",
            "🥚 Add boiled eggs in last 2 minutes if using",
            "🍽️ Serve hot with rice, yam, or plantains"
        ],
        tips: [
            "💡 Don't overcook the spinach to retain nutrients",
            "🔧 Use minimal water to prevent watery stew",
            "🐛 Taste and adjust spice level with peppers",
            "⚡ Fresh spinach works better than frozen"
        ],
        energy_effects: "Packed with iron for enhanced focus, B-vitamins boost cognitive function, high protein supports muscle recovery, anti-inflammatory compounds reduce coding fatigue"
    },
    {
        id: "suya-spice-bites",
        title: "Suya Spice Energy Bites",
        description: "Nigerian street food meets energy snacking. Spiced meat skewers that keep you coding through the night.",
        complexity: "beginner",
        runtime: "20 min",
        servings: 3,
        commitMessage: "feat: implement spicy protein microservice with street-food authentication",
        image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
        imageAlt: "Grilled Nigerian suya meat skewers with spices",
        nutrition: {
            calories: 280,
            protein: "24g",
            carbs: "8g",
            fiber: "2g",
            benefits: "High-quality protein for muscle maintenance, B-vitamins for energy metabolism, capsaicin for metabolism boost"
        },
        ingredients: [
            "500g lean beef or chicken, sliced thin",
            "3 tbsp suya spice (yaji)",
            "1 tbsp groundnut oil",
            "1 tsp garlic powder",
            "1 tsp ginger powder",
            "1/2 tsp salt",
            "Bamboo skewers, soaked",
            "Sliced onions and tomatoes for serving"
        ],
        instructions: [
            "🔥 Preheat grill or oven to medium-high heat",
            "🥩 Slice meat into thin strips for quick cooking",
            "🌶️ Mix suya spice, oil, garlic, ginger, and salt",
            "🥄 Rub spice mixture all over meat strips",
            "⏰ Let marinate for 10 minutes minimum",
            "🍢 Thread meat onto soaked skewers",
            "🔥 Grill for 8-12 minutes, turning occasionally",
            "🌶️ Sprinkle extra suya spice while grilling",
            "🧅 Serve hot with sliced onions and tomatoes",
            "💧 Have water ready - it's spicy!"
        ],
        tips: [
            "💡 Don't overcook to keep meat tender",
            "🔧 Soak skewers to prevent burning",
            "🐛 Adjust spice level to your tolerance",
            "⚡ Great as coding snack or light dinner"
        ],
        energy_effects: "Quick protein hit for sustained energy, spices boost metabolism and alertness, easy to eat while coding, provides 3-4 hours of steady focus energy"
    },
    
    // Data Structures & Algorithms Collection
    {
        id: "binary-search-breakfast",
        title: "Binary Search Breakfast Bowl",
        description: "A perfectly balanced breakfast with O(log n) preparation time. Black and white ingredients representing binary logic.",
        complexity: "intermediate",
        runtime: "15 min",
        servings: 1,
        commitMessage: "feat: implement balanced breakfast tree with logarithmic search complexity",
        image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
        imageAlt: "Black and white breakfast bowl with berries and yogurt",
        nutrition: {
            calories: 350,
            protein: "15g",
            carbs: "45g",
            fiber: "8g",
            benefits: "Balanced macros for optimal brain function, antioxidants for cognitive protection, sustained energy for algorithm thinking"
        },
        ingredients: [
            "1 cup Greek yogurt (white node)",
            "1/2 cup blackberries (black nodes)",
            "1/2 cup blueberries (binary values)",
            "2 tbsp chia seeds (data points)",
            "1 tbsp honey (sweetness optimization)",
            "1/4 cup granola (crunchy algorithms)",
            "1 banana, sliced (sequential data)"
        ],
        instructions: [
            "🔍 Initialize bowl as root container",
            "⚪ Add Greek yogurt as base layer (root node)",
            "⚫ Insert blackberries in left partition",
            "🔵 Insert blueberries in right partition",
            "📊 Sprinkle chia seeds as data points throughout",
            "🍯 Drizzle honey using binary tree pattern",
            "🥣 Top with granola for structural complexity",
            "🍌 Arrange banana slices in sorted order",
            "🔍 Consume using divide-and-conquer approach"
        ],
        tips: [
            "💡 Balance the colors for optimal visual debugging",
            "🔧 Use the spoon like a binary search - divide and conquer",
            "🐛 If too sweet, adjust honey parameters",
            "⚡ Best consumed before morning coding sessions"
        ],
        energy_effects: "Provides 4-5 hours of cognitive fuel, antioxidants enhance problem-solving abilities, balanced sugars prevent energy crashes during complex algorithm work"
    },
    {
        id: "stack-overflow-pancakes",
        title: "Stack Overflow Pancakes",
        description: "LIFO (Last In, First Out) pancake stack that grows dynamically. Perfect for debugging your hunger recursively.",
        complexity: "advanced",
        runtime: "25 min",
        servings: 3,
        commitMessage: "feat: implement dynamic pancake stack with overflow protection and syrup recursion",
        image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
        imageAlt: "Tall stack of pancakes with syrup dripping down",
        nutrition: {
            calories: 420,
            protein: "12g",
            carbs: "65g",
            fiber: "3g",
            benefits: "Quick energy for intensive coding sessions, B-vitamins for brain function, comfort food to reduce debugging stress"
        },
        ingredients: [
            "2 cups all-purpose flour (base memory)",
            "2 tbsp sugar (sweetness parameter)",
            "2 tsp baking powder (rising algorithm)",
            "1/2 tsp salt (error handling)",
            "2 large eggs (object instances)",
            "1 3/4 cups milk (data flow)",
            "1/4 cup melted butter (smooth operations)",
            "1 tsp vanilla extract (flavor enhancement)",
            "Maple syrup (recursive drizzling)",
            "Butter pads (memory allocation)"
        ],
        instructions: [
            "🔧 Initialize dry ingredients in large buffer (bowl)",
            "🥚 Create egg objects and whisk until smooth",
            "🥛 Implement milk and vanilla data stream",
            "🧈 Merge melted butter into wet stack",
            "🔄 Combine stacks using gentle folding algorithm",
            "🔥 Heat pan to medium temperature (optimize performance)",
            "🥞 Push pancakes onto stack: 1/4 cup batter per instance",
            "⏰ Cook until bubbles form (2-3 minutes per side)",
            "📚 Stack pancakes in LIFO order as they complete",
            "🍯 Implement recursive syrup drizzling function",
            "🔝 Serve immediately while stack is hot"
        ],
        tips: [
            "💡 Don't overmix - lumpy batter prevents stack overflow",
            "🔧 Maintain consistent heat to prevent runtime errors",
            "🐛 If pancakes stick, increase butter memory allocation",
            "⚡ Stack height limited only by plate memory capacity"
        ],
        energy_effects: "High-carb fuel for marathon coding sessions, comfort food reduces debugging frustration, sustained energy prevents afternoon crashes during algorithm implementation"
    },
    {
        id: "linked-list-salad",
        title: "Linked List Garden Salad",
        description: "A dynamically sized salad where each ingredient points to the next. Perfect for agile development and memory-efficient nutrition.",
        complexity: "beginner",
        runtime: "10 min",
        servings: 2,
        commitMessage: "feat: implement dynamic salad structure with pointer-based vegetable traversal",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
        imageAlt: "Fresh mixed salad with various vegetables in a clear bowl",
        nutrition: {
            calories: 180,
            protein: "6g",
            carbs: "12g",
            fiber: "7g",
            benefits: "Low-calorie brain fuel, antioxidants for cognitive protection, fiber for sustained energy, vitamins for mental clarity"
        },
        ingredients: [
            "4 cups mixed greens (head node)",
            "1 cup cherry tomatoes (red nodes)",
            "1 cucumber, sliced (data segments)",
            "1/2 red onion, thinly sliced (circular references)",
            "1 bell pepper, diced (colorful pointers)",
            "1/4 cup feta cheese (memory blocks)",
            "2 tbsp olive oil (connection lubricant)",
            "1 tbsp balsamic vinegar (flavor compiler)",
            "Salt and pepper (debugging seasonings)"
        ],
        instructions: [
            "🌱 Initialize greens as head of the list",
            "🍅 Link cherry tomatoes as first nodes",
            "🥒 Append cucumber slices in sequential order",
            "🧅 Insert onion rings using circular linking",
            "🫑 Connect bell pepper nodes for color distribution",
            "🧀 Scatter feta cheese as allocated memory blocks",
            "🫒 Create dressing by linking oil and vinegar",
            "🧂 Season with salt and pepper error handling",
            "🔄 Traverse the entire list while mixing gently",
            "🍽️ Serve immediately for optimal performance"
        ],
        tips: [
            "💡 Wash vegetables to prevent null pointer exceptions",
            "🔧 Cut vegetables uniformly for consistent traversal",
            "🐛 If salad is bland, increase seasoning parameters",
            "⚡ Best consumed fresh to maintain data integrity"
        ],
        energy_effects: "Lightweight nutrition for sustained coding focus, natural sugars provide steady brain fuel, antioxidants protect against coding stress, fiber prevents energy crashes"
    },
    {
        id: "hash-table-tacos",
        title: "Hash Table Fish Tacos",
        description: "O(1) lookup time for maximum flavor efficiency. Each taco maps perfectly to its unique taste profile with no collisions.",
        complexity: "intermediate",
        runtime: "20 min",
        servings: 4,
        commitMessage: "feat: implement hash-based taco distribution with collision-free flavor mapping",
        image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
        imageAlt: "Organized fish tacos with various toppings in separate containers",
        nutrition: {
            calories: 340,
            protein: "22g",
            carbs: "28g",
            fiber: "5g",
            benefits: "High-quality protein for brain function, omega-3s for cognitive health, complex carbs for sustained energy, balanced meal for long coding sessions"
        },
        ingredients: [
            "1 lb white fish fillets (primary keys)",
            "8 corn tortillas (hash buckets)",
            "2 cups shredded cabbage (indexed data)",
            "1 avocado, sliced (value storage)",
            "1/2 cup diced tomatoes (collision prevention)",
            "1/4 cup red onion (hash functions)",
            "1/4 cup cilantro (performance optimization)",
            "2 limes, cut into wedges (key generators)",
            "2 tbsp olive oil (smooth operations)",
            "1 tsp cumin (flavor hashing)",
            "1 tsp chili powder (spice distribution)",
            "Salt and pepper (error handling)"
        ],
        instructions: [
            "🔥 Heat oil in pan for optimal hash distribution",
            "🐟 Season fish with cumin, chili, salt, pepper",
            "🍳 Cook fish 3-4 minutes per side (constant time)",
            "🌯 Warm tortillas as hash table buckets",
            "🔪 Dice all vegetables with consistent hashing",
            "🗃️ Create organized stations for each ingredient",
            "🌮 Assemble tacos using O(1) lookup method:",
            "   → Tortilla as base hash bucket",
            "   → Fish as primary data value",
            "   → Cabbage as indexed structure",
            "   → Avocado as stored values",
            "   → Tomatoes and onions as collision handlers",
            "🌿 Top with cilantro for performance boost",
            "🍋 Serve with lime wedges for key generation"
        ],
        tips: [
            "💡 Prep all ingredients first for O(1) assembly time",
            "🔧 Don't overcook fish to maintain data integrity",
            "🐛 If flavors clash, adjust seasoning hash function",
            "⚡ Serve immediately for optimal performance"
        ],
        energy_effects: "Balanced macros for sustained coding energy, omega-3s enhance problem-solving abilities, complex carbs fuel algorithm thinking, protein supports long debugging sessions"
    }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = recipes;
}
