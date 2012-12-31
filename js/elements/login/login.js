/**

@module saltui.elements
@submmodule login
**/
define(function(require) {
    'use strict';

    var template = require('text!./template.html'),
        rivets = require('rivets'),
        routes = require('conf/routes'),
        xhr = require('utils/xhr');

    var login = {
        onCreate: function() {
            this.innerHTML = template;

            this.xtag.form_data = {
                username: '',
                password: '',
                eauth: 'pam',
            };

            rivets.bind(this, {login: this.xtag.form_data, vm: this.xtag});
        },
        events: {
            'submit:delegate(form)': function(e) {
                e.preventDefault();

                var form_data = this.parentNode.xtag.form_data;

                xhr('post', '/login', form_data).then(function(result) {
                    window.location.hash = routes.get_url('exec');
                }).done();
            },
        },
    };

    return login;
});
