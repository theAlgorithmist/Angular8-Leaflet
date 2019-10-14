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

/**
 * (Leaflet) Map Icon Options
 */

import { IconOptions } from '../interfaces/icon-options';

export const MapIconOptions: IconOptions =
{
  iconAnchor: [0, 42],
  iconSize: [25, 42],
  mapIcon: './assets/maps/marker-icon.png',
  mapShadowIcon: './assets/maps/marker-shadow.png',
  shadowSize: [41, 41],
  shadowAnchor: [0, 41],
};
