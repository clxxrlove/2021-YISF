const ScoreModel = require('./models').Score;
const SolverModel = require('./models').Solver;
const UserModel = require('./models').User;
const ChallModel = require('./models').Chall;
const Op = require('sequelize').Op;
const { map, filter, reduce } = require('./controller/fp');

const dynamicallyCreate = async (x, threshold) => {
    const max = 1000, min = 100;
    return Math.floor(((min - max)
        / Math.pow(Math.floor(threshold), 2))
        * Math.pow(x, 2)) + max;
}

// end //
// new graph logic //

const thirdUsers = async () => {
    const rawScore = await ScoreModel.findAll();
    return map(a => a.toJSON(), rawScore);
};

const calcElapsed = (elapsed) => {
    return new Date(new Date - (3600000 * elapsed));
}

const solvedData = async (data, uid) => {
    return filter(a => a.uid === uid, data);
}

const filterByElapsed = (data, time) => {
    return filter(a => a.solvedAt <= time, data);
}

const add = (a, b) => a + b;

const calcScore = async (data, solved, count) => {
    const result = [];
    for (const a of solved) {
        result.push(
            await dynamicallyCreate(
                filter(b => b.pid === a.pid, data).length, count));
    }
    return reduce(add, 0, result);
}

const getGraphData = async () => {
    const solverData = map(a => a.toJSON(), await SolverModel.findAll());
    const userCount = await UserModel.count({ where: { isAdmin: 0 }});
    const result = [];

    const rankers = {};
    rankers.uid = map(a => a.uid, await thirdUsers());
    rankers.solved = await solvedData(solverData, rankers.uid);

    for (const a of rankers.uid) {
        const userScore = await calcScore(
            filterByElapsed(solverData, calcElapsed(0)),
            filterByElapsed(await solvedData(solverData, a), calcElapsed(0)), userCount
        );
        result.push({
            score: userScore,
            uid: a
        })
    }
    for (const a of result) {
        const oneScore = map(b => b.toJSON(), await ScoreModel.findOne({ where : { uid: a.uid }}));
        const prevData = {
            solved: oneScore.solved,
            solvedAt: oneScore.solvedAt,
            pscore: a.score
        };
        await ScoreModel.update(
            prevData,
            { where: { uid : a.uid }}
        );
    }
};

const setScore = async () => {
    const challData = map(a => a.toJSON(), await ChallModel.findAll());
    for (const a of challData) {
        const solverCount = await SolverModel.count({ where: { pid: a.pid }});
        const realScore = await dynamicallyCreate(solverCount, 15);

        await ChallModel.update({
            score: realScore,
        }, { where: { pid: a.pid }});
    }
}

const setSolvedAt = async () => {
    const scoreData = map(a => a.toJSON(), await ScoreModel.findAll());
    const scoreUid = map(a => a.uid, scoreData);
    for (const a of scoreUid) {
        const one = map(a => a.toJSON(), await SolverModel.findAll({ where: { uid: a }}));
        let temp = new Date('2021-08-13 01:01:01');
        for (const b of one) {
            temp = temp < b.solvedAt ? b.solvedAt : temp;
        }
        await ScoreModel.update({ solvedAt: temp }, { where: { uid: a }});
        console.log(temp);
    }
}

// (async function () {
//     await getGraphData();
//     await setScore();
// })()
//
(async function () {
    console.log(await setSolvedAt());
})()

module.exports = {
    setScore,
    getGraphData,
    setSolvedAt
}