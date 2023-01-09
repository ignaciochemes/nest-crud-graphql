import helmet from 'helmet';
import { AppModule } from './AppModule';
import * as BodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.use(helmet());

    app.use(BodyParser.json())
    app.use(BodyParser.urlencoded({ extended: true }))
    app.setGlobalPrefix('skeleton-api');
    await app.listen(configService.get('PORT') || 3000);

}
bootstrap();
