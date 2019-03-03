const moment = require('moment');

/**
 * format a value in second into mm:ss format
 * @param {number} seconds 
 */
function getTimeInMinutes(seconds) {
    return moment.utc(seconds * 1000).format('mm:ss');
}

/**
 * Initialize an array of ten empty array
 */
function initAnswersList() {
    const list = [];
    for (let i = 0; i < 10; i++) {
        list.push([]);
    }
    return list;
}

/**
 * Get progress circle color
 * @param {number} result 
 */
function getProgressCircleColor(result) {
    if (result < 5) {
        return 'red';
    } else if (result < 8) {
        return 'orange';
    }
    return 'green';
}

/**
 * Check user answers and compute result according to correct answers list
 * @param {Array of number} correctAnswers 
 * @param {Array of number} userAnswers 
 */
function computeResult(correctAnswers, userAnswers) {
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

/**
 * Quiz
 */

/**
 * get quiz object by using its id
 * @param {String} quizId 
 * @return promise
 */
const getQuizById = async (quizId) => {
    const url = `http://10.0.2.2:8000/quizs/${quizId}`;
    // eslint-disable-next-line no-undef
    const response = await fetch(url);
    try {
        const json = await response.json();
        return json;
    } catch (e) {
        console.log(`Fetch failed: ${e}`);
    }
};

/**
 * get list of quiz
 * @return promise
 */
const getAllQuiz = async () => {
    const url = 'http://10.0.2.2:8000/quizs';
    // eslint-disable-next-line no-undef
    const response = await fetch(url);
    try {
        const json = await response.json();
        return json;
    } catch (e) {
        console.log(`Fetch failed: ${e}`);
    }
};

/**
 * get a quizz according to the difficulty
 * @param {String} uid 
 * @param {String} diff
 */
const getQuizByDifficulty = async (uid, diff) => {
    const url = `http://10.0.2.2:8000/quizs/random/${uid}?level=${diff}`;    
    // eslint-disable-next-line no-undef
    const response = await fetch(url);
    try {
        const json = await response.json();
        return json;
    } catch (e) {
        console.log(`Fetch failed: ${e}`);
    }
};

/**
 * get the most played quiz
 * @param {String} uid 
 * @param {Number} quantity
 * @return promise
 */
const getQuizMostPlayed = async (uid, quantity) => {
    const url = `http://10.0.2.2:8000/quizs/mostPlayed/${uid}?quantity=${quantity}`;
    // eslint-disable-next-line no-undef
    const response = await fetch(url);
    try {
        const json = await response.json();
        return json;
    } catch (e) {
        console.log(`Fetch failed: ${e}`);
    }
};

/**
 * get the last added quiz
 * @param {String} uid 
 * @param {Number} quantity
 * @return promise
 */
const getNewQuiz = async (uid, quantity) => {
    const url = `http://10.0.2.2:8000/quizs/new/${uid}?quantity=${quantity}`;
    // eslint-disable-next-line no-undef
    const response = await fetch(url);
    try {
        const json = await response.json();
        return json;
    } catch (e) {
        console.log(`Fetch failed: ${e}`);
    }
};

/**
 * get recommended quiz
 * @param {String} uid 
 * @param {Number} quantity
 * @return promise
 */
const getRecommendedQuiz = async (uid, quantity) => {
    const url = `http://10.0.2.2:8000/quizs/recommended/${uid}?quantity=${quantity}`;
    // eslint-disable-next-line no-undef
    const response = await fetch(url);
    try {
        const json = await response.json();
        return json;
    } catch (e) {
        console.log(`Fetch failed: ${e}`);
    }
};

/**
 * push user score at the end of the quiz
 * @param {String} uid 
 * @param {String} qid 
 * @param {String} sc 
 */
const pushUserScore = async (uid, qid, sc) => {
    const url = `http://10.0.2.2:8000/scores/score_quiz/${uid}`;
    // eslint-disable-next-line no-undef
    const response = await fetch(
        url,
        {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quizId: qid,
                score: sc,
                last_played: ''
            }),
        });
    try {
        const json = await response.json();      
        return json;
    } catch (e) {
        console.log(`Fetch failed: ${e}`);
    }
};

/**
 * User
 */

/**
 * get list of users
 * @return promise
 */
const getAllUsers = async () => {
    const url = 'http://10.0.2.2:8000/users';
    // eslint-disable-next-line no-undef
    const response = await fetch(url);
    try {
        const json = await response.json();
        return json;
    } catch (e) {
        console.log(`Fetch failed: ${e}`);
    }
};

/**
 * get user object by using its id
 * @param {String} uid 
 */
const getUserById = async (uid) => {
    const url = `http://10.0.2.2:8000/users/${uid}`;
    // eslint-disable-next-line no-undef
    const response = await fetch(url);
    try {
        const json = await response.json();
        return json;
    } catch (e) {
        console.log(`Fetch failed: ${e}`);
    }
};

/**
 * get User object from username/password
 * @param {String} uname 
 * @param {String} pwd 
 */
const UserAuthentication = async (uname, pwd) => {
    const url = 'http://10.0.2.2:8000/users/authentication';
    // eslint-disable-next-line no-undef
    const response = await fetch(
        url,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: uname,
                password: pwd,
            }),
        });
    try {
        const json = await response.json();
        return json;
    } catch (e) {
        console.log(`Fetch failed: ${e}`);
    }
};

/**
 * Add new user to db
 * @param {String} uname 
 * @param {String} pwd 
 * @param {String} pic 
 */
const addNewUser = async (uname, pwd, pic) => {
    const url = 'http://10.0.2.2:8000/users';
    // eslint-disable-next-line no-undef
    const response = await fetch(
        url,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: uname,
                password: pwd,
                picture: pic
            }),
        });
    try {
        const json = await response.json();
        // status: 201 => added
        // status: 409 => conflict        
        return { status: response.status, user: json };
    } catch (e) {
        console.log(`Fetch failed: ${e}`);
    }
};

module.exports = {
    getTimeInMinutes,
    initAnswersList,
    computeResult,
    getProgressCircleColor,
    getQuizById,
    getAllQuiz,
    getAllUsers,
    getUserById,
    getQuizByDifficulty,
    getQuizMostPlayed,
    getNewQuiz,
    UserAuthentication,
    addNewUser,
    getRecommendedQuiz,
    pushUserScore
};

