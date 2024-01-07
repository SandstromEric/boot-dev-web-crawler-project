const { JSDOM } = require('jsdom');

async function crawlPage(url) {
    try {
        const res = await fetch(url);
        if (res.status > 399) {
            console.log(`Fetch Error: ${res.status} on ${url}`);
            return;
        }

        const contentType = res.headers.get('content-type');
        if (!contentType.includes('text/html')) {
            console.log(`Content-Type Error: ${contentType} on ${url}`);
            return;
        }

        console.log(await res.text())
    } catch (error) {
        console.log('error in crawl page ' + error.message);
    }
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