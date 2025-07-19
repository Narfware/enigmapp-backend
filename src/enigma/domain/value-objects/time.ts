export class Time {
    private constructor(private readonly date: Date) {}

    public equals(time: Time): boolean {
        return this.toPrimitives() === time.toPrimitives()
    }

    public static now(): Time {
        return new Time(new Date())
    }

    public toPrimitives(): number {
        return this.date.getTime()
    }

    public static fromPrimitives(timestamp: number): Time {
        return new Time(new Date(timestamp))
    }
}
