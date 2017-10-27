const { promiseAllSoftFail } = require('./utils');

describe('promiseAllSoftFail', () => {

    test('Results return in the correct order', async () => {
        const promises = [
            () => new Promise((resolve) => setTimeout(() => resolve(1), 1000)),
            () => new Promise((resolve) => resolve(2)),
            () => new Promise((resolve) => resolve(3)),
        ];

        const expectedResult = {
            passes: [2, 3, 1],
            fails: [],
        }; 
        const testResult = await promiseAllSoftFail(promises);

        return expect(testResult).toEqual(expectedResult);
    });

    test('Fails and passes in correct array', async () => {
        const promises = [
            () => new Promise((resolve) => resolve(1)),
            () => new Promise((resolve) => resolve(2)),
            () => new Promise((resolve, reject) => setTimeout(() => reject(new Error(3)), 100)),
            () => new Promise((resolve) => resolve(4)),
            () => new Promise((resolve, reject) => reject(new Error(5))),
        ];

        const expectedResult = {
            passes: [1, 2, 4],
            fails: [new Error(5), new Error(3)],
        };
        const testResult = await promiseAllSoftFail(promises);

        expect(testResult).toEqual(expectedResult);
    });

    test('Fails when a promise timeouts', async () => {
        const promises = [
            () => new Promise((resolve) => resolve(1)),
            () => new Promise((resolve, reject) => setTimeout(() => reject(new Error(2)), 4100)),
            () => new Promise((resolve) => resolve(3)),
        ];

        await expect(promiseAllSoftFail(promises)).rejects.toMatch('Promise timed out.');
    });

    // test('Throws error when not given a promise', async () => {
    //     const promises = [
    //         'not a promise',
    //     ];
    // });

    // test('Check how many times a promise is being called', async () => {
    // const promises = [
    //     () => new Promise((resolve) => resolve(1)),
    //     () => new Promise((resolve) => resolve(2)),
    // ];
    // });
    
});