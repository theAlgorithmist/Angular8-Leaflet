# Integrating Leaflet Map Into Angular 8

This is the code distribution for the Medium Article, _[Integrating maps into your Angular application with Leaflet](https://medium.com/ngconf/integrating-maps-into-your-angular-application-with-leaflet-b9aedb040735)_ .

This code distribution illustrates how to integrate Leaflet Map using ESRI tiles into an Angular 8 component.  The map is responsive and adjusts its width based on current browser width.  The demo also illustrates that Angular components may be used as custom map controls.  Map icons are also displayed.

This should be a sufficient introduction into Angular/Leaflet integration to begin working on a wide variety of mapping appliations with these tools.


Author:  Jim Armstrong - [The Algorithmist]

@algorithmist

theAlgorithmist [at] gmail [dot] com

Angular: 8.0.1

Leaflet: 1.5.1

Esri-Leaflet: 2.2.4

Angular CLI: 8.0.3

Typescript: 3.4.3

## Running the demo

After loading, the map is rendered at the center coordinates injected into the application.  The zoom level is currently hardcoded along with some map marker coordinates.  Change as you see fit.

To inject a new map center, alter the coordinates in _/src/app/app.module.ts_,

```
  providers: [{ provide: INIT_COORDS, useValue: {lat: 32.9756, long: -96.89} }],
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


License
----

Apache 2.0

**Free Software? Yeah, Homey plays that**

[//]: # (kudos http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[The Algorithmist]: <https://www.linkedin.com/in/jimarmstrong>
