import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AssetsService } from './assets.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './upload',
    }),
  )
  create(@UploadedFile() file: Express.Multer.File) {
    return this.assetsService.create(file);
  }

  @Get()
  findAll() {
    return this.assetsService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assetsService.remove(+id);
  }
}
