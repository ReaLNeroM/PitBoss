const form = document.querySelector('form');
const requestsList = document.querySelector('ul');

const API_POST_URL = 'http://localhost:6969/create_request';
const API_GET_URL = 'http://localhost:6969/requests';

updateRequests();

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

    fetch(API_POST_URL, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
      .then(newRequest => {
        updateRequests();
      })
});

function updateRequests() {
    requestsList.innerHTML = '';
    fetch(API_GET_URL)
    .then(response => response.json())
    .then(requests => {
        console.log(requests);
        requests.reverse();
        requests.forEach(mew => {
            const li = document.createElement('li');
            li.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center mb-2");
            li.innerText = mew.foodStation;

            const rightAlignedDiv = document.createElement("div");
            rightAlignedDiv.setAttribute("class", "d-flex align-items-center float-right");

            const requestTimeDiv = document.createElement("div");
            requestTimeDiv.setAttribute("id", "request-time");
            requestTimeDiv.innerText = "15 minutes ago";

            const button = document.createElement("button");
            button.setAttribute("class", "float-right btn btn-dark");
            button.innerText = "Deliver!";

            rightAlignedDiv.appendChild(requestTimeDiv);
            rightAlignedDiv.appendChild(button);

            li.appendChild(rightAlignedDiv);

            requestsList.appendChild(li);
        });
        // loadingElement.style.display = 'none';
    });
}
