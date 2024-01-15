export default abstract class IStats {
    protected abstract getStatsValue(): number
    protected abstract setStatsValue(value: number): void
    public abstract reset(): void

    public increment(): void {
        this.setStatsValue(this.getStatsValue() + 1)
    }

    public decrement(): void {
        this.setStatsValue(this.getStatsValue() - 1)
    }


    public set(value: number): void {
        this.setStatsValue(value);
    }

    public get value(): number {
        return this.getStatsValue()
    }

}