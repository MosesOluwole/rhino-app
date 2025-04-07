"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteRepository = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@mikro-orm/core");
const note_entity_1 = require("../../domain/note.entity");
const nestjs_1 = require("@mikro-orm/nestjs");
const postgresql_1 = require("@mikro-orm/postgresql");
let NoteRepository = class NoteRepository {
    repo;
    em;
    constructor(repo, em) {
        this.repo = repo;
        this.em = em;
    }
    async findAll() {
        return this.repo.findAll();
    }
    async findById(id) {
        return this.repo.findOne({ id });
    }
    async create(note) {
        await this.em.persistAndFlush(note);
        return note;
    }
    async delete(id) {
        await this.repo.nativeDelete({ id });
    }
};
exports.NoteRepository = NoteRepository;
exports.NoteRepository = NoteRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectRepository)(note_entity_1.Note)),
    __metadata("design:paramtypes", [core_1.EntityRepository,
        postgresql_1.EntityManager])
], NoteRepository);
//# sourceMappingURL=note.repository.js.map