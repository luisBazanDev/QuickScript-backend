
# API Documentation

## Overview

Esta API proporciona endpoints para manejar sesiones de usuario, registros, y errores de teclas en una aplicación de velocidad de escritura. Los endpoints permiten guardar sesiones, registros de escritura y errores cometidos durante el proceso. El acceso a los endpoints se controla mediante JWT para autenticar a los usuarios.

## Requisitos Previos

    Node.js y npm instalados.
    Un archivo .env configurado con la variable APPLICATION_SECRET para la firma JWT.
    Conexión a una base de datos configurada correctamente para los modelos Sessions, Languages, Registros y Error_Keys.

## Endpoints

#### Authenticate

```http
  POST /api/v1/authenticate
```

| Parameter JSON | Type     | Description     |
| :-------- | :------- | :------- |
| `type` | `string` | 'register' or 'login' |
| `username` | `string` | |
| `password` | `string` | |

### Responses Register:

| Status | Response     |
| :-------- | :------- |
| `200` | `"access_token":"{JWT GENERATED}","data":{"user_id":1,"username":"test"}` |
| `409` | `"message":"User already exists."` |
| `400` | `"message":"Endpoint type does not exist."` |
| `500` | `"message":"A problem occurred on the server."` |

### Responses Login:

| Status | Response     |
| :-------- | :------- |
| `200` | `"access_token":"{JWT GENERATED}","data":{"user_id":1,"username":"test"}` |
| `401` | `"message":"User not found."` |
| `401` | `"message":"Wrong password."` |
| `400` | `"message":"Endpoint type does not exist."` |
| `500` | `"message":"A problem occurred on the server."` |

### Session Save

```http
  POST /api/v1/session/save
```

| Parameter JSON | Type     |
| :-------- | :------- |
| `average_wpm` | `int` |
| `language` | `string` |
| `precision` | `int` |
| `min_wpm` | `int` |
| `max_wpm` | `int` |
| `start_time` | `date` |
| `end_time` | `date` |

#### Responses:

| Status | Response     |
| :-------- | :------- |
| `200` | `"message":"the session was saved satisfactorily.","data":{"id":1,"average_wpm":75,"precision":95,"min_wpm":60,"max_wpm":80,"start_time":"2024-09-16T08:30:00Z","end_time":"2024-09-16T08:35:00Z"}` |
| `401` | `"message":"Wrong token."` |
| `403` | `"message":"Token not provided."` |
| `404` | `"message":"There is no language type."` |
| `500` | `"message":"A problem occurred on the server."` |

#### Record Save

```http
  POST /api/record/save
```

| Parameter JSON | Type     |
| :-------- | :------- |
| `session_id`      | `int` |
| `wpm`      | `int` |
| `time`      | `int` |
| `totalWords`      | `int` |

#### Response 200:

```http
  Response (200):

  {
    "message": "the record was saved satisfactorily.",
    "data": {
        "session_id": 1,
        "wpm": 75,
        "time": 95
        "totalWords": 60
    }
  }
```

#### Response 401:

```http
  {
    "message": "Wrong token."
  }
```

#### Response 403:

```http
  {
    "message": "Token not provided."
  }
```

#### Response 404:

```http
  {
    "message": "Session not found."
  }
```

#### Response 500:

```http
  {
    "message": "A problem occurred on the server."
  }
```

#### Error Save

```http
  GET /api/error/save
```

| Parameter | Type     |
| :-------- | :------- |
| `id`      | `string` |

#### Stats Save

```http
  GET /api/stats/save
```

| Parameter | Type     |
| :-------- | :------- |
| `id`      | `string` |

