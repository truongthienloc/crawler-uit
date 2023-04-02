import { PromiseCrawler } from '..';

const detailCrawler = new PromiseCrawler();

/**
 *
 * @param {string} uri
 * @returns {Promise<{className: string, date: string} | undefined>}
 */
export const getDetail = (uri) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!uri.includes('https://student.uit.edu.vn/node/')) {
                resolve(undefined);
            }
            const res = await detailCrawler.queue(uri);
            const $ = res.$;
            const title = $('#page-title');
            const result = $('.field-item > p > strong');
            const contents = result.contents();

            const fullDate = contents[contents.length - 1].data;
            const date = fullDate.split(',')[1].split(' ')[2];

            const data = {
                title: title.text(),
                className: contents[3].data,
                date: date,
            };

            // console.log("data: ", data);
            resolve(data);
        } catch (err) {
            reject(err);
        }
    });
};
