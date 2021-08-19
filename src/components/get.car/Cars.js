import {useEffect, useState} from "react";
import {
    deleteCarAPI,
    getCars
} from "../services/car.service";
import Car from "../car/Car";

export default function Cars() {
    let [cars, setCars] = useState([]);
    let [model, setModel] = useState('');
    let [price, setPrice] = useState('');
    let [year, setYear] = useState('');
    let [carId, setCarId] = useState(null);
    let [car, setCar] = useState(null);
    useEffect(() => {
        getCars().then(value => {
                setCars([...value])
                setModel(value[0].model)
                setPrice(value[0].price)
                setYear(value[0].year)
                setCarId(value[0].id)
            }
        );
    }, []);
    let deleteCar = (id) => {
        deleteCarAPI(id).then(value => console.log(value));
        let filterCarsArray = cars.filter(value => value.id !== id);
        setCars([...filterCarsArray]);
    };
    let editCar = (id) => {
        let carFind = cars.find(value => value.id === id);
        console.log(carFind);
        setModel(carFind.model)
        setPrice(carFind.price)
        setYear(carFind.year)
        setCarId(carFind.id);
        setCar(carFind);
    }
    const updateCar = () => {
       let item = {model, price, year};
        return fetch(`http://195.72.146.25/api/v1/cars/${carId}`, {
            method: 'PUT',
            body: JSON.stringify(item),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json());
    }
    const onSubmitForm = (e) => {
        e.preventDefault();
        // let newData = [...cars];
        // newData.splice()
        // newData.unshift(car);
        updateCar().then(value => setCars([...cars]));
    }
    const onInputChangeModel = (e) => {
        let carmodel = e.target.value;
        setModel(carmodel);
    }
    const onInputChangePrice = (e) => {
        let price = e.target.value;
        setPrice(price);
    }
    const onInputChangeYear = (e) => {
        let year = e.target.value;
        setYear(year);
    };
    return (
        <div style={{display: "flex", flexDirection: "column-reverse"}}>
            {
                cars.map((value) => <Car item={value} key={value.id} deleteCar={deleteCar} editCar={editCar}/>)
            }
            <form onSubmit={onSubmitForm}>
                <input type="text" name={'model'} value={model} onInput={onInputChangeModel} maxLength={20}/>
                <input type="number" name={'price'} value={price} onInput={onInputChangePrice} min={0}/>
                <input type="number" name={'year'} value={year} onInput={onInputChangeYear} min={1990} max={2021}/>
                <input className={"m-l"} type="submit" value={'update car'} onClick={updateCar}/>
            </form>
        </div>
    );
}