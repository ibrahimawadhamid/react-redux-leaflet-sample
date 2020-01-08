import L from "leaflet";
import "./BrandControl.css";

L.Control.BrandControl = L.Control.extend({

    initialize: function (options) {
        L.Util.setOptions(this, options);
        this._container = null;
    },

    onAdd: function (map) {
        this._map = map;
        this._container = L.DomUtil.create('div', 'BrandControl');
        this._container.innerHTML =
            '<a href="https://www.linkedin.com/in/ibrahimhamid/" target="_blank">' +
                '<img src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg"/>' +
            '</a>';
        return this._container;
    },
});

L.control.brandControl = function (options) {
    return new L.Control.BrandControl(options);
};


export default L.control.brandControl;
