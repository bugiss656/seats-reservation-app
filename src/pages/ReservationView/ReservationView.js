import { useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { seatsCount, seatsNearBy } from '../../features/order/orderSlice'
import useAlert from '../../components/Alert/useAlert'
import { 
    fetchSeats, 
    addSeats, 
    addSingleSeat, 
    removeSingleSeat, 
    clearSelectedSeats,
    addReservation, 
    selectSeats, 
    selectSelectedSeats 
} from '../../features/reservation/reservationSlice'

import Seat from '../../components/Seat/Seat'
import Legend from '../../components/Legend/Legend'
import Button from '../../components/Button/Button'
import Loader from '../../components/Loader/Loader'
import Alert from '../../components/Alert/Alert.styled'


import reservationViewStyles from './ReservationView.module.css'
import seatStyles from '../../components/Seat/Seat.module.css'
import buttonStyles from '../../components/Button/Button.module.css'


const ReservationView = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const { handleDisplayAlert, display, alertText } = useAlert()

    const selectedSeatsCount = useSelector(seatsCount)
    const areSeatsNearBy = useSelector(seatsNearBy)
    const seats = useSelector(selectSeats)
    const seatsStatus = useSelector(state => state.reservation.status)
    const error = useSelector(state => state.reservation.error)
    const selectedSeats = useSelector(selectSelectedSeats)

    const ROW_LAST_SEAT_Y_COORDINATE = 14
    

    const handleProposeRandomSeats = useCallback(() => {
        dispatch(clearSelectedSeats())
        const availableSeats = seats.filter(seat => seat.reserved !== true && seat.active === true)

        if(selectedSeatsCount <= availableSeats.length) {
            let proposeSeats = []
            for(let i = 1; i <= selectedSeatsCount; i++) {
                const seat = Math.floor(Math.random() * availableSeats.length)
                if(!proposeSeats.includes(availableSeats[seat].id)) {
                    proposeSeats.push(availableSeats[seat].id)
                }
            }
            dispatch(addSeats(proposeSeats))
        } else {
            handleDisplayAlert("Selected seats count not available!")
        }
    }, [seats, selectedSeatsCount, dispatch, handleDisplayAlert])
    
    
    const handleProposeSeatsNearBy = useCallback(() => {
        let proposeSeats = []
        while (proposeSeats.length !== Number(selectedSeatsCount)) {
            proposeSeats = []
            let startingSeatIndex = Math.floor(Math.random() * seats.length)

            if (seats[startingSeatIndex].cords.y !== ROW_LAST_SEAT_Y_COORDINATE &&
                seats[startingSeatIndex].cords.y + (selectedSeatsCount - 1) <= ROW_LAST_SEAT_Y_COORDINATE &&
                seats[startingSeatIndex].reserved !== true &&
                seats[startingSeatIndex].active !== false) {
                
                proposeSeats.push(seats[startingSeatIndex].id)

                for (let i = 1; i <= selectedSeatsCount - 1; i++) {

                    if (seats[startingSeatIndex + i].reserved !== true &&
                        seats[startingSeatIndex + i].active !== false) {
                            
                        proposeSeats.push(seats[startingSeatIndex + i].id)    
                    }
                }
            }
        }

        dispatch(addSeats(proposeSeats))

    }, [seats, selectedSeatsCount, dispatch])

    
    const handleChooseSeatsFromView = seatId => {
        if (selectedSeats.includes(seatId)) {
            dispatch(removeSingleSeat(seatId))

        } else if (!selectedSeats.includes(seatId)) {
            dispatch(addSingleSeat(seatId))  
        }
    }


    const handleAddSeatsToReservation = () => {
        let reservation = []

        for (let i = 0; i <= selectedSeats.length - 1; i++) {

            for (let j = 0; j <= seats.length - 1; j++) {
    
                if (seats[j].id === selectedSeats[i]) {
                    reservation.push(seats[j])
                }
            }
        }
        dispatch(addReservation(reservation))
    }


    const handleConfirmReservation = () => {
        if (selectedSeats.length !== 0) {
            handleAddSeatsToReservation()
            history.push('/reservation-summary')

        } else {
            handleDisplayAlert('Nie wybrałeś żadnych miejsc, wybierz miejsca z widoku sali.')
        }
    }


    useEffect(() => {
        if(seatsStatus === 'idle') {
            setTimeout(() => {
                dispatch(fetchSeats())
            }, 2000) 
        }
    }, [seatsStatus, dispatch])


    useEffect(() => {
        if(seatsStatus === 'succeeded') {

            if(areSeatsNearBy === false) {
                handleProposeRandomSeats()

            } else if(areSeatsNearBy === true) {
                handleProposeSeatsNearBy()
            }
        }
    }, [handleProposeRandomSeats, handleProposeSeatsNearBy, seatsStatus, areSeatsNearBy])


    let content

    if(seatsStatus === 'idle' || seatsStatus === 'loading') {
        content = <Loader />

    } else if(seatsStatus === 'succeeded') {
        content = seats.map(seat => {

            if(seat.active === true && seat.reserved === false) {
                
                if(selectedSeats.includes(seat.id)) {
                    return <Seat key={seat.id} type={seatStyles.seatChoice} handleOnClick={() => handleChooseSeatsFromView(seat.id)} />
                
                } else {
                    return <Seat key={seat.id} type={seatStyles.seatAvailable} handleOnClick={() => handleChooseSeatsFromView(seat.id)} />
                }

            } else if(seat.active === true && seat.reserved === true) {
                return <Seat key={seat.id} type={seatStyles.seatReserved} />

            } else if(seat.active === false) {
                return <Seat key={seat.id} type={seatStyles.seatUnavailable} />
                
            } else {
                return null
            }
        })

    } else if(seatsStatus === 'failed') {
        content = <div>{error}</div>
    }

    return (
        <div className="wrapper">
            {display && <Alert type="danger" alertText={alertText} /> }
            <div className={reservationViewStyles.seatsView}>
                {content}
            </div>
            {seatsStatus === 'succeeded'
                ?   <div className="d-flex flex-row justify-content-between align-items-center">
                        <Legend />
                        <Button buttonStyles={`${buttonStyles.button} ${buttonStyles.buttonLg}`} text="Rezerwuj" handleOnClick={handleConfirmReservation} />
                    </div>
                :   ''
            }
        </div>
    )
}

export default ReservationView