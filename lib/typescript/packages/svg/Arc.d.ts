export type ArcParams = Pick<Arc, "coordX" | "coordY" | "startAngle" | "endAngle" | "radius">;
export declare class Arc {
    coordX: number;
    coordY: number;
    radius: number;
    startAngle: number;
    endAngle: number;
    constructor(props: ArcParams);
    getDrawPath(): string;
}
