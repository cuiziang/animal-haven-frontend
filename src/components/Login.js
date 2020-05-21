import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import {useDispatch, useSelector} from 'react-redux';
import {login} from "../features/users/usersSlice";
import {useHistory, useLocation} from 'react-router-dom';


export function Login() {

    const styles = {
        center: {
            display: 'flex',
            justifyContent: 'center'

        },
        notification: {
            display: 'flex',
            justifyContent: 'center',
            color: '#dc3545'
        }
    }

    const loggedIn = useSelector(state => state.users.loggedIn);
    const [warning, setWarning] = useState();
    const [showHideAlert, setShowHideAlert] = useState();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch()
    const {from} = location.state || {from: {pathname: "/"}}

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const toLogin = async (e) => {
        e.preventDefault();
        dispatch(await login({username, password}))
            .then(() => {
                if (loggedIn)
                    history.replace(from)
                else {
                    setShowHideAlert(true);
                    setWarning("Wrong username or password");
                }
            });
    };

    const handleUsernameChange = (e) => setUsername({[e.target.name]: e.target.value});
    const handlePasswordChange = (e) => setPassword({[e.target.name]: e.target.value});


    return (
        <Container maxWidth="sm">
            <form onSubmit={toLogin}>
                {showHideAlert && <Alert severity="error">{warning}</Alert>}
                <TextField type="text" label="Username" fullWidth margin="normal" name="username"
                           onChange={handleUsernameChange}/>
                <TextField type="password" label="Password" fullWidth margin="normal" name="password"
                           onChange={handlePasswordChange} autoComplete="off"/>
                <Button type="submit" variant="contained" size="large" color="primary">Login</Button>
            </form>
        </Container>
    )
}
