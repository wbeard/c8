define(["dojo/_base/lang", 
        "./uid", 
        "dojo/query", 
        "dojo/dom", 
        "dojo/dom-construct", 
        "dojo/dom-style", 
        "dojo/on", 
        "dijit/focus",
        "dojo/_base/fx",
        "xstyle/css!.css/toaster.css"],
    function (lang, uid, query, dom, domConstruct, domStyle, on, focusUtil, fx) {

        return {
            fire: function (options) {
                this.options = lang.mixin(this.options, options);
                this._id = uid("toaster");
                domConstruct.place(this.structure(), query("body")[0]);
                this.domElem = dom.byId(this._id);

                fx.animateProperty({
                    node: this._id,
                    properties: {
                        opacity: 1,
                        bottom: 10
                    },
                    duration: 200
                }).play();

                on.once(query('[data-function=close]', this.domElem), "click", lang.hitch(this, this.close));

                setTimeout(lang.hitch(this, this.close), 15000);

                return this;
            },
            create: function (options) {
                this.options = lang.mixin(this.options, options);
                this._id = uid("toaster");
                return this.structure();
            },
            close: function () {
                //Hitch function to object, loses scope in callback
                onEndBound = lang.hitch(this, function () {
                    domConstruct.destroy(this._id)
                });
                fx.animateProperty({
                    node: this._id,
                    properties: {
                        opacity: 0,
                        bottom: 0
                    },
                    duration: 200,
                    onEnd: onEndBound
                }).play();
            },
            options: {
                body: "Things are looking good",
            },
            structure: function () {
                return '<div id="' + this._id + '" class="toaster"><i data-function="close" class="close"></i><p>' + this.options.body + '</p></div>'
            }

        };

    });