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
import { BrowserModule } from '@angular/platform-browser';
import { NgModule      } from '@angular/core';

import { AppComponent        } from './app.component';
import { MapComponent        } from './maps/map.component';
import { MapControlComponent } from './maps/map-control/map-control.component';

import { INIT_COORDS } from './tokens';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapControlComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [{ provide: INIT_COORDS, useValue: {lat: 32.9756, long: -96.89} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
