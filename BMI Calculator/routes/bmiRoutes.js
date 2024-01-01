const express = require('express');
const router = express.Router(); 
const path = require('path');
const fs = require('fs');


router.use(express.static(path.join(__dirname, '../public')));

const historyFilePath = path.join(__dirname,'../data', 'history.json');

if (!fs.existsSync(historyFilePath)) {
    fs.writeFileSync(historyFilePath, '[]', 'utf-8');
}

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'main.html'));
});

router.get('/bmiCalculator', (req, res) => {
    const unitType = req.query.unitType || 'metric';
    res.sendFile(path.join(__dirname, '../views', `bmiCalculator-${unitType}.html`));
});

router.get('/history', (req, res) => {
    const historyData = fs.readFileSync(historyFilePath, 'utf-8');
    const bmiHistory = JSON.parse(historyData);

    res.render('history', { bmiHistory });
});


router.post('/bmiCalculator',(req,res) => {
    let BMI = 0;
    let classification = '';
    let unitType = req.body.us;
    
    let age = req.body.age;
    let gender = req.body.gender;
    let height = parseFloat(req.body.height);
    let weight = parseFloat(req.body.weight);
    

    BMI = (weight / (height * height))
    
    if (unitType != null) {
        BMI *= 703; 
    } else {unitType = 'metric'};
    
    BMI = BMI.toFixed(2);

    switch (true) {
        case BMI < 16:
            classification = 'Severe Thinness';
            break;
        case BMI >= 16 && BMI < 17:
            classification = 'Moderate Thinness';
            break;
        case BMI >= 17 && BMI < 18.5:
            classification = 'Mild Thinness';
            break;
        case BMI >= 18.5 && BMI < 25:
            classification = 'Normal';
            break;
        case BMI >= 25 && BMI < 30:
            classification = 'Overweight';
            break;
        case BMI >= 30 && BMI < 35:
            classification = 'Obese Class I';
            break;
        case BMI >= 35 && BMI < 40:
            classification = 'Obese Class II';
            break;
        case BMI >= 40:
            classification = 'Obese Class III';
            break;
        default:
            classification = 'Invalid BMI';
    }

    const timestamp = new Date().toLocaleString();
    const bmiEntry = {
        timestamp: timestamp,
        age: age,
        gender: gender,
        height: height,
        weight: weight,
        bmi: BMI
    };
    
    const historyData = fs.readFileSync(historyFilePath, 'utf-8');
    const currentHistory = JSON.parse(historyData);

    currentHistory.push(bmiEntry);

    fs.writeFileSync(historyFilePath, JSON.stringify(currentHistory, null, 2), 'utf-8');

    let htmlContent = fs.readFileSync(path.join(__dirname, '../views', `bmiCalculator-${unitType}.html`), "utf8");

    htmlContent = htmlContent.replace('[BMI_PLACEHOLDER]', BMI);
    htmlContent = htmlContent.replace('[CLASSIFICATION_PLACEHOLDER]', classification);
    htmlContent = htmlContent.replace('class="alert alert-warning alert-dismissible fade hide"', 'class="alert alert-warning alert-dismissible fade show"');

    res.send(htmlContent);
});

module.exports = router;
