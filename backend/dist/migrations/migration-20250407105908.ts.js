"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250407105908 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250407105908 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table "note" ("id" serial primary key, "content" varchar(255) not null, "created_at" timestamptz not null);`);
    }
    async down() {
        this.addSql(`drop table if exists "note" cascade;`);
    }
}
exports.Migration20250407105908 = Migration20250407105908;
//# sourceMappingURL=migration-20250407105908.ts.js.map