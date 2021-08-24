# 2021 YISF Web Server - API

---

## Summary

node.js + Express로 개발한 RESTful API

#### Domain: yisf.online/api/

---

## Environment

- 개발 환경: Macbook Air(M1) + WebStorm / (Tabnine Pro)
- 서버 환경(Web): Ubuntu 20.04 + Intel i7-4790K 12GB Memory


- 서버 구성 방식
- nginx reverse-proxy - frontend server (/, /admin), backend server (/api)

보안상의 이유로 reverse-proxy를 사용하여 서버를 나누었음. 총 3대의 PC를 사용함.

---

## Specification

- 언어: Only JavaScript
- 프레임워크: node.js@stable + express
- 데이터베이스: MariaDB (Sequelize)
- 모듈은 후술

---

## API Specification

- [AuthRoutes](./Auth.md)
- [ProbRoutes - For Users](./Prob.md)
- [ProbRoutes - For Admins](./Prob-admin.md)
- [LogRoutes](./Log.md)
- [NoticeRoutes](./Notice.md)
- [UserRoutes](./User.md)
- ErrorRoutes

---
## ErrorRoutes
### Router Code

---

```javascript
app.use((req, res, next) => {
    const err = new Error('404');
    err.status = 404;
    err.message = 'Not Found';
    next(err);
})
app.use((err, req, res, next) => {
    logger(req, 'error', `500 Server error. Error log: ${err}`, err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Server error",
        err
    });
})
```

---

### 404 Mot Found

```json
{
    "success": false,
    "message": "Not Found",
    "err": err
}
```

### 500 Server Error

```json
{
    "success": false,
    "message": "Server error",
    "err": err
}
```

---

### authController.isAdmin

---

```javascript
const isAdmin = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (user) {
            const data = user.toJSON();
            if (!data.isAdmin) {
                return res.status(403).json({
                    success: false,
                });
            }
            next();
        } else {
            return res.status(401).json({
                success: false,
                err
            });
        }
    })(req, res);
}
```

---

### 401 Unauthorized

```json
{
    "success": false,
    "err": err
}
```

---

## Dependency 

```json
"dependencies": {
    "cors": "^2.8.5",
    "crypto": "^1.0.1",
    "date-utils": "^1.2.21",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "fs": "^0.0.1-security",
    "helmet": "^4.6.0",
    "hpp": "^0.2.3",
    "jsonwebtoken": "^8.5.1",
    "mariadb": "^2.5.4",
    "mime": "^1.6.0",
    "mime-types": "^2.1.32",
    "multer": "^1.4.2",
    "passport": "^0.4.1",
    "passport-jwt": "^4.0.0",
    "passport-local": "^1.0.0",
    "path": "^0.12.7",
    "rand-token": "^1.0.1",
    "sequelize": "^6.6.4",
    "sequelize-cli": "^6.2.0",
    "winston": "^3.3.3",
    "winston-daily-rotate-file": "^4.5.5"
  }
```

---

## Changelog

---

```javascript
router.get('/api/prob/admin/:pid', access, isAdmin, wrap(C.getProb));
```

```javascript
router.get('/api/prob/admin/id/:pid', access, isAdmin, wrap(C.getProb));
```

#### 일관성을 위해 주소 변경

---

```javascript
const deleteNotice = (req, res) => {
    NoticeModel.destroy({
        where: { nid: req.params.nid }
    }).then((result) => {
        res.json({
            success: !!result
        });
    }).catch(() => {
        res.status(400).json({ success: false });
    });
}
```

```javascript
const deleteNotice = (req, res) => {
    NoticeModel.destroy({
        where: { nid: req.params.nid }
    }).then(() => {
        res.status(204);
    }).catch(() => {
        res.status(400).json({ success: false });
    });
}
```

#### RESTful API의 조건 중 하나인 DELETE Method 사용 시 204 반환을 맞추기 위해 수정

---

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

#### 변경 이전

```json
// Notify you that there are unusual examples because Dummy Data has been cleared
너무 길어서 가림
```

#### 변경 이후

변경점은 더러운 Top3의 데이터 형식 변환 및 깔끔한 데이터 제공

눈으로 보면 길다보니 잘 이해 안되니까 직접 api 접속해서 데이터 어떻게 나오는지 확인해보는거 추천

최대한 이해하기 쉽게 만들었음

이 부분 프론트에서 반영하고 수정해줘용

---

#### 변경 이전

```javascript
const deleteNotice = (req, res) => {
    NoticeModel.destroy({
        where: { nid: req.params.nid }
    }).then(() => {
        res.status(204);
    }).catch(() => {
        res.status(400).json({ success: false });
    });
}
```

#### 변경 이후

```javascript
const deleteNotice = (req, res) => {
    NoticeModel.destroy({
        where: { nid: req.params.nid }
    }).then(() => {
        res.status(204).end();
    }).catch(() => {
        res.status(400).json({ success: false });
    });
}
```

#### 204 Response시 end를 하지 않아서 생기는 pending 오류 수정

---

#### 변경 이전

```javascript
const getLog = async (req, res) => {
    if (req.params.page < 1) return res.status(400).json({ success: false, message: "page will be greater than 1" });
    const data = map(a => a.toJSON(), await LogModel.findAll({
        limit: 20, offset: 20 * (req.params.page - 1)
    }));
    if (data == false) return res.status(204).end();
    return res.json(data);
}
```

#### 변경 이후

```javascript
const getLog = async (req, res) => {
    if (req.params.page < 1) return res.status(400).json({ success: false, message: "page will be greater than 1" });
    const data = map(a => a.toJSON(), await LogModel.findAll({
        order: [['createdAt', 'DESC']],
        limit: 20, offset: 20 * (req.params.page - 1)
    }));
    if (data == false) return res.status(204).end();
    return res.json(data);
}
```

#### 추가된 부분
```javascript
order: [['createdAt', 'DESC']]
```

#### 로그 확인 시 최근 로그부터 확인할 수 있도록 변경

---

#### MariaDB Timezone KST로 변경 완료

ENGINE = InnoDB;
