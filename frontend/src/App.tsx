import { InitSceneData } from './components/Scene';
import './App.css';
import DataSelection from './components/DataSelection';
import configureStore from './redux/store';
import { Provider } from 'react-redux';

const App = () => {
    const { store } = configureStore();

    return (
        <>
            <Provider store={store}>
                <DataSelection />
                <InitSceneData />
            </Provider>
        </>
    );
};

export default App;
