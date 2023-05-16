import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICategory } from './interfaces/categories/category.interface';
import { IPlayer } from './interfaces/players/players.interface';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<ICategory>,
    @InjectModel('Player') private readonly playerModel: Model<IPlayer>,
  ) {}

  private async findCategory(category: string) {
    return this.categoryModel.findOne({ category });
  }

  async createCategory(category: ICategory): Promise<ICategory> {
    const { category: param } = category;
    if (await this.findCategory(param)) {
      throw new RpcException('Category already registered');
    }
    try {
      const createdCategory = new this.categoryModel(category);
      return createdCategory.save();
    } catch (e) {
      this.logger.error(`error: ${JSON.stringify(e.message)}`);
      throw new RpcException(e.message);
    }
  }

  async getCategoryById(id: string): Promise<ICategory> {
    try {
      return this.categoryModel.findById(id);
    } catch (e) {
      this.logger.error(`error: ${JSON.stringify(e.message)}`);
      throw new RpcException(e.message);
    }
  }

  async getAllCategories(): Promise<ICategory[]> {
    try {
      return this.categoryModel.find();
    } catch (e) {
      this.logger.error(`error: ${JSON.stringify(e.message)}`);
      throw new RpcException(e.message);
    }
  }
}
