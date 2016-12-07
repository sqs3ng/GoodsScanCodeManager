/**
 * related to newsShowTemplate.ui
 * 
 * @Author : sqs3ng
 * @Timestamp : 2016-09-28
 */
//引用组件库
var do_App=sm("do_App");

//声明UI变量
var root=ui("$");
var do_Alayout_root=ui("do_Alayout_root");
var do_ImageView_news=ui("do_ImageView_news");
var do_Label_title=ui("do_Label_title");

//设置数据绑定的映射关系
root.setMapping({
	"do_ImageView_news.source":"image",
	"do_Label_title.text":"title",
	"do_Alayout_root.tag":"url"
});

