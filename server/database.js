import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import Database from "better-sqlite3";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const databasePath = path.join(__dirname, "database.db");

const sqliteDatabase = new Database(databasePath);
sqliteDatabase.pragma("journal_mode = WAL");
sqliteDatabase.pragma("foreign_keys = ON");
console.log(`Database path: ${databasePath}`);

// migration tracking table
sqliteDatabase.exec(`
    CREATE TABLE IF NOT EXISTS _migrations (
        filename TEXT PRIMARY KEY
    );
`);

const migrationsDir = path.join(__dirname, "migrations");
const files = fs
  .readdirSync(migrationsDir)
  .filter((f) => f.endsWith(".sql"))
  .sort();
const applied = new Set(
  sqliteDatabase
    .prepare("SELECT filename FROM _migrations")
    .all()
    .map((r) => r.filename)
);

for (const file of files) {
  if (applied.has(file)) {
    continue;
  }

  const sql = fs.readFileSync(path.join(migrationsDir, file), "utf-8");
  sqliteDatabase.exec(sql);

  sqliteDatabase.prepare("INSERT INTO _migrations (filename) VALUES (?)").run(file);
  console.log(`Applied migration: ${file}`);
}

export default sqliteDatabase;
