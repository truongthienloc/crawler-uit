import { PromiseCrawler } from "..";

const searchCrawler = new PromiseCrawler();
const baseUri = "https://student.uit.edu.vn/search/node";

export const getSearch = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const uri = `${baseUri}/${keyword}`;

            const res = await searchCrawler.queue(uri);
            const $ = res.$;

            const result = $("#block-system-main > div > ol > li > h3 > a");
            const resultUris = [];
            result.each((i, a) => {
                resultUris.push(a.attribs.href);
            });

            resolve(resultUris);
        } catch (err) {
            reject(err);
        }
    })
}