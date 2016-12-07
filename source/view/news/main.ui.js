/**
 * related to main.ui
 * 
 * @Author : sqs3ng
 * @Timestamp : 2016-09-26
 */
//引入组件库
var do_App=sm("do_App");
var do_Page=sm("do_Page");
var do_Global=sm("do_Global");
var do_Notification=sm("do_Notification");

//声明UI变量
var do_Alayout_root=ui("do_Alayout_root");
var do_ALayout_main=ui("do_ALayout_main");
var do_SegmentView_tabs=ui("do_SegmentView_tabs");
var do_SlideView_news=ui("do_SlideView_news");
var do_ALayout_allTypes=ui("do_ALayout_allTypes");

//在do_ALayout_root上动态添加子视图，用于下拉显示全部新闻类型(该视图初始化的脚本会将自身先隐藏)
do_Alayout_root.add("newsTypeGrids", "source://view/news/newsTypeGrids.ui", 0, 0);
var newsTypeGrids=ui("newsTypeGrids");

//定义新闻类型数据
var jsonTabs=[
              {
            	  id:"redian",
            	  name:"热点",
            	  selected:"1",
            	  template:0	//采用的模板
              },
              {
            	  id:"yule",
            	  name:"娱乐",
            	  selected:"0",
            	  template:0	//采用的模板
              },
              {
            	  id:"tiyu",
            	  name:"体育",
            	  selected:"0",
            	  template:0	//采用的模板
              },
              {
            	  id:"keji",
            	  name:"科技",
            	  selected:"0",
            	  template:0	//采用的模板
              },
              {
            	  id:"caijing",
            	  name:"财经",
            	  selected:"0",
            	  template:0	//采用的模板
              },
              {
            	  id:"junshi",
            	  name:"军事",
            	  selected:"0",
            	  template:0	//采用的模板
              },
              {
            	  id:"lishi",
            	  name:"历史",
            	  selected:"0",
            	  template:0	//采用的模板
              },
              {
            	  id:"jiaju",
            	  name:"家居",
            	  selected:"0",
            	  template:0	//采用的模板
              },
              {
            	  id:"qiche",
            	  name:"汽车",
            	  selected:"0",
            	  template:0	//采用的模板
              },
              {
            	  id:"shehui",
            	  name:"社会",
            	  selected:"0",
            	  template:0	//采用的模板
              },
              {
            	  id:"jiankang",
            	  name:"健康",
            	  selected:"0",
            	  template:0	//采用的模板
              },
              {
            	  id:"shishang",
            	  name:"时尚",
            	  selected:"0",
            	  template:0	//采用的模板
              }
              ];

//因为数据绑定组件可以绑定不同的数据源，而一个数据源只能被一个数据绑定组件绑定，是一对多的关系，所以当我们想把相同的数据源作为SlideView的数据模型module时需要复制一份数据源。
//复制新闻类型的数据
var jsonSlides=JSON.parse(JSON.stringify(jsonTabs));

//定义do_SegmentView_tabs的数据Model
var listdataTabs=mm("do_ListData");
listdataTabs.addData(jsonTabs);
//定义do_SlideView_news的数据Model
var listdataSlides=mm("do_ListData");
listdataSlides.addData(jsonSlides);

//页面加载完成
do_Page.on("loaded",function(){
	//给do_SegmentView_tabs绑定数据
	do_SegmentView_tabs.bindItems(listdataTabs);
	//给do_SlideView_news绑定数据
	do_SlideView_news.bindItems(listdataSlides);
	//在当前页面下发送RefreshNewsTypes自定义消息
	do_Page.fire("RefreshNewsTypes", listdataTabs);
})

//在当前页面下订阅selectOneTab的事件
do_Page.on("selectOneTab",function(data){
	var _selectedIndex=-1;
	for (var i = 0; i < jsonTabs.length; i++) {
		if (jsonTabs[i].name==data.name) {
			_selectedIndex=i;
			listdataTabs.updateOne(i, {
				name: jsonTabs[i].name,
				selected: "1",
				template: jsonTabs[i].template
			});
		}
		else {
			listdataTabs.updateOne(i, {
				name: jsonTabs[i].name,
				selected: "0",
				template: jsonTabs[i].template
			});
		}
	}
	
	//do_SegmentView_tabs重新绑定数据
	do_SegmentView_tabs.refreshItems();
	//移动当前选中的cell上
	if (_selectedIndex>=0) {
		do_SegmentView_tabs.index=_selectedIndex;
		do_SlideView_news.index=_selectedIndex;
	}
});

//当do_SegmentView_tabs变化时，同步do_SlideView_news
do_SegmentView_tabs.on("indexChanged",function(index){
	do_SlideView_news.index=index;
});
//当do_SlideView_news变化时，同步do_SegmentView_tabs
do_SlideView_news.on("indexChanged",function(index){
	do_Page.fire("selectOneTab", {name: jsonTabs[index].name})
})

//订阅RefreshNewsTypes事件
do_ALayout_allTypes.on("touch",function(listdataSlides){
	//在当前页面下发送RefreshNewsTypes自定义消息
	do_Page.fire("RefreshNewsTypes", listdataTabs);
	//显示newsTypeGrids
	do_Page.fire("ShowAllNewsTypes");
});