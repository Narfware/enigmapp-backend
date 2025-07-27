import { TimeProvider } from '../domain/interfaces/timeProvider'
import { Time } from '../domain/value-objects/time'

export class NodeTimeProvider implements TimeProvider {
    now(): Time {
        return Time.now()
    }
}
