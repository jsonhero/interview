/**
 * promiseAllSoftFail
 * 
 * A function which takes an array of promises and runs them in parrallel.
 * The promise is added to a distinct array if it fails or succeeds.
 * Every promise must be ran, even if a previous promise fails.
 * The results of the promises must be returned in the order of the execution time of the promises.
 * 
 * Stretch Goals:
 * - The function rejects if any of the promises take over 4 seconds to exectue (timeout).
 * - Make sure the array provided only contains Promise types.
 * 
 * @param {Array<Promise>} promises 
 * @return {Object}
 */

async function promiseAllSoftFail(promises) {

}

// solution
async function promiseAllSoftFail(promises) {
    return new Promise((resolve, reject) => {
        const fails = [];
        const passes = [];

        const runPromise = async (p) => {
            let finished = false;
            let funcTimeout = null;
            try {
                funcTimeout = setTimeout(() => {
                    if (!finished) {
                        reject('Promise timed out.');
                    }
                }, 4000);
                const result = await p();
                clearTimeout(funcTimeout);
                finished = true;
                passes.push(result);
            } catch (e) {
                finished = true;
                clearTimeout(funcTimeout);
                fails.push(e);
            } finally {
                if (promises.length === (fails.length + passes.length)) {
                    resolve({
                        fails,
                        passes,
                    });
                }
            }
        }

        for (let p of promises) {
            runPromise(p);
        }
    });
}

module.exports = {
    promiseAllSoftFail,
}
