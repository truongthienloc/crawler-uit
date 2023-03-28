import { PromiseCrawler } from "..";

const detailCrawler = new PromiseCrawler();

export const getDetail = (uri) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await detailCrawler.queue(uri);
            const $ = res.$;
            const result = $(".field-item > p > strong");
            const contents = result.contents();

            const fullDate = contents[contents.length - 1].data;
            const date = fullDate.split(",")[1].split(" ")[2];

            const data = {
                className: contents[3].data,
                date: date
            };
            
            // console.log("data: ", data);
            resolve(data);
        } catch (err) {
            reject(err);
        }
    })
}