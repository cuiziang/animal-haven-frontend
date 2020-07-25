import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from "../../shared/baseUrl";
import Cookies from 'universal-cookie';

export const fetchAllAnimals = createAsyncThunk(
    'animals/fetchAllAnimals',
    async (query) => {
        const cookies = new Cookies();

        const url = new URL(baseUrl + '/animals');
        url.searchParams.append('page', query.page);
        url.searchParams.append('size', query.pageSize);
        if (query.orderBy !== undefined) {
            url.searchParams.append('sort', query.orderBy.field);
            url.searchParams.append('dir', query.orderDirection);
        }
        if(query.search !==""){
            url.searchParams.append('q', query.search);
        }

        const response = await axios.get(url,
            {
                headers: {
                    Authorization: 'Bearer ' + cookies.get('token')
                }
            });
            
        return response.data;
    }
)

export const addAnimal = createAsyncThunk(
    'animals/addAnimal',
    async (animal) => {
        const cookies = new Cookies();
        const response = await axios.post(baseUrl + '/animals',
            animal,
            {
                headers: {
                    Authorization: 'Bearer ' + cookies.get('token')
                }
            });
        return response.data;
    }
)

export const animalsNameAndCountGroupByName = createAsyncThunk(
    'animals/animalsNameAndCountGroupByName',
    async () => {
        const cookies = new Cookies();
        const response = await axios.get(baseUrl + '/animals/animalsNameAndCountGroupByName',
            {
                headers: {
                    Authorization: 'Bearer ' + cookies.get('token')
                }
            });
        return response.data;
    }
)

export const breedNames = createAsyncThunk(
    'animals/breedNames',
    async (speciesId, { getState, requestId }) => {
        const cookies = new Cookies();
        const response = await axios.get(baseUrl + '/breeds',
            {
                headers: {
                    Authorization: 'Bearer ' + cookies.get('token')
                }
            });
        return response.data;
    }
)


export const animalsSlice = createSlice({
    name: 'animals',
    initialState: {
        loading: 'idle',
        currentRequestId: undefined,
        error: null,
        animals: {
            animals: [],
            page: 0,
            totalCount: 0
        },
        animalsNameAndCountGroupByName: {},
        breedNames: {}
    },
    reducers: {},
    extraReducers: {
        [fetchAllAnimals.pending]: (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending'
                state.currentRequestId = action.meta.requestId
            }
        },
        [fetchAllAnimals.fulfilled]: (state, action) => {
            state.loading = 'idle';
            state.animals.animals = action.payload.animals;
            state.animals.page = action.payload.page;
            state.animals.totalCount = action.payload.totalCount;
            state.currentRequestId = undefined
        },
        [addAnimal.pending]: (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending'
                state.currentRequestId = action.meta.requestId
            }
        },
        [addAnimal.fulfilled]: (state, action) => {
            state.loading = 'idle'
            state.currentRequestId = undefined
        },
        [animalsNameAndCountGroupByName.pending]: (state, action) => {
            if (state.loading === 'idle') {
                state.currentRequestId = action.meta.requestId
            }
        },
        [animalsNameAndCountGroupByName.fulfilled]: (state, action) => {
            state.loading = 'idle'
            state.currentRequestId = undefined
            state.animalsNameAndCountGroupByName = action.payload
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
