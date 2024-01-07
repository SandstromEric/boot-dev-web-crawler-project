const { normalizeUrl, getURLsFromHTML } = require('./crawl');
const { test, expect } = require('@jest/globals');

test('normalizeUrl strip protocol', () => {
    const input = 'https://blog.test.com/path';
    const actual = normalizeUrl(input);
    const expected = 'blog.test.com/path';
    expect(actual).toEqual(expected);
});

test('normalizeUrl strip trailing slash', () => {
    const input = 'https://blog.test.com/path/';
    const actual = normalizeUrl(input);
    const expected = 'blog.test.com/path';
    expect(actual).toEqual(expected);
});

test('normalizeUrl strip capitals', () => {
    const input = 'https://BLOG.test.com/path/';
    const actual = normalizeUrl(input);
    const expected = 'blog.test.com/path';
    expect(actual).toEqual(expected);
});

test('normalizeUrl strip http', () => {
    const input = 'http://blog.test.com/path/';
    const actual = normalizeUrl(input);
    const expected = 'blog.test.com/path';
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML absolute urls', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.test.com/path/">link</a>
        </body>
    </html>
    `;
    const inputBaseURL = 'https://blog.test.com';
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://blog.test.com/path/'];
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML relative urls', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">link</a>
        </body>
    </html>
    `;
    const inputBaseURL = 'https://blog.test.com';
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://blog.test.com/path/'];
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML multiple urls', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.test.com/path/">link</a>
            <a href="/path2/">link2</a>
        </body>
    </html>
    `;
    const inputBaseURL = 'https://blog.test.com';
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://blog.test.com/path/', 'https://blog.test.com/path2/'];
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML invalid url', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">link</a>
        </body>
    </html>
    `;
    const inputBaseURL = 'https://blog.test.com';
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [];
    expect(actual).toEqual(expected);
});