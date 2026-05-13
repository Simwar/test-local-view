# API Overview & Getting Started

Welcome to the API documentation. This page gives you a complete picture of every available endpoint group so you can find what you need without digging through individual reference pages.

---

## Endpoint Groups

| Group | Description |
|-------------|----------------------------------------------------------------------------|
| **Pets** | Create, read, update, and delete pet profiles. |
| **Pet Care** | Log and retrieve care events (feeding, grooming, medication, etc.). |
| **Visitors** | Manage visitor records and visit scheduling. |
| **Interactions** | Track and query interactions between pets and visitors. |
| **Stats** | Retrieve aggregated statistics and usage metrics. |

---

## Quick-Reference: All Endpoints

### Pets

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/pets` | List all pets |
| `POST` | `/pets` | Create a new pet |
| `GET` | `/pets/{id}` | Get a pet by ID |
| `PUT` | `/pets/{id}` | Update a pet |
| `DELETE` | `/pets/{id}` | Delete a pet |

### Pet Care

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/pets/{id}/care` | List care events for a pet |
| `POST` | `/pets/{id}/care` | Log a new care event |
| `GET` | `/pets/{id}/care/{eventId}` | Get a specific care event |
| `DELETE` | `/pets/{id}/care/{eventId}` | Delete a care event |

### Visitors

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/visitors` | List all visitors |
| `POST` | `/visitors` | Create a visitor record |
| `GET` | `/visitors/{id}` | Get a visitor by ID |
| `PUT` | `/visitors/{id}` | Update a visitor |
| `DELETE` | `/visitors/{id}` | Delete a visitor |

### Interactions

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/interactions` | List all interactions |
| `POST` | `/interactions` | Record a new interaction |
| `GET` | `/interactions/{id}` | Get an interaction by ID |
| `DELETE` | `/interactions/{id}` | Delete an interaction |

### Stats

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/stats/pets` | Pet-level statistics |
| `GET` | `/stats/visitors` | Visitor-level statistics |
| `GET` | `/stats/interactions` | Interaction-level statistics |

---

## Making Your First Request

All requests require a valid API key passed in the `Authorization` header.

```bash
curl -X GET "https://api.example.com/pets" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Accept: application/json"
```

A successful response returns `200 OK` with a JSON array:

```json
[
  {
    "id": "pet_01",
    "name": "Mochi",
    "species": "cat",
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

### Common Response Codes

| Code | Meaning |
|------|---------|
| `200 OK` | Request succeeded |
| `201 Created` | Resource created successfully |
| `400 Bad Request` | Invalid request body or parameters |
| `401 Unauthorized` | Missing or invalid API key |
| `404 Not Found` | Resource does not exist |
| `429 Too Many Requests` | Rate limit exceeded — back off and retry |
| `500 Internal Server Error` | Something went wrong on our end |

---

## Next Steps

- **[Authentication](../authentication.md)** — how to obtain and rotate API keys
- **[Pagination](../api-reference/pagination.md)** — handling large result sets
- **[Error Handling](../api-reference/errors.md)** — full error schema reference
