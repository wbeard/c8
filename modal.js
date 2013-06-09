define(["dojo/_base/lang",
        "./uid",
        "dojo/query",
        "dojo/dom",
        "dojo/dom-construct",
        "dojo/dom-style",
        "dojo/on", 
        "dijit/focus",
        "dojo/_base/fx",
        "dojo/string",

        "dojo/text!./templates/modal.html",
        "xstyle/css!.css/modal.css"],
    function (  lang, 
                uid, 
                query, 
                dom, 
                domConstruct, 
                domStyle, 
                on, 
                focusUtil, 
                fx,

                string,
                template) {

        return {
            fire: function (options) {
                var structure = this.create();

                domConstruct.place(structure, query("body")[0]);

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
                bodyType: "text"
                button: "Alright, great!"
            },
            structure: function () {
                return string.substitute(template, this);
            }

        };

    });