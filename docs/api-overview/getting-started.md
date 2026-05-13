# API Overview & Getting Started

Welcome to the API. This page gives you everything you need to start making requests immediately — no setup beyond a running server required.

## Base URL

```
http://localhost:3000
```

All paths below are relative to this base URL.

---

## Authentication

**No authentication is required.** Send requests directly — no API keys, tokens, or login steps needed.

---

## Endpoint Groups

The API is organised into five groups:

| Group | Description |
|------------|---------------------------------------------------------------|
| **Pets** | Create, read, update, and delete pet records |
| **Pet Care** | Log and retrieve care activities for a pet (feeding, grooming, etc.) |
| **Visitors** | Manage visitor records and their associated data |
| **Interactions** | Track interactions between visitors and pets |
| **Stats** | Retrieve aggregate statistics across pets, visitors, and interactions |

---

## Quick Reference

### Pets

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/pets` | List all pets |
| `POST` | `/pets` | Create a new pet |
| `GET` | `/pets/:id` | Get a single pet by ID |
| `PUT` | `/pets/:id` | Update a pet by ID |
| `DELETE` | `/pets/:id` | Delete a pet by ID |

### Pet Care

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/pets/:id/care` | List care logs for a pet |
| `POST` | `/pets/:id/care` | Add a care log entry for a pet |
| `GET` | `/pets/:id/care/:careId` | Get a specific care log entry |
| `PUT` | `/pets/:id/care/:careId` | Update a care log entry |
| `DELETE` | `/pets/:id/care/:careId` | Delete a care log entry |

### Visitors

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/visitors` | List all visitors |
| `POST` | `/visitors` | Create a new visitor |
| `GET` | `/visitors/:id` | Get a single visitor by ID |
| `PUT` | `/visitors/:id` | Update a visitor by ID |
| `DELETE` | `/visitors/:id` | Delete a visitor by ID |

### Interactions

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/interactions` | List all interactions |
| `POST` | `/interactions` | Record a new interaction |
| `GET` | `/interactions/:id` | Get a specific interaction |
| `PUT` | `/interactions/:id` | Update an interaction |
| `DELETE` | `/interactions/:id` | Delete an interaction |

### Stats

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/stats` | Get overall statistics |
| `GET` | `/stats/pets` | Get pet-specific statistics |
| `GET` | `/stats/visitors` | Get visitor-specific statistics |
| `GET` | `/stats/interactions` | Get interaction-specific statistics |

---

## Example Request

```bash
# List all pets
curl http://localhost:3000/pets
```

```json
[
  {
    "id": 1,
    "name": "Mochi",
    "species": "cat",
    "age": 3
  }
]
```

---

## Next Steps

- Explore individual endpoint groups in the sidebar for full request/response schemas.
- Check the **Stats** group for pre-aggregated data instead of computing it client-side.
