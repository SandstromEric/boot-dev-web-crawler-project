const { JSDOM } = require('jsdom');

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
    normalizeUrl,
    getURLsFromHTML
};