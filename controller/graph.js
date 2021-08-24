// const {Op} = require("sequelize");
const ScoreModel = require('../models').Score;
const SolverModel = require('../models').Solver;
const UserModel = require('../models').User;
const ChallModel = require('../models').Chall;
const { map, filter, reduce } = require('./fp');

// scoring //

const getCountOfUsers = async () => {
    return await UserModel.count({
        where: { isAdmin: 0 }
    });
}

const dynamicallyCreate = async (x, threshold) => {
    const max = 1000, min = 100;
    return Math.floor(((min - max)
        / Math.pow(Math.floor(threshold), 2))
        * Math.pow(x, 2)) + max;
}

// // const solverDependsOnTime = async (pid, elapsed) => {
// //     return await SolverModel.findAll({ where: {
// //             pid,
// //             solvedAt: { [Op.lte]: elapsed }
// //         },
// //     });
// // }
//
// // end //
// // database output //
//
// const scoreData = (async () => {
//     return await ScoreModel.findAll({
//         order: [
//             ['pscore', 'DESC']
//         ],
//         limit: 3
//     });
// })();
//
// // const solverData = (async () => {
// //     return await SolverModel.findAll();
// // })();
//
// // end //
// // top 3 people logic //
//
// const getProbList = async (list) => {
//     const uniqueId = map(a => a.toJSON().uid, await scoreData);
//     const result = [];
//     const data = map(a => a.toJSON(), list)
//
//     for (let i = 0; i < uniqueId.length; i++) {
//         result[i] = [];
//         const solverData = filter(a => a.uid === uniqueId[i], data);
//         // const solverData1 = await SolverModel.findAll({
//         //     where: { uid: uniqueId[i] }
//         // });
//
//         result[i] = {
//             uid: uniqueId[i],
//             prob: await solverHandler(solverData)
//         };
//         // result[i] = await solverHandler(solverData);
//     }
//     return result;
// }
//
// const solverHandler = async (list) => {
//     const res = []
//     for (let i = 0; i < list.length; i++) {
//         res[i] = list[i].pid;
//     }
//     return res;
// }
//
// const checkSolved = async (list, data) => {
//     const solverData = map(a => a.toJSON(), data);
//     const result = [[], [], []], temp = [];
//
//     for (const p of list) {
//         temp.push(filter(
//             solver => { return solver.uid === p.uid && p.prob.indexOf(solver.pid) !== -1 }, solverData));
//     }
//
//     let j = 0;
//     for (let i = 0; i <= 7; i++) {
//         j = 0;
//         for (const t of temp) {
//             const data = filter(probData => {
//                 return probData.solvedAt <= calcElapsed(i)
//             }, t);
//             result[j++].push(data);
//         }
//     }
//     return result;
// }
//
// const diff = async () => {
//     const rawData = await SolverModel.findAll();
//     const solver = await checkSolved(await getProbList(rawData), rawData);
//     const result = [];
//     const users = await getCountOfUsers();
//     for (let i = 0; i < solver.length; i++) {
//         result[i] = [];
//         for (let j = 0; j < solver[i].length; j++) {
//             result[i][j] = [];
//             for (const a of solver[i][j]) {
//                 const temp = await dynamicallyCreate(await getCount(calcElapsed(j), a.pid,
//                     map(a => a.toJSON(), rawData)), users);
//                 if (temp) {
//                     result[i][j].push({
//                         score: temp,
//                         pid: a.pid,
//                         elapsed: j
//                     });
//                 }
//             }
//             result[i][j].push({
//                 sum: reduce((acc, a) => acc + a.score, 0, result[i][j]),
//                 uid: solver[i][j].uid
//             })
//         }
//     }
//
//     return result;
// }
//
// const calcElapsed = (elapsed) => {
//     return new Date(new Date - (3600000 * elapsed));
// }
//
// // const getCount = async (elapsed, pid) => {
// //     return await SolverModel.count({
// //         where: {
// //             pid,
// //             solvedAt: {
// //                 [Op.lte]: elapsed
// //             }
// //         }
// //     });
// // } // 범인 2
//
// const getCount = (elapsed, pid, list) => {
//     const data = filter((a, i) => {
//         return (a.pid === pid && a.solvedAt <= elapsed);
//     }, list);
//     return data.length;
// }

// end //
// top 10 people logic //

const getRanking = async () => {
    const rawData = await ScoreModel.findAll({
        include: [{
            model: UserModel,
            attributes: ['nickname', 'isAdmin'],
            where: { isAdmin: false }
        }],
        attributes: ['uid', 'pscore', 'solvedAt'],
        order: [
            ['pscore', 'DESC'],
            ['solvedAt', 'ASC'],
        ],
        limit: 15
    });

    return map(a => a.toJSON(), rawData);
}

// end //
// top 10 prob logic //

// const getProbRanking = async (num) => {
//     const rawData = await SolverModel.findAll();
//     const data = map(a => a.toJSON(), rawData);
//     const probs = Array.from(new Set(map(a => a.pid, data)));
//     const result = [];
//
//     for (let i = 0; i < probs.length; i++) {
//         result.push(filter(a => probs[i] == a.pid, data))
//     }
//
//     return take(num, result);
// }

const getProbRanking = async (num) => {
    const rawData = await ChallModel.findAll({
        where: { active: true },
        order: [
            ['score', 'ASC'],
        ],
        limit: num
    });

    return map(a => {
        delete a.flag; return a;
    }, map(b => b.toJSON(), rawData));
}

// end //
// new graph logic //

const thirdUsers = async () => {
    const rawScore = await ScoreModel.findAll({
        order: [
            ['pscore', 'DESC'],
            ['solvedAt', 'ASC']
        ],
        limit: 3
    });
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

    for (let i = 0; i <= 7; i++) {
        const score = [];
        for (const a of rankers.uid) {
            const userScore = await calcScore(
                filterByElapsed(solverData, calcElapsed(i)),
                filterByElapsed(await solvedData(solverData, a), calcElapsed(i)), userCount
            );
            score.push({
                score: userScore,
                uid: a,
                elapsed: i
            })
        }
        result.push(score);
    }
    return result;
};

// end //
// test //

//
module.exports = { getGraphData, getRanking, getProbRanking };