import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { SupplierModule } from './supplier/supplier.module';
import { ProductModule } from './products/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    StateModule,
    CityModule,
    CategoryModule,
    SupplierModule,
    ProductModule,
    UserModule,
    AuthModule,
    JwtModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
