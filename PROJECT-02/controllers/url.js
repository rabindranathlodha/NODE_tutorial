const { nanoid } = require('nanoid');
const URL = require('../models/url');

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    // Check if the URL already exists in the database
    let existingEntry = await URL.findOne({ redirectURL: body.url });

    if (existingEntry) {
        // If URL exists, return the existing short ID
        return res.render('home', {
            id: existingEntry.shortID
        });
    }

    // If URL does not exist, create a new short ID
    const shortID = nanoid(8);
    await URL.create({
        shortID: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });

    return res.render('home', {
        id: shortID
    });
}

module.exports = {
    handleGenerateNewShortUrl
};
