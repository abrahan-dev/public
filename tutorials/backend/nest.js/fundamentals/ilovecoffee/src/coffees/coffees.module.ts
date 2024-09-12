import { Injectable, Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { ConfigModule } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';

// class MockCoffeesService {}

// class ConfigService {}
// class DevelopmentConfigService {}
// class ProductionConfigService {}

@Injectable()
export class CoffeeBrandsFactory {
  async create(): Promise<string[]> {
    // do something
    return ['buddy brew', 'Nescafe'];
  }
}

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    ConfigModule.forFeature(coffeesConfig),
  ],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    // {
    //   provide: ConfigService,
    //   useClass:
    //     process.env.NODE_ENV === 'development'
    //       ? DevelopmentConfigService
    //       : ProductionConfigService,
    // },
    CoffeeBrandsFactory,
    // {
    //   provide: COFFEE_BRANDS,
    //   useFactory: (brandsFactory: CoffeeBrandsFactory) =>
    //     brandsFactory.create(),
    //   inject: [CoffeeBrandsFactory],
    // },
    {
      provide: COFFEE_BRANDS,
      useFactory: async (brandsFactory: CoffeeBrandsFactory) => {
        const brands = await brandsFactory.create();
        return brands;
      },
      inject: [CoffeeBrandsFactory],
    },
  ],
  // providers: [
  //   {
  //     provide: CoffeesService,
  //     useValue: new MockCoffeesService(),
  //   },
  // ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
