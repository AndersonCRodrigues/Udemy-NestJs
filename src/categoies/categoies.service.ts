import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICategory } from './interfaces/category.interface';
import { CreateCategoryDto } from './dtos/create_category.dto';

@Injectable()
export class CategoiesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<ICategory>,
  ) {}

  private async findCategory(category: string) {
    return this.categoryModel.findOne({ category });
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<ICategory> {
    const { category: param } = createCategoryDto;
    if (await this.findCategory(param)) {
      throw new BadRequestException('Category already registered');
    }
    const category = new this.categoryModel(createCategoryDto);
    return category.save();
  }

  async getAllCategories(): Promise<ICategory[]> {
    return this.categoryModel.find();
  }

  async getCategoryById(_id: string): Promise<ICategory> {
    const category = await this.categoryModel.findById(_id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }
}
