import { useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Seat from '../../components/Seat/Seat'
import Legend from '../../components/Legend/Legend'
import Button from '../../components/Button/Button'
import { seatsCount, seatsNearBy } from '../../features/order/orderSlice'
import { fetchSeats, addSeats, addSingleSeat, removeSingleSeat, addReservation, selectSeats, selectSelectedSeats } from '../../features/reservation/reservationSlice'

import reservationViewStyles from './ReservationView.module.css'
import seatStyles from '../../components/Seat/Seat.module.css'


const ReservationView = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const seats_count = useSelector(seatsCount)
    const seats_near_by = useSelector(seatsNearBy)
    const seats = useSelector(selectSeats)
    const seatsStatus = useSelector(state => state.reservation.status)
    const error = useSelector(state => state.reservation.error)
    const selected_seats = useSelector(selectSelectedSeats)

    const ROW_LAST_SEAT_Y_COORDINATE = 14


    const handleProposeRandomSeats = useCallback(() => {
        let propose_seats = []

        for (let i = 1; i <= seats_count; i++) {

            while (propose_seats.length !== Number(seats_count)) {
                const seat = Math.floor(Math.random() * seats.length)

                if (seats[seat].reserved === false && seats[seat].active === true) {
                    propose_seats.push(seats[seat].id)
                }
            }
        }

        dispatch(addSeats(propose_seats))

    }, [seats, seats_count, dispatch])

    
    const handleProposeSeatsNearBy = useCallback(() => {
        let propose_seats = []

        while (propose_seats.length !== Number(seats_count)) {
            propose_seats = []
            let starting_seat_index = Math.floor(Math.random() * seats.length)

            if (seats[starting_seat_index].cords.y !== ROW_LAST_SEAT_Y_COORDINATE &&
                seats[starting_seat_index].cords.y + (seats_count - 1) <= ROW_LAST_SEAT_Y_COORDINATE &&
                seats[starting_seat_index].reserved !== true &&
                seats[starting_seat_index].active !== false) {
                
                propose_seats.push(seats[starting_seat_index].id)

                for (let i = 1; i <= seats_count - 1; i++) {

                    if (seats[starting_seat_index + i].reserved !== true &&
                        seats[starting_seat_index + i].active !== false) {
                            
                        propose_seats.push(seats[starting_seat_index + i].id)    
                    }
                }
            }
        }

        dispatch(addSeats(propose_seats))

    }, [seats, seats_count, dispatch])

    
    const handleChooseSeatsFromView = seat_id => {
        if (selected_seats.includes(seat_id)) {
            dispatch(removeSingleSeat(seat_id))

        } else if (!selected_seats.includes(seat_id)) {
            dispatch(addSingleSeat(seat_id))  
        }
    }


    const handleAddSeatsToReservation = () => {
        let reservation = []

        for (let i = 0; i <= selected_seats.length - 1; i++) {

            for (let j = 0; j <= seats.length - 1; j++) {
    
                if (seats[j].id === selected_seats[i]) {
                    reservation.push(seats[j])
                }
            }
        }
        dispatch(addReservation(reservation))
    }


    const handleConfirmReservation = () => {
        if (selected_seats.length !== 0) {
            handleAddSeatsToReservation()
            history.push('/reservation-summary')

        } else {
            alert('Nie wybrałeś żadnych miejsc, wybierz miejsca z widoku sali.')
        }
    }


    useEffect(() => {
        if(seatsStatus === 'idle') {
            dispatch(fetchSeats())
        }
    }, [seatsStatus, dispatch])


    useEffect(() => {
        if(seatsStatus === 'succeeded') {

            if(seats_near_by === false) {
                handleProposeRandomSeats()

            } else if(seats_near_by === true) {
                handleProposeSeatsNearBy()
            }
        }
    }, [handleProposeRandomSeats, handleProposeSeatsNearBy, seatsStatus, seats_near_by])


    let content

    if(seatsStatus === 'loading') {
        content = <div>Loading...</div>

    } else if(seatsStatus === 'succeeded') {
        content = seats.map(seat => {

            if(seat.active === true && seat.reserved === false) {
                
                if(selected_seats.includes(seat.id)) {
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
            <div className={reservationViewStyles.seatsView}>
                {content}
            </div>
            <div className="d-flex flex-row justify-content-between align-items-center">
                <Legend />
                <Button text="Rezerwuj" handleOnClick={handleConfirmReservation} />
            </div>
        </div>
    )
}

export default ReservationView