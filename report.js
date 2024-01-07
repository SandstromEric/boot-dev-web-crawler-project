function printReport(pages) {
    console.log('=============');
    console.log('REPORT');
    console.log('=============');
    const sortedPages = sortPages(pages);
    for (const page of sortedPages) {
        const url = page[0];
        const count = page[1];
        console.log(`Found ${count} links to page: ${url}`);
    }

    console.log('=============');
    console.log('END REPORT');
    console.log('=============');
}

function sortPages(pages) {
    return Object.entries(pages).sort((a, b) => b[1] - a[1]);;
}

module.exports = {
    printReport,
    sortPages
};