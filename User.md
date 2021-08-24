# NoticeRoutes API Specification

---

### Router Code

```javascript
router.get('/api/user/:uid/solvedList', access, wrap(getScore));
router.get('/api/user/me', access, getMe);
router.get('/api/user/:uid', access, isAdmin, getSpecificUser);
router.patch('/api/user/:uid', access, isAdmin, modifyUser);
router.get('/api/user', access, isAdmin, getUser);
router.post('/api/user', access, isAdmin, addUser);
router.post('/api/user/admin', access, isAdmin, addUserForAdmin);
```

---

## Get Solved List
#### GET /api/user/:uid/solvedList

### Request

---

#### Header
- accessToken: String (Required); Bearer Token
- RefreshToken: String (Required); JWT Token

#### Parameter
- uid: Number (Required)

---

### Response

---

### 200 OK

```json
{
    "success": true,
    "uid": "37",
    "user": {
        "id": 36,
        "solved": 3,
        "pscore": 1479,
        "rank": null,
        "solvedAt": "2021-08-08T13:11:47.000Z",
        "uid": 37
    },
    "result": [
        {
            "pid": 27,
            "name": "문제용",
            "issuer": "RokLcw"
        },
        {
            "pid": 20,
            "name": "문제 파일 있음",
            "issuer": "이지금"
        }
    ]
}
```

### 403 Forbidden

```json
{
    "success": false,
    "message": "You don't have permission to access this page."
}
```

---

## Get all users
#### GET /api/user

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
    "user": [
        {
            "uid": Number,
            "nickname": String,
            "email": String,
            "isAdmin": Boolean,
            "banUser": Boolean,
            "name": String
        },
        {
            "uid": Number,
            "nickname": String,
            "email": String,
            "isAdmin": Boolean,
            "banUser": Boolean,
            "name": String
        }
    ]
}
```

### 400 Bad Request

```json
{
    "success": false,
    "err": err
}
```

### 401 Unauthorized

```json
{
    "success": false,
    "message": "Login required"
}
```

---

## Get your information
#### GET /api/user/me

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
    "user": {
        "uid": Number,
        "nickname": String,
        "email": String,
        "isAdmin": Boolean,
        "banUser": Boolean,
        "name": String
  }
}
```

### 400 Bad Request

```json
{
    "success": false,
    "err": err
}
```

### 401 Unauthorized

```json
{
    "success": false,
    "message": "Login required"
}
```

---

## Get user information via uid
#### GET /api/user/:uid

### Request

---

#### Header
- accessToken: String (Required); Bearer Token
- RefreshToken: String (Required); JWT Token

#### Parameter
- uid: Number (Required)

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
  }
}
```

### 400 Bad Request

```json
{
    "success": false,
    "err": err
}
```

### 401 Unauthorized

```json
{
    "success": false,
    "message": "Login required"
}
```

---

## Add user
#### POST /api/user

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
    "user": {
        "uid": Number,
        "nickname": String,
        "email": String,
        "isAdmin": Boolean,
        "banUser": Boolean,
        "name": String
  }
}
```

### 400 Bad Request

```json
{
    "success": false,
    "err": err
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "message": "Login required"
}
```

---

## Add user for admin
#### POST /api/user/admin

It exists because the membership method of general users and managers is different.

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
    "user": {
        "uid": Number,
        "nickname": String,
        "email": String,
        "isAdmin": Boolean,
        "banUser": Boolean,
        "name": String
  }
}
```

### 400 Bad Request

```json
{
    "success": false,
    "err": err
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "message": "Login required"
}
```

---

## Modify user information via uid
#### PATH /api/user/:uid/

### Request

---

#### Header
- accessToken: String (Required); Bearer Token
- RefreshToken: String (Required); JWT Token

#### Parameter
- uid: Number (Required)

#### Body; One of these is required
- nickname: String (Required)
- email: String (Required)
- password: String (Required)
- isAdmin: Boolean (Required)
- banUser: Boolean (Required)
- name: String (Required)

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
  }
}
```

### 400 Bad Request

```json
{
    "success": false,
    "err": err
}
```

### 401 Unauthorized

```json
{
    "success": false,
    "message": "Login required"
}
```

