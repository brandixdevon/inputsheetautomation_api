import { InputSheetService } from './inputSheet.service';
import TolerenceMatrixRepository from '../repositories/tolerenceMatrix';

import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Res,
  HttpCode,
  Delete,
  Param,
} from '@nestjs/common';

@Controller('')
export class InputSheetController {
  constructor(
    private inputSheetService: InputSheetService,
    private tolerenceRepository: TolerenceMatrixRepository,
  ) {}
  @Post('getVSStylesFromEpixo')
  @HttpCode(200)
  async getVSStylesFromEpixo(@Body() data, @Res() res) {
    res.connection.setTimeout(0);
    const toReturn = await this.inputSheetService.getVSStylesFromEpixo(
      data.year,
      data.type,
    );
    res.send(toReturn);
  }

  @Post('getBOMVersionFromEpixo')
  @HttpCode(200)
  async getBOMVersionFromEpixo(@Body() data, @Res() res) {
    res.connection.setTimeout(0);
    const toReturn = await this.inputSheetService.getBOMVersionFromEpixo(
      data.styleId,
    );
    res.send(toReturn);
  }

  @Post('getBOMAndColorData')
  @HttpCode(200)
  async getBOMAndColorData(@Body() data, @Res() res) {
    res.connection.setTimeout(0);
    const toReturn = await this.inputSheetService.getBOMAndColorData(
      data.StyleID,
      data.BOMID,
    );
    res.send(toReturn);
  }

  @Post('getBOM')
  @HttpCode(200)
  async getBOM(@Body() data, @Res() res) {
    res.connection.setTimeout(0);
    const toReturn = await this.inputSheetService.getBOM(
      data.StyleID,
      data.BOMID,
    );
    res.send(toReturn);
  }

  @Post('getSMV')
  @HttpCode(200)
  async getSMV(@Body() data, @Res() res) {
    res.connection.setTimeout(0);
    const toReturn = await this.inputSheetService.getSMV(
      data.StyleID,
      data.BOMID,
    );
    res.send(toReturn);
  }

  @Post('getFOB')
  @HttpCode(200)
  async getFOB(@Body() data, @Res() res) {
    res.connection.setTimeout(0);
    const toReturn = await this.inputSheetService.getFOB(
      data.StyleID,
      data.BOMID,
    );
    res.send(toReturn);
  }

  @Post('getColors')
  @HttpCode(200)
  async getColors(@Body() data, @Res() res) {
    res.connection.setTimeout(0);
    const toReturn = await this.inputSheetService.getColors(
      data.StyleID,
      data.BOMID,
    );
    res.send(toReturn);
  }

  @Post('getItemCode')
  @HttpCode(200)
  async getItemCode(@Body() data, @Res() res) {
    res.connection.setTimeout(0);
    res.send(
      await this.inputSheetService.getItemCode(data.itemgroup, data.inputbom),
    );
  }

  @Get('findAllTolerence')
  async findAllTolerence() {
    return await this.tolerenceRepository.findAll();
  }

  @Delete('deleteTolerence/:id')
  async deleteTolerence(@Param() id) {
    return await this.tolerenceRepository.deleteTolerence(id.id);
  }

  @Post('addTolerence')
  async addTolerence(@Body() data) {
    return await this.tolerenceRepository.addTolerence(data);
  }
}
