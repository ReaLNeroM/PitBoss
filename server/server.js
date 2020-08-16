const express = require('express');
const cors = require('cors')
const monk = require('monk');

const db = monk(process.env.MONGO_URI || 'localhost/meower');
const requests = db.get('requests');

const app = express();

app.use(cors());
app.use(express.json());

function validate_request(json) {
    console.log(json);

    return json.fullName    && json.fullName   .toString().trim() !== '' &&
           json.dormAndRoom && json.dormAndRoom.toString().trim() !== '' &&
           json.email       && json.email      .toString().trim() !== '' &&
           json.foodStation && json.foodStation.toString().trim() !== '' &&
           json.orderNumber && json.orderNumber.toString().trim() !== '';
}


app.get('/', (req, res) => {
    res.json("hello");
})

app.get('/requests', (req, res) => {
    requests
        .find()
        .then(obtainedRequests => {
            res.json(obtainedRequests);
        });
})

app.post('/create_request', (req, res) => {
    if(validate_request(req.body)){
        const request = {
            schemaVersion: req.body.schemaVersion.toString().trim(),
            fullName: req.body.fullName.toString().trim(),
            dormAndRoom: req.body.dormAndRoom.toString().trim(),
            email: req.body.email.toString().trim(),
            foodStation: req.body.foodStation.toString().trim(),
            orderNumber: req.body.orderNumber.toString().trim(),
            created: new Date()
        };

        requests
            .insert(request)
            .then(newRequest => {
                res.json(newRequest)
            });
    } else {
        res.status(422);
        res.json({
          message: 'Form doesn\'t have correct format.'
        });
    }
})

const port = process.env.PORT || 6969
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
