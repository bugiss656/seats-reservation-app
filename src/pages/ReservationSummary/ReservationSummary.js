import UnorderedList from "../../components/UnorderedList/UnorderedList"
import { useDispatch, useSelector } from "react-redux"
import { clearReservation, clearSelectedSeats, selectReservedSeats } from "../../features/reservation/reservationSlice"
import { useHistory } from "react-router-dom"

import reservationSummary from './ReservationSummary.module.css'
import 'bootstrap-icons/font/bootstrap-icons.css'


const ReservationSummary = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const reservation = useSelector(selectReservedSeats)

    const handleRedirectToHomepage = () => {
        dispatch(clearSelectedSeats())
        dispatch(clearReservation())

        history.push("/")
    }

    return (
        <section className={`container ${reservationSummary.reservationSummary}`}> 
            <h1 className={`${reservationSummary.heading} ${reservationSummary.headingSuccess}`}>
                <i className="bi bi-clipboard-check"></i>
                Twoja rezerwacja przebiegła pomyślnie!
            </h1>
            <h5>Wybrałeś miejsca:</h5>
            <UnorderedList data={reservation} />
            <h4 className={reservationSummary.heading}>Dziękujemy! W razie problemów prosimy o kontakt z działem administracji.</h4>
            <hr />
            <button type="button" className="btn btn-link" onClick={handleRedirectToHomepage}>Powrót do strony głównej</button>
        </section>
    )
}

export default ReservationSummary