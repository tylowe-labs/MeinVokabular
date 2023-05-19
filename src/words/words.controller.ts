import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { WordService } from './words.service';
import { CreateWordDto, UpdateWordDto } from './dtos';


@Controller('words')
export class WordController {
    constructor(private readonly wordService: WordService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async index(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ) {
        return await this.wordService.query({limit: Number(limit), page: Number(page)});
    }

    @Get(':word')
    @HttpCode(HttpStatus.OK)
    async find(@Param('word') word: string) {
        const res = await this.wordService.find(word);
        if (!res) throw new NotFoundException(`'${word}' was not found.`);
        return res;
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createWordDto: CreateWordDto) {
        try {
            return await this.wordService.create(createWordDto);
        } catch(error) {
            console.log(error) 
        }
    }

    @Put(':word')
    @HttpCode(HttpStatus.OK)
    async update(@Param('word') word: string, @Body() updateWordDto: UpdateWordDto) {
        const updated = await this.wordService.update(word, updateWordDto);
        if (!updated) throw new NotFoundException(`'${word}' was not found.`);
        return updated;
    }

    @Delete(':word')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('word') word: string) {
        const deleted = await this.wordService.delete(word);
        if (!deleted) throw new NotFoundException(`'${word}' was not found.`);
    }
}
