const { crawlPage } = require('./crawl');

function main() {
    if (process.argv.length < 3) {
        console.log("No URL provided");
        process.exit(1);
    }

    if (process.argv.length > 3) {
        console.log("Too many arguments");
        process.exit(1);
    }

    const url = process.argv[2];
    crawlPage(url);
    console.log("Starting crawl of " + url);
}

main();