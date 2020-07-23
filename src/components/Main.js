import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useDispatch, useSelector } from 'react-redux';
import Container from "@material-ui/core/Container";
import { Animal } from "./Animal";
import { Switch, Redirect, Route } from "react-router-dom";
import { Header } from "./Header";
import Footer from "./Footer";
import { Login } from './Login';
import { LinearProgress } from '@material-ui/core';
import { Dashboard } from './Dashboard';

const sections = [
    { title: 'Dashboard', url: '/dashboard' },
    { title: 'Animal', url: '/animals' }
];

export function Main() {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.users.isLoading);

    return (
        <React.Fragment>
            <CssBaseline />
            {isLoading && <LinearProgress color="secondary" />}
            <Container maxWidth="lg">
                <Header title="Animal Haven" sections={sections} />
                <main>
                    <Switch location={dispatch.location}>
                        <Route exact path='/dashboard' component={Dashboard} />
                        <Route exact path='/animals' component={Animal} />
                        <Route exact path='/login' component={Login} />
                        <Redirect to="/dashboard" />
                    </Switch>
                </main>
                <Footer />
            </Container>
        </React.Fragment>
    );
}
