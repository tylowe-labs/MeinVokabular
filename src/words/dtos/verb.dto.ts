import { IsNotEmpty } from "class-validator";


export class VerbDto {
    @IsNotEmpty()
    thirdPersonPresent: string;

    @IsNotEmpty()
    pastParticiple: string;

    @IsNotEmpty()
    auxillary: string;
}
