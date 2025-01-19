const express = require('express');
const path = require('path');
const urlRoute = require('./routes/url');
const { connect } = require('./connection');
const URL = require('./models/url');
const staticRoute = require('./routes/staticRouter');

const app = express();
const PORT = 3000;


connect("mongodb://127.0.0.1:27017/short-url")
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB', err));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/url', urlRoute);
app.use('/', staticRoute);

app.get('/test', async (req, res) => {
    const allUrls = await URL.find({});
    return res.render('home', {
        urls: allUrls,
    })
});

app.get('/:shortID', async (req, res) => {
    const shortID = req.params.shortID;
    const entry = await URL.findOneAndUpdate(
        {
            shortID
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                }
            }
        },
        { new: true } // This option makes sure to return the updated document
    );

    if (!entry) {
        return res.status(404).send('Short URL not found');
    }

    res.redirect(entry.redirectURL);
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));