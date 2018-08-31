

 function rqajax (param) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "method",
      url: "url",
      data: "data",
      dataType: "dataType",
      success: function (response) {
        if(response.success){
          resolve("操作成功")
        }else{
          reject("操作失败")
        }
      }
  });
};

rqajax(param).then(res={
 alert(res)
}).catch(res){
  alert(res)
}