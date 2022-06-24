import { Injectable, HttpStatus, HttpException, Logger } from '@nestjs/common';
import StylesInYearModel from './models/StylesinYear.models';
import BOMVersionModel from './models/BomVersion.models';
import ColorCodesModel from './models/colorCodes.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
let sql = require('mssql');
const fs = require('fs');
const config = {
  user: 'BFF_EAG_User',
  password: 'bffeaguser',
  server: 'bci-ctsql-01\\belctsql', // You can use 'localhost\\instance' to connect to named instance
  database: 'PLM_ISG',
  connectionTimeout: 150000000,
  requestTimeout: 150000000,
  options: {
    enableArithAbort: false,
    encrypt: false,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

@Injectable()
export class InputSheetService {
  //  constructor(@InjectRepository() inputsheetRepository:Repository<>){}
  private readonly logger = new Logger('Input Sheet Service');

  async getVSStylesFromEpixo(year, type): Promise<StylesInYearModel[]> {
    const VSCustomerCodes = ['pink', 'vs'];
    try {
      this.logger.log(
        `getting style list from epixo-started year ${year} , type ${type}`,
      );
      let pool = await sql.connect(config);
      let output = await pool
        .request()
        .input('Year', sql.Int, year)
        .input('Type', sql.VarChar(100), type)
        .execute('spGetStylesByYear');
      this.logger.log(
        `getting style list from epixo-successfull ${year} , type ${type}`,
      );

      let stylesToReturn: StylesInYearModel[] = [];
      output.recordsets[0].forEach(record => {
        if (
          record.Custromer != null &&
          VSCustomerCodes.findIndex(
            l => l === record.Custromer.trim().toLowerCase(),
          ) > -1
        ) {
          const style = new StylesInYearModel(
            record.ID,
            record.PLMID,
            record.CustromerCode,
            record.Custromer,
            record.Season,
            record.Year,
            record.Style,
            record.Type,
          );
          stylesToReturn.push(style);
        }
      });
      return stylesToReturn;
    } catch (e) {
      this.logger.error(
        `getting style list from epixo-failed  ${year} , type ${type} ,error ` +
          e,
      );
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAritziaStylesFromEpixo(year, type): Promise<StylesInYearModel[]> {
    const VSCustomerCodes = ['aritzia'];
    try {
      this.logger.log(
        `getting style list from epixo-started year ${year} , type ${type}`,
      );
      let pool = await sql.connect(config);
      let output = await pool
        .request()
        .input('Year', sql.Int, year)
        .input('Type', sql.VarChar(100), type)
        .execute('spGetStylesByYear');
      this.logger.log(
        `getting style list from epixo-successfull ${year} , type ${type}`,
      );

      let stylesToReturn: StylesInYearModel[] = [];
      output.recordsets[0].forEach(record => {
        if (
          record.Custromer != null &&
          VSCustomerCodes.findIndex(
            l => l === record.Custromer.trim().toLowerCase(),
          ) > -1
        ) {
          const style = new StylesInYearModel(
            record.ID,
            record.PLMID,
            record.CustromerCode,
            record.Custromer,
            record.Season,
            record.Year,
            record.Style,
            record.Type,
          );
          stylesToReturn.push(style);
        }
      });
      return stylesToReturn;
    } catch (e) {
      this.logger.error(
        `getting style list from epixo-failed  ${year} , type ${type} ,error ` +
          e.message,
      );
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getPvhStylesFromEpixo(year, type): Promise<StylesInYearModel[]> {
    const VSCustomerCodes = ['pvh - ck','pvh - tommy hilfiger'];
    try {
      this.logger.log(
        `getting style list from epixo-started year ${year} , type ${type}`,
      );
      let pool = await sql.connect(config);
      let output = await pool
        .request()
        .input('Year', sql.Int, year)
        .input('Type', sql.VarChar(100), type)
        .execute('spGetStylesByYear');
      this.logger.log(
        `getting style list from epixo-successfull ${year} , type ${type}`,
      );

      let stylesToReturn: StylesInYearModel[] = [];
      output.recordsets[0].forEach(record => {
        if (
          record.Custromer != null &&
          VSCustomerCodes.findIndex(
            l => l === record.Custromer.trim().toLowerCase(),
          ) > -1
        ) {
          const style = new StylesInYearModel(
            record.ID,
            record.PLMID,
            record.CustromerCode,
            record.Custromer,
            record.Season,
            record.Year,
            record.Style,
            record.Type,
          );
          stylesToReturn.push(style);
        }
      });
      return stylesToReturn;
    } catch (e) {
      this.logger.error(
        `getting style list from epixo-failed  ${year} , type ${type} ,error ` +
          e.message,
      );
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getBOMVersionFromEpixo(styleId): Promise<BOMVersionModel[]> {
    try {
      this.logger.log(`getting BOM version from epixo-started stye ${styleId}`);
      let pool = await sql.connect(config);
      let output = await pool
        .request()
        .input('StyleID', sql.Int, styleId)
        .execute('spGetBOMVersions');
      this.logger.log(
        `getting BOM version from epixo-successfull stye ${styleId}`,
      );

      let bomversionsToReturn: BOMVersionModel[] = [];
      output.recordsets[0].forEach(record => {
        const bomversion = new BOMVersionModel(
          record.ID,
          record.StyleID,
          record['BOM Version'],
          record.BOM,
          record.Schedule_Executed_Date,
          record.CreatedDate,
          record.CreatedBy,
          record.IsActive,
          record.Type,
        );
        bomversionsToReturn.push(bomversion);
      });
      return bomversionsToReturn;
    } catch (e) {
      this.logger.error(
        `getting BOM version from epixo-failed stye ${styleId},error ` +
          e.message,
      );
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getColors(StyleID, BOMID): Promise<ColorCodesModel[]> {
    let strGarmentlist = '';
    try {
      this.logger.log(
        `getting Color ways from epixo-started stye ${StyleID} , BOMID ${BOMID}`,
      );
      let pool = await sql.connect(config);

      let garmentlist = await pool
        .request()
        .input('StyleID', sql.Int, StyleID)
        .input('BOMID', sql.Int, BOMID)
        .query(
          `select A.ID,Name,Description from Assortments A inner join BOM_Versions_VS_Assortments BVA on BVA.AssortmentID=A.ID Inner join BOM_Versions BV ON BVA.BOMVersionID=BV.ID Where A.IsActive=1 and BV.IsActive=1 and BV.id=@BOMID and A.StyleID=@StyleID union select ID,Name,Description from Garments  where StyleID=@StyleID and isActive=1`,
        );
      this.logger.log(
        `getting Color ways from epixo-successful stye ${StyleID} , BOMID ${BOMID}`,
      );

      garmentlist.recordsets[0].forEach(garment => {
        strGarmentlist = strGarmentlist + garment['ID'] + ',';
      });
      strGarmentlist = strGarmentlist.substring(0, strGarmentlist.length - 1);
    } catch (e) {
      this.logger.error(
        `getting Color ways from epixo-failed style ${StyleID} , BOMID ${BOMID},error ` +
          e.message,
      );
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }

    try {
      this.logger.log(
        `getting Color codes from epixo-started style ${StyleID} , BOMID ${BOMID} `,
      );
      let pool = await sql.connect(config);

      let output = await pool
        .request()
        .input('StyleID', sql.Int, StyleID)
        .input('BOMID', sql.Int, BOMID)
        .input('Colorways', sql.VarChar, strGarmentlist)
        .query(
          `SELECT *
            FROM(
            SELECT 
            CC.[Type],A.[Name] AS Customer,'' AS Supplier,'' AS SupplierCode,CC.ColorName,CC.ColorCode,CC.M3OptionCode
            FROM ColorSpecifications  CC
            INNER JOIN 
            Accounts A ON A.ID=CC.AccountID
            INNER JOIN Styles S ON A.ID=S.AccountID  AND S.ID=@StyleID AND S.IsActive=1
            WHERE CC.ColorName IN (SELECT BC.__StyleColor FROM
            BOM B
            INNER JOIN BOM_Versions BV ON BV.ID=B.BOMVersionID  AND BV.IsActive=1 AND BV.ID=@BOMID  AND B.IsActive=1
            INNER JOIN BOM_Colors BC ON BC.BOMLineID=B.ID AND BC.IsActive=1
            INNER JOIN Styles S ON S.ID=BV.StyleID AND S.ID=@StyleID AND S.IsActive=1
            ) AND CC.IsACtive=1
            GROUP BY CC.[Type],A.[Name],CC.ColorName,CC.ColorCode,CC.M3OptionCode
            
            UNION
            
            SELECT CC.[Type],'' AS Customer,S.Name AS Supplier,S.SupplierNumber AS SupplierCode,CC.ColorName,CC.ColorCode,CC.M3OptionCode
            FROM BOM B
            INNER JOIN BOM_Versions BV ON BV.ID=B.BOMVersionID  AND BV.IsActive=1 AND BV.ID=@BOMID  AND B.IsActive=1
            INNER JOIN BOM_Colors BC ON BC.BOMLineID=B.ID AND BC.IsActive=1
            INNER JOIN Suppliers S ON S.bxSupplierUniqueId=B.[Supplier Unique Id]
            INNER JOIN ColorSpecifications CC ON CC.ColorName=BC.__StyleColor AND CC.SupplierID=S.ID
            GROUP BY CC.[Type],S.Name,S.SupplierNumber,CC.ColorName,CC.ColorCode,CC.M3OptionCode
            
            UNION
            
            SELECT  CC.[Type],A.Name AS Customer,'' AS Supplier,'' AS SupplierCode,CC.ColorName,CC.ColorCode,CC.M3OptionCode
            FROM Styles AST
            INNER JOIN BOM_Versions ABV ON ABV.StyleID=AST.ID AND ABV.IsActive=1 AND AST.IsActive=1 AND AST.ID=@StyleID AND ABV.ID=@BOMID AND AST.Type='Assortment'
            INNER JOIN AssortmentBOM AB ON AB.AssortmentStyleID=AST.ID AND ABV.ID=AB.BOMVersionID AND AB.IsActive=1
            INNER JOIN Assortment_BOM_Colors ABC ON ABC.BOMLineID=AB.ID AND ABC.IsActive=1
            INNER JOIN Assortments ASS ON ASS.ID=ABC.AssortmentID AND ASS.IsActive=1
            INNER JOIN BOM_Versions_VS_Assortments BVA ON ASS.ID=BVA.AssortmentID AND BVA.BOMVersionID=ABV.ID AND ABC.BOMVersionVSAssortmentID=BVA.ID AND BVA.IsActive=1
            
            INNER JOIN Styles GST ON GST.ID=AB.GarmentStyleID AND GST.IsActive=1
            CROSS APPLY dbo.fnSplitString(@Colorways,',') FSS
            INNER JOIN Garments G ON G.StyleID=GST.ID AND G.ID=AB.GarmentID AND G.IsActive=1 
            INNER JOIN Assortments_VS_Garments GVA ON GVA.AssortmentID=ASS.ID AND GVA.GarmentID=G.ID AND GVA.ID=ABC.AssortmentsVSGarmentsID AND GVA.IsActive=1
            INNER JOIN BOM_Versions GBV ON GBV.StyleID=GST.ID  AND GBV.IsActive=1 AND GBV.ID=dbo.fnGetMAXBOMVersion(GST.ID)
            INNER JOIN BOM B ON GST.ID=B.StyleID AND GBV.ID=B.BOMVersionID AND B.IsActive=1 
            INNER JOIN BOM_Colors BC ON BC.BOMLineID=B.ID AND BC.IsActive=1
            INNER JOIN Accounts A ON A.ID=GST.AccountID
            INNER JOIN ColorSpecifications CC ON CC.ColorName=BC.__StyleColor AND CC.AccountID=A.ID
            GROUP BY CC.[Type],A.Name,CC.ColorName,CC.ColorCode,CC.M3OptionCode
            UNION
            SELECT  CC.[Type],'' AS Customer,S.Name AS Supplier,S.SupplierNumber AS SupplierCode,CC.ColorName,CC.ColorCode,CC.M3OptionCode
            FROM Styles AST
            INNER JOIN BOM_Versions ABV ON ABV.StyleID=AST.ID AND ABV.IsActive=1 AND AST.IsActive=1 AND AST.ID=@StyleID AND ABV.ID=@BOMID AND AST.Type='Assortment'
            INNER JOIN AssortmentBOM AB ON AB.AssortmentStyleID=AST.ID AND ABV.ID=AB.BOMVersionID AND AB.IsActive=1
            INNER JOIN Assortment_BOM_Colors ABC ON ABC.BOMLineID=AB.ID AND ABC.IsActive=1
            INNER JOIN Assortments ASS ON ASS.ID=ABC.AssortmentID AND ASS.IsActive=1
            INNER JOIN BOM_Versions_VS_Assortments BVA ON ASS.ID=BVA.AssortmentID AND BVA.BOMVersionID=ABV.ID AND ABC.BOMVersionVSAssortmentID=BVA.ID AND BVA.IsActive=1
            
            INNER JOIN Styles GST ON GST.ID=AB.GarmentStyleID AND GST.IsActive=1
            CROSS APPLY dbo.fnSplitString(@Colorways,',') FSS
            INNER JOIN Garments G ON G.StyleID=GST.ID AND G.ID=AB.GarmentID AND G.IsActive=1 
            INNER JOIN Assortments_VS_Garments GVA ON GVA.AssortmentID=ASS.ID AND GVA.GarmentID=G.ID AND GVA.ID=ABC.AssortmentsVSGarmentsID AND GVA.IsActive=1
            INNER JOIN BOM_Versions GBV ON GBV.StyleID=GST.ID  AND GBV.IsActive=1 AND GBV.ID=dbo.fnGetMAXBOMVersion(GST.ID)
            INNER JOIN BOM B ON GST.ID=B.StyleID AND GBV.ID=B.BOMVersionID AND B.IsActive=1 
            INNER JOIN BOM_Colors BC ON BC.BOMLineID=B.ID AND BC.IsActive=1
            INNER JOIN Suppliers S ON S.bxSupplierUniqueId=B.[Supplier Unique Id]
            INNER JOIN ColorSpecifications CC ON CC.ColorName=BC.__StyleColor AND CC.SupplierID=S.ID
            GROUP BY CC.[Type],S.Name,S.SupplierNumber,CC.ColorName,CC.ColorCode,CC.M3OptionCode
            )A`,
        );

      this.logger.log(
        `getting Color codes from epixo-successfull style ${StyleID} , BOMID ${BOMID}`,
      );

      const customerColorlist = output.recordsets[0]
        .filter(r => r.Type.trim().toLowerCase() == 'customer')
        .map(l => {
          return new ColorCodesModel(
            l.Customer,
            l.Supplier,
            l.SupplierCode,
            l.ColorName,
            l.ColorCode,
            l.M3OptionCode,
          );
        });
      return customerColorlist;
    } catch (e) {
      this.logger.error(
        `getting Color ways from epixo-failed stye ${StyleID} , BOMID ${BOMID},error ` +
          e.message,
      );
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getBOMAndColorData(styleId, bomId) {
    try {
      this.logger.log(
        `getting BOM from epixo-started stye ${styleId} , bomid ${bomId}`,
      );
      let pool = await sql.connect(config);

      let output = await pool
        .request()
        .input('StyleID', sql.Int, styleId)
        .input('BOMID', sql.Int, bomId)
        //.execute('spGetInputBOMForCOSheetGenerationNew');
        .execute('spGetInputBOMM3IS+ForCOSheetGeneration');

      this.logger.log(
        `getting BOM from epixo-successfull stye ${styleId} , bomid ${bomId}`,
      );
      const colorData = await this.getColors(styleId, bomId);
      return { bom: output.recordsets[0], colorData };
    } catch (e) {
      this.logger.error(
        `getting BOM from epixo-failed stye ${styleId} , bomid ${bomId} ` +
          e.message,
      );
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getBOM(styleId, bomId) {
    try {
      this.logger.log(
        `getting BOM from epixo-started stye ${styleId} , bomid ${bomId}`,
      );
      let pool = await sql.connect(config);

      let output = await pool
        .request()
        .input('StyleID', sql.Int, styleId)
        .input('BOMID', sql.Int, bomId)
        //.execute('spGetInputBOMForCOSheetGenerationNew');
        .execute('spGetInputBOMM3IS+ForCOSheetGeneration');

      this.logger.log(
        `getting BOM from epixo-successfull stye ${styleId} , bomid ${bomId}`,
      );
      return output.recordsets[0];
    } catch (e) {
      this.logger.error(
        `getting BOM from epixo-failed stye ${styleId} , bomid ${bomId} ` +
          e.message,
      );
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getSMV(StyleID , BOMID)
  {
    
    try {
      this.logger.log(
        `getting SMV from epixo-started stye ${StyleID} , BOMID ${BOMID}`,
      );
      let pool = await sql.connect(config);

      let garmentlist = await pool
        .request()
        .input('StyleID', sql.Int, StyleID)
        .input('BOMID', sql.Int, BOMID)
        .query(
          `select A.ID,Name,Description from Assortments A inner join BOM_Versions_VS_Assortments BVA on BVA.AssortmentID=A.ID Inner join BOM_Versions BV ON BVA.BOMVersionID=BV.ID Where A.IsActive=1 and BV.IsActive=1 and BV.id=@BOMID and A.StyleID=@StyleID union select ID,Name,Description from Garments  where StyleID=@StyleID and isActive=1`,
        );
      
      let strGarmentlist = '';
 
      garmentlist.recordsets[0].forEach(garment => {

        strGarmentlist = strGarmentlist + garment['ID'] + ',';
  
      });
  
      strGarmentlist = strGarmentlist.substring(0, strGarmentlist.length - 1);

      let output = await pool
        .request()
        .input('StyleID', sql.Int, StyleID)
        .input('Colorways', sql.VarChar(1000) , strGarmentlist)
        .execute('spGetInputSMV');

        this.logger.log(
          `getting smv from epixo-successful style ${StyleID} , BOMID ${BOMID}`,
        );
  
      return output;

    } catch (e) {
      this.logger.error(
        `getting smv from epixo-failed style ${StyleID} , BOMID ${BOMID},error ` +
          e.message,
      );
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getFOB(StyleID, BOMID)
  {
    console.log(StyleID);
    try {
      this.logger.log(
        `getting FOB from epixo-started stye ${StyleID} , BOMID ${BOMID}`,
      );
      let pool = await sql.connect(config);

      let garmentlist = await pool
        .request()
        .input('StyleID', sql.Int, StyleID)
        .input('BOMID', sql.Int, BOMID)
        .query(
          `select A.ID,Name,Description from Assortments A inner join BOM_Versions_VS_Assortments BVA on BVA.AssortmentID=A.ID Inner join BOM_Versions BV ON BVA.BOMVersionID=BV.ID Where A.IsActive=1 and BV.IsActive=1 and BV.id=@BOMID and A.StyleID=@StyleID union select ID,Name,Description from Garments  where StyleID=@StyleID and isActive=1`,
        );

      
      let strGarmentlist = '';

      garmentlist.forEach(garment => {

        strGarmentlist = strGarmentlist + garment['ID'] + ',';
  
      });
  
      strGarmentlist = strGarmentlist.substring(0, strGarmentlist.length - 1);

      let output = await pool
        .request()
        .input('StyleID', sql.Int, StyleID)
        .input('BOMID', sql.Int, BOMID)
        .input('Colorways', sql.String , strGarmentlist)
        .execute('spGetCostSheetDetails');

        this.logger.log(
          `getting FOB from epixo-successful style ${StyleID} , BOMID ${BOMID}`,
        );
  
      return output;

    } catch (e) {
      this.logger.error(
        `getting FOB from epixo-failed style ${StyleID} , BOMID ${BOMID},error ` +
          e.message,
      );
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

    async getItemCode(itemgroup, inputbom) {
    let pool = await sql.connect(config);

    let output = await pool
      .request()
      .input('ITEM_GROUP', sql.VarChar, itemgroup)
      .execute('[M3_DB_MACRO].[dbo].[DB2_MCR_BEL_ITEM_DETAILS]');

    output = output.recordsets[0].map(f => {
      return {
        'Item No': f['Item No'],
        'Item Name': f['Item Name'],
        'Item Description': f['Description'],
        'Item Group': f['Item Group'],
        'Color Description': f['Color Description'],
        'Procurement Group': f['Procurement Group'],
        'Product Group': f['Product Group'],
        'Config Code': f['Config Code'],
        'RM Brand Category': f['RM Brand Category'],
        Wastage: f['Wastage'],
        'Purchase Price': f['Purchase Price'],
        'Supplier Item No': f['Supplier Item No'],
        'Supplier No': f['Supplier No'],
        Freight: f['Freight'],
        'Freight Qty': f['Freight Qty'],
      };
    });

    let finaloutput = [];
    inputbom.forEach((f: any) => {
      let itemcode = output.find(
        (item: any) =>
          //item description
          (item['Item Description']
            ? item['Item Description'].toString().trim()
            : '') ===
            (f['Item Description']
              ? f['Item Description'].toString().trim()
              : '') &&
          //Item name
          (item['RM Color'] ? item['RM Color'].toString().trim() : '') ===
            (f['Color Description']
              ? f['Color Description'].toString().trim()
              : '') &&
          //Color description
          (item['Item Name'] ? item['Item Name'].toString().trim() : '') ===
            (f['Item Name'] ? f['Item Name'].toString().trim() : '') &&
          // Procurement Group
          (item['Procurement Group']
            ? item['Procurement Group'].toString().trim()
            : '') ===
            (f['RM Product Group']
              ? f['RM Product Group']
                  .toString()
                  .trim()
                  .slice(
                    0,
                    f['RM Product Group']
                      .toString()
                      .trim()
                      .indexOf('-'),
                  )
                  .trim()
              : '') &&
          //RM Brand Category
          (item['RM Brand Category'] ? item['RM Brand Category'] : '') ===
            (f[' Brand Category']
              ? f[' Brand Category']
                  .toString()
                  .trim()
                  .slice(
                    0,
                    f[' Brand Category']
                      .toString()
                      .trim()
                      .indexOf('-'),
                  )
                  .trim()
              : '') &&
          //Purchase Price
          (item['Purchase Price']
            ? item['Purchase Price'].toString().trim()
            : '') ===
            (f['Purchase price']
              ? f['Purchase price'].toString().trim()
              : '') &&
          //Supplier Item No
          (item['Supplier Item No']
            ? item['Supplier Item No'].toString().trim()
            : '') ===
            (f['Supplier Item_No']
              ? f['Supplier Item_No'].toString().trim()
              : '') &&
          //Supplier No
          (item['Supplier No'] ? item['Supplier No'].trim() : '') ===
            (f['Supplier']
              ? f['Supplier']
                  .toString()
                  .trim()
                  .slice(
                    0,
                    f['Supplier']
                      .toString()
                      .trim()
                      .indexOf('-'),
                  )
                  .trim()
              : '') &&
          //Freight
          (item['Freight']
            ? parseFloat(item['Freight'].toString().trim()) /
              parseFloat(item['Freight Qty'])
            : 0) === parseFloat(f[' Freight'].toString().trim()) &&
          // Config Code
          item['Config Code'].toString() !== '2' &&
          //Style
          item['Item No'].toString().slice(0, 8) ===
            itemgroup.toString().trim(),
      );

      let item_code = itemcode ? itemcode['Item No'].toString().trim() : '';

      if (item_code !== '') {
        let spaceindex = item_code.indexOf(' ');
        if (spaceindex === -1) {
          item_code = item_code.slice(0, 12);
        } else {
          item_code = item_code.slice(0, spaceindex);
        }
      }

      finaloutput.push({
        ...f,
        'Item Code': item_code,
      });
    });

    return finaloutput;
  }
}
