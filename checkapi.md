# API Check Results

---

## AuthRoutes
Pass

---

## ProbRoutes

---

Getting Probs for Admins

```javascript
router.get('/api/prob/admin', access, isAdmin, wrap(C.getProb));
router.get('/api/prob/admin/id/:pid', access, isAdmin, wrap(C.getProb));
router.get('/api/prob/admin/type/:type', access, isAdmin, wrap(C.getProb));
```

/api/prob/admin

pid, name, type 리턴함

/api/prob/admin/id/:pid

flag 포함 모든 데이터 + filedata[ fid, filename, filepath ] 리턴함

이상한 pid 접근 시
```json
{
    "success": false,
    "message": "No data found"
}
```

/type/:type도 마찬가지

---

Getting Probs

```javascript
router.get('/api/prob', access, C.getProbByActivation);
router.get('/api/prob/id/:pid', access, C.getProbByPid);
router.get('/api/prob/type/:type', access, C.getProbByType);
router.get('/api/prob/comment/:pid', access, wrap(getComment));
```

/api/prob, /api/prob/type/:type

flag 제외 모든 데이터 리턴함

/api/prob/id/:pid

flag 제외 모든 데이터 + solved, downloadFile Boolean으로 리턴함

/api/prob/comment/:pid

comment의 모든 데이터 제공

이상한 pid 접근 시
```json
{   
    "success": true,
    "data": []
}
```

오류임 수정해야 함

```json
{
    "success": false,
    "data": []
}
```

수정 완료

---

Getting Rankings

```javascript
router.get('/api/ranking/user/top3', access, wrap(C.getRankingByElapsed));
router.get('/api/ranking/user/top10', access, wrap(C.getRankingBySolved));
router.get('/api/ranking/prob/top3', access, wrap(C.getRankingUpToThird));
router.get('/api/ranking/prob/top10', access, wrap(C.getRankingUpToTenth));
```

/api/ranking/user/top3

상위 3명의 시간별 데이터 제공 (score, uid, elapsed)

/api/ranking/user/top10

상위 10명의 데이터 제공 (score, uid, solvedAt, nickname)

/api/ranking/prob/top3, /api/ranking/prob/top10

count를 기준으로 하여 상위 3, 10개의 문제의 데이터를 제공

header 외에 parameter or body가 없으므로 예외 발견 불가

---

Getting file from pid

```javascript
router.get('/api/prob/download/:pid/:fid', access, wrap(C.downloadFile));
```

/api/prob/download/:pid/:fid

문제의 파일을 제공

올바르지 않은 pid 제공 시 

```json
{
    "success": false,
    "message": "Cannot read property 'toJSON' of undefined",
    "err": {}
}
```

수정

```json
{
    "success": false,
    "message": "Cannot read property 'match' of undefined",
    "err": {}
}
```

수정

파일 다운로드 성공

수정 

```json
{
    "success": false,
    "message": "Invalid fid or pid"
}
```

성공

---

Add Prob

```javascript
router.post('/api/prob', access, isAdmin, upload.array('attachments'), C.addProb);
```

POST /api/prob

문제 생성

body에 데이터가 모자랄 때

```json
{
    "success": false,
    "err": {
        "name": "SequelizeValidationError",
        "errors": [
            {
                "message": "chall.type cannot be null",
                "type": "notNull Violation",
                "path": "type",
                "value": null,
                "origin": "CORE",
                "instance": {
                    "score": 1000,
                    "active": false,
                    "views": 0,
                    "count": 0,
                    "pid": null,
                    "name": "rlahEl",
                    "info": "아몰랑",
                    "issuer": "지용",
                    "flag": "YISF{testtest}"
                },
                "validatorKey": "is_null",
                "validatorName": null,
                "validatorArgs": []
            }
        ]
    }
}
```

뭐 정상임

---

Submit flag

```javascript
router.post('/api/prob/submit/:pid', access, C.submitFlag, C.flagHandler, wrap(createComment));
```

어드민 플래그 제출

```json
{
    "success": false,
    "message": "Submitting flags to an administrator account is prohibited."
}
```

정상 

일반 유저

```json
{
    "success": false,
    "message": "Cannot read property 'toJSON' of null"
}
```

??

```json
{
    "success": false,
    "message": "Invalid flag."
}
```

수정 완료

---

Modify Probs and Files

```javascript
router.patch('/api/prob/:pid', access, isAdmin, upload.single('alter'), C.modifyProb);
router.patch('/api/prob/file/:fid', access, isAdmin, upload.single('alter'), C.modifyFile);
router.patch('/api/prob/file', access, isAdmin, upload.single('alter'), C.modifyFile);
```

