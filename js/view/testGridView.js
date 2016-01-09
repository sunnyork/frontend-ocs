// [======TODO=======]
// Find out how to limit the query range with specific start point,
// means fetch usable result only, but fetch all then filter in local.

var app = app || {};

app.TestGridView = Backbone.View.extend({

    el: '#app11',

    events: {

        'click #search-by-keyword' : function() {
            this.goSearch(1);
        },

        'click .pagination li' : function(event) {
            var toPage = $(event.currentTarget).attr('toPage');
            this.goSearch(parseInt(toPage));
        }

    },

    initialize: function() {

        this.gridContainer  = this.$('#exam-list');
        this.emptyRow       = this.$('#row-init');
        this.paginationList = this.$('#pagination-list');

    },

    // method
    goSearch: function(startFromPage) {

        this.testGridCollection = new app.TestGridCollection();

        this.listenTo(this.testGridCollection, 'sync', function() {
            if (this.testGridCollection.length == 0) {
                alert('no result found')
            } else {
                this.emptyRow.hide();
                this.gridContainer.empty();
                this.genGrid(this.genSlicedList(startFromPage));
                this.genPagination(startFromPage);
            }
        });

        this.testGridCollection.fetch();
    },

    genSlicedList: function(startFromPage) {
        
        var startFromRecord = (startFromPage -1) * 10,

            slicedList = this.testGridCollection.toJSON().slice(startFromRecord, startFromRecord+10);

        return slicedList;

    },

    genGrid: function(slicedList) {

        var that = this;

        _.each(slicedList, function(model, index) {

            var rowModel = new app.TestGridModel(model).set({order: index+1}),
                rowView = new app.TestGridRowView({
                    model: rowModel
                });
            that.gridContainer.append(rowView.$el);

        })
    },

    genPagination: function(resultStartFrom) {

        var destinationPage = resultStartFrom,
            recordLength = this.testGridCollection.length,
            pageLength = Math.floor(recordLength/10) +1,
            startPage = (function() {
                return (destinationPage%10 != 0)?
                    (Math.floor(destinationPage/10) * 10 + 1) :
                    (destinationPage - 9);
            })(),
            endPageIntheory = Math.ceil(destinationPage/10) * 10,
            endPage = (endPageIntheory > pageLength) ? pageLength : endPageIntheory,
            i;

        this.paginationList.empty();
        // console.log({
        //     destinationPage: destinationPage,
        //     recordLength: recordLength,
        //     pageLength: pageLength,
        //     startPage: startPage,
        //     endPage: endPage,
        // });
        
        // previous page link
        if (1 != destinationPage) {
            $('<li><a><span>&lt;</span></a></li>')
                .attr({
                    toPage : parseInt(destinationPage - 1),
                    title  : 'previous'
                })
                .appendTo(this.paginationList);
        }

        // generic page link
        for (i = startPage; i <= endPage; i ++) {
            var currentFlag = (destinationPage == i ) ? 'active' : '';
            $('<li />')
                .addClass(currentFlag)
                .attr('toPage', i)
                .append($('<a />').html(i))
                .appendTo(this.paginationList)
        }

        // next page link
        if (pageLength != destinationPage) {
            $('<li><a><span>&gt;</span></a></li>')
                .attr({
                    toPage : parseInt(destinationPage + 1),
                    title  : 'next'
                })
                .appendTo(this.paginationList);
        }

    }

});