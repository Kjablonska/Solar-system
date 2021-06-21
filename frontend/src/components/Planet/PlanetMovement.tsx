import { Scene, Vector3, Curve3, Mesh } from "@babylonjs/core";
import {PositionData} from "../../utils/planetInterfaces"

interface OrbitProps {
    position: PositionData;
    scene: Scene;
}

export const PlanetOrbite: React.FC<OrbitProps> = ({position, scene}):any => {

    if (position === undefined || position.x === undefined || position.y === undefined || position.z === undefined) {
        return new Vector3(0, 0, 0);
    }

    const points = []
    for (let i = 0; i < position.x.length; i++) {
        var tmp = new Vector3(position.x[i]/100, position.y[i]/100, position.z[i]/100);
        points.push(tmp)
    }
	
    // Draw the curve
    var earth = Curve3.CreateCatmullRomSpline(points, 40, true);
    Mesh.CreateLines("earth", earth.getPoints(), scene);
}