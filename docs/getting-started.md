# Getting Started

Welcome to the **Virtual Pet Café API**. Follow this guide to go from zero to a fully interactive café experience in minutes.

---

## TL;DR — The Full Gameplay Loop

```
GET  /api/pets              → browse available pets
POST /api/visitors          → register yourself → get visitorId
POST /api/pets/:petId/feed  → interact with a pet (feed / play / groom)
POST /api/interactions      → log the interaction
GET  /api/stats             → check café-wide stats
```

---

## Step-by-Step Quick Start

### 1. Browse Available Pets

Fetch the list of pets currently in the café.

```http
GET /api/pets
```

**Example response:**

```json
[
  { "petId": "cat-01", "name": "Mochi", "species": "cat", "mood": { "hungry": 45, "happy": 72, "groomed": 60 } },
  { "petId": "dog-03", "name": "Biscuit", "species": "dog", "mood": { "hungry": 80, "happy": 55, "groomed": 40 } }
]
```

---

### 2. Register as a Visitor

Create a visitor profile to get your `visitorId`, which you'll use to log all interactions.

```http
POST /api/visitors
Content-Type: application/json

{
  "name": "Ada Lovelace",
  "email": "ada@example.com"
}
```

**Example response:**

```json
{
  "visitorId": "v-9f3a21",
  "name": "Ada Lovelace"
}
```

> Save your `visitorId` — you'll need it in subsequent requests.

---

### 3. Interact with a Pet

Choose an action — **feed**, **play**, or **groom** — and send it to the pet's interaction endpoint.

```http
POST /api/pets/cat-01/feed
Content-Type: application/json

{
  "visitorId": "v-9f3a21"
}
```

**Example response:**

```json
{
  "petId": "cat-01",
  "action": "feed",
  "moodDelta": { "hungry": -20, "happy": +5 },
  "newMood": { "hungry": 25, "happy": 77, "groomed": 60 }
}
```

---

### 4. Log the Interaction

Record the interaction so it counts toward café-wide statistics.

```http
POST /api/interactions
Content-Type: application/json

{
  "visitorId": "v-9f3a21",
  "petId": "cat-01",
  "action": "feed"
}
```

**Example response:**

```json
{
  "interactionId": "i-7b2e99",
  "recorded": true
}
```

---

### 5. Check Café-Wide Stats

See aggregated statistics across all pets and visitors.

```http
GET /api/stats
```

**Example response:**

```json
{
  "totalInteractions": 142,
  "happiestyPet": "cat-01",
  "activeVisitors": 8
}
```

---

## Mood Threshold Reference

Each pet tracks three mood dimensions. Use these thresholds to decide which action a pet needs most.

| Mood Dimension | Threshold | Meaning                         | Recommended Action |
|----------------|-----------|---------------------------------|--------------------|
| `hungry`       | > 70      | Pet is hungry — needs feeding   | `feed`             |
| `happy`        | > 80      | Pet is content — no action needed | —                |
| `happy`        | ≤ 50      | Pet is bored — needs play       | `play`             |
| `groomed`      | < 40      | Pet needs grooming              | `groom`            |

> **Tip:** A pet with `hungry > 70` should be fed before you play with it — feeding also gives a small `happy` boost.

---

## What's Next?

- Explore the full [API Reference](api-reference.md) for all available endpoints and parameters.
- Check [Authentication](authentication.md) — spoiler: there isn't any.
