import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseUrl} from "../../shared/baseUrl";

export const login = createAsyncThunk(
    'users/login',
    async (credentials) => {
        const response = await axios
            .post(baseUrl + '/authenticate',
                {
                    username: credentials.username.username,
                    password: credentials.password.password
                });
        return response.data;
    }
)

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        loggedIn: false,
        isLoading: false
    },
    reducers: {
        logout(state) {
            state.loggedIn = false
            localStorage.removeItem("token")
        }
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.isLoading = true;
        },
        [login.fulfilled]: (state, action) => {
            state.loggedIn = true;
            state.isLoading = false;
            localStorage.setItem("token", action.payload.jwt)
        },
        [login.rejected]: (state, action) => {
            state.isLoading = false;
        }
    }
});

export const {logout} = usersSlice.actions

export const selectCount = state => state.users.value;

export default usersSlice.reducer;
