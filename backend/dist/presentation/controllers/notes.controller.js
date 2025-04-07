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
exports.NotesController = void 0;
const common_1 = require("@nestjs/common");
const note_service_1 = require("../../application/services/note.service");
const create_note_dto_1 = require("../../dto/create-note.dto");
const get_note_dto_1 = require("../../dto/get-note.dto");
let NotesController = class NotesController {
    noteService;
    constructor(noteService) {
        this.noteService = noteService;
    }
    async getNotes() {
        const notes = await this.noteService.getNotes();
        return notes.map((note) => new get_note_dto_1.GetNoteDto({
            id: note.id,
            title: note.title,
            content: note.content,
            createdAt: note.createdAt,
        }));
    }
    async getNoteById(id) {
        return this.noteService.getNoteById(Number(id));
    }
    async createNote(createNoteDto) {
        const note = await this.noteService.createNote(createNoteDto.title, createNoteDto.content);
        return new get_note_dto_1.GetNoteDto({
            id: note.id,
            title: note.title,
            content: note.content,
            createdAt: note.createdAt,
        });
    }
    async deleteNote(id) {
        return this.noteService.deleteNote(Number(id));
    }
};
exports.NotesController = NotesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "getNotes", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "getNoteById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_note_dto_1.CreateNoteDto]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "createNote", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "deleteNote", null);
exports.NotesController = NotesController = __decorate([
    (0, common_1.Controller)('notes'),
    __metadata("design:paramtypes", [note_service_1.NoteService])
], NotesController);
//# sourceMappingURL=notes.controller.js.map