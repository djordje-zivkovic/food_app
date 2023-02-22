import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthService } from './auth/auth.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Create the initial admin user
  const authService = app.get<AuthService>(AuthService);
  await authService.createInitialAdmin();

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
