[![NPM](https://img.shields.io/badge/NPM-ba443f?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![React](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
[![React](https://img.shields.io/badge/-ReactJs-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://zh-hant.reactjs.org/)
[![React](https://img.shields.io/badge/Less-1d365d?style=for-the-badge&logo=less&logoColor=white)](https://lesscss.org/)
[![React](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://www.w3schools.com/html/)
[![React](https://img.shields.io/badge/-CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3schools.com/css/)
[![NPM](https://img.shields.io/badge/DEV-Jameshsu1125-9cf?style=for-the-badge)](https://www.npmjs.com/~jameshsu1125)

# Why use it?

It's can build full page webgl easily. include camera light orbitControls sky sun.

#### [Live Demo](https://jameshsu1125.github.io/lesca-webgl-threejs/)

# Installation

```sh
npm install lesca-webgl-threejs --save
```

## Usage

```javascript
import Webgl from 'lesca-webgl-threejs';
import { CameraType } from 'lesca-webgl-threejs/types';

const config = {
  fps: 0,
  camera: { zoom: 30, far: 75, type: CameraType.perspective, dom: undefined },
  sky: {
    enabled: true,
    turbidity: 3.8,
    rayleigh: 2.967,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.7,
    inclination: 70,
    azimuth: 180,
  },
  controls: {
    distance: { min: 13, max: 30 },
    polar: { min: -70, max: 70 },
    azimuth: { min: -Infinity, max: Infinity },
    default: {
      polar: 0,
      azimuth: 0,
    },
    offsetAzimuth: 0,
    enabled: true,
    panEasing: 100,
  },
  light: {
    ambient: {
      color: 0x5289d2,
      intensity: 0.6,
    },
    point: {
      enabled: true,
      color: 0x999999,
      intensity: 0.9,
      distance: 3,
      decay: 0.5,
      position: { x: 0, y: 3, z: 10 },
    },
    spot: {
      enabled: false,
      color: 0x999999,
      intensity: 0.9,
      distance: 3,
      decay: 0.5,
      angle: Math.PI * 0.12,
      penumbra: 1,
      position: { x: 0, y: 3, z: 0 },
    },
    shadowMapSize: 256,
    debug: true,
  },
  renderer: {
    alpha: false,
    shadowType: THREE.PCFSoftShadowMap,
    exposure: 0.5,
    outputEncoding: THREE.sRGBEncoding,
  },
  physics: false,
  stats: true,
};

const webgl = new Webgl(config);
container.appendChild(render.domElement);
```

---

## Development

### Config

| method                 |         description         |                                 default |
| :--------------------- | :-------------------------: | --------------------------------------: |
| .**fps**:_number_      |           set fps           |                                       0 |
| .**camera**:_object_   | [OrthographicCamera] setup. |       [default](#default-camera-config) |
| .**sky**:_object_      |        [Sky] setup.         | [default](#camera-default-config-value) |
| .**controls**:_object_ |   [orbitControls] setup.    |          [default](#default-sky-config) |
| .**light**:_object_    |       [light] setup.        |        [default](#default-light-config) |
| .**renderer**:_object_ |   [webglRenderer] setup.    |     [default](#default-renderer-config) |
| .**physics**:_object_  |     [cannon-es] setup.      |      [default](#default-physics-config) |
| .**stats**:_object_    |      [stats-js] setup.      |        [default](#default-stats-config) |

#### Default camera config

| key                    |            docs             |     default |
| :--------------------- | :-------------------------: | ----------: |
| **zoom**:_number_      |           [zoom]            |          30 |
| **far**:_number_       |            [far]            |         200 |
| **dom**:_HTMLElement_  |       HTML container        |             |
| **type**:_enum:number_ | orthographic or perspective | perspective |

#### Default sky config

| key                          | docs  | default |
| :--------------------------- | :---: | ------: |
| **enabled**:_boolean_        |       |    true |
| **turbidity**:_number_       | [sky] |       0 |
| **rayleigh**:_number_        | [sky] |   0.079 |
| **mieCoefficient**:_number_  | [sky] |   0.023 |
| **mieDirectionalG**:_number_ | [sky] |   0.226 |
| **inclination**:_number_     | [sky] |      70 |
| **azimuth**:_number_         | [sky] |  -102.7 |

#### Default controls config

| key                        |      docs       |                       default |
| :------------------------- | :-------------: | ----------------------------: |
| **enabled**:_boolean_      | [orbitControls] |                          true |
| **distance**:_object_      | [orbitControls] |                min:30, max:30 |
| **polar**:_object_         | [orbitControls] |                min:35, max:35 |
| **azimuth**:_object_       | [orbitControls] | min: -Infinity, max: Infinity |
| **default**:_object_       | [orbitControls] |           polar:0, azimuth: 0 |
| **offsetAzimuth**:_number_ |     number      |                             0 |
| **panEasing**:_number_     |     number      |                           100 |

#### Methods of controls

| function Name                                   |            description             |                                parameters                                | return |
| :---------------------------------------------- | :--------------------------------: | :----------------------------------------------------------------------: | -----: |
| .**fixed**(_Object_)                            |      Fixed angle perspective       | { **polar**:_Number_, **azimuth**:_number_, **target**: _THREE.Vector3_} |   void |
| .**lookAt**(vec:_THREE.Vector3_)                |      focus on a target point       |                         **vec**:_THREE.Vector3_                          |   void |
| .**chase**(mesh: _THREE.Mesh_, height:_number_) | camera will follow target smoothly |                         **mesh**:_THREE.vector3_                         |   void |
| .**lock**()                                     |            lock camera             |                                                                          |   void |
| .**unlock**()                                   |           unlock camera            |                                                                          |   void |
| .**set**()                                      |       set angle and distance       |   { **polar**:_Number_, **azimuth**:_number_, **distance**: _number_}    |   void |
| .**get**()                                      |       get angle and distance       |   { **polar**:_Number_, **azimuth**:_number_, **distance**: _number_}    |   void |

#### Default light config

| key                        |       docs        |             default |
| :------------------------- | :---------------: | ------------------: |
| **ambient**:_object_       |      [light]      | [default](#ambient) |
| **spot**:_object_          |    [spotLight]    |         [default]() |
| **point**:_object_         |   [pointLight]    |         [default]() |
| **shadowMapSize**:_number_ |    [spotLight]    |                 256 |
| **debug**                  | [SpotLightHelper] |               false |

##### ambient

- `color`: **0x5289d2**
- `intensity`: **0.6**

##### spot

- `color`: **0x999999**
- `intensity`: **0.9**
- `position`: **{ x: 0, y: 15, z: 0 }**
- `distance`: **3**
- `decay`: **0.5**
- `angle`: **Math.PI \* 0.12**
- `penumbra`: **1**

##### point

- `color`: **0x999999**
- `intensity`: **0.9**
- `distance`: **3**
- `position`: **{ x: 0, y: 15, z: 0 }**
- `decay`: **0.5**

#### Default renderer config

| key                         |      docs       |              default |
| :-------------------------- | :-------------: | -------------------: |
| **alpha**:_boolean_         | [WebGLRenderer] |                false |
| **shadowType**:_number_     | [WebGLRenderer] | THREE.BasicShadowMap |
| **exposure**:_number_       | [WebGLRenderer] |                  0.5 |
| **outputEncoding**:_number_ | [WebGLRenderer] |   THREE.sRGBEncoding |

#### Default physics config

| key                   |    docs     | default |
| :-------------------- | :---------: | ------: |
| **physics**:_boolean_ | [cannon-es] |   false |

#### Default stats config

| key                 |    docs    | default |
| :------------------ | :--------: | ------: |
| **stats**:_boolean_ | [stats-js] |   false |

### Features

- Code Linting ([eslint])
- maintain if necessary

[eslint]: https://eslint.org/
[orbitControls]: https://threejs.org/docs/#examples/en/controls/OrbitControls
[orthographicCamera]: https://threejs.org/docs/?q=OrthographicCamera#api/en/cameras/OrthographicCamera
[perspectivecamera]: https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
[sky]: https://threejs.org/examples/webgl_shaders_sky.html
[zoom]: https://threejs.org/docs/?q=OrthographicCamera#api/en/cameras/OrthographicCamera.zoom
[far]: https://threejs.org/docs/?q=OrthographicCamera#api/en/cameras/OrthographicCamera.far
[light]: https://threejs.org/docs/?q=light#api/en/lights/AmbientLight
[spotLight]: https://threejs.org/docs/#api/en/lights/SpotLight
[pointLight]: https://threejs.org/docs/#api/en/lights/PointLight
[spotlighthelper]: https://threejs.org/docs/#api/en/helpers/SpotLightHelper
[pointlighthelper]: https://threejs.org/docs/#api/en/helpers/PointLightHelper
[webglRenderer]: https://threejs.org/docs/?q=renderer#api/en/renderers/WebGLRenderer
[cannon-es]: https://www.npmjs.com/package/cannon-es
[stats-js]: https://www.npmjs.com/package/stats-js
