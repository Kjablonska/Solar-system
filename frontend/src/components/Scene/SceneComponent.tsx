import { Engine, Scene } from '@babylonjs/core';
import { useEffect, useRef, useState } from 'react';
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
        visualisationOptions,
        fetchData,
        ...rest
    } = props;
    const [scene, setScene] = useState<Scene>();
    const [data, setData] = useState<SceneData>();
    const [userPanel, setUserPanel] = useState<UserPanel>();

    useEffect(() => {
        if (reactCanvas.current) {
            const engine = new Engine(reactCanvas.current, antialias, engineOptions, adaptToDeviceRatio);
            const initScene = new Scene(engine, sceneOptions);
            setScene(initScene);
            if (initScene !== undefined && initScene.isReady()) {
                console.log("SCENE COMPONENT", fetchData, fetchData.refill);
                const initData = new SceneData(planetsData, initScene, fetchData.refill);
                setData(initData);
                const initUI = new UserPanel(initScene, initData.visualisationData, visualisationOptions, fetchData);
                setUserPanel(initUI);
                initUI.timer.start();
            }

            // TODO: do I need this?
            // else if (scene !== undefined && !scene.isReady()) {
            //     initScene.onReadyObservable.addOnce((scene) => new SceneData(planetsData, scene, fetchData.refill));
            // }
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
            userPanel.timer.updateTimer(data.visualisationData, fetchData);
            userPanel.clock.updateClock(visualisationOptions, fetchData.speed)
        }
    }, [visualisationOptions]);

    return <canvas ref={reactCanvas} {...rest} />;
};

export default SceneComponent;
