/**
 * CLI-логика обработки файла.
 *
 * Отвечает за:
 * - стриминговое чтение лог-файла
 * - последовательную обработку строк
 * - передачу данных в парсер, нормализатор и агрегатор
 *
 * Без знания деталей бизнес-логики.
 */

import {LogStats} from "./stats.js";
import * as readline from "node:readline";
import * as fs from "node:fs";
import {normalize} from "./normalize.js";
import {parseLogLine} from "./parser.js";

export async function processFile(path: string): Promise<LogStats> {
    const stats = new LogStats();

    const stream = fs.createReadStream(path);
    const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity,
    });

    for await (const line of rl) {
        stats.add(normalize(parseLogLine(line)))
    }

    return stats;
}