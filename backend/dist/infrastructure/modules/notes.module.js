"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_1 = require("@mikro-orm/nestjs");
const note_entity_1 = require("../../domain/note.entity");
const note_service_1 = require("../../application/services/note.service");
const note_repository_1 = require("../repository/note.repository");
const notes_controller_1 = require("../../presentation/controllers/notes.controller");
const redis_service_1 = require("../redis/redis.service");
let NotesModule = class NotesModule {
};
exports.NotesModule = NotesModule;
exports.NotesModule = NotesModule = __decorate([
    (0, common_1.Module)({
        imports: [nestjs_1.MikroOrmModule.forFeature({ entities: [note_entity_1.Note] })],
        controllers: [notes_controller_1.NotesController],
        providers: [note_service_1.NoteService, note_repository_1.NoteRepository, redis_service_1.RedisService],
    })
], NotesModule);
//# sourceMappingURL=notes.module.js.map