export class Cell {
    private cellName :string;
    private row :string;

    constructor() {}

    public getCellName() :string {
        return this.cellName;
    }

    public setCellName(day :string) {
        this.cellName = day;
    }

    public getRow() :string {
        return this.row;
    }

    public setRow(row :string) {
        this.row = row;
    }
}