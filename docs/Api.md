
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

#### Responses:

| Status | Response     |
| :-------- | :------- |
| `200` | `"message":"the record was saved satisfactorily.","data":{"session_id":1,"wpm":75,"time":95,"totalWords":60}` |
| `401` | `"message":"The user does not exist."` |
| `401` | `"message":"Session not found."` |
| `500` | `"message":"A problem occurred on the server."` |

#### Record Save

```http
  POST /api/record/get
```

| Parameter JSON | Type     |
| :-------- | :------- |
| `session_id`      | `int` |

#### Responses:

| Status | Response     |
| :-------- | :------- |
| `200` | `"data": { [...], [...] }` |
| `401` | `"message":"The user does not exist."` |
| `401` | `"message":"Session not found."` |
| `500` | `"message":"A problem occurred on the server."` |

#### Error Keys Save

```http
  GET /api/error/save
```

| Parameter | Type     |
| :-------- | :------- |
| `session_id`      | `int` |
| `amount_errors`      | `int` |
| `time`      | `int` |

#### Responses:

| Status | Response     |
| :-------- | :------- |
| `200` | `"message":"the Error keys was saved satisfactorily."` |
| `401` | `"message":"The user does not exist."` |
| `401` | `"message":"Session not found."` |
| `500` | `"message":"A problem occurred on the server."` |

#### Get Error Keys

```http
  GET /api/error/get
```

| Parameter | Type     |
| :-------- | :------- |
| `session_id`      | `int` |

#### Responses:

| Status | Response     |
| :-------- | :------- |
| `200` | `"data": { [...], [...] }` |
| `401` | `"message":"The user does not exist."` |
| `401` | `"message":"Session not found."` |
| `500` | `"message":"A problem occurred on the server."` |

#### Stats Save

```http
  GET /api/stats/save
```

| Parameter | Type     |
| :-------- | :------- |
| `wpm`      | `int` |
| `avg_time`      | `int` |
| `total_Words`      | `int` |
| `avg_error`      | `int` |
| `prefered_lang`      | `int` |

#### Responses:

| Status | Response     |
| :-------- | :------- |
| `200` | `"message":"Statistics have been successfully saved.","data": {...}` |
| `401` | `"message":"The user does not exist."` |
| `404` | `"message":"There is no language type."` |
| `500` | `"message":"A problem occurred on the server."` |

#### Get Stats

```http
  GET /api/stats/getAll
```

| Parameter | Type     |
| :-------- | :------- |
| `session_id`      | `int` |

#### Responses:

| Status | Response     |
| :-------- | :------- |
| `200` | `"data": { [...], [...] }` |
| `401` | `"message":"The user does not exist."` |
| `500` | `"message":"A problem occurred on the server."` |