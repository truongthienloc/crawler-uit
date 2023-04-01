import { detailCrawler, searchCrawler } from '~/services/crawlerService';

export const getCrawlerDetail = async (req, res) => {
    const data = await detailCrawler.getDetail(
        'https://student.uit.edu.vn/node/15052',
    );
    res.status(200).json(data);
};

export const getCrawlerSearch = async (req, res) => {
    const keyword = req.query.q;
    const data = await searchCrawler.getSearch(keyword);
    res.status(200).json(data);
};
