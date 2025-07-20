export class Time {
    private constructor(private readonly date: Date) {}

    public equals(time: Time): boolean {
        return this.toPrimitives() === time.toPrimitives()
    }

    public static now(): Time {
        return new Time(new Date())
    }

    public addMinutes(minutes: number) {
        const dateWithMinutesAdded = this.date.setMinutes(this.date.getMinutes() + minutes)
        return Time.fromPrimitives(dateWithMinutesAdded)
    }

    public subtractMinutes(minutes: number) {
        const dateWithMinutesSubtracted = this.date.setMinutes(this.date.getMinutes() - minutes)
        return Time.fromPrimitives(dateWithMinutesSubtracted)
    }

    public toPrimitives(): number {
        return this.date.getTime()
    }

    public static fromPrimitives(timestamp: number): Time {
        return new Time(new Date(timestamp))
    }
}
