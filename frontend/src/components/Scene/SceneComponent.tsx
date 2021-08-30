import { Engine, Scene } from '@babylonjs/core';
import { useEffect, useRef, useState } from 'react';
import { Clock } from './Clock';
import { MovePlanets } from './MovePlanets';
import { SceneData } from './SceneData';
import { UserPanel } from './UserPanel';

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
        fetchData,
        ...rest
    } = props;
    const [scene, setScene] = useState<Scene>();
    const [data, setData] = useState<SceneData>();
    const [userPanel, setUserPanel] = useState<UserPanel>();
    const [_blink, initPlanetsMovement] = useState<MovePlanets>();

    useEffect(() => {
        if (reactCanvas.current) {
            const engine = new Engine(reactCanvas.current, antialias, engineOptions, adaptToDeviceRatio);
            const initScene = new Scene(engine, sceneOptions);
            setScene(initScene);
            if (initScene !== undefined && initScene.isReady()) {
                const initData = new SceneData(planetsData, initScene, fetchData.refill);
                setData(initData);
                const initMovement = new MovePlanets(initData.visualisationData, isRealTime, fetchData, startDate, endDate);
                const initClock = new Clock(startDate, isRealTime, fetchData.timerSpeed, endDate);
                const initUI = new UserPanel(initScene, initClock, initMovement, initData.visualisationData, fetchData);
                setUserPanel(initUI);
                initUI.timer.start();
            } else if (scene !== undefined && !scene.isReady()) {
                initScene.onReadyObservable.addOnce((scene) => new SceneData(planetsData, scene, fetchData.refill));
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
            userPanel.clock.updateClock(startDate, isRealTime, endDate)
        }
    }, [startDate, endDate]);

    return <canvas ref={reactCanvas} {...rest} />;
};

export default SceneComponent;
