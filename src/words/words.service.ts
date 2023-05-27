import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginatedWord, Word, QueryParams } from './schemas/word.schema';
import { Model } from 'mongoose';
import { CreateWordDto, UpdateWordDto } from './dtos';

@Injectable()
export class WordService {
  constructor(@InjectModel(Word.name) private wordModel: Model<Word>) {}

  async query(params: QueryParams): Promise<PaginatedWord> {
    const page = params.page;
    const limit = params.limit;
    const skip = (page - 1) * limit;
    const query = this.buildQuery(params);

    const records = await this.wordModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.wordModel.estimatedDocumentCount();

    return {
      records,
      page,
      limit,
      total,
    };
  }

  private buildQuery(params: QueryParams) {
    const query: any = {};
    if (params.difficulty) {
      query.difficulty = { $eq: params.difficulty };
    }
    if (params.category) {
      query.categories = { $in: [params.category] };
    }
    if (params.wordType) {
      query.wordType = { $eq: params.wordType };
    }
    return query;
  }

  async find(word: string): Promise<Word> {
    return this.wordModel.findById(word).exec();
  }

  async create(createWordDto: CreateWordDto): Promise<Word> {
    return this.wordModel.create({
      ...createWordDto,
      _id: createWordDto.word,
    });
  }

  async update(word: string, updateWordDto: UpdateWordDto): Promise<Word> {
    return await this.wordModel
      .findByIdAndUpdate(word, {
        ...updateWordDto,
        updatedAt: Date.now(),
      })
      .exec();
  }

  async delete(word: string): Promise<Word> {
    return this.wordModel.findByIdAndDelete(word).exec();
  }
}
