export declare class Matrix {
    matrix: number[][];
    constructor(matrix: number[][]);
    mmul(matrix: Matrix): Matrix;
    asArray(): number[][];
    get(rowIndex: number, columnIndex: number): number;
}
