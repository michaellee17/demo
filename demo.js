$(document).ready(function () {
    // alert('abc');
    response = '[{"s_sn":"1","cnname":"邱小甘","enname":"Peter","sex":"0","phone":"0910123456","email":"peter123@yahoo.com.tw"},{"s_sn":"2","cnname":"蔡凡昕","enname":"Allen","sex":"0","phone":"0910234567","email":"allen123@yahoo.com.tw"},{"s_sn":"3","cnname":"趙雪瑜","enname":"Sharon","sex":"0","phone":"0910345678","email":"sharon123@yahoo.com.tw"},{"s_sn":"4","cnname":"賴佳蓉","enname":"Yoki","sex":"1","phone":"0910456789","email":"yoki123@yahoo.com.tw"}]';
    var url = "ajax/ajaxCard";
    var ajaxobj = new AjaxObject(url, 'json');
    ajaxobj.getall();
    test();
    // 新增按鈕
    $("#addbutton").click(function () {
        $("#dialog-addconfirm").dialog({
            resizable: true,
            height: $(window).height() * 0.4,// dialog視窗度
            width: $(window).width() * 0.4,
            modal: true,
            buttons: {
                // 自訂button名稱
                "新增": function (e) {
                    var url = "ajax/ajaxCard";
                    var cnname = $("#addcnname").val();
                    var enname = $("#addenname").val();
                    var sex = $('input:radio:checked[name="addsex"]').val();
                    var phone = $('#addphone').val();
                    var email = $('#addemail').val();
                    var ajaxobj = new AjaxObject(url, 'json');
                    ajaxobj.id = JSON.parse(response).length +1;
                    console.log(JSON.parse(response).length);
                    ajaxobj.cnname = cnname;
                    ajaxobj.enname = enname;
                    ajaxobj.sex = sex;
                    ajaxobj.phone = phone;
                    ajaxobj.email = email;
                    
                    if(phone.length !=10)
                    {
                        alert("手機格式不對");
                    }else if(email.indexOf("@")== -1){
                        alert("郵件格是不對");
                        
                    }else
                    ajaxobj.add(ajaxobj);
                    test();
                    e.preventDefault(); // avoid to execute the actual submit of the form.
                },
                "重新填寫": function () {
                    $("#addform")[0].reset();
                },
                "取消": function () {
                    $(this).dialog("close");
                }
            }
        });
    })
    // 搜尋按鈕
    $("#searchbutton").click(function () {
        $("#dialog-searchconfirm").dialog({
            resizable: true,
            height: $(window).height() * 0.4,// dialog視窗度
            width: $(window).width() * 0.4,
            modal: true,
            buttons: {
                // 自訂button名稱
                "搜尋": function (e) {
                    var url = "ajax/ajaxCard";
                    // var data = $("#searchform").serialize();
                    var cnname = $("#secnname").val();
                    var enname = $("#seenname").val();
                    var sex = $('input:radio:checked[name="sesex"]').val();
                    var phone = $('#addphone').val();
                    var email = $('#addemail').val();
                    var ajaxobj = new AjaxObject(url, 'json');
                    ajaxobj.cnname = cnname;
                    ajaxobj.enname = enname;
                    ajaxobj.sex = sex;
                    ajaxobj.phone = phone;
                    ajaxobj.email = email;
                    ajaxobj.search();

                    e.preventDefault(); // avoid to execute the actual submit of the form.
                },
                "重新填寫": function () {

                    $("#searchform")[0].reset();
                },
                "取消": function () {
                    $(this).dialog("close");
                }
            }
        });
    })
   // 修改鈕
   $("#cardtable").on('click', '.modifybutton', function () {
    id = this.id;
    id = id.split('_')[1];
    var ajaxobj = new AjaxObject(url, 'json');
    ajaxobj.modify_get();
    $('#mocnname').val(JSON.parse(response)[id - 1].cnname);
    $('#moenname').val(JSON.parse(response)[id - 1].enname);
    
    $('#mophone').val(JSON.parse(response)[id - 1].phone);
    $('#moemail').val(JSON.parse(response)[id - 1].email);
    

    
})
    $("#cardtable").on('click', '.deletebutton', function () {
        // var deleteid = $(this).attr('id').substring(12);
        // var url = "ajax/ajaxCard";
        // var ajaxobj = new AjaxObject(url, 'json');
        // ajaxobj.id = deleteid;
        // ajaxobj.delete();
        id=this.id;
        id=id.split('_')[1];
       
        var ajaxobj = new AjaxObject(url, 'json');
        ajaxobj.delete();
    })

    // 自適應視窗
    $(window).resize(function () {
        var wWidth = $(window).width();
        var dWidth = wWidth * 0.4;
        var wHeight = $(window).height();
        var dHeight = wHeight * 0.4;
        $("#dialog-confirm").dialog("option", "width", dWidth);
        $("#dialog-confirm").dialog("option", "height", dHeight);
    });
});
function refreshTable(data) {
    // var HTML = '';
    $("#cardtable tbody > tr").remove();
    
    $.each(data, function (key, item) {
        var strsex = '';
        if (item.sex == 0)
            strsex = '男';
        else
            strsex = '女';
        var row = $("<tr></tr>");
        row.append($(`<td data-toggle=tooltip title=[${strsex}]${item.cnname}></td>`).html(item.cnname));
        row.append($("<td></td>").html(item.enname));
        row.append($("<td></td>").html(strsex));
        row.append($(`<td data-container=body data-toggle=popover data-placement=top data-content=聯絡方式${item.phone.substring(0,4)}-${item.phone.substring(4,7)}-${item.phone.substring(7,10)}></td>`).html(item.phone));
        row.append($("<td></td>").html(item.email));
        row.append($("<td class=modify></td>").html('<button id="modifybutton_' + item.s_sn + '" class="modifybutton" style="font-size:16px;font-weight:bold;">修改 <span class="glyphicon glyphicon-list-alt"></span></button>'));
        row.append($("<td class=delete></td>").html('<button id="deletebutton_' + item.s_sn + '" class="deletebutton" style="font-size:16px;font-weight:bold;">刪除 <span class="glyphicon glyphicon-trash"></span></button>'));
        $("#cardtable").append(row);
    });
}

function initEdit(response) {
  var modifyid = this.id;
  $("#mocnname").val(response[0].cnname);
  $("#moenname").val(response[0].enname);
  if (response[0].sex == 0) {
      $("#modifyman").prop("checked", true);
      $("#modifywoman").prop("checked", false);
  }
  else {
      $("#modifyman").prop("checked", false);
      $("#modifywoman").prop("checked", true);
  }
  $("#modifysid").val(modifyid);
  $("#dialog-modifyconfirm").dialog({
      resizable: true,
      height: $(window).height() * 0.4,// dialog視窗度
      width: $(window).width() * 0.4,
      modal: true,
      buttons: {
          // 自訂button名稱
          "修改": function (e) {
              // $("#modifyform").submit();
              var url = "ajax/ajaxCard";
              var cnname = $("#mocnname").val();
              var enname = $("#moenname").val();
              var sex = $('input:radio:checked[name="mosex"]').val();
              var ajaxobj = new AjaxObject(url, 'json');
              var phone = $("#mophone").val();
              var email = $("#moemail").val();
              ajaxobj.cnname = cnname;
              ajaxobj.enname = enname;
              ajaxobj.sex = sex;
              ajaxobj.id = modifyid;
              ajaxobj.phone = phone;
              ajaxobj.email = email;
              ajaxobj.modify(ajaxobj);
              e.preventDefault(); // avoid to execute the actual submit of the form.
          },
          "重新填寫": function () {
              $("#modifyform")[0].reset();
          },
          "取消": function () {
              $(this).dialog("close");
          }
      },
      error: function (exception) { alert('Exeption:' + exception); }
  });
}

/**
 * 
 * @param string
 *          url 呼叫controller的url
 * @param string
 *          datatype 資料傳回格式
 * @uses refreshTable 利用ajax傳回資料更新Table
 */
function AjaxObject(url, datatype) {
    this.url = url;
    this.datatype = datatype;
}
AjaxObject.prototype.cnname = '';
AjaxObject.prototype.enname= '';
AjaxObject.prototype.sex = '';
AjaxObject.prototype.id = 0;
AjaxObject.prototype.alertt = function () {
    alert("Alert:");
}
AjaxObject.prototype.getall = function () {
  refreshTable(JSON.parse(response));
}
AjaxObject.prototype.add = function (ajaxobj) {
    data = JSON.parse(response);
    obj = {
        "s_sn" : ajaxobj.id,
        "cnname" : ajaxobj.cnname,
        "enname" : ajaxobj.enname,
        "sex" : ajaxobj.sex,
        "phone" : ajaxobj.phone,
        "email" : ajaxobj.email,
    };
    data.push(obj);
    response = JSON.stringify(data);
    refreshTable(data);
    
  $("#dialog-addconfirm").dialog("close");
  
}
AjaxObject.prototype.modify = function (ajaxobj) {
    data = JSON.parse(response);
    data = data[this.id - 1];
    data.cnname = ajaxobj.cnname;
    data.email = ajaxobj.email;
    data.enname = ajaxobj.enname;
    data.phone = ajaxobj.phone;
    data.sex = ajaxobj.sex;
    response = JSON.parse(response);
    response[this.id - 1] = data;
    refreshTable(response);
    response = JSON.stringify(response)
    test();
  
  $("#dialog-modifyconfirm").dialog("close");
}
AjaxObject.prototype.modify_get = function () {
//   response = '[{"s_sn":"1","cnname":"邱小甘","enname":"Peter","sex":"0","phone":"0910123456","email":"peter123@yahoo.com.tw"},{"s_sn":"2","cnname":"蔡凡昕","enname":"Allen","sex":"0","phone":"0910234567","email":"allen123@yahoo.com.tw"},{"s_sn":"3","cnname":"趙雪瑜","enname":"Sharon","sex":"0","phone":"0910345678","email":"sharon123@yahoo.com.tw"},{"s_sn":"4","cnname":"賴佳蓉","enname":"Yoki","sex":"1","phone":"0910456789","email":"yoki123@yahoo.com.tw"}]';
  initEdit(JSON.parse(response));
}
AjaxObject.prototype.search = function () {
    response = '[{"s_sn":"1","cnname":"邱小甘","enname":"Peter","sex":"0","phone":"0910123456","email":"peter123@yahoo.com.tw"},{"s_sn":"2","cnname":"蔡凡昕","enname":"Allen","sex":"0","phone":"0910234567","email":"allen123@yahoo.com.tw"},{"s_sn":"3","cnname":"趙雪瑜","enname":"Sharon","sex":"0","phone":"0910345678","email":"sharon123@yahoo.com.tw"},{"s_sn":"4","cnname":"賴佳蓉","enname":"Yoki","sex":"1","phone":"0910456789","email":"yoki123@yahoo.com.tw"}]';
  refreshTable(JSON.parse(response));
  $("#dialog-searchconfirm").dialog("close");
}
AjaxObject.prototype.delete = function () {
    // response = '[{"s_sn":"1","cnname":"邱小甘","enname":"Peter","sex":"0","phone":"0910123456","email":"peter123@yahoo.com.tw"},{"s_sn":"2","cnname":"蔡凡昕","enname":"Allen","sex":"0","phone":"0910234567","email":"allen123@yahoo.com.tw"}]';
    data = JSON.parse(response);
    data.splice(id-1,1);
    response = JSON.stringify(data);
    refreshTable(data);
   
}

function test(){
    $("td").hover(function() {
        $(this).css('fontSize','30px');
        var n = $(this).index();
        $(this).parent("tr").find("td").addClass('mark');
        $(this).parents("table").find('tr').find('td:eq('+n+')').addClass('mark');
    }, function() {
        $("td").removeClass('mark')
        $(this).css('fontSize','22px');
    });
}
$(function () {
    $('[data-toggle="popover"]').popover()
  })
  function tracking(e) {
    if (screen.width > 768) {
      let lamp = document.querySelector(".entrance_lamp");
      let light = document.querySelector("#entrance_light");
      let rotateDeg =
        Math.round(
          (Math.atan(
            (lamp.offsetLeft - e.pageX) /
            (window.innerHeight - light.offsetTop)
          ) *
            180) /
          Math.PI
        ) +
        57 +
        125;

      light.setAttribute(
        "style",
        "-webkit-mask-image:conic-gradient(from 0deg at 50% 0%, #000000 " +
        `${-(rotateDeg - 80)}` +
        "deg, #000000 " +
        `${rotateDeg - 110}` +
        "deg, transparent " +
        `${rotateDeg - 50}` +
        "deg, transparent " +
        `${rotateDeg}` +
        "deg, transparent " +
        `${rotateDeg + 40}` +
        "deg, #000000 " +
        `${rotateDeg + 90}` +
        "deg, #000000 " +
        `${rotateDeg + 240}` +
        "deg);"
      );
    }
  }
  function init() {
    window.addEventListener("mousemove", tracking, false);
  }

  window.addEventListener("load", init, false);