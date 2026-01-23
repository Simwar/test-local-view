# 🐾 Virtual Pet Cafe API

A fun and interactive REST API to manage a virtual pet cafe! Take care of adorable pets, welcome visitors, and track all the fun interactions happening in your cafe.

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Running the Server

```bash
# Standard mode
npm start

# Development mode with auto-reload (Node.js 18+)
npm run dev
```

The server will start on `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

---

## 🐕 Pet Management

### Get All Pets
```
GET /api/pets
```

**Query Parameters:**
- `type` (optional): Filter by pet type (cat, dog, bunny, etc.)
- `mood` (optional): Filter by mood (happy, sad, playful, etc.)

**Example Response:**
```json
{
  "count": 3,
  "pets": [
    {
      "id": 1,
      "name": "Whiskers",
      "type": "cat",
      "age": 2,
      "color": "orange tabby",
      "mood": "playful",
      "happiness": 85,
      "hunger": 30,
      "lastFed": "2026-01-23T10:00:00.000Z",
      "favoriteActivity": "chasing laser pointers"
    }
  ]
}
```

### Get a Specific Pet
```
GET /api/pets/:id
```

### Add a New Pet
```
POST /api/pets
```

**Request Body:**
```json
{
  "name": "Max",
  "type": "dog",
  "age": 3,
  "color": "brown",
  "favoriteActivity": "playing fetch"
}
```

### Update a Pet
```
PUT /api/pets/:id
```

**Request Body:** (all fields optional)
```json
{
  "name": "Maximus",
  "age": 4,
  "color": "dark brown"
}
```

### Remove a Pet
```
DELETE /api/pets/:id
```

---

## 💖 Pet Care

### Feed a Pet
```
POST /api/pets/:id/feed
```

**Request Body:** (optional)
```json
{
  "food": "salmon treats"
}
```

**Effects:**
- Reduces hunger by 30
- Increases happiness by 10
- Updates mood

### Play with a Pet
```
POST /api/pets/:id/play
```

**Request Body:** (optional)
```json
{
  "activity": "fetch"
}
```

**Effects:**
- Increases happiness by 15
- Increases hunger by 10
- Updates mood

### Groom a Pet
```
POST /api/pets/:id/groom
```

**Effects:**
- Increases happiness by 8
- Updates mood

---

## 👥 Visitor Management

### Get All Visitors
```
GET /api/visitors
```

### Get a Specific Visitor
```
GET /api/visitors/:id
```

Returns visitor details with their interaction history.

### Register a New Visitor
```
POST /api/visitors
```

**Request Body:**
```json
{
  "name": "John Doe"
}
```

---

## 🤝 Interactions

### Get All Interactions
```
GET /api/interactions
```

Returns the last 20 interactions.

### Record an Interaction
```
POST /api/interactions
```

**Request Body:**
```json
{
  "visitorId": 1,
  "petId": 2,
  "activity": "played with"
}
```

---

## 📊 Statistics

### Get Cafe Statistics
```
GET /api/stats
```

**Example Response:**
```json
{
  "cafe": "Virtual Pet Cafe",
  "totalPets": 3,
  "totalVisitors": 5,
  "totalInteractions": 12,
  "petsByType": {
    "cat": 1,
    "dog": 1,
    "bunny": 1
  },
  "averageHappiness": 83,
  "happiestPet": {
    "name": "Buddy",
    "happiness": 90
  },
  "hungriestPet": {
    "name": "Whiskers",
    "hunger": 45
  }
}
```

---

## 🎮 Example Usage

### Using cURL

**Get all pets:**
```bash
curl http://localhost:3000/api/pets
```

**Add a new pet:**
```bash
curl -X POST http://localhost:3000/api/pets \
  -H "Content-Type: application/json" \
  -d '{"name":"Luna","type":"cat","age":1,"color":"black"}'
```

**Feed a pet:**
```bash
curl -X POST http://localhost:3000/api/pets/1/feed \
  -H "Content-Type: application/json" \
  -d '{"food":"tuna treats"}'
```

**Play with a pet:**
```bash
curl -X POST http://localhost:3000/api/pets/2/play \
  -H "Content-Type: application/json" \
  -d '{"activity":"fetch"}'
```

### Using JavaScript (fetch)

```javascript
// Get all pets
const pets = await fetch('http://localhost:3000/api/pets')
  .then(res => res.json());

// Add a new visitor
const visitor = await fetch('http://localhost:3000/api/visitors', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice' })
}).then(res => res.json());

// Record an interaction
const interaction = await fetch('http://localhost:3000/api/interactions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    visitorId: 1,
    petId: 1,
    activity: 'petted'
  })
}).then(res => res.json());
```

---

## 🎨 Features

- ✅ Full CRUD operations for pets
- ✅ Pet care system (feeding, playing, grooming)
- ✅ Visitor management
- ✅ Interaction tracking
- ✅ Dynamic mood system based on happiness and hunger
- ✅ Real-time statistics
- ✅ Query filtering for pets
- ✅ In-memory data storage (no database required)

---

## 🐱 Pet Attributes

| Attribute | Description |
|-----------|-------------|
| `id` | Unique identifier |
| `name` | Pet's name |
| `type` | Species (cat, dog, bunny, etc.) |
| `age` | Age in years |
| `color` | Physical appearance |
| `mood` | Current emotional state |
| `happiness` | Happiness level (0-100) |
| `hunger` | Hunger level (0-100) |
| `lastFed` | Timestamp of last feeding |
| `favoriteActivity` | Preferred activity |

---

## 🎯 Mood System

Pet moods are automatically calculated based on happiness and hunger:

- **Happy** - Happiness > 80
- **Content** - Happiness > 60
- **Neutral** - Happiness > 40
- **Sad** - Happiness > 20
- **Unhappy** - Happiness ≤ 20
- **Hungry** - Hunger > 70 (overrides other moods)

---

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **In-memory storage** - No database setup required

---

## 📝 License

MIT

---

## 🎉 Have Fun!

Enjoy managing your virtual pet cafe! Remember to keep your pets happy and well-fed. 🐾💕

