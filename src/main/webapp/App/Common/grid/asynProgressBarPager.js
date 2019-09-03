﻿Ext.define('App.Common.grid.asynProgressBarPager', {
    requires: ['Ext.ProgressBar'],
    width: 225,
    defaultText: '正在加载',
    defaultAnimCfg: {
        duration: 1000,
        easing: 'bounceOut'
    },
    constructor: function (config) {
        if (config) {
            Ext.apply(this, config);
        }
    },
    init: function (parent) {
        var displayItem;
        if (parent.displayInfo) {
            this.parent = parent;

            displayItem = parent.child("#displayItem");
            if (displayItem) {
                parent.remove(displayItem, true);
            }

            this.progressBar = Ext.create('Ext.ProgressBar', {
                text: this.defaultText,
                width: this.width,
                animate: this.defaultAnimCfg,
                style: {
                    cursor: 'pointer'
                },
                listeners: {
                    el: {
                        scope: this,
                        click: this.handleProgressBarClick
                    }
                }
            });

            parent.displayItem = this.progressBar;

            parent.add(parent.displayItem);
            Ext.apply(parent, this.parentOverrides);
        }
    },
    handleProgressBarClick: function (e) {
        var parent = this.parent,
            displayItem = parent.displayItem,
            box = this.progressBar.getBox(),
            xy = e.getXY(),
            position = xy[0] - box.x,
            pages = Math.ceil(parent.totalcount / parent.parentpanel.gridpageSize),
            newPage = Math.max(Math.ceil(position / (displayItem.width / pages)), 1);

        parent.parentpanel.loadPage(newPage);
    },
    parentOverrides: {
        updateInfo: function () {
            if (this.displayItem) {
                var count = this.parentpanel.getCount(),
                    pageData = this.getPageData(),
                    message = count === 0 ?
                    this.emptyMsg :
                    Ext.String.format(
                        this.displayMsg,
                        pageData.fromRecord, pageData.toRecord, this.totalcount
                    ),
                    percentage = pageData.pageCount > 0 ? (pageData.currentPage / pageData.pageCount) : 0;

                this.displayItem.updateProgress(percentage, message, this.animate || this.defaultAnimConfig);
            }
        }
    }
});
