# Entities

User data

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
