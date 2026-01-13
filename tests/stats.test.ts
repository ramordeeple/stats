/**
 * Тесты агрегатора статистики.
 * Проверяют бизнес-логику подсчёта ошибок и пользователей.
 */

import test from "node:test";
import {LogStats} from "../src/stats.js";
import {LogLevel} from "../src/log-level.js";
import assert from "node:assert";

test("counts errors per user", () => {
    const stats = new LogStats();

    stats.add({ level: LogLevel.ERROR, user: "1" });
    stats.add({ level: LogLevel.ERROR, user: "1" });
    stats.add({ level: LogLevel.ERROR, user: "2" });

    const top = stats.topUsers();

    assert.deepEqual(top[0], ["1", 2]);
    assert.deepEqual(top[1], ["2", 1]);

})