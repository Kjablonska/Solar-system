import { Route, BrowserRouter, Switch, withRouter } from 'react-router-dom';
import './App.css';
import configureStore from './redux/store';
import { Provider } from 'react-redux';
import LandingPage from './components/LandingPage';
import { InitSceneData } from './components/SolarSystem';
import { PlanetSystemScene } from './components/PlanetSystem';

const App = () => {
    const { store } = configureStore();
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={withRouter(LandingPage)} />
                    <Route exact path='/satellites' component={PlanetSystemScene} />
                    <Route path='/solarSystem' component={InitSceneData} />
                </Switch>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
