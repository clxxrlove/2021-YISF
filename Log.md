# LogRoutes API Specification

See index.js for error handlers on these paths.

---
### Router Code

```javascript
router.use(isAdmin);

router.get('/api/log/:page', wrap(getLog));
router.get('/api/log/type/:type/:page', wrap(getLogByType));
router.post('/api/log/search/:page', wrap(getLogForSearch));
router.post('/api/log/count/all', wrap(getPage));
```

---

## Get Logs by paging
#### GET /api/log/:page

### Request

---

#### Header
- accessToken: String (Required); Bearer Token
- RefreshToken: String (Required); JWT Token

#### Parameter
- page: Number (Required)

---

### Response

---

### 200 OK

```json
// In fact, there are 20 logs on a page
[
    {
        "id": 1,
        "ip": "xxx.xxx.xxx.xxx",
        "referer": "0",
        "nickname": "운영진",
        "pid": null,
        "fid": null,
        "flag": null,
        "type": "login",
        "createdAt": "2021-08-03T19:00:54.000Z"
    },
    {
        "id": 2,
        "ip": "xxx.xxx.xxx.xxx",
        "referer": "http://localhost:10101/",
        "nickname": "이지금",
        "pid": null,
        "fid": null,
        "flag": null,
        "type": "login",
        "createdAt": "2021-08-04T01:15:22.000Z"
    },
    {
        "id": 3,
        "ip": "xxx.xxx.xxx.xxx",
        "referer": "http://localhost:10101/",
        "nickname": "이지금",
        "pid": null,
        "fid": null,
        "flag": null,
        "type": "login",
        "createdAt": "2021-08-04T01:24:54.000Z"
    },
    {
        "id": 4,
        "ip": "xxx.xxx.xxx.xxx",
        "referer": "http://211.229.250.147:3030/",
        "nickname": "이지금",
        "pid": null,
        "fid": null,
        "flag": null,
        "type": "login",
        "createdAt": "2021-08-04T01:41:19.000Z"
    },
    {
        "id": 5,
        "ip": "xxx.xxx.xxx.xxx",
        "referer": "http://localhost:10101/",
        "nickname": "이지금",
        "pid": null,
        "fid": null,
        "flag": null,
        "type": "login",
        "createdAt": "2021-08-04T01:42:18.000Z"
    }
]
```

---

## Get Logs via type by paging
#### GET /api/log/type/:type/:page

### Request

---

#### Header
- accessToken: String (Required); Bearer Token
- RefreshToken: String (Required); JWT Token

#### Parameter
- type: String (Required)
- page: Number (Required)

---

### Response

---

### 200 OK

```json
// In fact, there are 20 logs on a page
[
    {
        "id": 27,
        "ip": "220.123.18.239",
        "referer": "http://211.229.250.147:3030/",
        "nickname": "시큐시큐시큐",
        "pid": "20",
        "fid": null,
        "flag": "YISF{123123123}",
        "type": "flag",
        "createdAt": "2021-08-04T14:33:36.000Z"
    },
    {
        "id": 43,
        "ip": "121.184.188.35",
        "referer": "http://localhost:10101/",
        "nickname": "이지금",
        "pid": "20",
        "fid": null,
        "flag": "YISF{123123123}",
        "type": "flag",
        "createdAt": "2021-08-05T10:42:51.000Z"
    },
    {
        "id": 44,
        "ip": "121.184.188.35",
        "referer": "http://localhost:10101/",
        "nickname": "이지금",
        "pid": "7",
        "fid": null,
        "flag": "YISF{123123123}",
        "type": "flag",
        "createdAt": "2021-08-05T10:43:34.000Z"
    },
    {
        "id": 49,
        "ip": "220.123.18.239",
        "referer": "http://211.229.250.147:3030/",
        "nickname": "김김김",
        "pid": "8",
        "fid": null,
        "flag": "YISF{123123123}",
        "type": "flag",
        "createdAt": "2021-08-07T03:29:48.000Z"
    }
]
```

---

## Search logs
#### POST /api/log/search/:page

### Request

---

#### Header
- accessToken: String (Required); Bearer Token
- RefreshToken: String (Required); JWT Token

#### Parameter
- page: Number (Required)

#### Body; One of these is required
- ip: String (Optional)
- referer: String (Optional)
- nickname: String (Optional)
- pid: Number (Optional)
- fid: Number (Optional)
- flag: String (Optional)
- type: String (Optional)

---

### Response

---

### 200 OK

```
Same as above
```

---

## Get count of logs
#### POST /api/log/count/all

### Request

---

#### Header
- accessToken: String (Required); Bearer Token
- RefreshToken: String (Required); JWT Token

#### Body; One of these is required
- ip: String (Optional)
- referer: String (Optional)
- nickname: String (Optional)
- pid: Number (Optional)
- fid: Number (Optional)
- flag: String (Optional)
- type: String (Optional)

---

### Response

---

### 200 OK

```json
{
    "count": Number,
    "page": Number
}
```