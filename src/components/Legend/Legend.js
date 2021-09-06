import Seat from "../Seat/Seat"
import seatStyles from "../Seat/Seat.module.css"


const Legend = () => {
    return (
        <div className="d-flex flex-row justify-content-center align-items-center">
            <div className={`${seatStyles.seatLegendItem} d-flex flex-row align-items-center`}>
                <Seat type={`${seatStyles.seatAvailable} ${seatStyles.disabled}`} />
                <span className={seatStyles.seatLegendText}>Miejsca dostępne</span>
            </div>
            <div className={`${seatStyles.seatLegendItem} d-flex flex-row align-items-center`}>
                <Seat type={seatStyles.seatReserved} />
                <span className={seatStyles.seatLegendText}>Miejsca zarezerwowane</span>
            </div>
            <div className={`${seatStyles.seatLegendItem} d-flex flex-row align-items-center`}>
                <Seat type={`${seatStyles.seatChoice} ${seatStyles.disabled}`} />
                <span className={seatStyles.seatLegendText}>Twój wybór</span>
            </div>
        </div>
    )
}

export default Legend