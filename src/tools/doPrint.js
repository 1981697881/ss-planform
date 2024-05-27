import {getLodop} from '@/tools/LodopFuncs'
var basePath = 'http://159.75.233.201:10011/'
//  自有产品标签
const PrintAccount = (data, printingQuantity, apiece, repeat) => {
  function getLength(val) {
    var str = new String(val);
    var bytesCount = 0;
    for (var i = 0, n = str.length; i < n; i++) {
      var c = str.charCodeAt(i);
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
        bytesCount += 1;
      } else {
        bytesCount += 2;
      }
    }
    return bytesCount;
  }
  console.log(data)
  //  调用打印对象
  LODOP = getLodop()
  data.forEach((item, index) => {
    LODOP.SET_PRINT_PAGESIZE(2, '210mm', '297mm', "A4");
    if (index % 4 == 1) {
      //上横线
      LODOP.ADD_PRINT_LINE("12mm", "154mm", "12mm", "274.5mm", 0, 1);
      // 最左竖线
      LODOP.ADD_PRINT_LINE("12mm", "154mm", "92mm", "154mm", 0, 1);
      // 最右竖线
      LODOP.ADD_PRINT_LINE("12mm", "274.5mm", "92mm", "274.5mm", 0, 1);
      // 下横线
      LODOP.ADD_PRINT_LINE("92mm", "154mm", "92mm", "274.5mm", 0, 1);
      LODOP.SET_PRINT_STYLEA(0, 'QRCodeVersion', 7);
      LODOP.ADD_PRINT_BARCODE('12mm', '184mm', '68mm', '68mm', 'QRCode', item['number'])
      LODOP.ADD_PRINT_TEXT('76mm', '154mm', '130mm', '8mm', item['number']);
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 40);
    } else if (index % 4 == 2) {
      //上横线
      LODOP.ADD_PRINT_LINE("106mm", "14mm", "106mm", "134.5mm", 0, 1);
      ``
      // 最左竖线
      LODOP.ADD_PRINT_LINE("106mm", "14mm", "186mm", "14mm", 0, 1);
      // 最右竖线
      LODOP.ADD_PRINT_LINE("106mm", "134.5mm", "186mm", "134.5mm", 0, 1);
      // 下横线
      LODOP.ADD_PRINT_LINE("186mm", "14mm", "186mm", "134.5mm", 0, 1);

      LODOP.SET_PRINT_STYLEA(0, 'QRCodeVersion', 7);
      LODOP.ADD_PRINT_BARCODE('106mm', '40mm', '68mm', '68mm', 'QRCode', item['number'])
      LODOP.ADD_PRINT_TEXT('168mm', '10mm', '130mm', '8mm', item['number']);
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 40);
    } else if (index % 4 == 3) {
      //上横线
      LODOP.ADD_PRINT_LINE("106mm", "154mm", "106mm", "274.5mm", 0, 1);
      // 最左竖线
      LODOP.ADD_PRINT_LINE("106mm", "154mm", "186mm", "154mm", 0, 1);
      // 最右竖线
      LODOP.ADD_PRINT_LINE("106mm", "274.5mm", "186mm", "274.5mm", 0, 1);
      // 下横线
      LODOP.ADD_PRINT_LINE("186mm", "154mm", "186mm", "274.5mm", 0, 1);
      LODOP.SET_PRINT_STYLEA(0, 'QRCodeVersion', 7);
      LODOP.ADD_PRINT_BARCODE('106mm', '184mm', '68mm', '68mm', 'QRCode', item['number'])
      LODOP.ADD_PRINT_TEXT('168mm', '154mm', '130mm', '8mm', item['number']);
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 40);
      LODOP.NewPage();
    } else {
      //上横线
      LODOP.ADD_PRINT_LINE("12mm", "14mm", "12mm", "134.5mm", 0, 1);
      // 最左竖线
      LODOP.ADD_PRINT_LINE("12mm", "14mm", "92mm", "14mm", 0, 1);
      // 最右竖线
      LODOP.ADD_PRINT_LINE("12mm", "134.5mm", "92mm", "134.5mm", 0, 1);
      // 下横线
      LODOP.ADD_PRINT_LINE("92mm", "14mm", "92mm", "134.5mm", 0, 1);

      LODOP.SET_PRINT_STYLEA(0, 'QRCodeVersion', 7);
      LODOP.ADD_PRINT_BARCODE('13mm', '40mm', '68mm', '68mm', 'QRCode', item['number'])
      LODOP.ADD_PRINT_TEXT('76mm', '10mm', '130mm', '8mm', item['number']);
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 40);
    }
  })
  // 分页
  LODOP.NewPage();
}
const print1 = (array) => {
  //序号
  console.log(array)
  LODOP.PRINT_INITA(0, 0, 100, 150, "哈力标签5*9");
  for (var a = 0; a < array.length; a++) {
    LODOP.SET_PRINT_PAGESIZE(1, '100mm', '150mm', "");
    LODOP.SET_PRINT_STYLEA(0, "ItemType", 0);
    LODOP.SET_PRINT_STYLE("FontSize", 38);
    LODOP.ADD_PRINT_TEXT("3mm", "0mm", "96mm", "12mm", (array[a].name == null ? '' : array[a].name));

    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    // 最右竖线
    var h = 6.31, z = 8;
    //for (var i = 0; i <= 3; i++) {
    //第一行
    LODOP.SET_PRINT_STYLE("FontSize", 11);
    LODOP.ADD_PRINT_TEXT("16mm", "10mm", "45mm", "6mm", (array[a].date == null ? '' : array[a].date));
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 1);
    LODOP.ADD_PRINT_TEXT("16mm", "50mm", "45mm", "6mm", "净重：" + (array[a].netWeight == null ? '' : array[a].netWeight));
    LODOP.ADD_PRINT_TEXT("21mm", "10mm", "45mm", "6mm", "使用台账：");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 1);
    LODOP.ADD_PRINT_TEXT("21mm", "50mm", "45mm", "6mm", "批号：" + (array[a].supBatchNo == null ? '' : array[a].supBatchNo));
    h = h + z;
    LODOP.ADD_PRINT_IMAGE("26mm", "65mm", "30mm", "30mm", "<img style='width: 100%;' src='" + basePath + "img/barcode/" + array[a].uuid + ".png'/>");
    // }
    //表格线
    LODOP.ADD_PRINT_LINE("26mm", "3.5mm", "26mm", "63mm", 0, 1);
    // 最右竖线
    LODOP.ADD_PRINT_LINE("26mm", "3.5mm", "58mm", "3.5mm", 0, 1);
    // 最左竖线
    LODOP.ADD_PRINT_LINE("26mm", "63mm", "58mm", "63mm", 0, 1);
    // 最右竖线
    LODOP.ADD_PRINT_LINE("58mm", "3.5mm", "58mm", "63mm", 0, 1);
    // 最下横线

    //第一行
    LODOP.ADD_PRINT_LINE("34mm", "3.5mm", "34mm", "63mm", 0, 1);
    //第二行
    LODOP.ADD_PRINT_LINE("42mm", "3.5mm", "42mm", "63mm", 0, 1);
    //第三行
    LODOP.ADD_PRINT_LINE("50mm", "3.5mm", "50mm", "63mm", 0, 1);
    // 中间三竖线
    LODOP.ADD_PRINT_LINE("26mm", "17.75mm", "58mm", "17.75mm", 0, 1);
    LODOP.ADD_PRINT_LINE("26mm", "34mm", "58mm", "34mm", 0, 1);
    LODOP.ADD_PRINT_LINE("26mm", "49.25mm", "58mm", "49.25mm", 0, 1);
    //数据
    LODOP.SET_PRINT_STYLE("FontSize", 11);
    LODOP.ADD_PRINT_TEXT("28mm", "3.5mm", "15.25mm", "8mm", "日期");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.ADD_PRINT_TEXT("28mm", "18.75mm", "15.25mm", "8mm", "数量");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.ADD_PRINT_TEXT("28mm", "34mm", "15.25mm", "8mm", "日期");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.ADD_PRINT_TEXT("28mm", "49.25mm", "15.25mm", "8mm", "数量");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    let newHeight = 34;//
    for (let i = 0; i < 3; i++) {
      LODOP.ADD_PRINT_TEXT(newHeight + "mm", "3.5mm", "15.25mm", "8mm", "");
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(newHeight + "mm", "18.75mm", "15.25mm", "8mm", "");
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(newHeight + "mm", "34mm", "15.25mm", "8mm", "");
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(newHeight + "mm", "49.25mm", "15.25mm", "8mm", "");
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      newHeight = newHeight + 8;
    }
    LODOP.ADD_PRINT_TEXT("64.5mm", "0mm", "96mm", "12mm", (array[a].model == null ? '' : array[a].model));
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.NewPage();
  }
}
// 生产任务单-取物料属性
const print2 = (array) => {
  //序号
  LODOP.PRINT_INITA(0, 0, 100, 150, "哈力标签5*9");
  for (var a = 0; a < array.length; a++) {
    LODOP.SET_PRINT_PAGESIZE(1, '100mm', '150mm', "");
    LODOP.SET_PRINT_STYLEA(0, "ItemType", 0);
    LODOP.SET_PRINT_STYLE("FontSize", 25);
    LODOP.ADD_PRINT_TEXT("3mm", "0mm", "96mm", "12mm", (array[a].label == null ? '' : array[a].label));
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "ItemType", 0);
    LODOP.ADD_PRINT_TEXT("11mm", "0mm", "96mm", "12mm", (array[a].name == null ? '' : array[a].name));
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    var h = 6.31, z = 8;
    LODOP.SET_PRINT_STYLE("FontSize", 13);
    LODOP.ADD_PRINT_TEXT("28mm", "10mm", "60mm", "6mm", "规格：" + (array[a].model == null ? '' : array[a].model));
    LODOP.ADD_PRINT_TEXT("33mm", "10mm", "60mm", "6mm", "生产日期：" + (array[a].planCommitDate == null ? '' : array[a].planCommitDate));
    LODOP.ADD_PRINT_TEXT("38mm", "10mm", "60mm", "6mm", "批号：" + (array[a].supBatchNo == null ? '' : array[a].supBatchNo));
    LODOP.ADD_PRINT_TEXT("43mm", "10mm", "60mm", "6mm", (array[a].number == null ? '' : array[a].number));
    LODOP.ADD_PRINT_TEXT("48mm", "10mm", "60mm", "6mm", (array[a].billNo == null ? '' : array[a].billNo));
    h = h + z;
    LODOP.ADD_PRINT_IMAGE("22mm", "60mm", "30mm", "30mm", "<img style='width: 100%;'  src='" + basePath + "img/barcode/" + array[a].uuid + ".png'/>");
    LODOP.ADD_PRINT_TEXT("64.5mm", "0mm", "96mm", "12mm", (array[a].name == null ? '' : array[a].name));
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.NewPage();
  }
}

const print3 = (array) => {
  //序号
  LODOP.PRINT_INITA(0, 0, 100, 150, "哈力标签5*9");
  for (var a = 0; a < array.length; a++) {
    LODOP.SET_PRINT_PAGESIZE(1, '100mm', '150mm', "");
    LODOP.SET_PRINT_STYLEA(0, "ItemType", 0);
    LODOP.SET_PRINT_STYLE("FontSize", 25);
    LODOP.ADD_PRINT_TEXT("3mm", "0mm", "96mm", "12mm", (array[a].custName == null ? '' : array[a].custName));
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "ItemType", 0);
    LODOP.ADD_PRINT_TEXT("11mm", "0mm", "96mm", "12mm", (array[a].custNumber == null ? '' : array[a].custNumber));
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    var h = 6.31, z = 8;
    LODOP.SET_PRINT_STYLE("FontSize", 13);
    LODOP.ADD_PRINT_TEXT("28mm", "10mm", "60mm", "6mm", "规格：" + (array[a].model == null ? '' : array[a].model));
    LODOP.ADD_PRINT_TEXT("33mm", "10mm", "60mm", "6mm", "生产日期：" + (array[a].planCommitDate == null ? '' : array[a].planCommitDate));
    LODOP.ADD_PRINT_TEXT("38mm", "10mm", "60mm", "6mm", "批号：" + (array[a].supBatchNo == null ? '' : array[a].supBatchNo));
    LODOP.ADD_PRINT_TEXT("43mm", "10mm", "60mm", "6mm", (array[a].number == null ? '' : array[a].number));
    LODOP.ADD_PRINT_TEXT("48mm", "10mm", "60mm", "6mm", (array[a].billNo == null ? '' : array[a].billNo));
    h = h + z;
    LODOP.ADD_PRINT_IMAGE("22mm", "60mm", "30mm", "30mm", "<img style='width: 100%;'  src='" + basePath + "img/barcode/" + array[a].uuid + ".png'/>");
    LODOP.ADD_PRINT_TEXT("64.5mm", "0mm", "96mm", "12mm", (array[a].custName == null ? '' : array[a].custName));
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

    LODOP.NewPage();
  }
}
export {
  PrintAccount,
  print1,
  print2,
  print3,
}
