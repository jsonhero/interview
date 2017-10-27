const { promiseAllSoftFail } = require('./utils');

const promises = [
    () => new Promise((resolve) => resolve(1)),
    () => new Promise((resolve) => resolve(2)),
    () => new Promise((resolve, reject) => setTimeout(() => reject(new Error(3)), 100)),
    () => new Promise((resolve) => resolve(4)),
    () => new Promise((resolve, reject) => reject(new Error(5))),
];

(async function() {
    try {
        const resultObject = await promiseAllSoftFail(promises);
        console.log(resultObject);
    } catch(e) {
        console.error('Promise Soft Fail Error: ', e);
    }
})();