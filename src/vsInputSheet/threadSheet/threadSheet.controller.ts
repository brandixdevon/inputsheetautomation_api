import { ThreadService } from './threadSheet.service';

import { Body, Controller, Post, Query } from '@nestjs/common';

@Controller('')
export class ThreadController {
  constructor(private logoThreadService: ThreadService) {}
  @Post('rmColor')
  getRMColor(@Body() data: { isPink: boolean }) {
    return this.logoThreadService.getRMColor(data.isPink);
  }
  // @Post()
  // @UsePipes(new ValidationPipe())
  // @HttpCode(200)
  // createComponent(@Body() data:MerchandiserDto){
  //     return this.merchandiserService.createMerchandiser(data);
  // }
}
