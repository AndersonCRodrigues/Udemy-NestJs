import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { AllExceptionsFilter } from './common/filters/http.exception.filter';
import * as momentTimezone from 'moment-timezone';

config();

const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());

  Date.prototype.toJSON = (): any => {
    return momentTimezone(this)
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss:SSS');
  };

  await app.listen(PORT || 8080);
}
bootstrap();
