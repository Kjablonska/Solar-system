import { Engine, Scene } from '@babylonjs/core';
import { useEffect, useRef } from 'react';
import Info from '../GUI/InfoPanel';
import { UserPanel } from '../GUI/UserPanel';
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
            if (initScene !== undefined && initScene.isReady()) {
                const planetName: string = visualisationOptions.objects.planets[0];
                const info = new Info(planetName);
                const minutes = visualisationOptions.time === undefined ? 0 : visualisationOptions.time.minutes;

                const initData = new SceneData(planetsData, initScene, fetchData.refill, planetName, minutes);
                const initUI = new UserPanel(
                    initScene,
                    initData.visualisationData,
                    visualisationOptions,
                    fetchData,
                    planetName,
                    info,
                    initData.planetMesh,
                    visualisationOptions.time,
                );
                initUI.timer.start();
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
