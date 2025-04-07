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
exports.NoteService = void 0;
const common_1 = require("@nestjs/common");
const note_entity_1 = require("../../domain/note.entity");
const note_repository_1 = require("../../infrastructure/repository/note.repository");
const redis_service_1 = require("../../infrastructure/redis/redis.service");
const cache_manager_1 = require("@nestjs/cache-manager");
let NoteService = class NoteService {
    noteRepository;
    redisService;
    cacheManager;
    cacheKey = 'notes_cache';
    constructor(noteRepository, redisService, cacheManager) {
        this.noteRepository = noteRepository;
        this.redisService = redisService;
        this.cacheManager = cacheManager;
    }
    async getNotes() {
        const cachedNotes = await this.cacheManager.get(this.cacheKey);
        if (cachedNotes && cachedNotes.length > 0) {
            return cachedNotes;
        }
        const notes = await this.noteRepository.findAll();
        await this.cacheManager.set(this.cacheKey, notes, 60);
        return notes;
    }
    async getNoteById(id) {
        const cachedNote = await this.cacheManager.get(`${this.cacheKey}_${id}`);
        if (cachedNote) {
            return cachedNote;
        }
        const note = await this.noteRepository.findById(id);
        if (note) {
            await this.cacheManager.set(`${this.cacheKey}_${id}`, note, 60);
        }
        return note;
    }
    async createNote(title, content) {
        const note = new note_entity_1.Note(title, content);
        const savedNote = await this.noteRepository.create(note);
        await this.cacheManager.del(this.cacheKey);
        return savedNote;
    }
    async deleteNote(id) {
        await this.noteRepository.delete(id);
        await this.cacheManager.del(this.cacheKey);
    }
};
exports.NoteService = NoteService;
exports.NoteService = NoteService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [note_repository_1.NoteRepository,
        redis_service_1.RedisService, Object])
], NoteService);
//# sourceMappingURL=note.service.js.map