"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250407163334 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250407163334 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table "note" add column "title" varchar(255) not null;`);
    }
    async down() {
        this.addSql(`alter table "note" drop column "title";`);
    }
}
exports.Migration20250407163334 = Migration20250407163334;
//# sourceMappingURL=migration-20250407163334.ts.js.map