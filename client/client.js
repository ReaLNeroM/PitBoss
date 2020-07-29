const form = document.querySelector('form');

const API_URL = 'http://localhost:6969/create_request';

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    const fullName = formData.get('full-name');
    const dormAndRoom = formData.get('dorm-and-room');
    const foodStation = formData.get('food-station');
    const foodOrder = formData.get('food-order');

    const request = {
        fullName,
        dormAndRoom,
        foodStation,
        foodOrder
    };

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'content-type': 'application/json'
        }
    })
});