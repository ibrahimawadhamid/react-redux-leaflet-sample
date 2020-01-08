import React, {Component} from 'react';
import {connect} from 'react-redux';
import L from 'leaflet';
import BrandControl from "../Controls/BrandControl/BrandControl";
import SpinnerControl from "../Controls/SpinnerControl/SpinnerControl";
import * as actions from "../../store/actions";
import "./Map.css";

class Map extends Component {
    componentDidMount() {
        // create stamen layer
        const Stamen_TonerLite = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
            attribution: `${process.env.REACT_APP_NAME} v-${process.env.REACT_APP_VERSION}`,
            subdomains: 'abcd',
            minZoom: 0,
            maxZoom: 20,
            ext: 'png'
        });
        // create map
        this.map = L.map('map', {
            center: [49.8419, 24.0315],
            zoom: 16,
            layers: [
                Stamen_TonerLite,
            ]
        });

        BrandControl({position: 'bottomright'}).addTo(this.map);
        SpinnerControl({position: 'topleft'}).addTo(this.map);
        this.map.on('zoomstart movestart', () => {
            document.getElementById("SpinnerControl").style.visibility = 'visible';
        });
        this.map.on('zoomend moveend', () => {
            document.getElementById("SpinnerControl").style.visibility = 'hidden';
        });
        // Show Map
        this.props.onSetMapVisible(true);
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