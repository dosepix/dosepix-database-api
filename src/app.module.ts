import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';

// Modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DosimetersModule } from './dosimeters/dosimeters.module';

// Entities
import { User } from './users/user.entity';
import { Dosimeter } from './dosimeters/dosimeter.entity';

// https://docs.nestjs.com/techniques/database
@Module({
  imports: [
    // Uses ormconfig.json
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'test',
      password: 'test',
      database: 'test',
      entities: [User, Dosimeter],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    DosimetersModule],
  controllers: [AppController],
  providers: [],
})

export class AppModule {
  constructor(private connection: Connection) {}
}
