"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const note_entity_1 = require("../../domain/note.entity");
const postgresql_1 = require("@mikro-orm/postgresql");
const config = {
    entities: [note_entity_1.Note],
    dbName: process.env.POSTGRES_DB || 'notesdb',
    driver: postgresql_1.PostgreSqlDriver,
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'root',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    migrations: {
        path: './src/migrations',
        fileName: (timestamp) => `migration-${timestamp}.ts`,
    },
    debug: process.env.NODE_ENV !== 'production',
};
exports.default = config;
//# sourceMappingURL=orm.config.js.map