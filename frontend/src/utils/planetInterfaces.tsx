export interface PlanetData {
    planet: string,
    position: PositionData
}

export interface PositionData {
    x: number[],
    y: number[],
    z: number[]
}