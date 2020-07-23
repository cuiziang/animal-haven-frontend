import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from "../../shared/baseUrl";
import Cookies from 'universal-cookie';
import JwtDecode from 'jwt-decode';
import md5 from 'blueimp-md5';

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
        isLoading: false,
        username: "",
        roles: [],
        emailHash: "",
        error: undefined
    },
    reducers: {
        logout(state) {
            const cookies = new Cookies();
            state.loggedIn = false;
            state.username = "";
            state.roles = [];
            state.emailHash = "";
            state.error = undefined;
            cookies.remove('token');
        }
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.isLoading = true;
        },
        [login.fulfilled]: (state, action) => {
            state.loggedIn = true;
            state.isLoading = false;

            const token = action.payload.jwt;
            var decoded = JwtDecode(token);
            state.username = decoded.sub;
            state.roles = decoded.roles;
            state.emailHash = md5(action.payload.email)
            const cookies = new Cookies();
            cookies.set('token', action.payload.jwt);
        },
        [login.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        }
    }
});

export const { logout } = usersSlice.actions

export const selectCount = state => state.users.value;

export default usersSlice.reducer;
