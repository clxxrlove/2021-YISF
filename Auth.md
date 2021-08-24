# AuthRoutes API Specification

---
## Router Code
```javascript
router.post('/api/auth/login', create);
router.get('/api/auth/refresh', refresh);
router.get('/api/auth/banuser', isBan);
```
---

## Login
#### POST /api/auth/login


### Request

---

#### Body

- email: String (Required)
- password: String (Required)

---

### Response

---

### 200 OK
```json
{
    "success": true,
    "user": {
        "uid": Number,
        "nickname": String,
        "email": String,
        "isAdmin": Boolean,
        "banUser": Boolean,
        "name": String
    },
    "token": {
        "accessToken": String; Bearer Token
        "refreshToken": String; JWT Token
    }
}
```

### 401 Unauthorized
```json
{
    "success": false,
    "message": "Something is not right",
    "user": false,
    "err": null
}
```

---

## Refresh
#### GET /api/auth/refresh

### Request

---

#### Header
- accessToken: String (Required); Bearer Token
- RefreshToken: String (Required); JWT Token

---

### Response

---

### 200 OK

```json
{
    "success": true,
    "token": {
        "accessToken": String; Bearer Token
        "refreshToken": String; JWT Token
    }
}
```

### 400 Bad Request

```json
{
    "success": false,
}
```

---

## isBanned
#### GET /api/auth/banuser

### Request

---

#### Header
- accessToken: String (Required); Bearer Token
- RefreshToken: String (Required); JWT Token


---

### Response

---

### 200 OK 

```json
{
    "success": true,
    "status": false
}
```

### 400 Bad Request 

```json
{
    "success": true,
    "status": true,
    "err": err
}
```

### 403 Forbidden 

```json
{
    "success": false,
    "message": "Login required"
}
```