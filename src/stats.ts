/**
 * Агрегатор статистики.
 *
 * Инкапсулирует бизнес-логику подсчёта:
 * - общего количества строк
 * - количества ERROR-логов
 * - распределения ошибок по пользователям
 *
 * Не зависит от способа чтения файла.
 */

import {LogEntry} from "./log-entry.js";
import {LogLevel} from "./log-level.js";

export class LogStats {
    totalLines = 0;
    errorCount = 0;
    errorsByUser = new Map<string, number>();

    add(entry: LogEntry | null): void {
        this.totalLines++;

        if (entry?.level !== LogLevel.ERROR) return

        this.errorCount++;

        if (!entry?.user) return;


        this.errorsByUser.set(
            entry.user,
            (this.errorsByUser.get(entry.user) ?? 0) + 1,
        );
    }

    topUsers(limit = 3): Array<[string, number]> {
        return [...this.errorsByUser.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit);
    }
}