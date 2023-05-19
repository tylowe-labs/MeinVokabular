import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginatedWord, Word, PaginationOptions } from './schemas/word.schema';
import { Model } from 'mongoose';
import { CreateWordDto, UpdateWordDto } from './dtos';

@Injectable()
export class WordService {
    constructor(
        @InjectModel(Word.name) private wordModel: Model<Word>){}

    async query(paginationOptions: PaginationOptions): Promise<PaginatedWord> {
        const page = paginationOptions.page;
        const limit = paginationOptions.limit;
        const skip = (page - 1) * limit;

        const records = await this.wordModel.find().skip(skip).limit(limit).exec();
        const total = await this.wordModel.estimatedDocumentCount();

        return {
            records,
            page,
            limit,
            total,
        }
    }

    async find(word: string): Promise<Word> {
        return this.wordModel.findById(word).exec();
    }

    async create(createWordDto: CreateWordDto): Promise<Word> {
        return this.wordModel.create({
            ...createWordDto,
            _id: createWordDto.word
        });
    }

    async update(word: string, updateWordDto: UpdateWordDto): Promise<Word> {
        return await this.wordModel.findByIdAndUpdate(word, {
            ...updateWordDto,
            updatedAt: Date.now(),
        }).exec();
    }

    async delete(word: string): Promise<Word> {
        return this.wordModel.findByIdAndDelete(word).exec();
    }
}
