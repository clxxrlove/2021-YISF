const randComments = [
    { content: "아주 즐거웠어요!" },
    { content: "흥미로웠어요!" },
    { content: "다시 들어보고 싶은 노래에요!" },
    { content: "행복해졌어요!" },
]

const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const getComment = () => {
    return randComments[getRandom(0, randComments.length - 1)];
}

module.exports = getComment;