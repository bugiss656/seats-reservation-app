import styles from './Seat.module.css'


const Seat = ({ type, handleOnClick }) => {
    return (
        <div className={`${styles.seat} ${type}`} onClick={handleOnClick}></div>
    )
}

export default Seat