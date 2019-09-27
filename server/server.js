const   express = require('express');
const   bodyParser = require('body-parser'),
        indexRouter = require("./routes/index");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api" , indexRouter);

app.get('/health', function(req, res) {
    res.json({status: "ok"});
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));