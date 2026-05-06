import path from "path";
import { fileURLToPath } from "url";

import Database from "better-sqlite3";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const databasePath = path.join(__dirname, ".", "database.db");

const sqliteDatabase = new Database(databasePath);
sqliteDatabase.pragma("journal_mode = WAL");
sqliteDatabase.pragma("foreign_keys = ON");
console.log(`Database path: ${databasePath}`);

// rooms
sqliteDatabase.exec(`
    CREATE TABLE IF NOT EXISTS rooms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
    );
`);

export default sqliteDatabase;