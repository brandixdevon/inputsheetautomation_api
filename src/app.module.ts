import { BuyerdivisionEntity } from './vsInputSheet/buyerDivision/buyerDivision.enitity';
import { PlannerEntity } from './vsInputSheet/planner/planner.enitity';
import { MerchandiserEntity } from './vsInputSheet/merchandiser/merchandiser.enitity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VSInputSheetModule } from './vsInputSheet/vsInputSheetModule';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouterModule } from 'nest-router';
import { routes } from './routes';
import { LeadfactoryEntity } from './vsInputSheet/leadfactory/leadfactory.enitity';
import { GarmentCompositionEntity } from './vsInputSheet/garmentComposition/garmentComposition.enitity';
import { LeadTimeEntity } from './vsInputSheet/matrices/leadTime/leadTime.entity';
import { ShipmentModeEntity } from './vsInputSheet/matrices/shipmentMode/shipmentMode.entity';
import { SourcingMerchEntity } from './vsInputSheet/matrices/sourcingMerchant/sourcingMerch.entity';
import { SupplierEntity } from './vsInputSheet/matrices/supplier/supplier.entity';
import { ShipmentModeModule } from './vsInputSheet/matrices/shipmentMode/shipmentMode.module';
import { SourcingMerchModule } from './vsInputSheet/matrices/sourcingMerchant/sourcingMerch.module';
import { SupplierModule } from './vsInputSheet/matrices/supplier/supplier.module';
import { LeadTimeModule } from './vsInputSheet/matrices/leadTime/leadTime.module';
import { WastageEntity } from './vsInputSheet/matrices/wastage/wastage.entity';
import { WastageModule } from './vsInputSheet/matrices/wastage/wastage.module';
import { YYSheetModule } from './vsInputSheet/yySheet/yySheet.module';
import { ConsumptionEntity } from './vsInputSheet/matrices/consumption/consumption.entity';
import { ConsumptionModule } from './vsInputSheet/matrices/consumption/consumption.module';
import { TolerenceMatrixEntity } from './vsInputSheet/inputSheet/TolerenceMatrix.entity';
import { WarehouseModule } from './vsInputSheet/warehouse/warehouse.module';
import { WarehouseEntity } from './vsInputSheet/warehouse/warehouse.enitity';
import { M3buyerdivisionModule } from './vsInputSheet/m3buyerdivision/m3buyerdivision.module';
import { M3buyerdivisionEntity } from './vsInputSheet/m3buyerdivision/m3buyerdivision.enitity';
import { UsermanageModule } from './vsInputSheet/usermanage/usermanage.module';
import { UsermanageEntity } from './vsInputSheet/usermanage/usermanage.enitity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'postgres',
      host: 'localhost',
      database: 'VSInputSheet',
      password: 'P@ssw0rd',
      // "password": 'Belpostgre@123',
      port: 5400,
      entities: [
        UsermanageEntity,
        M3buyerdivisionEntity,
        WarehouseEntity,
        MerchandiserEntity,
        PlannerEntity,
        LeadfactoryEntity,
        BuyerdivisionEntity,
        GarmentCompositionEntity,
        LeadTimeEntity,
        ShipmentModeEntity,
        SourcingMerchEntity,
        SupplierEntity,
        WastageEntity,
        ConsumptionEntity,
        TolerenceMatrixEntity,      ],
      synchronize: true,
    }),
    UsermanageModule,
    M3buyerdivisionModule,
    WarehouseModule,
    VSInputSheetModule,
    LeadTimeModule,
    ShipmentModeModule,
    SourcingMerchModule,
    SupplierModule,
    WastageModule,
    YYSheetModule,
    ConsumptionModule,
    RouterModule.forRoutes(routes),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
