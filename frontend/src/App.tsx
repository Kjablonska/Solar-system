import { InitSceneData } from './components/Scene';
import './App.css';
import DataSelection from './components/DataSelection';
import configureStore from './redux/store';
import { Provider } from 'react-redux';
import LandingPage from './components/LandingPage';

const App = () => {
    const { store } = configureStore();

    return (
        <>
            <Provider store={store}>
                <LandingPage />
                {/* <InitSceneData /> */}
            </Provider>
        </>
    );
};

export default App;
