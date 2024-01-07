const { JSDOM } = require('jsdom');
const { normalize } = require('path');

async function crawlPage(baseURL, currentURL, pages) {
    console.log(`Crawling ${currentURL}`);
    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);

    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages;
    }

    const normalizeCurrentUrl = normalize(currentURL);
    if (pages[normalizeCurrentUrl] > 0) {
        pages[normalizeCurrentUrl]++
        return pages;
    }

    pages[normalizeCurrentUrl] = 1;

    try {
        const res = await fetch(currentURL);
        if (res.status > 399) {
            console.log(`Fetch Error: ${res.status} on ${currentURL}`);
            return pages;
        }

        const contentType = res.headers.get('content-type');
        if (!contentType.includes('text/html')) {
            console.log(`Content-Type Error: ${contentType} on ${currentURL}`);
            return pages;
        }

        const htmlBody = await res.text();
        const nextURLs = getURLsFromHTML(htmlBody, baseURL);

        for (const nextURL of nextURLs) {
            pages = await crawlPage(baseURL, nextURL, pages);
        }

    } catch (error) {
        console.log('error in crawl page ' + error.message);
    }

    return pages;
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const links = dom.window.document.querySelectorAll('a');
    for (const link of links) {
        if (link.href.slice(0, 1) === '/') {
            try {
                const urlObj = new URL(`${baseURL}${link.href}`);
                urls.push(urlObj.href);
            } catch (err) {
                console.log(err.message);
            }
        } else {
            try {
                const urlObj = new URL(link.href);
                urls.push(urlObj.href);
            } catch (err) {
                console.log(err.message);
            }
        }
    }
    return urls;
}

function normalizeUrl(url) {
    const urlObj = new URL(url);
    const hostPath = urlObj.host + urlObj.pathname;

    if (hostPath.endsWith('/') && hostPath.length > 0) {
        return hostPath.slice(0, -1);
    }

    return hostPath;
}

module.exports = {
    crawlPage,
    normalizeUrl,
    getURLsFromHTML
};