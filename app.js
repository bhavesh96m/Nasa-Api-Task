const express = require('express');
const ejs = require('ejs');
const axios = require('axios');
const path = require('path');
const app = express();

const {getData, getDataWithDate, getRandomData} = require('./accessApodData');
const {getYesterday, getTomorrow, checkVeryLastDay} = require('./date');

const port = process.env.PORT || 5000;


app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/public')));


app.get('/', (req, res) => {
    res.redirect('/apod');
});

app.get('/apod', async (req, res) => {
    const requestedDate = req.query.date;

    let data;

    if (requestedDate) {
        data = await getDataWithDate(requestedDate);
    } else {
        data = await getData();
    }

    try {

        // produces error if data.response.data cant be found
        const error = data.response.data;
        const code = error.code;
        const statusMessage = data.response.statusText;

       // res.status(code);
       /* res.render('error', {
            code,
            statusMessage,
        });*/


    } catch {
        const date = data.date;
        const title = data.title;
        const explanation = data.explanation;
        const url = data.url;
        const mediaType = data.media_type;

        // Fix the date being one day off
        let day = new Date(date.replace(/-/g, '\/'));

        let yesterday;
        let tomorrow;

        if (!checkVeryLastDay(day)) {
            yesterday = false;
            tomorrow = false;
        } else {
            yesterday = getYesterday(day);
            tomorrow = getTomorrow(day);
        }

        res.render('apod', {
            date,
            title,
            explanation,
            url,
            yesterday,
            tomorrow,
            mediaType
        });
    }

    

});
/*
app.get('/apod/random', async (req, res) => {
    const data = await getRandomData();
    const date = data[0].date;

    res.redirect(`/apod?date=${date}`);
});

app.get('/apod/pick', (req, res) => {
    let maxDate = new Date().toISOString().split("T")[0];
    let today = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric" 
    });

    res.render('pick', {
        maxDate,
        today
    });
});


app.post('/apod/pick', (req, res) => {
    res.redirect(`/apod?date=${req.body.date}`)
});


app.get('*', (req, res) => {
    res.status(404);
    res.render('error')
})
*/
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
