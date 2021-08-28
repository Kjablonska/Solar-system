import { Engine, Scene, AdvancedTimer } from '@babylonjs/core';
import { TimerState } from 'babylonjs/Misc/timer';
import { useEffect, useRef, useState } from 'react';
import useFillOrbitesData from '../../hooks/useFillOrbitesPoints';
import setMovementTimer from '../../utils/setMovementTimer';
import { MovePlanets } from './MovePlanets';
import { SceneData } from './SceneData';
import { UserPanel } from './UserPanel';

let SPEED: number = 1000;
let MOVEMENT: number = 1;

const SceneComponent = (props: any) => {
    const reactCanvas = useRef(null);
    const {
        antialias,
        engineOptions,
        adaptToDeviceRatio,
        planetsData,
        sceneOptions,
        startDate,
        endDate,
        isRealTime,
        ...rest
    } = props;
    const { movePlanet } = useFillOrbitesData({ isRealTime, startDate, endDate });

    const [scene, setScene] = useState<Scene>();
    const [data, setData] = useState<SceneData>();
    const [userPanel, setUserPanel] = useState<UserPanel>();
    const [planetsMovement, initPlanetsMovement]= useState<MovePlanets>();

    useEffect(() => {
        if (reactCanvas.current) {
            const engine = new Engine(reactCanvas.current, antialias, engineOptions, adaptToDeviceRatio);
            const initScene = new Scene(engine, sceneOptions);
            setScene(initScene);
            if (initScene !== undefined && initScene.isReady()) {
                const initData = new SceneData(planetsData, initScene);
                setData(initData);
                const initMovement = new MovePlanets(initData.visualisationData, isRealTime, startDate, endDate);
                initPlanetsMovement(initMovement);
                const initUI = new UserPanel(initScene, startDate, initMovement, movePlanet, initData.visualisationData);
                setUserPanel(initUI);
                initUI.timer.start();
            } else if (scene !== undefined && !scene.isReady()) {
                initScene.onReadyObservable.addOnce((scene) => new SceneData(planetsData, scene));
            }
            engine.runRenderLoop(() => {
                initScene.render();
            });

            const resize = () => {
                initScene.getEngine().resize();
            };

            if (window) window.addEventListener('resize', resize);

            return () => {
                initScene.getEngine().dispose();

                if (window) window.removeEventListener('resize', resize);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reactCanvas]);

    useEffect(() => {
        if (scene !== undefined && data !== undefined && scene.isReady() && userPanel !== undefined) {
            data.updateScene(planetsData);
            userPanel.timer.updateTimer(data.visualisationData);
        }
    }, [startDate, endDate]);

    return <canvas ref={reactCanvas} {...rest} />;
};

export default SceneComponent;
