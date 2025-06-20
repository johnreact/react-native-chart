import { CartesianCoordinate } from "./CartesianCoordinate";
import { Coordinate } from "./Coordinate";
export declare class PolarCoordinate extends Coordinate {
    coordX: number;
    coordY: number;
    radius: number;
    angle: number;
    constructor({ coordX, coordY, radius, angle, }: {
        coordX: number;
        coordY: number;
        radius: number;
        angle: number;
    });
    toCartesian: () => CartesianCoordinate;
}
//# sourceMappingURL=PolarCoordinate.d.ts.map