import { searchCrawler, detailCrawler } from '~/services/crawlerService';
import { TIME } from '~/configs/constants';

export const getHomepage = async (req, res) => {
    try {
        res.render('homepage', { title: 'HOMEPAGE' });
    } catch (err) {
        res.sendStatus(400);
    }
};

// const fakeData = [
//     {
//         title: ' Thông báo nghỉ lớp Lập trình hướng đối tượng (IT002.N26) ngày 04/04/2023 ',
//         className: 'IT002.N26',
//         date: '04/04/2023',
//     },
//     {
//         title: ' Thông báo nghỉ lớp Lập trình hướng đối tượng (IT002.N26) ngày 28/03/2023 ',
//         className: 'IT002.N26',
//         date: '28/03/2023',
//     },
//     {
//         title: ' Thông báo nghỉ lớp Tổ chức và Cấu trúc Máy tính II (IT012.N24.1) ngày 03/04/2023 ',
//         className: 'IT012.N24.1',
//         date: '03/04/2023',
//     },
//     {
//         title: ' Thông báo nghỉ lớp Lập trình hướng đối tượng (IT002.N219) ngày 31/03/2023 ',
//         className: 'IT002.N219',
//         date: '31/03/2023',
//     },
//     {
//         title: ' Thông báo nghỉ lớp Lập trình hướng đối tượng (IT002.N26) ngày 04/04/2023 ',
//         className: 'IT002.N26',
//         date: '04/04/2023',
//     },
//     {
//         title: ' Thông báo nghỉ lớp Lập trình hướng đối tượng (IT002.N26) ngày 28/03/2023 ',
//         className: 'IT002.N26',
//         date: '28/03/2023',
//     },
//     {
//         title: ' Thông báo nghỉ lớp Tổ chức và Cấu trúc Máy tính II (IT012.N24.1) ngày 03/04/2023 ',
//         className: 'IT012.N24.1',
//         date: '03/04/2023',
//     },
//     {
//         title: ' Thông báo nghỉ lớp Lập trình hướng đối tượng (IT002.N219) ngày 31/03/2023 ',
//         className: 'IT002.N219',
//         date: '31/03/2023',
//     },
//     {
//         title: ' Thông báo nghỉ lớp Lập trình hướng đối tượng (IT002.N26) ngày 04/04/2023 ',
//         className: 'IT002.N26',
//         date: '04/04/2023',
//     },
//     {
//         title: ' Thông báo nghỉ lớp Lập trình hướng đối tượng (IT002.N26) ngày 28/03/2023 ',
//         className: 'IT002.N26',
//         date: '28/03/2023',
//     },
//     {
//         title: ' Thông báo nghỉ lớp Tổ chức và Cấu trúc Máy tính II (IT012.N24.1) ngày 03/04/2023 ',
//         className: 'IT012.N24.1',
//         date: '03/04/2023',
//     },
//     {
//         title: ' Thông báo nghỉ lớp Lập trình hướng đối tượng (IT002.N219) ngày 31/03/2023 ',
//         className: 'IT002.N219',
//         date: '31/03/2023',
//     },
//     {
//         title: ' Thông báo nghỉ lớp Lập trình hướng đối tượng (IT002.N26) ngày 04/04/2023 ',
//         className: 'IT002.N26',
//         date: '04/04/2023',
//     },
//     {
//         title: ' Thông báo nghỉ lớp Lập trình hướng đối tượng (IT002.N26) ngày 28/03/2023 ',
//         className: 'IT002.N26',
//         date: '28/03/2023',
//     },
//     {
//         title: ' Thông báo nghỉ lớp Tổ chức và Cấu trúc Máy tính II (IT012.N24.1) ngày 03/04/2023 ',
//         className: 'IT012.N24.1',
//         date: '03/04/2023',
//     },
//     {
//         title: ' Thông báo nghỉ lớp Lập trình hướng đối tượng (IT002.N219) ngày 31/03/2023 ',
//         className: 'IT002.N219',
//         date: '31/03/2023',
//     },
// ];

export const getResultPage = async (req, res) => {
    try {
        console.time('getResultPage');

        const query = req.query.q;
        const keywords = query.split(',');

        const result = [];
        for (const keyword of keywords) {
            const results = await searchCrawler.getSearch(keyword);

            for (const res of results) {
                const data = await detailCrawler.getDetail(res);

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
        res.sendStatus(400);
    }
};
