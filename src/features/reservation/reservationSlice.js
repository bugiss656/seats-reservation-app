import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    seats: [],
    status: 'idle',
    error: null,
    selectedSeats: [],
    reservedSeats: []
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
            state.selectedSeats = action.payload
        },
        addSingleSeat: (state, action) => {
            const seatId = action.payload
            state.selectedSeats.push(seatId)
        },
        removeSingleSeat: (state, action) => {
            const seatId = action.payload
            state.selectedSeats = state.selectedSeats.filter(seat => seat !== seatId)
        },
        addReservation: (state, action) => {
            state.reservedSeats = action.payload.sort(handleSortSeatsByRow)
        },
        clearSelectedSeats: (state) => {
            state.selectedSeats = []
        },
        clearReservation: (state) => {
            state.reservedSeats = []
        }
    },
    extraReducers: {
        [fetchSeats.pending]: (state) => {
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

export const selectSelectedSeats = state => state.reservation.selectedSeats

export const selectReservedSeats = state => state.reservation.reservedSeats