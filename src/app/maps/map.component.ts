/**
 * Copyright 2019 Jim Armstrong (www.algorithmist.net)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

import { getCurrentOffset } from './libs/map-libs';

import { MapIconOptions } from './data/map-icon-options';

import { EventHandler } from './interfaces/event-handler';
import { INIT_COORDS  } from '../tokens';

import * as esri from 'esri-leaflet';
import * as L from 'leaflet';

/**
 * Leaflet Map Component
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
@Component({
  selector: 'app-map',

  templateUrl: './map.component.html',

  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {

  public mcText: string;                         // mouse coords text (innerHTML)

  @Input()
  public markers: {lat: number, long: number}[]; // Markers to overlay on Map

  public currentWidth: number;                   // current map width based on window width
  public currentHeight: number;                  // current map height based on window height

  protected baseLayer: any;                      // Map Base layer
  protected map: any;                            // Map reference (currently leaflet)
  protected mapLoaded = false;                   // True if the map has been loaded

  // The primary Map
  @ViewChild('primaryMap', {static: true}) protected mapDivRef: ElementRef;
  protected mapDiv: HTMLDivElement;

  // Leaflet Map Event Handlers (used for removal on destroy)
  protected onClickHandler: EventHandler;
  protected onMouseMoveHandler: EventHandler;

  constructor( @Inject(INIT_COORDS) protected _initCoords: {lat: number, long: number} )
  {
    this.baseLayer = null;

    // Leaflet Map Event Handlers
    this.onClickHandler     = (evt: any) => this.__onMapClick(evt);
    this.onMouseMoveHandler = (evt: any) => this.__onMapMouseMove(evt);

    // Initial mouse-coords text
    this.mcText = '';

    // some simple default values
    this.currentWidth  = 600;
    this.currentHeight = 200;
  }

  public ngOnInit(): void
  {
    // Reference to DIV containing map is used in Leaflet initialization
    this.mapDiv = this.mapDivRef.nativeElement;

    this.__initializeMap();
    this.__renderMap();
    this.__showMarkers();
  }

  public ngAfterViewInit(): void
  {
    this.map.invalidateSize();

    this.__initMapHandlers();
  }

  public ngOnDestroy(): void
  {
    this.map.off('click'    , this.onClickHandler );
    this.map.off('mousemove', this.onMouseMoveHandler);
  }

  /**
   * Basic map initialization
   */
  protected __initializeMap(): void
  {
    if (this.mapLoaded) {
      return;
    }

    this.mapLoaded = true;

    this.__updateMapSize();
  }

  /**
   * Render the map (establish center and base layer)
   */
  protected __renderMap(): void
  {
    // Create Leaflet Map in fixed DIV - zoom level is hardcoded for simplicity
    this.map = L.map(this.mapDiv, {
      zoomControl: false,
      zoomAnimation: false,
      trackResize: true,
      boxZoom: true,
    }).setView([this._initCoords.lat, this._initCoords.long], 10);

    this.baseLayer = esri.basemapLayer('Gray');
    this.map.addLayer(this.baseLayer);
  }

  /**
   * Show markers if they are defined
   */
  protected __showMarkers(): void
  {
    if (this.markers !== undefined && this.markers != null && this.markers.length > 0)
    {
      // Add markers
      const icon = L.icon({
        iconUrl: MapIconOptions.mapIcon,
        iconSize: MapIconOptions.iconSize,
        iconAnchor: MapIconOptions.iconAnchor,
        shadowUrl: MapIconOptions.mapShadowIcon,
        shadowSize: MapIconOptions.shadowSize,
        shadowAnchor: MapIconOptions.shadowAnchor,
      });

      const n: number = this.markers.length;
      let i: number;
      let m: L.marker;

      let x: number;
      let y: number;

      for (i = 0; i < n; ++i) {

        x = this.markers[i].lat;
        y = this.markers[i].long;

        if (x !== undefined && !isNaN(x) && y !== undefined && !isNaN(y))
        {
          // okay to add the icon
          m = L.marker([x, y], {icon: icon}).addTo(this.map);
        }
        else
        {
          // implement your own error handling
          console.log('MARKER ERROR, Marker number: ', (i+1), 'x: ', x, ' y: ', y);
        }
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  protected __onResize(event: any): void
  {
    this.__updateMapSize();

    this.map.invalidateSize();
  }

  /**
   * Update the current width/height occupied by the map
   */
  protected __updateMapSize(): void
  {
    // update width/height settings as you see fit
    this.currentWidth  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    this.currentHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 200;
  }

  /**
   * Initialize Leaflet Map handlers
   */
  protected __initMapHandlers(): void
  {
    this.map.on('mousemove', this.onMouseMoveHandler);
    this.map.on('click'    , this.onClickHandler );
  }

  /**
   * Execute on Leaflet Map click
   */
  protected __onMapClick(evt: any): void {

    const target: any = evt.originalEvent.target;

    console.log('Map click on: ', target);
  }

  /**
   * Execute on mouse move over Leaflet map
   *
   * @param evt Leaflet-supplied information regarding current mouse point, mainly geo coords.
   */
  protected __onMapMouseMove(evt: any): void
  {
    const offset: {x: number, y: number} = getCurrentOffset(this.map);

    // uncomment to study offset
    // console.log('offset computation:', offset);

    // Lat and Long are embedded in the event object
    const lat: string  = evt.latlng.lat.toFixed(3);
    const long: string = evt.latlng.lng.toFixed(3);
    this.mcText        = `Latitude: ${lat} &nbsp; &nbsp; Longitude: ${long}`;
  }
}
