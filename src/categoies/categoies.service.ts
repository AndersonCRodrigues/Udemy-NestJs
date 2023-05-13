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
    @InjectModel('Category') private readonly categoryModel: Model<ICategory>,
    private readonly playerService: PlayersService,
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
    const categoryFound = await this.categoryModel
      .findOne({ category })
      .populate('players');
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

  private async checkPlayer(category: string, _id: string) {
    const check = await this.categoryModel
      .find({ category })
      .where('players')
      .in([_id]);
    if (check.length)
      throw new BadRequestException('Player already included in this category');
  }

  async addCategoryPlayer(params: string[]): Promise<void> {
    const category = params['category'];
    const idPlayer = params['idPlayer'];
    await this.playerService.getById(idPlayer);
    await this.checkPlayer(category, idPlayer);
    const categoryFound = await this.getCategory(category);
    categoryFound.players.push(idPlayer);
    await this.categoryModel.findOneAndUpdate({ category }, categoryFound);
  }
}
