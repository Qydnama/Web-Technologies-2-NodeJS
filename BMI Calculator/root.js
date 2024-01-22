const express = require('express');
const app = express();
const port = 2000;
const bodyParser = require('body-parser');
const path = require('path')

app.use(bodyParser.urlencoded({extended: true}));

const bmiRoutes = require('./routes/bmiRoutes');
app.use(bmiRoutes);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});