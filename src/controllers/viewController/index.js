import { searchCrawler, detailCrawler } from '~/services/crawlerService';

export const getHomepage = async (req, res) => {
    try {
        res.render('homepage', { title: 'HOMEPAGE' });
    } catch (err) {
        res.sendStatus(400);
    }
};

export const getResultPage = async (req, res) => {
    try {
        const query = req.query.q;
        const keywords = query.split(',');

        const uriSearchs = [];
        for (const keyword of keywords) {
            const results = await searchCrawler.getSearch(keyword);

            for (const res of results) {
                uriSearchs.push(res);
            }
        }

        // console.log("uriSearch: ", uriSearchs);

        const result = [];
        for (const uri of uriSearchs) {
            const data = await detailCrawler.getDetail(uri);
            // console.log("data: ", data);
            result.push(data);
        }

        // TODO: render data to website
        res.status(200).json(result);
    } catch (err) {
        res.sendStatus(400);
    }
};
