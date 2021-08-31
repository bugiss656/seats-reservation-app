import UnorderedList from "../../components/UnorderedList/UnorderedList"
import { useDispatch, useSelector } from "react-redux"
import { clearReservation, clearSelectedSeats, selectReservedSeats } from "../../features/reservation/reservationSlice"
import { useHistory } from "react-router-dom"


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
        <>
            <h2>Twoja rezerwacja przebiegła pomyślnie!</h2>
            <h5>Wybrałeś miejsca:</h5>
            <UnorderedList data={reservation} />
            <h4>Dziękujemy! W razie problemów prosimy o kontakt z działem administracji.</h4>
            <button type="button" className="btn btn-link" onClick={handleRedirectToHomepage}>Powrót do strony głównej</button>
        </>
    )
}

export default ReservationSummary