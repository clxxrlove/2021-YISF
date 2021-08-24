# ProbRoutes API Specification - Admins

---
### Router Code

```javascript
router.get('/api/prob/admin', access, isAdmin, wrap(C.getProb));
router.get('/api/prob/admin/id/:pid', access, isAdmin, wrap(C.getProb));
router.get('/api/prob/admin/type/:type', access, isAdmin, wrap(C.getProb));

router.post('/api/prob', access, isAdmin, upload.array('attachments'), C.addProb);
router.patch('/api/prob/:pid', access, isAdmin, upload.array('attachments'), C.modifyProb);
router.patch('/api/prob/file/:fid', access, isAdmin, upload.single('alter'), C.modifyFile);
router.delete('/api/prob/id/:pid', access, isAdmin, C.deleteProb);
router.delete('/api/prob/comment/:pid/:cid', access, isAdmin, deleteComment);
```

---

## Get Prob Datas
#### GET /api/prob/admin

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
[
    {
        "pid": 19,
        "name": "xptmxmanswp"
    },
    {
        "pid": 20,
        "name": "문제 파일 있음"
    },
    {
        "pid": 21,
        "name": "xptmxmanswp"
    },
    {
        "pid": 22,
        "name": "xptmxmanswp"
    },
    {
        "pid": 23,
        "name": "rlahEl"
    },
    {
        "pid": 24,
        "name": "rlahEl"
    },
    {
        "pid": 25,
        "name": "rlahEl"
    },
    {
        "pid": 26,
        "name": "rlahEl"
    },
    {
        "pid": 27,
        "name": "문제용"
    },
    {
        "pid": 28,
        "name": "FOR_test_1"
    },
    {
        "pid": 35,
        "name": "rlahEl"
    },
    {
        "pid": 38,
        "name": "테스트 테스트 테스트"
    },
    {
        "pid": 40,
        "name": "포렌식문제추가"
    },
    {
        "pid": 41,
        "name": "테스트 문제"
    },
    {
        "pid": 29,
        "name": "test"
    },
    {
        "pid": 30,
        "name": "뽀렌씩 문제"
    },
    {
        "pid": 31,
        "name": "ttest"
    },
    {
        "pid": 33,
        "name": "ttest"
    },
    {
        "pid": 34,
        "name": "hello"
    },
    {
        "pid": 36,
        "name": "asdf"
    },
    {
        "pid": 37,
        "name": "aaaasssasas"
    },
    {
        "pid": 39,
        "name": "포포포포"
    },
    {
        "pid": 42,
        "name": "hhhh<script>document.write('hacked-by-ziyong');</script>hhhh"
    }
]
```

### 204 No Content

```
```

### 400 Bad Request

```json
{
    "success": false,
    "message": "No data found"
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

## Get Prob Datas via pid
#### GET /api/prob/admin/id/:pid

### Request

---

#### Header
- accessToken: String (Required); Bearer Token
- RefreshToken: String (Required); JWT Token

#### Parameter
- pid: Number (Required)

---

### Response

---

### 200 OK

```json
[
  {
    "pid": 19,
    "name": "xptmxmanswp",
    "type": "web",
    "score": 1000,
    "info": "아몰랑",
    "issuer": "ㅈ지용",
    "flag": "YISF{testtest}",
    "active": false,
    "views": 0,
    "count": null,
    "filedata": [
      {
        "fid": 1,
        "filename": "a52e376568f83e764fc092ead6492d78",
        "filepath": "models/files/"
      }
    ]
  }
]
```

### 204 No Content

```
```

### 400 Bad Request

```json
{
    "success": false,
    "message": "No data found"
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

## Get Prob Datas via type
#### GET /api/prob/admin/type/:type

### Request

---

#### Header
- accessToken: String (Required); Bearer Token
- RefreshToken: String (Required); JWT Token

#### Parameter
- type: String (Required)

---

### Response

---

### 200 OK

```json
[
  {
    "pid": 19,
    "name": "xptmxmanswp",
    "type": "web",
    "score": 1000,
    "info": "아몰랑",
    "issuer": "ㅈ지용",
    "flag": "YISF{testtest}",
    "active": false,
    "views": 0,
    "count": null,
    "filedata": [
      {
        "fid": 1,
        "filename": "a52e376568f83e764fc092ead6492d78",
        "filepath": "models/files/"
      }
    ]
  },
  {
    "pid": 35,
    "name": "rlahEl",
    "type": "web",
    "score": 1000,
    "info": "아몰랑",
    "issuer": "ㅈ지용",
    "flag": "YISF{testtest}",
    "active": true,
    "views": 1,
    "count": null,
    "filedata": [
      {
        "fid": 13,
        "filename": "d7f9426652b5e7dca893d18d070b490b",
        "filepath": "models/files/"
      }
    ]
  }
]
```

### 204 No Content

```
```

### 400 Bad Request

```json
{
    "success": false,
    "message": "No data found"
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

## Add Prob
#### POST /api/prob

### Request

---

#### Header
- accessToken: String (Required); Bearer Token
- RefreshToken: String (Required); JWT Token

#### Body
- attachments: File; array (Optional)
- name: String (Required)
- type: String (Required)
- info: String (Required)
- issuer: String (Required)
- flag: String (Required)

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

## Modify Prob
#### PATCH /api/prob/:pid

### Request

---

#### Header
- accessToken: String (Required); Bearer Token
- RefreshToken: String (Required); JWT Token

#### Parameter
- pid: Number (Required)

#### Body; One of these is required
- attachments: File; array (Optional)
- name: String (Optional)
- type: String (Optional)
- info: String (Optional)
- issuer: String (Optional)
- flag: String (Optional)

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

## Modify One File
#### PATCH /api/prob/file/:fid

### Request

---

#### Header
- accessToken: String (Required); Bearer Token
- RefreshToken: String (Required); JWT Token

#### Parameter
- fid: Number (Required)

#### Body
- alter: File; single (Required)

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

## Delete Prob
#### DELETE /api/prob/id/:pid

### Request

---

#### Header
- accessToken: String (Required); Bearer Token
- RefreshToken: String (Required); JWT Token

#### Parameter
- pid: Number (Required)

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

--- 

## Delete Comment
#### DELETE /api/prob/comment/:pid/:cid

### Request

---

#### Header
- accessToken: String (Required); Bearer Token
- RefreshToken: String (Required); JWT Token

#### Parameter
- pid: Number (Required)
- cid: Number (Required)

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