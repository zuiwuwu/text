﻿Ext.define('App.grfz.xxlr.pxda.pxxx', {
	extend:'App.framework.listfrm',
	url:'../PXGL/getPXGLLists',
	requires : ['App.Common.HyperLinkColumn'],
	title:'民主评测信息',
	gridautoLoad: true,
	pageitemselectkey:'PXDABH',
	width :'100%',
	flex:1,
	oldStyle : true,
	initComponent : function() {
		var me = this;	
	     	this.columns = [
	  			          {
	  						name : '',
	  						type : 'string',
	  						gridcol : {
	  							sortable : false,
	  							//autoSizable : true,
	  							xtype : 'rownumberer',
	  							header : '序号',
	  							width : 60
	  						}
	  					},
	  					{
	  						name : 'PXDABH',
	  						type : 'string',	
	  					},{
	  						name : 'XM',
	  						type : 'string',
	  						gridcol : {
	  							sortable : false,
	  							header : '姓名',
	  							width : 100,
	  					
	  						}
	  					},{
	  						name : 'SJ',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '时间',
	  							width : 200,
	  							/*renderer : function(value, metaData, record,
	  									rowIndex, colIndex, store) {
	  								return value.substr(0, 4)
	  										+'年'
	  										+ value.substr(4, 2)
	  										+'月'
	  										+ value.substr(6, 2)
	  										+ '日'
	  										+ value.substr(8, 2) + ':'
	  										+ value.substr(10, 2) + ':'
	  										+ value.substr(12, 2);
	  							}*/
	  						}
	  					},{
	  						name : 'DD',
	  						type : 'string',
	  						gridcol : {
	  							sortable : false,
	  							header : '地点',
	  							width : 100,
	  					
	  						}
	  					}, {
	  						name : 'PXMC',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '培训名称',
	  							width : 100
	  						}
	  					},{
	  						name : 'PXNR',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '培训内容',
	  							width : 100
	  						}
	  					},{
	  						name : 'PXDW',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '培训单位',
	  							width : 100
	  						}
	  					},{
	  						name : 'PXTS',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '培训天数',
	  							width : 110
	  						}
	  					},{
	  						name : 'PXCJ',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '培训成绩或得分',
	  							width : 100
	  						}
	  					},{
	  						name : 'SFYZS',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '是否有证书',
	  							width : 100
	  						}
	  					},{
	  						name : '',
	  						type : 'string',
	  						gridcol : {
	  							header : '操作',
	  							sortable : false,
	  							xtype : 'actioncolumn',
	  							flex : 1,
	  							minWidth : 160,
	  							items : [{
	  								        iconCls:'icon-grfz-Look-icon',
	  										tooltip : '查看详情',	
	  										text:'查看详情',	
	  										scope : this,
	  										width:50,
	  										handler : this.onDetails
	  									}, {
	  										iconCls : 'icon-grfz-Edit-icon',
	  										tooltip : '编辑',
	  										text:'编辑',
	  										width:50,
	  										scope : this,
	  										handler : function(grid, rowIndex, colIndex){
	  									    	var vme=this;
	  									        var rec = grid.getStore().getAt(rowIndex);
	  									        var v = Ext.create('App.grfz.xxlr.pxda.editDlg', {
	  									        	PXDABH: rec.get('PXDABH'),
	  									            url: '../PXGL/editPXXX',
	  									            modifyMod:true,
	  									            listeners: {
	  									                scope: vme,
	  									                saveok: function(){
	  									                	 vme.reLoad();
	  									                }
	  									            }
	  									        }).show();		  									    
	  										}
	  									},{
	  										iconCls : 'icon-grfz-Del',
	  										tooltip : '删除',
	  										text:'删除',
	  										width:50,
	  										scope : this,
	  										handler: function (grid, rowIndex, colIndex) {
	  					                        var rec = grid.getStore().getAt(rowIndex);
	  					                        this.delChn(rec.get('PXDABH'));
	  					                    }
	  									}
	  									]
	  						}
	  					}];	
		me.callParent(arguments);

	},
	  delChn: function (vchns) {
	        var vme = this;
	        Ext.MessageBox.confirm('提示', '是否确定要删除?', function (result) {
	            if (result != 'yes')
	                return;
	            var myMask = new Ext.LoadMask(vme, { msg: "正在删除，请稍候！" });
	            myMask.show();
	            Ext.Ajax.request({
	                url: '../PXGL/deletePXXX',
	                method: 'post', //方法  
	                params: { IDS: vchns },
	                callback: function (options, success, response) {
	                    myMask.hide();
	                    if (success) {
	                        var v = Ext.JSON.decode(response.responseText);
	                        if (!v.success)
	                            alert(v.msg);
	                        else
	                            vme.reLoad();
	                    }
	                    else {
	                        alert('删除失败！');
	                    }
	                }
	            });
	        });

	    },	    
	    onDelClick: function () {
	    	  var vsel = this.list.getSelectedString();
	    	  if(vsel!=''){
	          this.delChn(vsel);
	    	  }
	    },
	afterRender : function() {
		this.callParent(arguments);
		
	},	
	itemdblclick:function (grid, record, item, index, e, eOpts) {
	
    },
	
	
});
