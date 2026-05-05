# Error Handling

This page documents the error responses returned by the API when required fields are missing, invalid, or refer to non-existent resources.

---

## Error Response Structure

All errors follow a consistent JSON shape:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable description of what went wrong.",
    "field": "fieldName"
  }
}
```

| Property | Type | Description |
|---|---|---|
| `code` | string | Machine-readable error code (see tables below) |
| `message` | string | Human-readable explanation |
| `field` | string \| null | The offending field, if applicable |

---

## POST /api/interactions

### Required Fields

| Field | Type | Description |
|---|---|---|
| `visitorId` | string | ID of an existing visitor |
| `petId` | string | ID of an existing pet |
| `activity` | string | One of `feed`, `play`, or `groom` |

### Error Reference

#### `visitorId` Missing

```http
HTTP/1.1 400 Bad Request
```
```json
{
  "error": {
    "code": "MISSING_FIELD",
    "message": "visitorId is required.",
    "field": "visitorId"
  }
}
```

#### `visitorId` Does Not Exist

```http
HTTP/1.1 404 Not Found
```
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "No visitor found with the provided visitorId.",
    "field": "visitorId"
  }
}
```

#### `petId` Missing

```http
HTTP/1.1 400 Bad Request
```
```json
{
  "error": {
    "code": "MISSING_FIELD",
    "message": "petId is required.",
    "field": "petId"
  }
}
```

#### `petId` Does Not Exist

```http
HTTP/1.1 404 Not Found
```
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "No pet found with the provided petId.",
    "field": "petId"
  }
}
```

#### `activity` Omitted

```http
HTTP/1.1 400 Bad Request
```
```json
{
  "error": {
    "code": "MISSING_FIELD",
    "message": "activity is required.",
    "field": "activity"
  }
}
```

#### `activity` Invalid Value

```http
HTTP/1.1 400 Bad Request
```
```json
{
  "error": {
    "code": "INVALID_VALUE",
    "message": "activity must be one of: feed, play, groom.",
    "field": "activity"
  }
}
```

---

## General Error Codes

| HTTP Status | Code | Meaning |
|---|---|---|
| `400` | `MISSING_FIELD` | A required field was not provided |
| `400` | `INVALID_VALUE` | A field was provided but its value is not acceptable |
| `404` | `NOT_FOUND` | The referenced resource does not exist |
| `500` | `INTERNAL_ERROR` | An unexpected server-side error occurred |

---

## Tips for Debugging

- Always register a visitor with `POST /api/visitors` **before** logging interactions — using a `visitorId` that does not exist returns a `404`.
- Check that `petId` comes from a `GET /api/pets` response to ensure the pet is currently in the system.
- Validate `activity` client-side against the allowed values (`feed`, `play`, `groom`) to avoid unnecessary round-trips.
