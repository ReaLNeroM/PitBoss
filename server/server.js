const express = require('express');
const cors = require('cors')
const app = express();
const Validator = require('jsonschema').Validator;

app.use(cors())
app.use(express.json());

function validate_request(json) {
    const v = new Validator();
    const schema = {
        "id": "/Request",
        "type": "object",
        "properties": {
            "fullName": {"type": "string"},
            "dormAndRoom": {"type": "string"},
            "station": {"type": "string"},
            "order": {"type": "string"},
        }
    }
    return v.validate(json, schema);
}


app.get('/', (req, res) => {
    res.json("hello");
})

app.post('/create_request', (req, res) => {
    if(validate_request(req.body)){
        const fullName = req.body.fullName.toString();
        const dormAndRoom = req.body.dormAndRoom.toString();
        const station = req.body.station.toString();
        const order = req.body.order.toString();
        console.log(`${fullName} who lives in ${dormAndRoom} requests delivery from ${station} with number ${order}`);
    }
})

const port = process.env.PORT || 6969
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
