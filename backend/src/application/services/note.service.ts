import {
  Injectable,
  Inject,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Note } from '../../domain/note.entity';
import { NoteRepository } from '../../infrastructure/repository/note.repository';
import { RedisService } from '../../infrastructure/redis/redis.service';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class NoteService {
  private readonly cacheKey = 'notes_cache';
  constructor(
    private readonly noteRepository: NoteRepository,
    private readonly redisService: RedisService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getNotes(): Promise<Note[]> {
    try {
      const cachedNotes = await this.redisService.get<Note[]>(this.cacheKey);
      if (cachedNotes && cachedNotes.length > 0) {
        return cachedNotes;
      }

      const notes = await this.noteRepository.findAll();
      await this.redisService.set(this.cacheKey, notes, 6000);
      return notes;
    } catch {
      throw new InternalServerErrorException('Failed to retrieve notes.');
    }
  }

  async getNoteById(id: number): Promise<Note> {
    try {
      const note = await this.noteRepository.findById(id);
      if (!note) {
        throw new NotFoundException(
          `Note with ID ${id} not found or already deleted.`,
        );
      }
      return note;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve note.');
    }
  }

  async createNote(title: string, content: string): Promise<Note> {
    try {
      const newNote = new Note(title.trim(), content.trim());
      const savedNote = await this.noteRepository.create(newNote);
      await this.redisService.del(this.cacheKey);
      return savedNote;
    } catch (error) {
      console.error('Error creating note:', error);
      throw new InternalServerErrorException('Failed to create note.');
    }
  }

  async deleteNote(id: number): Promise<void> {
    try {
      const note = await this.noteRepository.findById(id);
      if (!note) {
        throw new NotFoundException(
          `Note with ID ${id} not found or already deleted.`,
        );
      }

      await this.noteRepository.delete(id);

      await this.redisService.del(this.cacheKey);
      await this.redisService.del(`${this.cacheKey}_${id}`);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete note.');
    }
  }
}
