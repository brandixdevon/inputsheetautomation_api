import { ThreadController } from './threadSheet.controller';

import { Module } from '@nestjs/common';
import { ThreadService } from './threadSheet.service';
@Module({
  controllers: [ThreadController],
  providers: [ThreadService]
})
export class ThreadModule {}
