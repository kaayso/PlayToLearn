/* eslint-disable no-param-reassign */
const moment = require('moment');
/**
 * add key field in each element of list
 * @param {Array} list 
 */
function addKeysToList(list) {
    for (let i = 0; i < list.length; i++) {
        // eslint-disable-next-line no-underscore-dangle
        list[i].key = JSON.stringify(i);
    }
    return list;
}
/**
 * add key field in each element of list by using id
 * @param {Array} list 
 */
function addKeysId(list) {
    for (let i = 0; i < list.length; i++) {
        // eslint-disable-next-line no-underscore-dangle
        list[i].key = list[i]._id;
    }
    return list;
}
/**
 * format from second into mm:ss format
 * @param {number} seconds 
 */
function getTimeInMinutes(seconds) {
    return moment.utc(seconds * 1000).format('mm:ss');
}
/**
 * get right format of date
 * @param {String} date 
 */
function getDate(date) {
    //2019-03-23T18:19:16.269Z
    const year = date.substring(0, 4);
    const day = date.substring(8, 10);
    const month = date.substring(5, 7);
    const hour = date.substring(11, 13);
    const minutes = date.substring(14, 16);
    const seconds = date.substring(17, 19);
    
    return moment().format(`${month} ${day} ${year}, ${hour}:${minutes}:${seconds} a`);
}
/**
 * Get challenge list for finished games
 * @param {Array} list 
 */
function filterHistoryChallengeList(list) {
    return list.filter(elmt =>
        elmt.result === 'Won' || elmt.result === 'Lost' || elmt.result === 'Draw'
    );
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
 * get quiz object by using his id
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
 * get list of daily challenge
 * @return promise
 */
const getDailyChallenge = async () => {
    const url = 'http://10.0.2.2:8000/challenges/daily';
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
 * get list of weekly challenge
 * @return promise
 */
const getWeeklyChallenge = async () => {
    const url = 'http://10.0.2.2:8000/challenges/weekly';
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
 * @param {String} theme
 */
const pushUserScore = async (uid, qid, sc, theme) => {
    if (sc === 10) {
        pushUserAchievement(uid, theme, sc);
    }
    pushUserScoreQuiz(uid, qid, sc);
    updateScores(uid, qid, theme, sc);
};

/**
 * push user score quiz
 * @param {String} uid 
 * @param {String} qid 
 * @param {String} sc 
 */
const pushUserScoreQuiz = async (uid, qid, sc) => {
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
 * push user achievement
 * @param {String} uid 
 * @param {String} th 
 * @param {Number} sc 
 */
const pushUserAchievement = async (uid, th, sc) => {
    const url = 'http://10.0.2.2:8000/achievement';
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
                user_id: uid,
                theme: th,
                score: sc
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
 * udpate global score, score by theme and ranking
 * @param {String} uid 
 * @param {String} qId 
 * @param {String} th 
 */
const updateScores = async (uid, qId, th, sc) => {
    const url = `http://10.0.2.2:8000/scores/end-play/${uid}`;
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
                score: sc,
                quizId: qId,
                theme: th
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
 * get user object by using his id
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
 * get user's challenge history by using his id
 * @param {String} uid 
 */
const getChallengeHistory = async (uid) => {
    const url = `http://10.0.2.2:8000/challenges/getHistoric/${uid}`;
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
 * get user's achievements by using his id
 * @param {String} uid 
 */
const getAchievements = async (uid) => {
    const url = `http://10.0.2.2:8000/achievements/${uid}`;
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
const userAuthentication = async (uname, pwd) => {
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
/**
 * Add a user as a friend
 * @param {String} uid 
 * @param {String} fid 
 */
const addAFriend = async (uid, fid) => {
    const url = `http://10.0.2.2:8000/friendList/${uid}`;
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
                friend_id: fid,
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
 * send score challenge
 * @param {String} nid 
 * @param {String} sc 
 */
const sendScoreChallenge = async (nid, sc) => {
    const url = 'http://10.0.2.2:8000/challenges/challengeAfriend/accepteAChallenge';
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
                scoreChallenged: sc,
                _id: nid,
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
 * Notifications
 */

/**
 * get user's notifications by using his id
 * @param {String} uid 
 */
const getUserNotifications = async (uid) => {
    const url = `http://10.0.2.2:8000/notifications/${uid}`;
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
 * push a notification to notify an event
 * @param {String} uid 
 * @param {String} qId 
 * @param {String} uidNotified 
 * @param {String} sub 
 */
const pushNotification = async (uid, qId, uidNotified, sub) => {
    const url = 'http://10.0.2.2:8000/notification';
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
                user_id_notified: uidNotified,
                user_id_who_notify: uid,
                id_quiz: qId,
                subject: sub
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
 * delete a notification by id
 * @param {String} nid 
 */
const deleteNotification = async (nid) => {
    const url = `http://10.0.2.2:8000/notification/${nid}`;
    // eslint-disable-next-line no-undef
    const response = await fetch(
        url, { method: 'DELETE' });
    try {
        const json = await response.json();
        return json;
    } catch (e) {
        console.log(`Fetch failed: ${e}`);
    }
};

module.exports = {
    getTimeInMinutes,
    initAnswersList,
    getDate,
    filterHistoryChallengeList,
    addKeysToList,
    addKeysId,
    computeResult,
    getProgressCircleColor,
    getQuizById,
    getAllQuiz,
    getAllUsers,
    getUserById,
    getQuizByDifficulty,
    getQuizMostPlayed,
    getNewQuiz,
    userAuthentication,
    addNewUser,
    getRecommendedQuiz,
    pushUserScore,
    getWeeklyChallenge,
    getDailyChallenge,
    getChallengeHistory,
    getAchievements,
    getUserNotifications,
    pushNotification,
    deleteNotification,
    sendScoreChallenge,
    addAFriend
};

