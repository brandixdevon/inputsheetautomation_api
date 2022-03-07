import { InputSheetModule } from './vsInputSheet/inputSheet/inputSheet.module';
import { ThreadModule } from './vsInputSheet/threadSheet/threadSheet.module';
import { BuyerdivisionModule } from './vsInputSheet/buyerDivision/buyerDivision.module';
import { WarehouseModule } from './vsInputSheet/warehouse/warehouse.module';
import { LeadfactoryModule } from './vsInputSheet/leadfactory/leadfactory.module';
import { PlannerModule } from './vsInputSheet/planner/planner.module';
import { MerchandiserModule } from './vsInputSheet/merchandiser/merchandiser.module';
import { VSInputSheetModule } from './vsInputSheet/vsInputSheetModule';
import { Routes } from 'nest-router';
import { GarmentCompositionModule } from './vsInputSheet/garmentComposition/garmentComposition.module';
import { SupplierModule } from './vsInputSheet/matrices/supplier/supplier.module';
import { SourcingMerchModule } from './vsInputSheet/matrices/sourcingMerchant/sourcingMerch.module';
import { LeadTimeModule } from './vsInputSheet/matrices/leadTime/leadTime.module';
import { ShipmentModeModule } from './vsInputSheet/matrices/shipmentMode/shipmentMode.module';
import { WastageModule } from './vsInputSheet/matrices/wastage/wastage.module';
import { YYSheetModule } from './vsInputSheet/yySheet/yySheet.module';
import { ConsumptionModule } from './vsInputSheet/matrices/consumption/consumption.module';
import { M3buyerdivisionModule } from './vsInputSheet/m3buyerdivision/m3buyerdivision.module';
import { PackmethodModule } from './vsInputSheet/packmethod/packmethod.module';
import { UsermanageModule } from './vsInputSheet/usermanage/usermanage.module';

export const routes: Routes = [
  {
    path: 'vsInputSheet',
    module: VSInputSheetModule,
    children: [
      {
        path: '/inputSheet',
        module: InputSheetModule,
      },
      {
        path: '/merchandisers',
        module: MerchandiserModule,
      },
      {
        path: '/planners',
        module: PlannerModule,
      },
      {
        path: '/leadfactory',
        module: LeadfactoryModule,
      },
      {
        path: '/buyerDivision',
        module: BuyerdivisionModule,
      },
      {
        path: '/garmentComposition',
        module: GarmentCompositionModule,
      },
      {
        path: '/threadSheet',
        module: ThreadModule,
      },
      {
        path: '/supplier',
        module: SupplierModule,
      },
      {
        path: '/sourcingMerch',
        module: SourcingMerchModule,
      },
      {
        path: '/leadTime',
        module: LeadTimeModule,
      },
      {
        path: '/shipmentMode',
        module: ShipmentModeModule,
      },
      {
        path: '/wastage',
        module: WastageModule,
      },
      {
        path: '/yySheet',
        module: YYSheetModule,
      },
      {
        path: '/consumption',
        module: ConsumptionModule,
      },
      {
        path: '/warehouse',
        module: WarehouseModule,
      },
      {
        path: '/m3buyerdivision',
        module: M3buyerdivisionModule,
      },
      {
        path: '/packmethod',
        module: PackmethodModule,
      },
      {
        path: '/user',
        module: UsermanageModule,
      },
      // {
      //   path: '/supplier-tolerance',
      //   module: ConsumptionModule,
      // },
    ],
  },
];
