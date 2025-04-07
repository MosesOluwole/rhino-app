import { EntityRepository } from '@mikro-orm/core';
import { Note } from '../../domain/note.entity';
import { EntityManager } from '@mikro-orm/postgresql';
export declare class NoteRepository {
    private readonly repo;
    private readonly em;
    constructor(repo: EntityRepository<Note>, em: EntityManager);
    findAll(): Promise<Note[]>;
    findById(id: number): Promise<Note | null>;
    create(note: Note): Promise<Note>;
    delete(id: number): Promise<void>;
}
