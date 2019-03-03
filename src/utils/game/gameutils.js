const moment = require('moment');

export function getTimeInMinutes(seconds) {
    return moment.utc(seconds * 1000).format('mm:ss');
}

export function initAnswersList() {
    const list = [];
    for (let i = 0; i < 10; i++) {
        list.push([]);
    }
    return list;
}

export function computeResult(correctAnswers, userAnswers) {
    let result = 0;
    for (let i = 0; i < correctAnswers.length; i++) {
        if (correctAnswers[i].length === userAnswers[i].length) {
            for (let j = 0; j < userAnswers[i].length; j++) {
                if (!correctAnswers[i].includes(userAnswers[i][j])) {
                    break;
                } else if (j === userAnswers[i].length - 1) {
                    result += 1;
                }
            }
        }
    }
    return result;
}
