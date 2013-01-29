/**
A custom element to execute Salt modules via salt-api

@module saltui.elements
@submmodule exec-results
**/
define(function(require) {
    'use strict';

    var template = require('text!./template.html'),
        xhr = require('utils/xhr'),
        rivets = require('rivets'),
        drawtree = require('./tree'),
        xtag = require('x-tag');

    var exec_results = {
        onCreate: function() {
            document.addEventListener('exec', this.get_results);
            drawtree.init(this);
        },
        content: template,

        methods: {
            get_results: function(e) {
                var that = this;
                this.toggleVisibility();

                return xhr({method: 'GET', path: '/jobs/' + e.jid}, 700, 20)
                    .get('return').get(0)
                    .then(function (result) {
                        drawtree.updateTree(result);
                        that.toggleVisibility();
                    })
                    .done();
            },
            toggleVisibility: function() {
                xtag.toggleClass(this.firstChild, 'hide');

            }
        }
    };

    return exec_results;
});
