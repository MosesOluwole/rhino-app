import { Note } from '../../domain/note.entity';
import { NoteRepository } from '../../infrastructure/repository/note.repository';
import { RedisService } from '../../infrastructure/redis/redis.service';
import { Cache } from 'cache-manager';
export declare class NoteService {
    private readonly noteRepository;
    private readonly redisService;
    private cacheManager;
    private readonly cacheKey;
    constructor(noteRepository: NoteRepository, redisService: RedisService, cacheManager: Cache);
    getNotes(): Promise<Note[]>;
    getNoteById(id: number): Promise<Note | null>;
    createNote(content: string): Promise<Note>;
    deleteNote(id: number): Promise<void>;
}
