/**
 * related to main.ui
 * 
 * @Author : sqs3ng
 * @Timestamp : 2016-09-26
 */
var do_App=sm("do_App");
var do_Page=sm("do_Page");
var do_Contact=sm("do_Contact");

//引用自定义js库
var chinesePinYin =require("chinesePinYin");

var do_IndexListView_contract=ui("do_IndexListView_contract");

var hashdata=mm("do_HashData");

//读取本地通讯录的数据
do_Contact.getData({types:['name','phone']}, function(data) {
	var _allContracts={};	//全部通讯录
	var _allIndexes=[];
	if (data!=null && data.length>0) {
		var _name;
		var _phone;
		var _indexChar;
		for (var i = 0; i < data.length; i++) {
			_name=data[i].name;
			_phone=data[i].phone;
			if (_name==null || _name.length==0 || _phone==null || _phone.length==0) {
				continue;
			}
			//获取首字符的拼音索引
			_indexChar=chinesePinYin.GetJP(_name[0]);
			if (_indexChar==null || _indexChar.length==0) {
				_indexChar="#";
			}
			if (_allContracts[_indexChar]==null) {
				_allContracts[_indexChar]=[];
			}
			for (var y = 0; y < _phone.length; y++) {
				_allContracts[_indexChar].push({
					"template":0,
					"text":_name,
					"phone":_phone[y]				
				});
			}
		}

		//添加数据到hash
		var _allChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ#";
		for (var i = 0; i < _allChars.length; i++) {
			var _char=_allChars[i];
			//如果没有首字母的联系人
			if (_allContracts[_char]==null) {
				continue;
			}
			_allIndexes.push(_char);
			var _rowdata={};
			_rowdata[_char]=_allContracts[_char];
			hashdata.addData(_rowdata);
		}
		
		//绑定数据
		do_IndexListView_contract.bindItems(hashdata, _allIndexes)
		do_IndexListView_contract.refreshItems();
	}
});