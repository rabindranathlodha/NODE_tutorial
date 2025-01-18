const { nanoid } = require('nanoid');
const URL = require('../models/url');

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    const shortID = nanoid(8);
    if(!body.url) {
        return res.status(400).json({ error: 'url is required' });
    }
    await URL.create({ 
        shortID: shortID,
        redirectURL: body.url,
        visitHistory: []
    });
    return res.json({id: shortID});
}

module.exports = {
    handleGenerateNewShortUrl
};