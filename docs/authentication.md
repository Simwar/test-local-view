# Authentication

**This API requires no authentication.**

No API keys, tokens, sessions, or login steps are needed. Send requests directly to the server.

```
Base URL: http://localhost:3000
```

---

## Sending a Request

Because there is no auth layer, every request is ready to fire immediately:

```bash
curl http://localhost:3000/pets
```

No `Authorization` header, no Bearer token, no cookie — just the request.

---

## Why No Auth?

This API is designed for local development and internal use. It assumes the network boundary is the security layer. If you are deploying this in a shared or public environment, consider adding an authentication proxy in front of the service.

---

## Common Mistakes

| Symptom | Likely Cause |
|---------|--------------|
| `Connection refused` | The server is not running — start it on port 3000 |
| `404 Not Found` | Check the path against the [API Overview](./api-overview/getting-started.md) quick-reference table |
| `400 Bad Request` | The request body is malformed — check the endpoint's schema docs |

> **Note:** If you receive a `401 Unauthorized` or `403 Forbidden`, this is unexpected behaviour. Please file a bug report.
