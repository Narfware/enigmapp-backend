import { Time } from '../value-objects/time'

export interface TimeProvider {
    now(): Time
}
