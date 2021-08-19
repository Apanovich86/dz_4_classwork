const url = 'http://195.72.146.25/api/v1/cars';
const saveCar = ({model, price, year}) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({model, price, year}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json());
}
const getCars = () => {
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(value => value.json());
}
const deleteCarAPI = (id) => {
    return fetch(`http://195.72.146.25/api/v1/cars/${id}`, {
        method: 'DELETE',
    });
}
export {saveCar, getCars, deleteCarAPI};