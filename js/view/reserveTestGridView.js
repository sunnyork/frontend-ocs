var app = app || {};

app.ReserveTestGridView = Backbone.View.extend({

    el: '#row-init',

    // template: _.template($('#gridRow').html()),

    initialize: function () {
        // this.on({
        //     'bindReplaceButton': this.bindReplace,
        //     'bindDeleteButton': this.bindDelete
        // });
        // this.render();
        // this.trigger('bindReplaceButton');
    },

    render: function() {
        // this.$el.html(this.template(this.model.toJSON()));
        // this.buttonDelete = this.$('.ocs-btn-delete');
    },

});