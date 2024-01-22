const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');
const morgan = require('morgan')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('views'));
app.use(express.static('public'));

const PORT = process.env.port || 3000;


app.use(morgan('tiny'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', async (req, res) => {
    try {
        const key = 'a32efc04df78467080fd4dfca9738017';
        const city = 'Astana'; 
        const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${key}&units=metric`;

        const response = await axios.get(url);
        const weatherData = response.data;

        res.render('main', { data: weatherData });
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).send('Error fetching weather data');
    }
});

app.get('/city/:city', async(req, res) => {
    const city = req.params.city;

    try {
        let responce = await axios.get('https://api.api-ninjas.com/v1/city?name=' + city, {
            headers: {
                'X-Api-Key': 'FFruERkEnoijmZ7nSWS3gg==xvYYWlO92BkZ68Fy'
            },
            contentType: 'application/json'
        });
        if(responce.status == '200') {
            res.json(responce.data[0]);
        }
        
    } catch(e) {
        console.error(e.message);
    }
});  

app.get('/weatherbit/:city', async (req, res) => {
    const city = req.params.city;
    const weatherbitApiKey = "a32efc04df78467080fd4dfca9738017";
    try {
      const response = await axios.get(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${weatherbitApiKey}`);
      console.log(response.data);
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching Weatherbit data:", error);
      res.status(500).json({ error: error.message });
    }
  });

app.get('/weatherbit/forecast/:city', async (req, res) => {
    const city = req.params.city;
    const weatherbitApiKey = "a32efc04df78467080fd4dfca9738017";
    try {
        const response = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${weatherbitApiKey}&days=16`);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching Weatherbit forecast data:", error);
        res.status(500).json({ error: error.message });
    }
});
