Ext.define('App.grfz.xxlr.tsda.gridButton', {
    extend: 'Ext.container.Container',
    layout:'absolute',
    border: 0,
	width :'100%',
	height:30,
	initComponent : function() {
		var me=this;
		 me.title = Ext.create('Ext.Component',{
		     x:10,
		     y:10,
		     //cls:'compay_right',
            html:'投诉档案'
			});
		 
		 me.name = Ext.create('Ext.form.field.Text', {
				name : 'NAME',
				x:1260,
			    y:0,
				fieldLabel : '姓名',
				labelWidth : 40,
				width : 150,
				height : 22,
				
			});
		 
		 me.query = Ext.create('Ext.button.Button', {
				
				x:1420,
			    y:0,
				text : '查询',
				
				scope : this,
				width : 50,
				height : 20,
				handler : this.onSearch
			});
		   me.addBtn= Ext.create('App.Common.ImageButtonEx',{
			    x:1480,
			    y:0,	
	 		    width:50,
	 		    height:20,
	 		   
	 			scope : this,
	 			tooltip: '添加',
	 			btnCls:  'icon-grfz-Add-icon',
	 			handler :this.addxx
				});
	 	    me.delBtn =this.searchButton = Ext.create('App.Common.ImageButtonEx',{
	 	    	x:1540,
				y:0,
			    width:50,
			    height:20,		  
				scope : this,
				tooltip: '删除',
				btnCls:  'icon-grfz-Del-icon',
				handler : this.onDelClick
				
				});
		 me.importBtn= Ext.create('App.Common.ImageButtonEx',{
			 x:1600,
			y:0,
		    width:50,
		    height:20,		    
			scope : this,
			tooltip: '导入',
			btnCls:  'icon-grfz-Import-icon',
			handler : this.onImportClick
			});
	    me.exportBtn =this.searchButton = Ext.create('App.Common.ImageButtonEx',{
	    	 x:1660,
			y:0,
		    width:50,
		    height:20,		   
			scope : this,
			tooltip: '导出',
			btnCls:  'icon-grfz-Export-icon',
			handler :this.onexportClick
			});
		me.items=[  me.title,
		           me.name,
		          me.query,
		           me.delBtn,
		           me.addBtn,
		           me.importBtn,
		           me.exportBtn
                 
   	          ]
   	me.callParent(arguments);
		},
		addxx: function(btn){
			var vme = this;
			 Ext.create('App.grfz.xxlr.tsda.addDlg', {
		            modifyMod: false,
		            url: '../TSGL/importTSXX',
		            listeners: {
		                scope: this,
		                saveok: function (result) {
		                	vme.tsxx.reLoad();
		                }
		            }
		        }).show();
			},
		onImportClick: function () {
			        var vme = this;
			        var flag = 'tsda';
			        Ext.create('App.Common.UploadFileDlg', {
			            url: '../TSGL/importExcel',
			            title: '导入数据',  
			            flag:flag,
			            listeners: {
			                saveok: function (result) {
			                	vme.tsxx.reLoad();
			                }
			            }
			        }).show();
			    },
			    
		onDelClick:function(){
					this.tsxx.onDelClick();  	
					    },
					    onSearch : function() {
							var store = this.gwxx.getStore();
							store.clearFilter(true);
							store.filter(this.getFilters());
						},
						
						getFilters : function() {
							return [ {
								property : 'XM',
								value : this.name.getRawValue()
							} ];
						},
						
						getfilter : function() {
							var vme = this;
							var filters = this.getFilters();
							filters.push({
								property : 'select',
								value : vme.list.getSelectedString()
							});
							return filters;
						},
});