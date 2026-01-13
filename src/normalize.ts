/**
 * Слой нормализации.
 *
 * Преобразует raw-данные, полученные из парсера,
 * в доменную модель со строгой типизацией.
 *
 * Здесь происходит:
 * - приведение уровней логов к enum
 * - отбрасывание неизвестных значений
 */

import {RawLogEntry} from "./raw-log-entry.js";
import {LogEntry} from "./log-entry.js";
import {LogLevel} from "./log-level.js";

export function normalize(raw: RawLogEntry | null): LogEntry | null {
    if (!raw) return null;

    return {
        level: normalizeLevel(raw.level),
        user: raw.user,
    }
}

function normalizeLevel(level?: string): LogLevel | undefined {
    switch (level?.toUpperCase()) {
        case LogLevel.INFO:
            return LogLevel.INFO;
        case LogLevel.ERROR:
            return LogLevel.ERROR;
        case LogLevel.DEBUG:
            return LogLevel.DEBUG;
        default:
            return undefined;
    }
}