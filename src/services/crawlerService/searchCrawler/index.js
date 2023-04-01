import { PromiseCrawler } from '..';

const searchCrawler = new PromiseCrawler();
const baseUrl = process.env.BASE_URL;
const pathSearch = process.env.PATH_SEARCH;

// console.log("baseUrl: ", baseUrl);
// console.log("pathSearch: ", pathSearch);

/**
 *
 * @param {string} keyword
 * @returns {Promise<Array>}
 */
export const getSearch = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const uri = `${baseUrl + pathSearch}/${keyword}`;

            // console.log("uri: ", uri);

            const res = await searchCrawler.queue(uri);
            const $ = res.$;

            const result = $('#block-system-main > div > ol > li > h3 > a');
            const resultUris = [];
            result.each((i, a) => {
                resultUris.push(a.attribs.href);
            });

            resolve(resultUris);
        } catch (err) {
            reject(err);
        }
    });
};
