import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  content: string;
}
