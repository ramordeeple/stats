/**
 * Точка входа CLI-приложения.
 *
 * Отвечает за:
 * - разбор аргументов командной строки
 * - запуск обработки файла
 * - вывод итоговой статистики в stdout
 */

import {processFile} from "./cli.js";

const filePath = process.argv[2];

if (!filePath) {
    console.error('Usage: node dist/index.js <logfile>');
    process.exit(1);
}

const stats = await processFile(filePath);

console.log(`Total lines: ${stats.totalLines}`);
console.log(`ERROR count: ${stats.errorCount}`);
console.log(`Top users with errors:`);

for (const [user, count] of stats.topUsers()) {
    console.log(`user=${user}: ${count}`);
}