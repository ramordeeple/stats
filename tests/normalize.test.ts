/**
 * Тесты слоя нормализации.
 * Проверяют корректное приведение строковых значений
 * к доменным enum.
 */

import assert from "node:assert";

import {LogLevel} from "../src/log-level.js";
import {normalize} from "../src/normalize.js";
import test from "node:test";

test("normalizes log level to enum", () => {
    const entry = normalize({ level: "error", user: "1" });

    assert.equal(entry?.level, LogLevel.ERROR);
});

test("unknown level becomes undefined", () => {
    const entry = normalize({ level: "TRACE" });

    assert.equal(entry?.level, undefined);
})