import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useDispatch} from 'react-redux';
import Container from "@material-ui/core/Container";
import {Animal} from "./Animal";
import {Switch, Redirect, Route} from "react-router-dom";
import {Header} from "./Header";
import Footer from "./Footer";
import { Login } from './Login';

const sections = [
    {title: 'Dashboard', url: '/dashboard'}
];

export function Main() {
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth="lg">
                <Header title="Animal Haven" sections={sections}/>
                <main>
                    <Switch location={dispatch.location}>
                        <Route exact path='/dashboard' component={Animal}/>
                        <Route exact path='/login' component={Login}/>
                        <Redirect to="/dashboard"/>
                    </Switch>
                </main>
                <Footer/>
            </Container>
        </React.Fragment>
    );
}
