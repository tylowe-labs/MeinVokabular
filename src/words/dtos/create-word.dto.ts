import { IsNotEmpty } from "class-validator";
import { BaseWordDto } from "./base-word.dto";


export class CreateWordDto extends BaseWordDto {
    @IsNotEmpty()
    word: string;
}
