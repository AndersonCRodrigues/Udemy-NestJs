import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { ICategory } from './interfaces/categories/category.interface';

const ackErrors = ['E1100'];

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @EventPattern('create-category')
  async createCategory(
    @Payload() category: ICategory,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      this.logger.log(`category: ${JSON.stringify(category)}`);
      await this.appService.createCategory(category);
      await channel.ack(originalMsg);
    } catch (e) {
      this.logger.log(`error: ${JSON.stringify(e.message)}`);
      ackErrors.forEach(async (ackError) => {
        if (e.message.includes(ackError)) {
          await channel.ack(originalMsg);
        }
      });
    }
  }

  @MessagePattern('get-categories')
  async getCategories(@Payload() id: string): Promise<ICategory | ICategory[]> {
    if (id) {
      return this.appService.getCategoryById(id);
    }
    return this.appService.getAllCategories();
  }
}
