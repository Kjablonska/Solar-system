import { Vector3 } from '@babylonjs/core';
import { PositionData } from '../types/planetInterfaces';

// TODO: move to const / delete ?
// const diameterMap = new Map<string, number>([
//     ['Mercury', 453904.0452],
//     ['Venus', 848228.2847],
//     ['Earth', 1172781.436],
//     ['Mars', 1786610.223],
//     ['Jupiter', 6103794.293],
//     ['Saturn', 11237848.86],
//     ['Uranus', 22518814.68],
//     ['Neptune', 35239103.17],

//     ['Ceres', 2591799.937],
//     ['Bennu', 3093132.643],
//     ['Vesta', 2767717.153],
//     ['Pallas', 3248588.899],
//     ['Psyche', 3870335.528],
//     ['Ida', 3356451.866],
//     ['Eros', 2814361.869],
//     ['Davida', 3518344.309],
// ]);

export default function rescaleData(position: PositionData, planet: string, satellite: boolean): Vector3[] {
    const points: Vector3[] = [];
    // let factor = diameterMap.get(planet);
    // if (factor === undefined) {
    //     factor = 1000;
    //     console.log('undewfi', planet);
    // }
    for (let i = 0; i < position.x.length; i++) {
        points.push(new Vector3(position.x[i] / (12756000 * 2), position.y[i] / (12756000 * 2), position.z[i] / (12756000 * 2)));
    }

    return points;
}


// ['Gaspra', 2591799.937],
// ['Dactyl', 3283944.81],
// ['Mathilde', 1712213.86],
// ['Steins', 2697554.092],
// ['Braille', 2743806.836],
// ['WilsonHarringtonnnu', 5019441.831],
// ['Toutatis', 4843516.776],
// ['Itokawa', 3292568.203],
// ["Kleopatra", 3400752.587],
// ["Lutetia", 2814361.869]