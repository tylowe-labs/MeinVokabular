import { IsArray, IsIn, IsNotEmpty, IsObject, ValidationArguments } from "class-validator";
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

    @IsValidWordData('wordType', {
        message: (args: ValidationArguments) => {
            const wordType = args.object['wordType'];
            return `Ensure that wordData object field is present and matches the data expected for ${wordType} wordType.`
        }
    })
    wordData: object;

    @IsArray()
    categories: WordCategory[];

    @IsIn(Object.keys(WordDifficulty))
    difficulty: WordDifficulty;
}
