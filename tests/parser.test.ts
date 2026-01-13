/**
 * Тесты парсера лог-строк.
 * Проверяют корректность извлечения данных
 * и устойчивость к некорректному вводу.
 */

import test from "node:test";
import {parseLogLine} from "../src/parser.js";
import assert from "node:assert";

test("parses valid log line", () => {
    const result = parseLogLine(
        "2024-01-01T00:00:00:00Z ERROR user=42 action=pay",
    );

    assert.equal(result?.level, "ERROR");
    assert.equal(result?.user, "42");
});

test("returns null for broken line", () => {
    assert.equal(parseLogLine(""), null);
})