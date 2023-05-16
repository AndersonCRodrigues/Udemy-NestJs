import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ICategory } from './interfaces/categories/category.interface';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @EventPattern('create-category')
  async createCategory(@Payload() category: ICategory) {
    // this.logger.log(`category: ${JSON.stringify(category)}`);
    await this.appService.createCategory(category);
  }
}
