import Crawler from 'crawler';

export default class PromiseCrawler {
    constructor() {
        this.crawler = new Crawler({
            maxConnections: 10,
            callback: (err, res, done) => {
                process.nextTick(done);
                if (err) {
                    err.options = res.options;
                    err.options.npolisReject(err);
                } else {
                    res.options.npolisResolve(res);
                }
            },
        });
    }

    /**
     *
     * @param {string | Crawler.CrawlerRequestOptions} urisOrOptions
     * @returns {Promise<Crawler.CrawlerRequestResponse>}
     */
    queue(urisOrOptions) {
        return new Promise(async (resolve, reject) => {
            let options = {};
            if (typeof urisOrOptions === 'string') {
                options.uri = urisOrOptions;
            } else {
                options = urisOrOptions;
            }

            options.npolisResolve = resolve;
            options.npolisReject = reject;

            this.crawler.queue(options);
        });
    }
}
