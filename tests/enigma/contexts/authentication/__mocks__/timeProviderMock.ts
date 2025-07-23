import { Mock, vi } from 'vitest'
import { TimeProvider } from '../../../../../src/enigma/contexts/authentication/domain/interfaces/timeProvider'
import { Time } from '../../../../../src/enigma/contexts/authentication/domain/value-objects/time'

export class TimeProviderMock implements TimeProvider {
    private nowMock: Mock
    private time?: Time

    constructor() {
        this.nowMock = vi.fn()
    }

    now(): Time {
        this.nowMock()

        if (!this.time) return Time.now()

        return this.time
    }

    returnOnNow(time: Time): void {
        this.time = time
    }
}
