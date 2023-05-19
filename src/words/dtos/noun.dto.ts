import { IsIn, IsNotEmpty } from "class-validator"
import { WordGender } from "../schemas/word.schema";


export class NounDto {
    @IsIn(Object.keys(WordGender))
    gender: WordGender

    @IsNotEmpty()
    plural: string;
}
