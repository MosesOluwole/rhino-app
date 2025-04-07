"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetNoteDto = void 0;
class GetNoteDto {
    id;
    title;
    content;
    createdAt;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.GetNoteDto = GetNoteDto;
//# sourceMappingURL=get-note.dto.js.map