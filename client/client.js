const form = document.querySelector('form');

const API_URL = 'http://localhost:6969/create_request';

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    const fullName = formData.get('fullName');
    const dormAndRoom = formData.get('dormAndRoom');
    const station = formData.get('station');
    const order = formData.get('order');

    const request = {
        fullName,
        dormAndRoom,
        station,
        order
    };

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'content-type': 'application/json'
        }
    })
});