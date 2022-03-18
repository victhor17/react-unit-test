import { createSlice } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

const initialState = { counter: 0}

const counterSlice = createSlice({
    name: 'counterSlice',
    initialState,
    reducers: {
        incrementedCounter(state, action) {
            return {
                ...state,
                counter: action.payload
            }
        }
    }
})

const store = configureStore({
    reducer: {
        counterSlice: counterSlice.reducer
    }
})

export const {reducer} = counterSlice;
export const { incrementedCounter } = counterSlice.actions;
export default store;
