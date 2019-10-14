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
 * Some useful map functions
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */

import * as L from 'leaflet';

export const getCurrentOffset = (map: any): {x: number, y: number} => {

  const layerCorner: L.Point = map.getPixelOrigin();
  const mapCorner: L.Point   = map.getPixelBounds().min;

  let xVal = 0;
  let yVal = 0;

  if (!layerCorner.equals(mapCorner)) {
    xVal = layerCorner.x - mapCorner.x;
    yVal = layerCorner.y - mapCorner.y;
  }

  return {x: xVal, y: yVal};
};

