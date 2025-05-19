import { configureStore } from "@reduxjs/toolkit";
import productSlice from './productSlice'

const store = configureStore({
    reducer: {
        cartProducts: productSlice
    }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;