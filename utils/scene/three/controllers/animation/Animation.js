import AnimationLabel from "./AnimationLabel";
import {v4 as uuidv4} from 'uuid';

const {THREE} = global;

export default class Animation {

  static END_OFFSET = 0.01;

  _labelProgress = 0;

  constructor({model, duration, target, fps, name, labels = {}}) {

    if (!model) return;
    this.target = target;
    this.fps = fps ?? 60;
    this.mixer = new THREE.AnimationMixer(model);
    this.animationDuration = 0;
    this.name = name;

    model.animations.forEach((animation) => {
      this.animationDuration = Math.max(this.animationDuration, animation.duration);
      this.mixer.clipAction(animation).play()
    });
    this.mixer.setTime(0);

    const totalFrames = this.animationDuration * 60;

    this.labels = Object.entries(labels).map(([name, labelData]) => new AnimationLabel(name, {
      ...labelData,
      totalFrames,
      fps: this.fps,
      animationDuration: this.animationDuration
    }));

    this.duration = duration ?? this.animationDuration;
    this._progress = 0;
  }

  getLabelDuration(name) {
    return this.getLabelByName(name ?? this.label)?.duration;
  }

  play(params = {}) {
    gsap.to(this, {
      progress: 1,
      ease: "none",
      duration: this.duration * (1 - this._progress),
      onComplete: this.destroy,
      ...params
    });
  }

  set label(label) {
    this._label = label;
  }

  get label() {
    return this._label;
  }

  destroy = () => {

  };

  set labelProgress(progress) {
    this._labelProgress = progress;
    if (!this.label) return;
    const {startProgress, endProgress} = this.getLabelByName(this.label);
    this.progress = startProgress + (endProgress - startProgress) * this.labelProgress;
  }

  get labelProgress() {
    return this._labelProgress;
  }

  set progress(progress) {
    this._progress = progress;
    const duration = Math.max(0, this.animationDuration - Animation.END_OFFSET);

    this.mixer.setTime(duration * this.progress);
  }

  get progress() {
    return this._progress;
  }

  getLabelByName(name) {
    return this.labels.find(({name: labelName}) => name === labelName);
  }


  static addLabelAnimation(animation, from, to, duration, label, timeline, position) {

    const uuid = uuidv4();

    if (animation.gsapLabelProgress === undefined) {
      animation._gsapLabelProgress = 0;
      animation._callbacks = {};

      Object.defineProperty(animation, 'gsapLabelProgress', {
        get: function () {
          return this._gsapLabelProgress;
        },
        set: function (progress) {
          this._gsapLabelProgress = progress;
          animation._callbacks[animation.currentUUID]?.call(null);
        }
      });
    }

    return (timeline ?? gsap)
      .fromTo(
        animation,
        {
          gsapLabelProgress: from
        },
        {
          duration,
          ease: "none",
          onUpdate() {
            animation.currentUUID = uuid;
            animation.label = label;
            animation.labelProgress = animation.gsapLabelProgress;
          },
          onReverseComplete() {
            animation.currentUUID = uuid;
          },
          onStart() {
            animation.currentUUID = uuid;
          },
          gsapLabelProgress: to
        },
        position
      );
  }
}
