import seatStyles from './Seat.module.css'


const Seat = ({ type, handleOnClick }) => {
    return (
        <div className={`${seatStyles.seat} ${type}`} onClick={handleOnClick}></div>
    )
}

export default Seat