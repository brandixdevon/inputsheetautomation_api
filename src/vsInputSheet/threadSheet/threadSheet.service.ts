import { Injectable, HttpStatus, HttpException, Logger } from '@nestjs/common';
let Excel = require('exceljs');

@Injectable()
export class ThreadService {
  private readonly logger = new Logger('Thread Sheet Service');

  async getRMColor(isPink: boolean) {
    let workbook = new Excel.Workbook();

    const fileName =
      isPink === true ? 'Thread shade Master New' : 'RM Color DB-1.';
    const sheetName =
      isPink === true ? 'Genesis Color Master - Updates' : 'Fall 14';
    try {
      this.logger.log(`Getting RM Color`);
      const sharedDirectory =
        isPink === true
          ? '\\\\BARFILESRV01\\tmp$\\IsharaI\\Projects\\VS PINK\\' +
            fileName +
            '.xlsx'
          : '\\\\BARFILESRV01\\Brandix Essentials Rathmalana\\VS\\VS LOGO Input\\' +
            fileName +
            '.xlsx';
      //const sharedDirectory = "C:\\Users\\ChamalD\\Desktop\\" + fileName + ".xlsx";
      const wb = await workbook.xlsx.readFile(sharedDirectory);
      const ws = await wb.getWorksheet(sheetName);
      if (!ws || ws == undefined)
        throw new Error(
          'No Data in file (' +
            fileName +
            ') or Wrong Sheet Name(' +
            sheetName +
            ')',
        );
      let dataRows = [];
      ws.eachRow(row => {
        dataRows.push(row.values);
      });
      this.logger.log(`getting rm color successfull`);
      return dataRows;
    } catch (e) {
      this.logger.error(`getting rm color fail ` + e.message);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
