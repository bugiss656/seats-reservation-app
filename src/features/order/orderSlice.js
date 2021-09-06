import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    seatsCount: 0,
    seatsNearBy: false
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        updateSeatsCount: (state, action) => {
            state.seatsCount = action.payload
        },
        updateSeatsNearBy: (state, action) => {
            state.seatsNearBy = action.payload
        }
    }
})

export const { updateSeatsCount, updateSeatsNearBy } = orderSlice.actions

export default orderSlice.reducer

export const seatsCount = state => state.order.seatsCount

export const seatsNearBy = state => state.order.seatsNearBy