function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate()
  .addMetaTag('viewport', 'width=device-width, initial-scale=1')
  .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}

function saveData(obj){
  var ss = SpreadsheetApp.openById('SheetID').getSheetByName('ชีต1')
  var header = ss.getRange(1,1,1,ss.getLastColumn()).getValues()[0] /* ดึงค่า Header แถวที่ 1 , Column ที่ 1 , จำนวน 1 แถว , ทั้งหมดกี่ Column */
  var row = [] /* แถวที่จะบันทึก [] มีค่าเท่ากับ Array เปล่าๆ */
  Object.keys(obj)/* ข้อมูลที่รับค่ามา */.forEach(key=>{ /* นำค่าที่ได้รับมา Loop เข้าไปใน Array */
    row[header.indexOf(key)] = obj[key] /* ดึงค่าที่ส่งมาใส่เข้าไปใน Row */
  })
  ss.appendRow(row) /* Row ใบทึกลง Sheet */
  /* Libary ID  1vXbZfRP-7AqwqV7k0fGAnVjCe34pYyI2WdZBJw1Y8U0_DuEbo5fN32P9 */
  var token = 'GenLineNotifyToken'
  var message = 'ข้อความแจ้งเตือน '+ row
  NotifyApp.sendNotify(token,message)
  return true
}
