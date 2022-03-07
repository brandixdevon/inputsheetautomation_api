import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Worksheet } from 'exceljs';
let Excel = require('exceljs');

@Injectable()
export class YYSheetService {
  private readonly logger = new Logger(YYSheetService.name);

  async getYYDataset(isPink: boolean, style: string, bom: string) {
    let workbook = new Excel.Workbook();

    const fileName = isPink === true ? 'DB-PINK' : 'DB-LOGO';
    const sheetName = isPink === true ? 'DB-PINK' : 'DB-LOGO';

    try {
      this.logger.log(`Getting YY Data`);
      const sharedDirectory =
        isPink === true
          ? '\\\\BARFILESRV01\\tmp$\\IsharaI\\Projects\\VS PINK\\' +
            fileName +
            '.xlsx'
          : '\\\\BARFILESRV01\\tmp$\\IsharaI\\Projects\\VS PINK\\' +
            fileName +
            '.xlsx';

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
      let dataArray = changeRowsToDict(ws, isPink);
      let dataRows = [];
      dataArray.map(row => {
        const styleParts =
          row['STYLE'] !== undefined && !isPink
            ? row['STYLE'].includes('(')
              ? row['STYLE'].split('(')
              : ''
            : '';

        const styleNumber = isPink
          ? row['STYLE']
          : styleParts[1]
          ? styleParts[1].split(')')
          : '';

        if (
          (isPink && styleNumber === style) ||
          (!isPink && styleNumber[0].trim() === style)
        ) {
          dataRows.push(row);
        }
      });
      this.logger.log(`Getting YY Data Successfull`);
      return dataRows;
    } catch (e) {
      this.logger.error(`Getting YY Data Fail` + e.message);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}

export const changeRowsToDict = (ws: Worksheet, isPink: boolean) => {
  let dataArray = [];
  let keys: any = [];
  ws.eachRow(function(row, rowNumber) {
    if ((isPink && rowNumber == 3) || (!isPink && rowNumber == 2)) {
      keys = row.values;
    } else {
      let rowDict = cellValueToDict(keys, row.values);
      dataArray.push(rowDict);
    }
  });
  return dataArray;
};

function cellValueToDict(keys, rowValue) {
  let rowDict = {};
  keys.forEach((value, index) => {
    //trim only the string headers (avoided  rich text type headers)
    const trimmedValue = typeof value === 'string' ? value.trim() : value;
    rowDict[trimmedValue] = rowValue[index];
  });
  return rowDict;
}
