# ProbRoutes API Specification - Users

---
### Router Code

```javascript
router.get('/api/prob', access, C.getProbByActivation);
router.get('/api/prob/id/:pid', access, C.getProbByPid);
router.get('/api/prob/type/:type', access, C.getProbByType);
router.get('/api/prob/comment/:pid', access, wrap(getComment));

router.get('/api/ranking/user/top3', access, wrap(C.getRankingByElapsed));
router.get('/api/ranking/user/top10', access, wrap(C.getRankingBySolved));
router.get('/api/ranking/prob/top3', access, wrap(C.getRankingUpToThird));
router.get('/api/ranking/prob/top10', access, wrap(C.getRankingUpToTenth));
router.get('/api/prob/download/:pid/:fid', access, wrap(C.downloadFile));

router.post('/api/prob/submit/:pid', access, C.submitFlag, C.flagHandler, wrap(createComment));
```

---
## Get Prob Datas
#### GET /api/prob

### Request

---

#### Header
- accessToken: String (Required); Bearer Token
- RefreshToken: String (Required); JWT Token

---

### Response

### 200 OK

```json
// Example Datas
{
    "success": true,
    "result": [
        {
            "pid": 20,
            "name": "문제 파일 있음",
            "type": "pwnable",
            "score": 100,
            "info": "문제 문제 문제 파일 ",
            "issuer": "이지금",
            "active": true,
            "views": 182,
            "count": null
        },
        {
            "pid": 27,
            "name": "문제용",
            "type": "reversing",
            "score": 100,
            "info": "ㅎㅇㅎㅇㅎㅇㅎㅎㅇ\nSF{123123}",
            "issuer": "RokLcw",
            "active": true,
            "views": 30,
            "count": null
        }
    ]
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

## Get Prob Datas via id or type
#### GET /api/prob/id/:pid
#### GET /api/prob/type/:type

### Request

---

#### Header
- accessToken: String (Required); Bearer Token
- RefreshToken: String (Required); JWT Token 

#### Parameter
- id: Number (Required)
  
#### or
- type: String (Required)

---

### Response

### 200 OK

```json
// Example Datas
{
    "success": true,
    "result": [
        {
            "pid": 20,
            "name": "문제 파일 있음",
            "type": "pwnable",
            "score": 100,
            "info": "문제 문제 문제 파일 ",
            "issuer": "이지금",
            "active": true,
            "views": 182,
            "count": null
        },
        {
            "pid": 27,
            "name": "문제용",
            "type": "reversing",
            "score": 100,
            "info": "ㅎㅇㅎㅇㅎㅇㅎㅎㅇ\nSF{123123}",
            "issuer": "RokLcw",
            "active": true,
            "views": 30,
            "count": null
        }
    ]
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

## Get Comment
#### GET /api/prob/comment/:pid

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
// Example Data
{
    "success": true,
    "data": [
        {
            "cid": 12,
            "name": "User1",
            "content": "다시 들어보고 싶은 노래에요!",
            "createdAt": "2021-08-04T14:33:36.000Z",
            "pid": 20
        },
        {
            "cid": 13,
            "name": "User2",
            "content": "아주 즐거웠어요!",
            "createdAt": "2021-08-05T10:42:51.000Z",
            "pid": 20
        },
        {
            "cid": 18,
            "name": "User3",
            "content": "흥미로웠어요!",
            "createdAt": "2021-08-07T14:37:26.000Z",
            "pid": 20
        },
        {
            "cid": 23,
            "name": "User4",
            "content": "아주 즐거웠어요!",
            "createdAt": "2021-08-08T13:18:22.000Z",
            "pid": 20
        }
    ]
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

## User Ranking; Top3
#### GET /api/ranking/user/top3

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
    [
        {
            "score": 2888,
            "uid": 44,
            "elapsed": 0
        },
        {
            "score": 1907,
            "uid": 36,
            "elapsed": 0
        },
        {
            "score": 0,
            "uid": 19,
            "elapsed": 0
        }
    ],
    [
        {
            "score": 2943,
            "uid": 44,
            "elapsed": 1
        },
        {
            "score": 0,
            "uid": 36,
            "elapsed": 1
        },
        {
            "score": 0,
            "uid": 19,
            "elapsed": 1
        }
    ],
    [
        {
            "score": 2943,
            "uid": 44,
            "elapsed": 2
        },
        {
            "score": 0,
            "uid": 36,
            "elapsed": 2
        },
        {
            "score": 0,
            "uid": 19,
            "elapsed": 2
        }
    ],
    [
        {
            "score": 0,
            "uid": 44,
            "elapsed": 3
        },
        {
            "score": 0,
            "uid": 36,
            "elapsed": 3
        },
        {
            "score": 0,
            "uid": 19,
            "elapsed": 3
        }
    ],
    [
        {
            "score": 0,
            "uid": 44,
            "elapsed": 4
        },
        {
            "score": 0,
            "uid": 36,
            "elapsed": 4
        },
        {
            "score": 0,
            "uid": 19,
            "elapsed": 4
        }
    ],
    [
        {
            "score": 0,
            "uid": 44,
            "elapsed": 5
        },
        {
            "score": 0,
            "uid": 36,
            "elapsed": 5
        },
        {
            "score": 0,
            "uid": 19,
            "elapsed": 5
        }
    ],
    [
        {
            "score": 0,
            "uid": 44,
            "elapsed": 6
        },
        {
            "score": 0,
            "uid": 36,
            "elapsed": 6
        },
        {
            "score": 0,
            "uid": 19,
            "elapsed": 6
        }
    ],
    [
        {
            "score": 0,
            "uid": 44,
            "elapsed": 7
        },
        {
            "score": 0,
            "uid": 36,
            "elapsed": 7
        },
        {
            "score": 0,
            "uid": 19,
            "elapsed": 7
        }
    ]
]
```

### 401 Unauthorized

```json
{
    "success": false,
    "message": "Login required"
}
```

---

## User Ranking; Top 10
#### GET /api/ranking/user/top10

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
// There are not more than 10 users as of the creation date (development stage)
[
    {
        "uid": 40,
        "pscore": 3350,
        "solvedAt": "2021-08-08T13:50:47.000Z",
        "user": {
            "nickname": "장화쓴고양이"
        }
    },
    {
        "uid": 19,
        "pscore": 1971,
        "solvedAt": "2021-07-27T00:45:02.000Z",
        "user": {
            "nickname": "이지금"
        }
    },
    {
        "uid": 37,
        "pscore": 1479,
        "solvedAt": "2021-08-08T13:11:47.000Z",
        "user": {
            "nickname": "정지용TV좋아요구독부탁드립니다"
        }
    },
    {
        "uid": 25,
        "pscore": 1000,
        "solvedAt": "2021-08-07T03:29:26.000Z",
        "user": {
            "nickname": "닉닉닉"
        }
    },
    {
        "uid": 39,
        "pscore": 725,
        "solvedAt": "2021-08-08T13:47:36.000Z",
        "user": {
            "nickname": "test_1"
        }
    },
    {
        "uid": 32,
        "pscore": 632,
        "solvedAt": "2021-08-07T14:35:14.000Z",
        "user": {
            "nickname": "wynt3r"
        }
    },
    {
        "uid": 31,
        "pscore": 207,
        "solvedAt": "2021-08-07T11:13:37.000Z",
        "user": {
            "nickname": "don't don done"
        }
    },
    {
        "uid": null,
        "pscore": 0,
        "solvedAt": "2021-07-26T07:37:02.000Z",
        "user": null
    },
    {
        "uid": null,
        "pscore": 0,
        "solvedAt": "2021-07-26T07:40:00.000Z",
        "user": null
    },
    {
        "uid": null,
        "pscore": 0,
        "solvedAt": "2021-07-26T13:24:56.000Z",
        "user": null
    }
]
```

### 401 Unauthorized

```json
{
    "success": false,
    "message": "Login required"
}
```

---

## Prob Ranking; Top 3
#### GET /api/ranking/prob/top3

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
        "name": "xptmxmanswp",
        "type": "web",
        "score": 1000,
        "info": "아몰랑",
        "issuer": "ㅈ지용",
        "flag": "YISF{testtest}",
        "active": false,
        "views": 0,
        "count": null
    },
    {
        "pid": 20,
        "name": "문제 파일 있음",
        "type": "pwnable",
        "score": 100,
        "info": "문제 문제 문제 파일 ",
        "issuer": "이지금",
        "flag": "YISF{123123123}",
        "active": true,
        "views": 182,
        "count": null
    },
    {
        "pid": 21,
        "name": "xptmxmanswp",
        "type": "web",
        "score": 1000,
        "info": "아몰랑",
        "issuer": "ㅈ지용",
        "flag": "YISF{testtest}",
        "active": false,
        "views": 0,
        "count": null
    }
]
```

### 401 Unauthorized

```json
{
    "success": false,
    "message": "Login required"
}
```

---

## Prob Ranking; Top 10
#### GET /api/ranking/prob/top10

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
        "name": "xptmxmanswp",
        "type": "web",
        "score": 1000,
        "info": "아몰랑",
        "issuer": "ㅈ지용",
        "flag": "YISF{testtest}",
        "active": false,
        "views": 0,
        "count": null
    },
    {
        "pid": 20,
        "name": "문제 파일 있음",
        "type": "pwnable",
        "score": 100,
        "info": "문제 문제 문제 파일 ",
        "issuer": "이지금",
        "flag": "YISF{123123123}",
        "active": true,
        "views": 182,
        "count": null
    },
    {
        "pid": 21,
        "name": "xptmxmanswp",
        "type": "web",
        "score": 1000,
        "info": "아몰랑",
        "issuer": "ㅈ지용",
        "flag": "YISF{testtest}",
        "active": false,
        "views": 0,
        "count": null
    },
    {
        "pid": 22,
        "name": "xptmxmanswp",
        "type": "web",
        "score": 1000,
        "info": "아몰랑",
        "issuer": "ㅈ지용",
        "flag": "YISF{testtest}",
        "active": false,
        "views": 0,
        "count": null
    },
    {
        "pid": 23,
        "name": "rlahEl",
        "type": "web",
        "score": 1000,
        "info": "아몰랑",
        "issuer": "ㅈ지용",
        "flag": "YISF{testtest}",
        "active": false,
        "views": 0,
        "count": null
    },
    {
        "pid": 24,
        "name": "rlahEl",
        "type": "web",
        "score": 1000,
        "info": "아몰랑",
        "issuer": "ㅈ지용",
        "flag": "YISF{testtest}",
        "active": false,
        "views": 0,
        "count": null
    },
    {
        "pid": 25,
        "name": "rlahEl",
        "type": "web",
        "score": 1000,
        "info": "아몰랑",
        "issuer": "ㅈ지용",
        "flag": "YISF{testtest}",
        "active": false,
        "views": 0,
        "count": null
    },
    {
        "pid": 26,
        "name": "rlahEl",
        "type": "web",
        "score": 1000,
        "info": "아몰랑",
        "issuer": "ㅈ지용",
        "flag": "YISF{testtest}",
        "active": false,
        "views": 0,
        "count": null
    },
    {
        "pid": 27,
        "name": "문제용",
        "type": "reversing",
        "score": 100,
        "info": "ㅎㅇㅎㅇㅎㅇㅎㅎㅇ\nSF{123123}",
        "issuer": "RokLcw",
        "flag": "SF{123123}",
        "active": true,
        "views": 30,
        "count": null
    },
    {
        "pid": 28,
        "name": "FOR_test_1",
        "type": "forensic",
        "score": 1000,
        "info": "FOR_test_1",
        "issuer": "운영진",
        "flag": "YISF{FOR_test_1}",
        "active": false,
        "views": 0,
        "count": null
    }
]
```

### 401 Unauthorized

```json
{
    "success": false,
    "message": "Login required"
}
```

---

## Download file
#### GET /api/prob/download/:pid/:fid

### Request

---

#### Header
- accessToken: String (Required); Bearer Token
- RefreshToken: String (Required); JWT Token

#### Parameter
- pid: Number (Required)
- fid: Number (Required)

---

### Response

---

### 200 OK

Header: Content-Disposition; Download File 

### 401 Unauthorized

```json
{
    "success": false,
    "message": "Login required"
}
```

---

## Submit Flag
#### POST /api/prob/submit/:pid

### Request

---

#### Header
- accessToken: String (Required); Bearer Token
- RefreshToken: String (Required); JWT Token

#### Body
- flag: String (Required)

#### Parameter
- pid: Number (Required)

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
```json
{
    "success": false,
    "message": "Already Solved"
}
```
```json
{
    "success": false
}
```
```json
{
    "success": false,
    "message": req.body.flag + "is not correct"
}
```

### 401 Unauthorized

```json
{
    "success": false,
    "message": "Login required"
}
```

### 403 Forbidden

```json
{
    "success": false,
    "message": "Submitting flags to an administrator account is prohibited."
}
```