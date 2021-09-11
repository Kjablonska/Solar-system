import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import configureStore from './redux/store';
import { Provider } from 'react-redux';
import LandingPage from './components/LandingPage';
import { InitSceneData } from './components/Scene';

const App = () => {
    const { store } = configureStore();
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={LandingPage} />
                    <Route exact path='/visualisation' component={InitSceneData} />
                </Switch>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
