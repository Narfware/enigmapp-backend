/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

export class Container {
    private readonly instances = new Map<Function, any>()

    register<T>(useCaseClass: new (...args: any[]) => T, instance: T): void {
        this.instances.set(useCaseClass, instance)
    }

    get<T>(useCaseClass: new (...args: any[]) => T): T {
        const instance = this.instances.get(useCaseClass)
        if (!instance) throw new Error(`Instance'${useCaseClass.name}' not found`)

        return instance
    }
}
