import IStats from "../../models/IStats";

export default class SelectStats extends IStats {

    private readonly select: HTMLSelectElement;
    private readonly initialValue: number;

    constructor(select: HTMLSelectElement, initialValue: number) {
        super();
        this.select = select;
        this.initialValue = initialValue;
        this.reset();
    }

    public reset(): void {
        this.setStatsValue(this.initialValue);
    }

    protected getStatsValue(): number {
        return parseInt(this.select.value);
    }

    protected setStatsValue(value: number): void {
        this.select.value = value.toString();
    }


    

}