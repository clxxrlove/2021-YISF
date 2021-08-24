// Functions for functional Programming //

const map = (predicate, list) => {
    const result = []
    for (let i = 0; i < list.length; i++) {
        result.push(predicate(list[i], i));
    }
    return result;
}

const filter = (predicate, list) => {
    const result = [];
    for (let i = 0; i < list.length; i++) {
        if (predicate(list[i], i)) result.push(list[i]);
    }
    return result;
}

const reduce = (predicate, acc, list) => {
    for (const a of list) {
        acc = predicate(acc, a);
    }
    return acc;
}

const curry = f => (a, ...bs) =>
    bs.length ? f(a, ...bs) : (...bs) => f(a, ...bs);

const take = (length, iter) => {
    const res = [];
    for (const a of iter) {
        res.push(a);
        if (res.length === length) return res;
    }
    return res;
}

// end //

module.exports = { map, filter, reduce, curry, take }