import './Car.css'

export default function Car({item, deleteCar, editCar}) {
    const onClickDeleteCar = () => { deleteCar(item.id);};
    const onClickSelectCar = () => { editCar(item.id);};
    return (
        <div>
            <p><span className={"blu-font"}>id: </span>{item.id}</p>
            <p><span className={'blu-font'}>model: </span>{item.model}</p>
            <p><span className={'blu-font'}>price: </span>{item.price}</p>
            <p><span className={'blu-font'}>year: </span>{item.year}</p>
            <button onClick={onClickDeleteCar}>delete</button>
            <button className={"m-l"} onClick={onClickSelectCar}>edit</button>
            <br/>
        </div>
    );
}