const getNotFoundPage = (req, res) => {
    res.status(404);
    res.render('not-found', { title: 'Page Not Found' });
};

module.exports = { getNotFoundPage };