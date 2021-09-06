import { configureStore } from '@reduxjs/toolkit';
import orderReducer from '../features/order/orderSlice';
import reservationReducer from '../features/reservation/reservationSlice';


export const store = configureStore({
  reducer: {
    order: orderReducer,
    reservation: reservationReducer
  },
});
