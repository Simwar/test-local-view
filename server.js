const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// In-memory data store
let pets = [
  {
    id: 1,
    name: "Whiskers",
    type: "cat",
    age: 2,
    color: "orange tabby",
    mood: "playful",
    happiness: 85,
    hunger: 30,
    lastFed: new Date().toISOString(),
    favoriteActivity: "chasing laser pointers"
  },
  {
    id: 2,
    name: "Buddy",
    type: "dog",
    age: 3,
    color: "golden retriever",
    mood: "excited",
    happiness: 90,
    hunger: 45,
    lastFed: new Date(Date.now() - 3600000).toISOString(),
    favoriteActivity: "fetch"
  },
  {
    id: 3,
    name: "Flopsy",
    type: "bunny",
    age: 1,
    color: "white with brown spots",
    mood: "sleepy",
    happiness: 75,
    hunger: 20,
    lastFed: new Date().toISOString(),
    favoriteActivity: "hopping around"
  }
];

let visitors = [
  {
    id: 1,
    name: "Alice",
    visitCount: 5,
    favoritePet: "Whiskers",
    lastVisit: new Date().toISOString()
  }
];

let interactions = [];
let nextPetId = 4;
let nextVisitorId = 2;
let nextInteractionId = 1;

// Helper functions
const findPetById = (id) => pets.find(pet => pet.id === parseInt(id));
const findVisitorById = (id) => visitors.find(visitor => visitor.id === parseInt(id));

const updatePetMood = (pet) => {
  if (pet.happiness > 80) pet.mood = "happy";
  else if (pet.happiness > 60) pet.mood = "content";
  else if (pet.happiness > 40) pet.mood = "neutral";
  else if (pet.happiness > 20) pet.mood = "sad";
  else pet.mood = "unhappy";
  
  if (pet.hunger > 70) pet.mood = "hungry";
};

// ===== ROUTES =====

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: "🐾 Welcome to the Virtual Pet Cafe API! 🐾",
    endpoints: {
      pets: {
        "GET /api/pets": "Get all pets",
        "GET /api/pets/:id": "Get a specific pet",
        "POST /api/pets": "Add a new pet to the cafe",
        "PUT /api/pets/:id": "Update a pet's information",
        "DELETE /api/pets/:id": "Remove a pet from the cafe"
      },
      care: {
        "POST /api/pets/:id/feed": "Feed a pet",
        "POST /api/pets/:id/play": "Play with a pet",
        "POST /api/pets/:id/groom": "Groom a pet"
      },
      visitors: {
        "GET /api/visitors": "Get all cafe visitors",
        "POST /api/visitors": "Register a new visitor",
        "GET /api/visitors/:id": "Get visitor details"
      },
      interactions: {
        "GET /api/interactions": "Get all interactions",
        "POST /api/interactions": "Record a visitor-pet interaction"
      },
      stats: {
        "GET /api/stats": "Get cafe statistics"
      }
    }
  });
});

// ===== PET ENDPOINTS =====

// Get all pets
app.get('/api/pets', (req, res) => {
  const { type, mood } = req.query;
  let filteredPets = pets;
  
  if (type) {
    filteredPets = filteredPets.filter(pet => pet.type.toLowerCase() === type.toLowerCase());
  }
  
  if (mood) {
    filteredPets = filteredPets.filter(pet => pet.mood.toLowerCase() === mood.toLowerCase());
  }
  
  res.json({
    count: filteredPets.length,
    pets: filteredPets
  });
});

// Get a specific pet
app.get('/api/pets/:id', (req, res) => {
  const pet = findPetById(req.params.id);
  
  if (!pet) {
    return res.status(404).json({ error: "Pet not found" });
  }
  
  res.json(pet);
});

// Add a new pet
app.post('/api/pets', (req, res) => {
  const { name, type, age, color, favoriteActivity } = req.body;
  
  if (!name || !type) {
    return res.status(400).json({ error: "Name and type are required" });
  }
  
  const newPet = {
    id: nextPetId++,
    name,
    type,
    age: age || 1,
    color: color || "unknown",
    mood: "content",
    happiness: 70,
    hunger: 30,
    lastFed: new Date().toISOString(),
    favoriteActivity: favoriteActivity || "relaxing"
  };
  
  pets.push(newPet);
  res.status(201).json({
    message: `${name} has joined the cafe! 🎉`,
    pet: newPet
  });
});

// Update a pet
app.put('/api/pets/:id', (req, res) => {
  const pet = findPetById(req.params.id);
  
  if (!pet) {
    return res.status(404).json({ error: "Pet not found" });
  }
  
  const { name, type, age, color, favoriteActivity } = req.body;
  
  if (name) pet.name = name;
  if (type) pet.type = type;
  if (age) pet.age = age;
  if (color) pet.color = color;
  if (favoriteActivity) pet.favoriteActivity = favoriteActivity;
  
  res.json({
    message: "Pet updated successfully",
    pet
  });
});

// Delete a pet
app.delete('/api/pets/:id', (req, res) => {
  const petIndex = pets.findIndex(pet => pet.id === parseInt(req.params.id));
  
  if (petIndex === -1) {
    return res.status(404).json({ error: "Pet not found" });
  }
  
  const deletedPet = pets.splice(petIndex, 1)[0];
  res.json({
    message: `${deletedPet.name} has left the cafe. We'll miss them! 😢`,
    pet: deletedPet
  });
});

// ===== PET CARE ENDPOINTS =====

// Feed a pet
app.post('/api/pets/:id/feed', (req, res) => {
  const pet = findPetById(req.params.id);
  
  if (!pet) {
    return res.status(404).json({ error: "Pet not found" });
  }
  
  const { food } = req.body;
  const foodType = food || "treats";
  
  pet.hunger = Math.max(0, pet.hunger - 30);
  pet.happiness = Math.min(100, pet.happiness + 10);
  pet.lastFed = new Date().toISOString();
  updatePetMood(pet);
  
  res.json({
    message: `${pet.name} enjoyed the ${foodType}! 🍖`,
    pet,
    status: {
      hunger: pet.hunger,
      happiness: pet.happiness,
      mood: pet.mood
    }
  });
});

// Play with a pet
app.post('/api/pets/:id/play', (req, res) => {
  const pet = findPetById(req.params.id);
  
  if (!pet) {
    return res.status(404).json({ error: "Pet not found" });
  }
  
  const { activity } = req.body;
  const playActivity = activity || pet.favoriteActivity;
  
  pet.happiness = Math.min(100, pet.happiness + 15);
  pet.hunger = Math.min(100, pet.hunger + 10);
  updatePetMood(pet);
  
  res.json({
    message: `${pet.name} had a blast ${playActivity}! 🎾`,
    pet,
    status: {
      hunger: pet.hunger,
      happiness: pet.happiness,
      mood: pet.mood
    }
  });
});

// Groom a pet
app.post('/api/pets/:id/groom', (req, res) => {
  const pet = findPetById(req.params.id);
  
  if (!pet) {
    return res.status(404).json({ error: "Pet not found" });
  }
  
  pet.happiness = Math.min(100, pet.happiness + 8);
  updatePetMood(pet);
  
  res.json({
    message: `${pet.name} is looking fabulous! ✨`,
    pet,
    status: {
      happiness: pet.happiness,
      mood: pet.mood
    }
  });
});

// ===== VISITOR ENDPOINTS =====

// Get all visitors
app.get('/api/visitors', (req, res) => {
  res.json({
    count: visitors.length,
    visitors
  });
});

// Get a specific visitor
app.get('/api/visitors/:id', (req, res) => {
  const visitor = findVisitorById(req.params.id);
  
  if (!visitor) {
    return res.status(404).json({ error: "Visitor not found" });
  }
  
  const visitorInteractions = interactions.filter(i => i.visitorId === visitor.id);
  
  res.json({
    ...visitor,
    totalInteractions: visitorInteractions.length,
    recentInteractions: visitorInteractions.slice(-5)
  });
});

// Register a new visitor
app.post('/api/visitors', (req, res) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  
  const newVisitor = {
    id: nextVisitorId++,
    name,
    visitCount: 1,
    favoritePet: null,
    lastVisit: new Date().toISOString()
  };
  
  visitors.push(newVisitor);
  res.status(201).json({
    message: `Welcome to the cafe, ${name}! 👋`,
    visitor: newVisitor
  });
});

// ===== INTERACTION ENDPOINTS =====

// Get all interactions
app.get('/api/interactions', (req, res) => {
  res.json({
    count: interactions.length,
    interactions: interactions.slice(-20) // Last 20 interactions
  });
});

// Record an interaction
app.post('/api/interactions', (req, res) => {
  const { visitorId, petId, activity } = req.body;
  
  if (!visitorId || !petId) {
    return res.status(400).json({ error: "visitorId and petId are required" });
  }
  
  const visitor = findVisitorById(visitorId);
  const pet = findPetById(petId);
  
  if (!visitor) {
    return res.status(404).json({ error: "Visitor not found" });
  }
  
  if (!pet) {
    return res.status(404).json({ error: "Pet not found" });
  }
  
  const interaction = {
    id: nextInteractionId++,
    visitorId,
    visitorName: visitor.name,
    petId,
    petName: pet.name,
    activity: activity || "spent time with",
    timestamp: new Date().toISOString()
  };
  
  interactions.push(interaction);
  visitor.lastVisit = interaction.timestamp;
  visitor.visitCount++;
  
  res.status(201).json({
    message: `${visitor.name} ${interaction.activity} ${pet.name}! 💕`,
    interaction
  });
});

// ===== STATS ENDPOINT =====

// Get cafe statistics
app.get('/api/stats', (req, res) => {
  const totalPets = pets.length;
  const petsByType = pets.reduce((acc, pet) => {
    acc[pet.type] = (acc[pet.type] || 0) + 1;
    return acc;
  }, {});
  
  const averageHappiness = pets.reduce((sum, pet) => sum + pet.happiness, 0) / totalPets;
  const happiestPet = pets.reduce((max, pet) => pet.happiness > max.happiness ? pet : max, pets[0]);
  const hungriestPet = pets.reduce((max, pet) => pet.hunger > max.hunger ? pet : max, pets[0]);
  
  res.json({
    cafe: "Virtual Pet Cafe",
    totalPets,
    totalVisitors: visitors.length,
    totalInteractions: interactions.length,
    petsByType,
    averageHappiness: Math.round(averageHappiness),
    happiestPet: {
      name: happiestPet.name,
      happiness: happiestPet.happiness
    },
    hungriestPet: {
      name: hungriestPet.name,
      hunger: hungriestPet.hunger
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🐾 Virtual Pet Cafe API is running on http://localhost:${PORT}`);
  console.log(`📖 Visit http://localhost:${PORT}/ for API documentation`);
});

