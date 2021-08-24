# NoticeRoutes API Specification

---

### Router Code
```javascript
router.get('/api/notice', access, getNotice);
router.get('/api/notice/:nid', access, getNoticeById);
router.post('/api/notice', access, isAdmin, createNotice);
router.delete('/api/notice/:nid', access, isAdmin, deleteNotice);
router.patch('/api/notice/:nid', access, isAdmin, updateNotice);
```

---

## Get Notice List
#### GET /api/notice

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
    "result": [
        {
            "nid": 4,
            "title": "공지 추가 테스트~"
        },
        {
            "nid": 5,
            "title": "공지 개행 테스트"
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

## Get Notice Data
#### GET /api/notice/:nid

### Request

---

#### Header
- accessToken: String (Required); Bearer Token
- RefreshToken: String (Required); JWT Token

#### Parameter
- nid: Number (Required)

---

### Response

---

### 200 OK

```json
{
    "success": true,
    "result": {
        "nid": 4,
        "title": "공지 추가 테스트~",
        "content": "공지 테스트 테스트 테스트~",
        "createdAt": "2021-07-29T00:56:14.000Z"
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

## Add Notice
#### POST /api/notice

### Request

---

#### Header
- accessToken: String (Required); Bearer Token
- RefreshToken: String (Required); JWT Token

#### Body
- title: String (Required)
- content: String (Required)

---

### Response

---

### 200 OK

```json
{
    "success": true
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

## Modify Notice
#### PATCH /api/notice/:nid

### Request

---

#### Header
- accessToken: String (Required); Bearer Token
- RefreshToken: String (Required); JWT Token

#### Parameter
- nid: Number (Required)

#### Body; One of these is required
- title: String (Optional)
- content: String (Optional)

---

### Response

---

### 200 OK

```json
{
    "success": true
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

## Delete Notice
#### DELETE /api/notice/:nid

### Request

---

#### Header
- accessToken: String (Required); Bearer Token
- RefreshToken: String (Required); JWT Token

#### Parameter
- nid: Number (Required)

---

### Response

---

### 204 No Content

```
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