import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes } from "mongoose";

export enum WordType {
    NOUN = "NOUN",
    VERB = "VERB",
    ADJ = "ADJ",
}

export enum WordCategory {
    BEGINNER = "Beginner",
}

export enum WordDifficulty {
    BEGINNER = "Beginner",
    INTERMEDIATE = "Intermediate",
    ADVANCED = "Advanced",
}

export enum WordGender {
    M = "M",
    F = "F",
    N = "N",
}

export type WordDocument = HydratedDocument<Word>;

@Schema()
export class Word {
    @Prop({ required: true })
    _id: string;

    @Prop({ required: true })
    wordType: WordType;

    @Prop({ required: true })
    pronunciation: string;

    @Prop({ required: true })
    definitions: string[];

    @Prop({ required: true })
    examples: string[];

    @Prop({ required: true })
    audio: string;

    @Prop({ required: true, type: SchemaTypes.Mixed })
    wordData: object;

    @Prop({ required: true })
    categories: WordCategory[]

    @Prop({ required: true })
    difficulty: WordDifficulty

    @Prop({ required: true, default: Date.now() })
    createdAt: Date;

    @Prop({ required: true, default: Date.now()})
    updatedAt: Date;
}

export const WordSchema = SchemaFactory.createForClass(Word);

export interface PaginatedWord {
    records: Word[];
    page: number;
    limit: number;
    total: number;
}

export interface QueryParams {
    difficulty?: WordDifficulty;
    category?: WordCategory;
    wordType?: WordType;
    page?: number;
    limit?: number;
}
