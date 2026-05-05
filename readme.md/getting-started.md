# Getting Started

This guide walks you through the core end-to-end flow of the API. Follow the steps in order — some resources must exist before others can reference them.

---

## Typical Flow

```
1. Register a visitor       POST /api/visitors
2. Browse available pets    GET  /api/pets
3. Interact with a pet      POST /api/pets/:id/feed|play|groom
4. Log the interaction      POST /api/interactions
5. Check stats              GET  /api/stats
```

> **Why order matters:** `POST /api/interactions` requires a valid `visitorId` and `petId`. If you attempt to log an interaction before registering a visitor, the API returns a `404`. Always complete steps 1–3 first.

---

## Step 1 — Register a Visitor

Create a visitor record. The `visitorId` returned here is required in later steps.

```bash
curl -X POST https://api.example.com/api/visitors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ada Lovelace",
    "email": "ada@example.com"
  }'
```

**Response**

```json
{
  "visitorId": "vis_01HZ4K9JW2",
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "createdAt": "2024-06-01T10:00:00Z"
}
```

Save the `visitorId` — you will need it in Step 4.

---

## Step 2 — Browse Available Pets

Fetch the list of pets to find one to interact with.

```bash
curl https://api.example.com/api/pets
```

**Response**

```json
[
  { "petId": "pet_abc123", "name": "Biscuit", "species": "cat", "available": true },
  { "petId": "pet_def456", "name": "Waffle",  "species": "dog", "available": true }
]
```

Note the `petId` of the pet you want to interact with.

---

## Step 3 — Interact with a Pet

Perform one of three activities — `feed`, `play`, or `groom` — by calling the appropriate endpoint.

```bash
# Feed a pet
curl -X POST https://api.example.com/api/pets/pet_abc123/feed

# Play with a pet
curl -X POST https://api.example.com/api/pets/pet_abc123/play

# Groom a pet
curl -X POST https://api.example.com/api/pets/pet_abc123/groom
```

**Response**

```json
{
  "petId": "pet_abc123",
  "activity": "feed",
  "happiness": 92,
  "performedAt": "2024-06-01T10:05:00Z"
}
```

---

## Step 4 — Log the Interaction

Record the interaction in the system. Both `visitorId` (from Step 1) and `petId` (from Step 2) are required.

```bash
curl -X POST https://api.example.com/api/interactions \
  -H "Content-Type: application/json" \
  -d '{
    "visitorId": "vis_01HZ4K9JW2",
    "petId": "pet_abc123",
    "activity": "feed"
  }'
```

**Response**

```json
{
  "interactionId": "int_789xyz",
  "visitorId": "vis_01HZ4K9JW2",
  "petId": "pet_abc123",
  "activity": "feed",
  "loggedAt": "2024-06-01T10:05:30Z"
}
```

> **Errors?** See the [Error Handling](./error-handling.md) guide for a full list of error codes and response bodies.

---

## Step 5 — Check Stats

Review aggregate statistics for visitors, pets, and interactions.

```bash
curl https://api.example.com/api/stats
```

**Response**

```json
{
  "totalVisitors": 128,
  "totalInteractions": 542,
  "mostPopularPet": {
    "petId": "pet_abc123",
    "name": "Biscuit",
    "interactionCount": 87
  }
}
```

---

## Next Steps

- **Error handling** — Understand every error code at [Error Handling](./error-handling.md)
- **API Reference** — Explore all endpoints in the full [API Reference](./api-reference.md)
