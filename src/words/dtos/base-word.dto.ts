import { IsArray, IsIn, IsNotEmpty, IsObject } from "class-validator";
import { WordCategory, WordDifficulty, WordType } from "../schemas/word.schema";
import { IsValidWordData } from "./validators/word-data.validator";


export class BaseWordDto {
    @IsIn(Object.keys(WordType))
    wordType: WordType;

    @IsNotEmpty()
    pronunciation: string;

    @IsArray()
    definitions: string[];

    @IsArray()
    examples: string[];

    @IsNotEmpty()
    audio: string;

    @IsObject()
    @IsValidWordData('wordType', {
        message: 'Ensure the wordData object structure matches the wordType expected',
    })
    wordData: object;

    @IsArray()
    categories: WordCategory[];

    @IsIn(Object.keys(WordDifficulty))
    difficulty: WordDifficulty;
}
