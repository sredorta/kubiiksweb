import { Component, OnInit, ViewEncapsulation, Inject, PLATFORM_ID } from '@angular/core';
import { KiiMainContactService } from '../../services/kii-main-contact.service';
import { KiiMainDataService } from 'src/app/_features/main/services/kii-main-data.service';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { KiiMainSettingService } from 'src/app/_features/main/services/kii-main-setting.service';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';


declare var ol: any;

@Component({
  selector: 'kii-osm',
  templateUrl: './kii-osm.component.html',
  styleUrls: ['./kii-osm.component.scss'],
})
export class KiiOsmComponent extends KiiBaseAbstract implements OnInit {

  map: any;
  lat:number;
  lng:number;
  zoom:number;

  isBrowser : boolean = isPlatformBrowser(this._platformId);

  constructor(
    private kiiMainContact: KiiMainContactService,
    private settings : KiiMainSettingService,
    @Inject(PLATFORM_ID) private _platformId: any
    ) { super() }

  ngOnInit() {
    if (this.isBrowser) {
      this.kiiMainContact.load('osmjs','osmcss').then(data => {
        this.initMap();
      }).catch(error=> console.log(error));
      this.addSubscriber(
        this.settings.onChange.subscribe(res => {
          this.lat = parseFloat(this.settings.getByKey('latitude').value)
          this.lng = parseFloat(this.settings.getByKey('longitude').value)
          this.zoom = parseFloat(this.settings.getByKey('zoom').value)
        })
      )
    }

  }

  /**Initalizes the map */
  initMap() {
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.lng, this.lat]),
        zoom: this.zoom
      })
    });
    this.addPoint(this.lat, this.lng);
  }


  /**Adds marker to the coordinates */
  addPoint(lat: number, lng: number) {
    var vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857')),
        })]
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: "fraction",
          anchorYUnits: "fraction",
          src: "assets/kiilib/images/map-icon.png"
        })
      })
    });
    this.map.addLayer(vectorLayer);
  }

}
