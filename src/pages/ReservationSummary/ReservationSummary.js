import UnorderedList from "../../components/UnorderedList/UnorderedList"
import { useDispatch, useSelector } from "react-redux"
import { clearReservation, clearSelectedSeats, selectReservedSeats } from "../../features/reservation/reservationSlice"
import { useHistory } from "react-router-dom"

import Button from "../../components/Button/Button"

import reservationSummaryStyles from './ReservationSummary.module.css'
import buttonStyles from '../../components/Button/Button.module.css'
import 'bootstrap-icons/font/bootstrap-icons.css'



const ReservationSummary = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const reservedSeats = useSelector(selectReservedSeats)

    const handleRedirectToHomepage = () => {
        dispatch(clearSelectedSeats())
        dispatch(clearReservation())

        history.push("/")
    }

    return (
        <section className={`container ${reservationSummaryStyles.reservationSummary}`}> 
            <h1 className={`${reservationSummaryStyles.heading} ${reservationSummaryStyles.headingSuccess}`}>
                <i className="bi bi-clipboard-check"></i>
                Twoja rezerwacja przebiegła pomyślnie!
            </h1>
            <h5>Wybrałeś miejsca:</h5>
            <UnorderedList data={reservedSeats} />
            <h4 className={reservationSummaryStyles.heading}>Dziękujemy! W razie problemów prosimy o kontakt z działem administracji.</h4>
            <hr />
            <Button size={buttonStyles['button-sm']} text="Powrót do strony głównej" onClick={handleRedirectToHomepage} />
        </section>
    )
}

export default ReservationSummary