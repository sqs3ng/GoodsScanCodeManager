/**
 * related to detailContent.ui
 * 
 * @Author : sqs3ng
 * @Timestamp : 2016-10-08
 */
var do_App = sm("do_App");
var do_Page = sm("do_Page");
var do_Notification = sm("do_Notification");
var do_External = sm("do_External");

var do_ALayout_root = ui("do_ALayout_root");
var do_ALayout_back = ui("do_ALayout_back");
var do_Label_name = ui("do_Label_name");
var do_Label_phone = ui("do_Label_phone");
var do_ALayout_callphone = ui("do_ALayout_callphone");

//订阅android系统返回键的事件：关闭当前页面
do_Page.on("back", function() {
	do_App.closePage();
});

//关闭当前页面
do_ALayout_back.on("touch", function() {
	do_App.closePage();
});

//页面装载完成后，开始初始化工作
do_Page.on("loaded", function() {
	//读取当前页面的传入参数
	var para=do_Page.getData();
	do_Label_name.text=para.name;
	do_Label_phone.text=para.phone;

});

//直接打电话
do_ALayout_callphone.on("touch", function() {
	do_External.openDial(do_Label_phone.text);
});

