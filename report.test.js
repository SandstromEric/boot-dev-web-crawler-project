const { sortPages } = require('./report');
const { test, expect } = require('@jest/globals');

test('sortPages', () => {
    const input = {
        'https://blog.test.com/path': 1,
        'https://blog.test.com': 3,
    }
    const actual = sortPages(input);
    const expected = [
        ['https://blog.test.com', 3],
        ['https://blog.test.com/path', 1]
    ];
    expect(actual).toEqual(expected);
});

test('sortPages 5 pages', () => {
    const input = {
        'https://blog.test.com/path/4': 1,
        'https://blog.test.com/path/1': 2,
        'https://blog.test.com/path/5': 12,
        'https://blog.test.com/path/2': 5,
        'https://blog.test.com/path/3': 20,
    }
    const actual = sortPages(input);
    const expected = [
        ['https://blog.test.com/path/3', 20],
        ['https://blog.test.com/path/5', 12],
        ['https://blog.test.com/path/2', 5],
        ['https://blog.test.com/path/1', 2],
        ['https://blog.test.com/path/4', 1]
    ];
    expect(actual).toEqual(expected);
});
