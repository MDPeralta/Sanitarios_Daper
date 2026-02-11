import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './catalog/categories/categories.module';
import { BrandsModule } from './catalog/brands/brands.module';
import { ProductsModule } from './catalog/products/products.module';
import { UploadsModule } from './uploads/uploads.module';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigService} from '@nestjs/config';
@Module({
  imports: [AuthModule, UsersModule, 
    CategoriesModule, BrandsModule, 
    ProductsModule, UploadsModule,

    ConfigModule.forRoot({isGlobal: true}),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    })],
    
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
