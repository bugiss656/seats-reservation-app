import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    seats_count: 0,
    seats_near_by: false
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        updateSeatsCount: (state, action) => {
            state.seats_count = action.payload
        },
        updateSeatsNearBy: (state, action) => {
            state.seats_near_by = action.payload
        }
    }
})

export const { updateSeatsCount, updateSeatsNearBy } = orderSlice.actions

export default orderSlice.reducer

export const seatsCount = state => state.order.seats_count

export const seatsNearBy = state => state.order.seats_near_by