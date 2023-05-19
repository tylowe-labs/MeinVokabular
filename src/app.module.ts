import { Module } from '@nestjs/common';
import { WordModule } from './words/words.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/nest'),
    WordModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
