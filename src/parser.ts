/**
 * Парсер одной строки лог-файла.
 *
 * Отвечает только за извлечение данных из строки.
 * Работает tolerant-режиме: не бросает исключения и не валит процесс
 * при некорректном или частично битом вводе.
 */

import {RawLogEntry} from "./raw-log-entry.js";


export function parseLogLine(line: string): RawLogEntry | null {
    const parts = line.trim().split(/\s+/);

    if (parts.length < 2)
        return null;

    const level = parts[1];
    let user: string | undefined

    for (const part of parts.slice(2)) {
        const [key, value] = part.split("=", 2);
        if (key === "user" && value) {
            user = value;
        }
    }

    return {level, user};
}