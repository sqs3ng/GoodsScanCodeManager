/**
 * related to addressCell.ui
 * 
 * @Author : sqs3ng
 * @Timestamp : 2016-09-30
 */
var do_External=sm("do_External");
var do_App = sm("do_App");

var root=ui("$");
var do_ALayout_root=ui("do_ALayout_root");
var do_Label_name=ui("do_Label_name");
var do_Label_phone=ui("do_Label_phone");
var do_ALayout_content = ui("do_ALayout_content");

root.setMapping({
	"do_Label_name.text":"text",
	"do_Label_name.tag":"phone",
	"do_Label_phone.text":"phone"
});

//点击打电话
do_ALayout_root.on("touch",function(){
	do_External.openDial(do_Label_name.tag);
});

//电话号码详细内容
do_ALayout_content.on("touch", function() {
	do_App.openPage({
		source: "source://view/contact/detailContent.ui",
		statusBarState: "transparent",
		animationType: "push_r2l",
		data:JSON.stringify({name:do_Label_name.text,phone:do_Label_phone.text})
	});
});


