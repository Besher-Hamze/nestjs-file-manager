import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { memoryStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
      storage: memoryStorage(),
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}