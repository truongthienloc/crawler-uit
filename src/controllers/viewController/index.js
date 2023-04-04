import { searchCrawler, detailCrawler } from '~/services/crawlerService';
import { TIME, FAKEDATA } from '~/configs/constants';

export const getHomepage = async (req, res) => {
    try {
        res.render('homepage', { title: 'HOMEPAGE' });
    } catch (err) {
        res.sendStatus(400);
    }
};

export const getResultPage = async (req, res) => {
    console.time('getResultPage');
    try {
        const query = req.query.q;
        const keywords = query.split(',');

        // const result = FAKEDATA.FAKE_RESULT_CRAWLER;
        const result = [];
        for (const keyword of keywords) {
            const results = await searchCrawler.getSearch(keyword);

            for (const res of results) {
                const data = await detailCrawler.getDetail(res);

                if (!data) {
                    continue;
                }

                const dateSplit = data.date.split('/');
                const date = new Date(
                    `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]}`,
                );
                if (Date.now() - date > TIME.WEEK) {
                    break;
                }

                result.push(data);
            }
        }

        console.timeEnd('getResultPage');
        // TODO: render data to website
        res.status(200).render('resultpage', {
            title: 'Kết quả tìm kiếm',
            result: result,
        });
    } catch (err) {
        console.timeEnd('getResultPage');
        console.log(err);
        res.sendStatus(400);
    }
};
