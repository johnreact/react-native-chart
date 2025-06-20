export declare type ArcParams = Pick<Arc, "coordX" | "coordY" | "startAngle" | "endAngle" | "radius">;
export declare class Arc {
    coordX: number;
    coordY: number;
    radius: number;
    startAngle: number;
    endAngle: number;
    constructor(props: ArcParams);
    getDrawPath(): string;
}
//# sourceMappingURL=Arc.d.ts.map