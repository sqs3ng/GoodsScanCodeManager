/**
 * related to main.ui
 * 
 * @Author : sqs3ng
 * @Timestamp : 2016-09-26
 */
var do_App = sm("do_App");
var do_Page = sm("do_Page");
var do_Global = sm("do_Global");

var do_TextField_url = ui("do_TextField_url");
var do_ImageView_opt = ui("do_ImageView_opt");
var do_ALayout_opt = ui("do_ALayout_opt");
var do_WebView_content = ui("do_WebView_content");
var do_ALayout_testPage = ui("do_ALayout_testPage");
var do_ALayout_deviceonePage = ui("do_ALayout_deviceonePage");

//备注
do_TextField_url.on("textChanged", function() {
	if (do_TextField_url.text.length>0) {
		do_ImageView_opt.source="source://image/to_right_arrow.png";
	} else {
		do_ImageView_opt.source="source://image/barcode.png";
	}
});

//根据URL判断，打开网址
do_ALayout_opt.on("touch", function() {
	if (do_TextField_url.text.length>0) {
		do_WebView_content.url="";
		var url=do_TextField_url.text;
		if (url.indexOf("http")<0 && url.indexOf("source")<0) {
			url="http://"+url;
		}
		do_WebView_content.url=url;
	} else {
		do_App.openPage({
			source:"source://view/find/scanBarcode.ui",
			statusBarState:"transparent",
			animationType:"fade"
		});
	}
});

//打开测试
do_ALayout_testPage.on("touch", function() {
	do_TextField_url.text="source://view/find/webTest.htm";
	do_ALayout_opt.fire("touch");
});

//打开官网
do_ALayout_deviceonePage.on("touch", function() {
	do_TextField_url.text="http://www.deviceone.net";
	do_ALayout_opt.fire("touch");
});

//上层Page关闭时的事件
do_Page.on("result", function(data) {
	if (data == null || data.length <= 0)
		return;
	do_TextField_url.text = data;
	do_ALayout_opt.fire("touch");
});

