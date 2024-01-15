import IStats from "../../models/IStats";

export default class SpanStats extends IStats {

    private readonly span: HTMLSpanElement;
    private readonly initialValue: number;

    constructor(span: HTMLSpanElement, initialValue: number) {
        super();
        this.span = span;
        this.initialValue = initialValue;
        this.reset();
    }

    public reset(): void {
        this.setStatsValue(this.initialValue);
    }

    protected getStatsValue(): number {
        return parseInt(this.span.innerText);
    }
    protected setStatsValue(value: number): void {
        this.span.innerText = value.toString();
    }


    

}