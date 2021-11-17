import { Engine, Scene } from '@babylonjs/core';
import { useEffect, useRef } from 'react';
import { UserPanel } from '../SolarSystem/UserPanel';
import Info from './InfoPanel';
import { SceneData } from './SatellitesData';

const PlanetSystemComponent = (props: any) => {
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

    useEffect(() => {
        if (reactCanvas.current) {
            const engine = new Engine(reactCanvas.current, antialias, engineOptions, adaptToDeviceRatio);
            const initScene = new Scene(engine, sceneOptions);
            // setScene(initScene);
            if (initScene !== undefined && initScene.isReady()) {
                console.log("INIT", visualisationOptions.objects)
                const initData = new SceneData(planetsData, initScene, fetchData.refill, visualisationOptions.objects.planets[0]);
                const initUI = new UserPanel(initScene, initData.visualisationData, visualisationOptions, fetchData);
                initUI.timer.start();
                new Info(visualisationOptions.objects.planets[0])

                initUI.timer.updateTimer(initData.visualisationData, fetchData);
                initUI!.clock.updateClock(visualisationOptions, fetchData.speed)
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

    return <canvas ref={reactCanvas} {...rest} />;
};

export default PlanetSystemComponent;
