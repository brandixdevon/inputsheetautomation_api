import { InputSheetModule } from './inputSheet/inputSheet.module';
import { BuyerdivisionModule } from './buyerDivision/buyerDivision.module';
import { LeadfactoryModule } from './leadfactory/leadfactory.module';
import { PlannerModule } from './planner/planner.module';
import { Module } from '@nestjs/common';
import { MerchandiserModule } from './merchandiser/merchandiser.module';
import { GarmentCompositionModule } from './garmentComposition/garmentComposition.module';
import { ThreadModule } from './threadSheet/threadSheet.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { M3buyerdivisionModule } from './m3buyerdivision/m3buyerdivision.module';


@Module({
  imports: [
    MerchandiserModule,
    PlannerModule,
    LeadfactoryModule,
    BuyerdivisionModule,
    GarmentCompositionModule,
    ThreadModule,
    InputSheetModule,
    WarehouseModule,
    M3buyerdivisionModule
  ],
  controllers: [],
  providers: [],
})
export class VSInputSheetModule {}
