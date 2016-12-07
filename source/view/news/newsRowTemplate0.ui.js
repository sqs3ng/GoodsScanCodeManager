/**
 * related to newsRowTemplate0.ui
 * 
 * @Author : sqs3ng
 * @Timestamp : 2016-09-29
 */
//引入组件
var do_App=sm("do_App");

//引入UI变量
var root=ui("$");
var do_ImageView_icon=ui("do_ImageView_icon");
var do_Label_title=ui("do_Label_title");
var do_Label_desc=ui("do_Label_desc");

//设置绑定
root.setMapping({
	"do_ImageView_icon.source":"image",
	"do_Label_title.text":"title",
	"do_Label_desc.text":"desc"
});