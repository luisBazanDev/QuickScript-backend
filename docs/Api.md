# API Documentation

## Overview

Esta API proporciona endpoints para manejar sesiones de usuario, registros, y errores de teclas en una aplicación de velocidad de escritura. Los endpoints permiten guardar sesiones, registros de escritura y errores cometidos durante el proceso. El acceso a los endpoints se controla mediante JWT para autenticar a los usuarios.

## Requisitos Previos

    Node.js y npm instalados.
    Un archivo .env configurado con la variable APPLICATION_SECRET para la firma JWT.
    Conexión a una base de datos configurada correctamente para los modelos Sessions, Languages, Registros y Error_Keys.

## Endpoints

#### Session Save

```http
  POST /api/v1/session/save
```

| Parameter | Type     |
| :-------- | :------- |
| `average_wpm` | `int` |
| `language` | `string` |
| `precision` | `int` |
| `min_wpm` | `int` |
| `max_wpm` | `int` |
| `start_time` | `date` |
| `end_time` | `int` |

```http
  Response:

  {
    "message": "the session was saved satisfactorily.",
    "data": {
        "id": 1,
        "average_wpm": 75,
        "precision": 95
        "min_wpm": 60,
        "max_wpm": 80,
        "start_time": "2024-09-16T08:30:00Z",
        "end_time": "2024-09-16T08:35:00Z"
    }
  }
```

#### Record Save

```http
  GET /api/record/save
```

| Parameter | Type     |
| :-------- | :------- |
| `id`      | `string` |

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
