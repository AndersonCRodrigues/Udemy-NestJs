import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICategory } from './interfaces/category.interface';
import { CreateCategoryDto } from './dtos/create_category.dto';
import { UpdateCategoryDto } from './dtos/update_category.dto';
import { PlayersService } from 'src/players/players.service';

@Injectable()
export class CategoiesService {
  constructor(
    private readonly playerService: PlayersService,
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
    return this.categoryModel.find().populate('players');
  }

  async getCategory(category: string): Promise<ICategory> {
    const categoryFound = await this.categoryModel.findOne({ category });
    if (!categoryFound) {
      throw new NotFoundException(`Category ${category} not found`);
    }
    return categoryFound;
  }

  async updateCategory(
    category: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    await this.findCategory(category);
    await this.categoryModel.findOneAndUpdate({ category }, updateCategoryDto);
  }

  async addCategoryPlayer(params: string[]): Promise<void> {
    const category = params['category'];
    const idPlayer = params['idPlayer'];

    const categoryFound = await this.getCategory(category);
    await this.playerService.getById(idPlayer);
    categoryFound.players.push(idPlayer);
    await this.categoryModel.findOneAndUpdate({ category }, categoryFound);
  }
}
