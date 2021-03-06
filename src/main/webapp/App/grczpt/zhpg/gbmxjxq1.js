Ext.define('App.grczpt.zhpg.gbmxjxq1', {
	extend : 'Ext.Container',
	border:false,
	width:139,
	height:146,
	autoScroll:true,
	initComponent : function() {
		var vme = this;
		 ssd = '';

		if(this.ssd == '政工纪检室'){
			ssd = this.ssd;			
			this.store.proxy.url = this.url
			this.store.reload();
		}else if(this.ssd == '局领导'){
			ssd = this.ssd;			
			this.store.proxy.url = this.url
			this.store.reload();
		}else if(this.ssd == '综合保障室'){
			ssd = this.ssd;			
			this.store.proxy.url = this.url
			this.store.reload();
		}else if(this.ssd == '情报指挥室'){
			ssd = this.ssd;			
			this.store.proxy.url = this.url
			this.store.reload();
		}else if(this.ssd == '执法监督室'){
			ssd = this.ssd;			
			this.store.proxy.url = this.url
			this.store.reload();
		}else if(this.ssd == '维稳服从队'){
			ssd = this.ssd;			
			this.store.proxy.url = this.url
			this.store.reload();
		}else if(this.ssd == '案件侦办队'){
			ssd = this.ssd;			
			this.store.proxy.url = this.url
			this.store.reload();
		}else if(this.ssd == '治安防控队'){
			ssd = this.ssd;			
			this.store.proxy.url = this.url
			this.store.reload();
		}else if(this.ssd == '明珠派出所'){
			ssd = this.ssd;			
			this.store.proxy.url = this.url
			this.store.reload();
		}else if(this.ssd == '寺港派出所'){
			ssd = this.ssd;			
			this.store.proxy.url =this.url
			this.store.reload();
		}else if(this.ssd == '滨江派出所'){
			ssd = this.ssd;			
			this.store.proxy.url = this.url
			this.store.reload();
		}else if(this.ssd == '周山河街区派出所'){
			ssd = this.ssd;			
			this.store.proxy.url = this.url
			this.store.reload();
		}else if(this.ssd == '野徐派出所'){
			ssd = this.ssd;			
			this.store.proxy.url = this.url
			this.store.reload();
		}else if(this.ssd == '医药城派出所'){
			ssd = this.ssd;			
			this.store.proxy.url = this.url
			this.store.reload();
		}else if(this.ssd == '全局'){
			ssd = this.ssd;			
			this.store.proxy.url = this.url
			this.store.reload();
		}else {
			ssd = '全局';
			this.store.proxy.url = '../zhpg/getsjqk?bm='+ssd;
			this.store.reload();
		}
		
		

		//{PICURL:htmlEncode}
		var tpl = new Ext.XTemplate(
				'<tpl for="." >',
				'<div style="width:200px;height:25px;" >'+ 
				'<div style=" display:block; z-index:2; margin-left: 20px; width: 100px;color:#FFFFFF;font-size:14px; font-family: MicrosoftYaHei;">{DBM:htmlEncode}</div>'+
				'<div style=" display: block;z-index: 2;margin-left: 130px;margin-top: -18px;text-align: center;width: 50px;color: #FFFFFF;font-size: 14px;font-family: MicrosoftYaHei;">{XM:htmlEncode}</div>'+
				'<div style=" display:block; z-index:2; margin-left: 160px;margin-top: -18px;text-align: center; width: 10px;color:#FFFFFF;font-size:14px; font-family: MicrosoftYaHei;">{JQLB:htmlEncode}</div>'+

				' </div>'+
                '</tpl>'
				
		);
		this.dataview = Ext.create('Ext.view.View',{
			store :this.store,
			tpl:tpl,
			itemSelector: 'div.x-combo-list-item',
            listeners: {}
		})

		
		this.items=[this.dataview];
		
		this.callParent(arguments);
	},
    afterRender: function () {
        this.callParent(arguments);
        var me =this;
    },
/*    store : function(ssd){
    	Ext.Ajax.request({
			url : '../zhpg/getjlzydb?ss=' + ss,
			method : 'get',
			scope : this,
			
		});
    }*/
    
    store : new Ext.data.Store({
        autoLoad: true,
        remoteFilter: true,
        scope:this,
        pageSize:999,
        proxy: {
            noCache: this.noCache,
            type: 'ajax',
            actionMethods: 'post',
            url :'../zhpg/getsjqk?bm='+this.ssd,
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        },
        fields: [{
            name: "XM",
            type: 'string'
        }, {
            name: "DBM",
            type: 'string'
        }, {
            name: "JQLB",
            type: 'string'
        }],
        listeners:{
        	scope:this,
        	callback:function(){
        		alert("34");
        	}
        	
        }
    })
    
});
