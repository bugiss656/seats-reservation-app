import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    seats: [],
    status: 'idle',
    error: null,
    selected_seats: [],
    reservation: []
}

export const fetchSeats = createAsyncThunk('reservation/fetchSeats', async () => {
    const response = await axios.get('http://localhost:8000/seats')
    return response.data
})

const handleSortSeatsByRow = (a, b) => {
    if (a.cords.x < b.cords.x) {
        return -1
    } 
    if (a.cords.x > b.cords.x) {
        return 0
    }
}

const reservationSlice = createSlice({
    name: 'reservation',
    initialState,
    reducers: {
        addSeats: (state, action) => {
            state.selected_seats = action.payload
        },
        addSingleSeat: (state, action) => {
            const seat_id = action.payload
            state.selected_seats.push(seat_id)
        },
        removeSingleSeat: (state, action) => {
            const seat_id = action.payload
            state.selected_seats = state.selected_seats.filter(seat => seat !== seat_id)
        },
        addReservation: (state, action) => {
            state.reservation = action.payload.sort(handleSortSeatsByRow)
        },
        clearSelectedSeats: (state) => {
            state.selected_seats = []
        },
        clearReservation: (state) => {
            state.reservation = []
        }
    },
    extraReducers: {
        [fetchSeats.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchSeats.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.seats = action.payload
        },
        [fetchSeats.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    }
})

export const { addSeats, addSingleSeat, removeSingleSeat, addReservation, clearSelectedSeats, clearReservation } = reservationSlice.actions

export default reservationSlice.reducer

export const selectSeats = state => state.reservation.seats

export const selectSelectedSeats = state => state.reservation.selected_seats

export const selectReservedSeats = state => state.reservation.reservation