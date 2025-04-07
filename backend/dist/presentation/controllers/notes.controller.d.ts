import { NoteService } from '../../application/services/note.service';
import { Note } from '../../domain/note.entity';
import { CreateNoteDto } from '../../dto/create-note.dto';
import { GetNoteDto } from 'src/dto/get-note.dto';
export declare class NotesController {
    private readonly noteService;
    constructor(noteService: NoteService);
    getNotes(): Promise<Note[]>;
    getNoteById(id: string): Promise<Note | null>;
    createNote(createNoteDto: CreateNoteDto): Promise<GetNoteDto>;
    deleteNote(id: string): Promise<void>;
}
