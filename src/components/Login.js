import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../features/users/usersSlice";
import { useHistory, useLocation } from 'react-router-dom';


export function Login() {

    const loggedIn = useSelector(state => state.users.loggedIn);
    const isLoading = useSelector(state => state.users.isLoading);
    const [tried, setTried] = useState();
    const [warning, setWarning] = useState();
    const [showHideAlert, setShowHideAlert] = useState();
    const [username, setUsername] = useState(false);
    const [password, setPassword] = useState();

    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch()
    const { from } = location.state || { from: { pathname: "/" } }

    const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />;

    useEffect(() => {
        if (loggedIn)
            history.push(from);
        else if (tried && !isLoading) {
            setShowHideAlert(true);
            setWarning("Wrong username or password");
        }
    }, [loggedIn, history, from, tried, isLoading]);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(login({ username, password }));
        setTried(true);

    };

    const handleUsernameChange = (e) => setUsername({ [e.target.name]: e.target.value });
    const handlePasswordChange = (e) => setPassword({ [e.target.name]: e.target.value });


    return (
        <Container maxWidth="sm">
            {showHideAlert && <Alert severity="error">{warning}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField type="text" label="Username" fullWidth margin="normal" name="username"
                    onChange={handleUsernameChange} />
                <TextField type="password" label="Password" fullWidth margin="normal" name="password"
                    onChange={handlePasswordChange} autoComplete="off" />
                <Button type="submit" variant="contained" size="large" color="primary">Login</Button>
            </form>
        </Container>
    )
}
