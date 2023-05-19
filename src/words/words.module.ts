import { Module } from '@nestjs/common';
import { WordService } from './words.service';
import { WordController } from './words.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Word, WordSchema } from './schemas/word.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Word.name, schema: WordSchema }])
  ],
  providers: [WordService],
  controllers: [WordController]
})
export class WordModule {}
