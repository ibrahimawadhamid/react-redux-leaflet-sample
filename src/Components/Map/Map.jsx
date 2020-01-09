import React, {Component} from 'react';
import {connect} from 'react-redux';
import L from 'leaflet';
import BrandControl from "../Controls/BrandControl/BrandControl";
import SpinnerControl from "../Controls/SpinnerControl/SpinnerControl";
import * as actions from "../../store/actions";
import "./Map.css";

class Map extends Component {
    componentDidMount() {
        const mbAttr = `${process.env.REACT_APP_NAME} v-${process.env.REACT_APP_VERSION}`,
            mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

        const grayscale   = L.tileLayer(mbUrl, {id: 'mapbox/light-v9', attribution: mbAttr}),
            darkscale   = L.tileLayer(mbUrl, {id: 'mapbox/dark-v9', attribution: mbAttr}),
            streets  = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11',   attribution: mbAttr});

        // create map
        this.map = L.map('map', {
            center: [25, 25],
            zoom: 4,
            layers: [grayscale]
        });
        var baseLayers = {
            "Grayscale": grayscale,
            "Darkscale": darkscale,
            "Streets": streets
        };

        L.control.layers(baseLayers).addTo(this.map);

        BrandControl({position: 'bottomright'}).addTo(this.map);
        SpinnerControl({position: 'topleft'}).addTo(this.map);

        this.map.on('zoomstart movestart', () => {
            this.showLoadingSpinner();
        });
        this.map.on('zoomend moveend', () => {
            this.hideLoadingSpinner();
        });
        // Show Map
        this.props.onSetMapVisible(true);
    }

    showLoadingSpinner = () => {
        document.getElementById("SpinnerControl").style.visibility = 'visible';
    }
    hideLoadingSpinner = () => {
        document.getElementById("SpinnerControl").style.visibility = 'hidden';
    }

    render() {
        return (
            <div id="map" className="map" style={{visibility: this.props.isMapVisible ? 'visible' : 'hidden' }}></div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isMapVisible: state.MapReducer.isMapVisible,
    };
};


const mapDispatchToProps = dispatch => {
    return {
        onSetMapVisible: (isMapVisible) => dispatch(actions.setMapVisible(isMapVisible)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);