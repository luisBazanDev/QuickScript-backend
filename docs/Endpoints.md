# Entities

UserData

```json
{
  "user_id": 1,
  "username": "luisbazan_typer"
}
```

Register

```json
{
  "id": 1,
  "wpm": 40.3,
  "time": 10, // Seconds after start_time
  "total_words": 2
}
```

Error

```json
{
  "id": 1,
  "amount_errors": 2,
  "time": 9
}
```

Language

```json
{
  "id": 1,
  "name": "spanish",
  "display_name": "Español"
}
```

Session

```json
{
  "id": 12,
  "user_id": 1,
  "average_wpm": 65.21,
  "language": Language,
  "precision": 98.1, // 0 - 100
  "min_wpm": 30.2,
  "max_wpm": 80.34,
  "start_time": 1726712602,
  "end_time": 1726792602,
  "registers": [
    Register
  ],
  "errors": [
    Error
  ]
}
```

# Endpoints

## Auth

POST `/api/v1/authenticate`

BODY

```json
{
  "type": "login", // login / register
  "username": "user",
  "password": "myfurrypass"
}
```

200

```json
{
  "access_token": "JWT_TOKEN",
  "data": UserData
}
```

| Status | Response                                        |
| :----- | :---------------------------------------------- |
| `409`  | `"message":"User already exists."`              |
| `400`  | `"message":"Endpoint type does not exist."`     |
| `500`  | `"message":"A problem occurred on the server."` |

---

## Auth Header

`x-access-token: YOUR_TOKEN`

## Resume auth

GET `/api/v1/data/get`

200

```json
{
  "data": UserData
}
```

## Session save

POST `/api/v1/session/save`

BODY

```json
{
  "average_wpm": 65.21,
  "language": Language.id,
  "precision": 98.1, // 0 - 100
  "min_wpm": 30.2,
  "max_wpm": 80.34,
  "start_time": 1726712602,
  "end_time": 1726792602,
  "registers": [
    Register // sin id
  ],
  "errors": [
    Error // sin id
  ]
}
```

200 OK
400 Bad request

## Sessions GET

GET `/api/v1/session/get`

Params

| Parameter | Value |
| --------- | ----- |
| limit     | 1-20  |

200

```json
[Session]
```
