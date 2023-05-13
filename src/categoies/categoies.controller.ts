import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create_category.dto';
import { ICategory } from './interfaces/category.interface';
import { CategoiesService } from './categoies.service';
import { UpdateCategoryDto } from './dtos/update_category.dto';

@Controller('api/v1/categoies')
export class CategoiesController {
  constructor(private readonly categoriesService: CategoiesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ICategory> {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Get()
  async getAllCategories(): Promise<ICategory[]> {
    return this.categoriesService.getAllCategories();
  }

  @Get('/:category')
  async getCategor(@Param('category') category: string): Promise<ICategory> {
    return this.categoriesService.getCategory(category);
  }

  @Patch('/:category')
  async updateCategory(
    @Param('category') category: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    return this.categoriesService.updateCategory(category, updateCategoryDto);
  }
}
