export const getHomepage = async (req, res) => {
    try {
        res.render('homepage', { title: 'HOMEPAGE' });
    } catch (err) {
        res.sendStatus(400);
    }
};
