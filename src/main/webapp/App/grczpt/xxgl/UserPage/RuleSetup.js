/**
 * 
 */

Ext.define('App.grczpt.xxgl.UserPage.RuleSetup.List', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    showProgressBarPager: false,
    lastgroupid: 0,
    header: false,
//    gridautoLoad: false,
    arrraySelModID: {},
    checkOnly: false,
    gridpageSize: 14,
    url: '../dimension/getLists',
    oldStyle: true,
    initComponent: function () {
        this.arrraySelModID = {};
        var vme = this;
        this.listeners =
        {
            scope: this,
            selectionchange: this.OnSelectionChange,
            
        };       
        this.cellEditing=new Ext.grid.plugin.CellEditing ({
	    	clicksToEdit:2 
	    })  ,	    
	    
        this.columns = [
        {
            name: '',
            type: 'string',
            gridcol: {
                sortable: false,
                xtype: 'rownumberer',
                header: "序号",
                width: 60
            }
        },
        {
            name: 'ID',
            type: 'string'
        },
        {
            name: 'NAME',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '维度名称',
                width: 150,
                editor: "textfield" 
            }
        },
        {
            name: 'ZQ',
            type: 'string',
            gridcol: {
                sortable: false,
                header: "周期",
                width: 150,
                editor: "textfield" 
            }
        },
        {
            name: 'PPFZ',
            type: 'string',
            gridcol: {
                sortable: false,
                header: "匹配阀值",
                width: 150,
                editor: "textfield" 
            }
        },
        {
            name: 'LBQZ',
            type: 'string',
            gridcol: {
                sortable: false,
                header: "类别权重",
                width: 150,
                editor: "textfield" 
            }
        },
        {
            name: 'JFSM',
            type: 'string',
            gridcol: {
                sortable: false,
                header: "积分说明",
                width: 150
            }
        }
        ];


        //////////////////////////////////////////////////////////////////////////
        //工具栏
        
       

        this.refreshChn = function () {
            vme.store.load();
        };

        this.getValues = function () {
            var v = new Array();
            for (var item in vme.arrraySelModID) {
                if (typeof (vme.arrraySelModID[item]) != 'function')
                    v.push(vme.arrraySelModID[item]);
            }
            return v;
        };

        this.callParent(arguments);

        this.store.on('load', function (store) {
            var vsel = new Array();
            for (var i = 0; i < store.getCount(); i++) {
                var rec = store.getAt(i);
                if (typeof vme.arrraySelModID[rec.get('ID')] != 'undefined') {
                    vsel.push(rec);
                }
            }
            vme.getSelectionModel().select(vsel);
        }, this);
    },
    OnSelectionChange: function (grid, selected, eOpts) {
    	this.arrraySelModID = {}
        for (var i = 0; i < selected.length; i++) {
            var rec = selected[i];
            this.arrraySelModID[rec.get('ID')] = {
            		ID : rec.get('ID'),
            		NAME : rec.get('NAME'),
            		ZQ : rec.get('ZQ'),
            		PPFZ : rec.get('PPFZ'),
            		LBQZ : rec.get('LBQZ')
            };
           
        }
       
    }
    
    
});

Ext.define('App.grczpt.xxgl.UserPage.RuleSetup', {
    extend: 'Ext.window.Window',
    flex: 1,
    width: 600,
    title: '规则属性设置',
    initComponent: function () {
        var vme = this;
        

        this.vchnlist = Ext.create('App.grczpt.xxgl.UserPage.RuleSetup.List', {
            height: 400,
            url: '../dimension/getLists',
            border: 0
        });
        
        this.fuzzy = Ext.create('Ext.form.field.Text', {
			emptyText : '模糊查询',
			width : 200
		});
		
		this.items = [ {
			xtype : 'panel',			
			border : 1,
			height : 400,
			tbar : ["维度名称", this.fuzzy, {
						iconCls : 'icon-find',
						text : "搜索",
						scope : this,
						
					},{
						iconCls : 'icon-add',
						margin : '0 0 0 10',
						text : '保存',
						scope : this,
						handler : this.onSaveAllClick
					}],
			items : [this.vchnlist]
			
		}]
        

       
        this.callParent(arguments);


        this.getValues = function () {
            return { RIGHTMODS: vme.vchnlist.getValues() };
        };
       
    },
    
    onSaveAllClick : function(){
    	var vme = this; 
    	console.log(vme.vchnlist.getValues() )
    	
    }

});
