import uuid from '../util/uuid.js';
import Status from './status.js';
import SpriteController from '../sprites/spriteController.js';

export default class Element {
  id = uuid();
  state = {
    position: {
      x: 0,
      y: 0,
    },
    destination: {
      x: 0,
      y: 0,
    },
    feelings: [],
    age: 0,
    lifespan: 0,
    clock: 70,
    viewRange: 100,
    status: Status.Stopped,
    speed: 1,
  };

  sprite = new SpriteController(this);
  types = [];
  runningActions = [];
  passiveActions = [];
  activeActions = [];
  life;
  logger = false;
  render = { miniMapColor: 'white' };

  getState() {
    return this.state;
  }

  setState(state) {
    this.state = state;
    this.updateRender();
  }

  updateRender() {
    window.vrCore?.renderElement(this);
  }

  live() {
    if (this.life == undefined && this.runningActions.length > 0) {
      this.life = setInterval(this.live.bind(this), this.state.clock);
    }
    this.runningActions.forEach((action) => {
      action.run(this);
    });
  }
  teleport(newPosition) {
    if (newPosition == undefined) {
      newPosition = window.core?.map?.find.randomClearLocation();
    }
    let state = this.getState();
    state.position = newPosition;
    this.setState(state);

    window.core?.map?.addElement(this);
  }
  speak(message) {
    if (this.logger) {
      console.log(
        '%c' + this.constructor.name + ' [' + this.state.feelings + '] :',
        'color:#9c610a',
        message,
      );
    }
  }
  remove() {
    clearInterval(this.life);
    window.core.removeAElement(this);
  }
}
