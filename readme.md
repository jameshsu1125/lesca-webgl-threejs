[![NPM](https://img.shields.io/badge/NPM-ba443f?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![React](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
[![React](https://img.shields.io/badge/-ReactJs-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://zh-hant.reactjs.org/)
[![React](https://img.shields.io/badge/Less-1d365d?style=for-the-badge&logo=less&logoColor=white)](https://lesscss.org/)
[![React](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://www.w3schools.com/html/)
[![React](https://img.shields.io/badge/-CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3schools.com/css/)
[![NPM](https://img.shields.io/badge/DEV-Jameshsu1125-9cf?style=for-the-badge)](https://www.npmjs.com/~jameshsu1125)

# Why use it?

It's can build full page webgl easily. inculde camera light orbitContorls sky sun.

#### [Live Demo](https://jameshsu1125.github.io/lesca-webgl-threejs/)

# Installation

```sh
npm install lesca-webgl-threejs --save
```

## Usage

```javascript
import Webgl from 'lesca-webgl-threejs';

const config = {
  camera: { zoom: 30, far: 75 },
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
    spot: {
      color: 0x999999,
      intensity: 0.9,
      far: 3,
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
    physicallyCorrectLights: false,
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
| .**camera**:_object_   | [OrthographicCamera] setup. |       [default](#default-camera-config) |
| .**sky**:_object_      |        [Sky] setup.         | [default](#camera-default-config-value) |
| .**controls**:_object_ |   [orbitcontrols] setep.    |          [default](#default-sky-config) |
| .**light**:_object_    |       [light] setup.        |        [default](#default-light-config) |
| .**renderer**:_object_ |   [webglrenderer] setup.    |     [default](#default-renderer-config) |
| .**physics**:_object_  |     [cannon-es] setup.      |      [default](#default-physics-config) |
| .**stats**:_object_    |      [stats-js] setup.      |        [default](#default-stats-config) |

#### Default camera config

| key                   |      docs      | default |
| :-------------------- | :------------: | ------: |
| **zoom**:_number_     |     [zoom]     |      30 |
| **far**:_number_      |     [far]      |     200 |
| **dom**:_HTMLElement_ | HTML container |         |

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
| **enabled**:_boolean_      | [orbitcontrols] |                          true |
| **distance**:_object_      | [orbitcontrols] |                min:30, max:30 |
| **polar**:_object_         | [orbitcontrols] |                min:35, max:35 |
| **azimuth**:_object_       | [orbitcontrols] | min: -Infinity, max: Infinity |
| **default**:_object_       | [orbitcontrols] |           polor:0, azimuth: 0 |
| **offsetAzimuth**:_number_ |     number      |                             0 |
| **panEasing**:_number_     |     number      |                           100 |

#### Methods of controls

| function Name                                   |            description             |                                parameters                                | return |
| :---------------------------------------------- | :--------------------------------: | :----------------------------------------------------------------------: | -----: |
| .**fixed**(_Object_)                            |      Fixed angle perspective       | { **polor**:_Number_, **azimuth**:_number_, **taregt**: _THREE.Vector3_} |   void |
| .**lookAt**(vec:_THREE.Vector3_)                |      focus on a target point       |                         **vec**:_THREE.Vector3_                          |   void |
| .**chase**(mesh: _THREE.Mesh_, height:_number_) | camera will follow target smoothly |                         **mesh**:_THREE.vector3_                         |   void |
| .**lock**()                                     |            lock camera             |                                                                          |   void |
| .**unlock**()                                   |           unlock camera            |                                                                          |   void |

#### Default light config

| key                        |       docs        |             default |
| :------------------------- | :---------------: | ------------------: |
| **ambient**:_object_       |      [light]      | [default](#ambient) |
| **spot**:_object_          |    [spotLight]    |         [default]() |
| **shadowMapSize**:_number_ |    [spotLight]    |                 256 |
| **debug**                  | [SpotLightHelper] |               false |

##### ambient

- `color`: **0x5289d2**
- `intensity`: **0.6**

##### spot

- `color`: **0x999999**
- `intensity`: **0.9**
- `position`: **{ x: 0, y: 15, z: 0 }**

#### Default renderer config

| key                                   |      docs       |              default |
| :------------------------------------ | :-------------: | -------------------: |
| **alpha**:_boolean_                   | [WebGLRenderer] |                false |
| **shadowType**:_number_               | [WebGLRenderer] | THREE.BasicShadowMap |
| **exposure**:_number_                 | [WebGLRenderer] |                  0.5 |
| **outputEncoding**:_number_           | [WebGLRenderer] |   THREE.sRGBEncoding |
| **physicallyCorrectLights**:_boolean_ | [WebGLRenderer] |                false |

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
[orbitcontrols]: https://threejs.org/docs/#examples/en/controls/OrbitControls
[orthographiccamera]: https://threejs.org/docs/?q=OrthographicCamera#api/en/cameras/OrthographicCamera
[sky]: https://threejs.org/examples/webgl_shaders_sky.html
[zoom]: https://threejs.org/docs/?q=OrthographicCamera#api/en/cameras/OrthographicCamera.zoom
[far]: https://threejs.org/docs/?q=OrthographicCamera#api/en/cameras/OrthographicCamera.far
[light]: https://threejs.org/docs/?q=light#api/en/lights/AmbientLight
[spotlight]: https://threejs.org/docs/#api/en/lights/SpotLight
[spotlighthelper]: https://threejs.org/docs/#api/en/helpers/SpotLightHelper
[webglrenderer]: https://threejs.org/docs/?q=renderer#api/en/renderers/WebGLRenderer
[cannon-es]: https://www.npmjs.com/package/cannon-es
[stats-js]: https://www.npmjs.com/package/stats-js
