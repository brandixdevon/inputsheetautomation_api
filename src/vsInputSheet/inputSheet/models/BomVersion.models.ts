
export default class BOMVersionModel {

  constructor(
    private BOMID: number,
    private StyleID: number,
    private BOMVersion: string='',
    private BOM: string='',
    private Schedule_Executed_Date,
    private CreatedDate,
    private CreatedBy: string='',
    private IsActive,
    private Type: string='',
    
  ) {
  }

}
