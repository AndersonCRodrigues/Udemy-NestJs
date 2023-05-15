import { Controller, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { config } from 'dotenv';

const END_POINT = process.env.RABBIT_URL || 'no_url';

config();

@Controller('api/v1')
export class AppController {
  private logger = new Logger(AppController.name);
  private clienteAdminBackend: ClientProxy;

  constructor() {
    this.clienteAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [END_POINT],
        queue: 'admin-backend',
      },
    });
  }
}
