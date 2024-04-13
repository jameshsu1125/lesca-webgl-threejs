import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DefaultGLBOption } from './config';
import { GLBOption, GMM } from './types';

const GlbLoader = (url: string, options: GLBOption): Promise<GMM> => {
  const combinedOptions = { ...DefaultGLBOption, ...options };
  const { onProcess, loop, castShadow, receiveShadow, material: mat } = combinedOptions;

  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();

  dracoLoader.setDecoderConfig({ type: 'js' });
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
  loader.setDRACOLoader(dracoLoader);

  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (gltf: GLTF) => {
        const mixers: THREE.AnimationMixer[] = [];
        const model: THREE.Group = gltf.scene;

        gltf.animations.forEach((clip) => {
          const animationMixer = new THREE.AnimationMixer(model);
          if (loop) {
            animationMixer.clipAction(clip).play().setLoop(THREE.LoopRepeat, Infinity);
          } else {
            const actions = animationMixer.clipAction(clip).play().setLoop(THREE.LoopOnce, 1);
            actions.clampWhenFinished = true;
          }
          mixers.push(animationMixer);
        });

        gltf.scene.traverse((node) => {
          const mesh = node;
          if (node instanceof THREE.Mesh) {
            const { name } = mesh;

            if (typeof castShadow === 'boolean') {
              mesh.castShadow = castShadow;
            } else {
              castShadow.forEach((e) => {
                if (e === name) mesh.castShadow = true;
              });
            }

            if (typeof receiveShadow === 'boolean') {
              mesh.receiveShadow = receiveShadow;
            } else {
              receiveShadow.forEach((e) => {
                if (e === name) mesh.receiveShadow = true;
              });
            }

            // ? => https://threejs.org/manual/#en/materials
            // @ts-ignore
            const { material } = mesh;
            if (material) {
              material.metalness = mat.metalness;
              material.roughness = mat.roughness;
              material.clearcoat = mat.clearcoat;
              material.clearcoatRoughness = mat.clearcoatRoughness;
            }
          }
        });

        const output: GMM = {
          gltf,
          model,
          mixers,
        };

        resolve(output);
      },
      (xhr) => {
        const { loaded, total } = xhr;
        onProcess(loaded, total);
      },
      () => {
        reject(new Error(`[lesca-glb-loader] load ${url} error`));
      },
    );
  });
};

export default GlbLoader;
