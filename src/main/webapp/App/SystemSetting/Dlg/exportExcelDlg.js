﻿Ext.define('App.SystemSetting.Dlg.exportExcelDlg', {
    extend: 'Ext.window.Window',
    modal: true,
    resizable: false,
    title: "导出Excel文件",
    filters: [],
    url: '../LogonLog/ExportExcel',
    initComponent: function () {
        var me = this;

        this.pro = Ext.create('Ext.ProgressBar', {
            width: '100%'
        });

        this.items = [
        {
            xtype: 'container',
            layout: 'vbox',
            padding: '20 20 20 20',
            width: 400,
            items: [
        this.pro]
        }

        ];
        this.lastvalue = 0.0;
        me.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        this.startExport();
    },
    onMsgResult: function (result) {
        if (result.resultmsg) {
            for (var i = 0; i < result.resultmsg.length; i++) {
                if ('failed' == result.resultmsg[i].msgtype) {
                    this.pro.updateProgress(1, result.resultmsg[i].msg);
                    this.stopExport();
                    return;
                }
                else if ('file' == result.resultmsg[i].msgtype) {
                    Ext.saveframe.src = '/temp/exporttraffic/' + result.resultmsg[i].filename;
                }
                else {

                }

            }
        }
        this.pro.updateText(SPLanguage.getMessage("YWC") + result.finishedcount);
        if (result.finished) {
            
            this.pro.updateProgress(1, SPLanguage.getMessage("FINISH"));
            this.stopExport();

            this.close();
        }
    },
    onGetMsg: function () {
        if (this.getmsging)
            return;
        this.getmsging = true;
        var me = this;
        this.getmsghandle = Ext.Ajax.request({
            url: this.url,
            params: {cmd: 'get', id: this.workid },
            method: 'post', //方法  
            scope: this,
            callback: function (options, success, response) {
                this.getmsghandle = null;
                if (success) {
                    var result = Ext.JSON.decode(response.responseText);
                    if (result.success) {
                        this.getmsging = false;
                        this.onMsgResult(result);
                    }
                    else {
                        Ext.MessageBox.alert(SPLanguage.getMessage("REMINDER"), result.msg);
                        this.getmsging = false;
                        this.close();
                    }
                }
                else {
                    Ext.MessageBox.alert(SPLanguage.getMessage("REMINDER"), SPLanguage.getMessage("Net_Error"));
                    this.getmsging = false;
                    this.close();
                }
            }
        });
    },
    startExport: function () {
        
        if (this.pro)
            this.pro.updateProgress(0, SPLanguage.getMessage("ZZCXGCXX2"));
        this.stopExport();
        var me = this;
        var vparams = {
        	cmd: 'start',
            page: 1,
            start: 0,
            limit: 60000,
            sort: Ext.JSON.encode(this.sort||[]), 
            filter: Ext.JSON.encode(this.filters)
        };
        this.starthandle = Ext.Ajax.request({
            url: this.url,
            params: vparams,
            method: 'post', //方法  
            scope: this,
            callback: function (options, success, response) {
                this.starthandle = null;
                if (success) {
                    var result = Ext.JSON.decode(response.responseText);
                    if (result.success) {
                        //me.filename = result.values;
                        me.workid = result.msg;
                        me.gettimerid = setInterval(function () {
                            me.onGetMsg();
                        },
                        1000);

                        me.protimerid = setInterval(function () {
                            me.lastvalue += 0.01;
                            if (me.lastvalue > 1.0)
                                me.lastvalue = 0.0;
                            me.pro.updateProgress(me.lastvalue);
                        },
                        100);
                    }
                    else {
                        Ext.MessageBox.alert(SPLanguage.getMessage("REMINDER"), result.msg);
                        this.close();
                    }
                }
                else {
                    Ext.MessageBox.alert(SPLanguage.getMessage("REMINDER"), SPLanguage.getMessage("Net_Error"));
                    this.close();
                }
            }
        });

    },
    stopExport: function () {
        this.getmsging = false;
        if (this.gettimerid)
            clearInterval(this.gettimerid);
        //        this.gettimerid = null;
        if (this.protimerid)
            clearInterval(this.protimerid);
        this.protimerid = null;
        if (this.workid) {
            Ext.Ajax.request({
                url: this.url,
                params: { cmd: 'stop', id: this.workid },
                method: 'post', //方法  
                callback: function (options, success, response) {
                }
            });
        }
        if (this.starthandle)
            Ext.Ajax.abort(this.starthandle);
        this.starthandle = null;
        if (this.getmsghandle)
            Ext.Ajax.abort(this.getmsghandle);
        this.getmsghandle = null;
        this.workid = null;
    },
    destroy: function () {
        this.stopExport();
        this.callParent(arguments);
    }
});