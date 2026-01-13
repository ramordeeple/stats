/**
 * Доменная модель лог-записи.
 * Используется в бизнес-логике после нормализации.
 * Содержит строго типизированные значения (enum).
 */

import {LogLevel} from "./log-level.js";

export interface LogEntry {
    level?: LogLevel;
    user?: string;
}