const express = require('express');
const urlRoute = require('./routes/url');
const { connect } = require('./connection');
const URL = require('./models/url');

const app = express();
const PORT = 3000;


connect("mongodb://127.0.0.1:27017/short-url")
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB', err));

app.use(express.json());

app.use('/url', urlRoute);

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
        }
    );
    res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));