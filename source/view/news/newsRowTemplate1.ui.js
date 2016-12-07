/**
 * related to newsRowTemplate1.ui
 * 
 * @Author : sqs3ng
 * @Timestamp : 2016-09-28
 */
//引入组件库
var do_App=sm("do_App");
var do_Page=sm("do_Page");
var do_Notification=sm("do_Notification");
var do_DataCache=sm("do_DataCache");

//声明UI变量
var root=ui("$");
var do_ALayout_root=ui("do_ALayout_root");
var do_SlideView_news=ui("do_SlideView_news");

//定义do_SlideView_news的数据Model
var listdataNews=mm("do_ListData");

//设置数据绑定关系
root.setMapping({
	"do_ALayout_root.tag":"type_id"
});

//给do_SlideView_news绑定数据
do_SlideView_news.bindItems(listdataNews);

//订阅每次绑定数据后的事件
root.on("dataRefreshed",function(){
	//先尝试加载本地数据
	var data=do_DataCache.loadData("newsShow");
	if (data!=null && data.length>0) {
		listdataNews.removeAll();
		listdataNews.addData(data);
		//刷新显示
		do_SlideView_news.refreshItems();
	}
	
	var http=mm("do_Http");
	http.method="POST";
	http.timeout=30000;
	http.contentType="application/json";
	http.url="http://mock.deviceone.net/demo01/newsShow.ashx";
	http.on("success",function(data){
		listdataNews.removeAll();
		listdataNews.addData(data);
		//刷新显示
		do_SlideView_news.refreshItems();
	    //每次刷新的数据，都在本地缓存起来，以便下次打开应用时即时离线状态下也能显示新闻列表，提高用户体验
		do_DataCache.saveData("newsShow", data);
	});
	http.on("fail",function(data){
		do_Notification.toast(data);
	});
	http.request();
});