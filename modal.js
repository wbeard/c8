define(["dojo/_base/lang",
        "c8/uid",
        "dojo/query",
        "dojo/dom",
        "dojo/dom-construct",
        "dojo/dom-style",
        "dojo/on", 
        "dijit/focus",
        "dojo/_base/fx",
        "xstyle/css!.css/modal.css"],
    function (lang, uid, query, dom, domConstruct, domStyle, on, focusUtil, fx) {

        return {
            fire: function (options) {
                this.options = lang.mixin(this.options, options);
                this._id = uid("modal");
                domConstruct.place(this.structure(), query("body")[0]);
                this.domElem = dom.byId(this._id);
                this.button = query("input[type='button']", dom.byId(this._id))[0];

                fx.fadeIn({
                    node: this._id,
                    duration: 100
                }).play();

                on.once(query('[data-function=close]', this.domElem), "click", lang.hitch(this, this.close));

                focusUtil.focus(query('input[data-function=close]', this.domElem)[0]);

                return this;

            },
            create: function (options) {
                this.options = lang.mixin(this.options, options);
                this._id = uid("modal");
                return this.structure();
            },
            close: function () {
                //Hitch function to object, loses scope in callback
                onEndBound = lang.hitch(this, function () {
                    domConstruct.destroy(this._id)
                });
                fx.fadeOut({
                    node: this._id,
                    duration: 100,
                    onEnd: onEndBound
                }).play();
            },
            options: {
                type: "message",
                header: "Howdy",
                body: "Things are looking good",
                button: "Alright, great!"
            },
            structure: function () {
                return '<div id="' + this._id + '" class="modal-bg modal-' + this.options.type + '"><div class="modal-window"><div class="modal-header"><h1>' + this.options.header + '</h1><i data-function="close" class="close"></i></div><div class="modal-body"><p>' + this.options.body + '</p></div><div class="modal-footer"><input type="button" data-function="close" class="button button-continue" value="' + this.options.button + '"></input></div></div></div>'
            }

        };

    });