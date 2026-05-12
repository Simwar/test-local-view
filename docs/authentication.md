# Authentication

> **No authentication required.**
> This API requires no API keys, tokens, or credentials. All endpoints are publicly accessible — just send requests directly.

---

## Overview

The Virtual Pet Café API is fully open. There is no:

- API key or secret
- OAuth flow
- Bearer / JWT token
- Session cookie or login step

You can call any endpoint immediately without any setup related to identity or access.

---

## Making a Request

Because there is no auth layer, every request only needs a valid URL and (where applicable) a `Content-Type` header.

**Example — fetching all pets:**

```http
GET /api/pets
```

```bash
curl https://api.example.com/api/pets
```

**Example — registering a visitor:**

```http
POST /api/visitors
Content-Type: application/json

{
  "name": "Ada Lovelace",
  "email": "ada@example.com"
}
```

```bash
curl -X POST https://api.example.com/api/visitors \
  -H "Content-Type: application/json" \
  -d '{"name": "Ada Lovelace", "email": "ada@example.com"}'
```

No `Authorization` header. No token exchange. That's it.

---

## Visitor Identity

While the API has no authentication, some endpoints require a `visitorId` to associate actions with a visitor. This is **not** an authentication mechanism — it's simply a way to track interactions.

Obtain a `visitorId` by registering once via `POST /api/visitors`. See the [Getting Started](getting-started.md) guide for the full flow.

---

## Future Changes

If authentication is introduced in a future version, it will be documented here and announced via the changelog.
