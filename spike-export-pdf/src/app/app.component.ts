import { Component } from '@angular/core';
import { DataContainerService } from './services/data-container.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private dataContainerService: DataContainerService) {

  }

   MOUNTAINS = [
    {"name":"Mount Everest","height":8848,"country":"Nepal"},
    {"name":"Mount Rushmore","height":18,"country":"USA"}
  ];	
  
  
   buildTable(data) {
      var table = document.createElement("table") as HTMLElement;
      table.className="gridtable";
      table.setAttribute("id","myTableId");
      // var css = document.createElement('style');
      // css.type = 'text/css';
      // var styles  = 'table.gridtable {'+
      //                     'font-family: verdana,arial,sans-serif;'+ 'font-size:11px;'
      //                     +'color:#333333;'+'border-width: 1px;'+
      //                     'border-color: #666666;'+'border-collapse: collapse;}';
      // css.appendChild(document.createTextNode(styles));
      // table.appendChild(css);
      table.style.borderWidth = '1px';
      table.style.borderColor = '#666666';
      table.style.color = '#333333';
      
      var thead = document.createElement("thead") as HTMLElement;
      var tbody = document.createElement("tbody") as HTMLElement;
      var headRow = document.createElement("tr") as HTMLElement;
      headRow.setAttribute("style","border-width: 1px; border-color: #666666; color: #333333;border-style: solid;background-color:grey;");
      ["Name","Height","Country"].forEach(function(el) {
        var th=document.createElement("th");
        th.appendChild(document.createTextNode(el));
        th.style.borderWidth = '1px';
        headRow.appendChild(th);
      });
      thead.appendChild(headRow);
      table.appendChild(thead); 
      // data.forEach(function(el) {
      //   var tr = document.createElement("tr");
      //   for (var o in el) {  
      //     var td = document.createElement("td");
      //     td.appendChild(document.createTextNode(el[o]))
      //     tr.appendChild(td);
      //   }
      //   tbody.appendChild(tr);  
      // });
      // table.appendChild(tbody);  
      var htmltag = document.createElement("body") as HTMLElement;           
      return table;
  }

  base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
      return bytes;
   }

  hereClick() {
    var data = [["Name","Height","Country"]];
    
    this.dataContainerService.getDetails(data).subscribe(res => {

      
      
  //    let mediaType = 'application/pdf';
  //    let blob = new 
  //    //Blob([this.base64ToArrayBuffer(res.pdfByteArray)], { type: mediaType });
  //    Blob([res], { type: mediaType });
  //   saveAs(blob, "fileName");
  // }, err => {
  //   console.log('Pdf generated err: ', JSON.stringify(err));
  //   });
      console.log(res);
      console.log(res);
      var binaryData = [];
      binaryData.push(res);
      var link = document.createElement('a');
    link.href=window.URL.createObjectURL(new Blob(binaryData, {type: "application/pdf;charset=UTF-8"}));
    link.download="Dossier.pdf";
    link.click();
   });
    
    //var table = this.buildTable(data);

    // var divToPrint=document.getElementById(table.id);
    // var newWin= window.open("");
    // newWin.document.write(table.outerHTML);
    // newWin.print();
    // newWin.close();


    // var link = document.createElement('a');
    // link.href=window.URL.createObjectURL(table);
    // link.download="Dossier_" + new Date() + ".pdf";
    // link.click();

    //  var binaryData = [];
    //  binaryData.push('<html><body>' + table.outerHTML+'</body></html>');
    //  var arrayUTF8 = toUTF8Array('<html><body>' + table.outerHTML+'</body></html>'); //Your function
    //   var byteNumbers = new Uint8Array(arrayUTF8.length);
    //   for (var i = 0; i < arrayUTF8.length; i++) {
    //       byteNumbers[i] = arrayUTF8[i]; 
    //   }
    // var link = document.createElement('a');
    // link.href=window.URL.createObjectURL(new Blob([byteNumbers], {type: "text/html;charset=UTF-8"}));
    // link.download="Dossier.pdf";
    // link.click();

  }
}


function toUTF8Array(str) {
  var utf8 = [];
  for (var i=0; i < str.length; i++) {
      var charcode = str.charCodeAt(i);
      if (charcode < 0x80) utf8.push(charcode);
      else if (charcode < 0x800) {
          utf8.push(0xc0 | (charcode >> 6), 
                    0x80 | (charcode & 0x3f));
      }
      else if (charcode < 0xd800 || charcode >= 0xe000) {
          utf8.push(0xe0 | (charcode >> 12), 
                    0x80 | ((charcode>>6) & 0x3f), 
                    0x80 | (charcode & 0x3f));
      }
      // surrogate pair
      else {
          i++;
          charcode = ((charcode&0x3ff)<<10)|(str.charCodeAt(i)&0x3ff)
          utf8.push(0xf0 | (charcode >>18), 
                    0x80 | ((charcode>>12) & 0x3f), 
                    0x80 | ((charcode>>6) & 0x3f), 
                    0x80 | (charcode & 0x3f));
      }
  }
  return utf8;
}