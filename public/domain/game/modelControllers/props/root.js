import ModelController from '../modelController.js';

export default class RootController extends ModelController {
  minScale = 0.1;
  maxScale = 0.4;
  scale = Math.random() * (this.maxScale - this.minScale) + this.minScale;
  models = [
    'assets/models/props/Root_01_LOD2.gltf',
    'assets/models/props/Root_02_LOD2.gltf',
    'assets/models/props/Root_03_LOD2.gltf',
  ];
  entity3d = {
    id: null,
    model: this.models[Math.floor(Math.random() * this.models.length)],
    position: null,
    animation: null,
    scale: `${this.scale} ${this.scale} ${this.scale}`,
    rotation: `0 ${Math.random() * 360} 0`,
  };
}
