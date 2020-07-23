import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from "../../shared/baseUrl";
import Cookies from 'universal-cookie';

export const fetchAllAnimals = createAsyncThunk(
    'animals/fetchAllAnimals',
    async (animalId, { getState, requestId }) => {
        const cookies = new Cookies();
        const response = await axios.get(baseUrl + '/animals',
            {
                headers: {
                    Authorization: 'Bearer ' + cookies.get('token')
                }
            });
        return response.data;
    },
    {
        condition: (animalId, { getState, extra }) => {
            const { animals } = getState()
            const fetchStatus = animals
            if (fetchStatus === 'fulfilled' || fetchStatus === 'loading') {
                // Already fetched or in progress, don't need to re-fetch
                return false
            }
        }
    }
)

export const addAnimal = createAsyncThunk(
    'animals/addAnimal',
    async (animal, { getState, requestId }) => {
        const cookies = new Cookies();
        const response = await axios.post(baseUrl + '/animals',
            animal,
            {
                headers: {
                    Authorization: 'Bearer ' + cookies.get('token')
                }
            });
        return response.data;
    },
    {
        condition: (animalId, { getState, extra }) => {
            const { status } = getState()
            const fetchStatus = status
            if (fetchStatus === 'fulfilled' || fetchStatus === 'loading') {
                // Already fetched or in progress, don't need to re-fetch
                return false
            }
        }
    }
)


export const animalsSlice = createSlice({
    name: 'animals',
    initialState: {
        loading: 'idle',
        currentRequestId: undefined,
        error: null,
        animals: []
    },
    reducers: {},
    extraReducers: {
        // Add reducers for additional action types here, and handle loading state as needed
        [fetchAllAnimals.pending]: (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending'
                state.currentRequestId = action.meta.requestId
            }
        },
        [fetchAllAnimals.fulfilled]: (state, action) => {
            // Add animals to the state array
            state.loading = 'idle'
            state.animals = action.payload
            state.currentRequestId = undefined
        },
        [addAnimal.pending]: (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending'
                state.currentRequestId = action.meta.requestId
            }
        },
        [addAnimal.fulfilled]: (state, action) => {
            // Add animals to the state array
            state.loading = 'idle'
            state.animals.unshift(action.payload)
            state.currentRequestId = undefined
        },

    }
});

// export const {} = usersSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = amount => dispatch => {
//     setTimeout(() => {
//         dispatch(fetchAnimals());
//     }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = state => state.animals.value;

export default animalsSlice.reducer;
