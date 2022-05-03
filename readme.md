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
  camera: {
    fov: 40,
    far: 200,
  },
  sky: {
    enabled: true,
    turbidity: 0,
    rayleigh: 0.079,
    mieCoefficient: 0.023,
    mieDirectionalG: 0.226,
    inclination: 70,
    azimuth: -102.7,
  },
  controls: {
    distance: { min: 30, max: 30 },
    polar: { min: 35, max: 35 },
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
    color: 14737632,
    intensity: 1.5,
    position: { x: 0, y: 15, z: 0 },
    shadowMapSize: 512,
  },
  renderer: {
    alpha: false,
    shadowType: 0,
    exposure: 0.5,
  },
  physics: false,
};

const webgl = new Webgl(config);
container.appendChild(render.domElement);
```

---

## Development

### Config

| method                 |        description         |                                 default |
| :--------------------- | :------------------------: | --------------------------------------: |
| .**camera**:_object_   | [perspectiveCamera] setup. | [default](#camera-default-config-value) |
| .**sky**:_object_      |        [Sky] setup.        |                                         |
| .**controls**:_object_ |                            |                                         |
| .**light**:_object_    |                            |

#### Default camera config

| key              | docs  | default |
| :--------------- | :---: | ------: |
| **fov**:_number_ | [fov] |      40 |
| **far**:_number_ | [far] |     200 |

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
| **offsetAzimuth**:_number_ |                 |                             0 |
| **panEasing**:_number_     |                 |                           100 |

#### Default light config

| key                        |  docs   |         default |
| :------------------------- | :-----: | --------------: |
| **color**:_number_         | [light] |        0xe0e0e0 |
| **intensity**:_number_     | [light] |             1.5 |
| **position**:_object_      | [light] | x: 0,y: 15,z: 0 |
| **shadowMapSize**:_number_ | [light] |             512 |

#### Default renderer config

| key                     |      docs       |              default |
| :---------------------- | :-------------: | -------------------: |
| **alpha**:_boolean_     | [WebGLRenderer] |                false |
| **shadowType**:_number_ | [WebGLRenderer] | THREE.BasicShadowMap |
| **exposure**:_number_   | [WebGLRenderer] |                  0.5 |

#### Default physics config

| key                   |    docs     | default |
| :-------------------- | :---------: | ------: |
| **physics**:_boolean_ | [cannon-es] |   false |

### Features

- Code Linting ([eslint])
- maintain if necessary

[eslint]: https://eslint.org/
[orbitcontrols]: https://threejs.org/docs/#examples/en/controls/OrbitControls
[perspectivecamera]: https://threejs.org/docs/index.html?q=cam#api/en/cameras/PerspectiveCamera
[sky]: https://threejs.org/examples/webgl_shaders_sky.html
[fov]: https://threejs.org/docs/?q=camera#api/en/cameras/PerspectiveCamera.fov
[far]: https://threejs.org/docs/?q=camera#api/en/cameras/PerspectiveCamera.far
[light]: https://threejs.org/docs/?q=light#api/en/lights/AmbientLight
[webglrenderer]: https://threejs.org/docs/?q=renderer#api/en/renderers/WebGLRenderer
[cannon-es]: https://www.npmjs.com/package/cannon-es
