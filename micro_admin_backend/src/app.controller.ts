import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { ICategory } from './interfaces/categories/category.interface';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @EventPattern('create-category')
  async createCategory(@Payload() category: ICategory) {
    // this.logger.log(`category: ${JSON.stringify(category)}`);
    return await this.appService.createCategory(category);
  }

  @MessagePattern('get-categories')
  async getCategories(@Payload() id: string): Promise<ICategory | ICategory[]> {
    if (id) {
      return this.appService.getCategoryById(id);
    }
    return this.appService.getAllCategories();
  }
}
