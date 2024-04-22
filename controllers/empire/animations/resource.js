import gsap from "gsap";

export function inAnimation({item, background}) {

  return {
    kill() {
      item.visible = false;
      background.visible = false;
      gsap.killTweensOf(item.scale);
      gsap.killTweensOf(background.scale);
    },
    promise: new Promise(resolve => {

      if (!item.baseScale) item.baseScale = item.scale.clone();
      if (!background.baseScale) background.baseScale = background.scale.clone();

      item.visible = true;
      background.visible = true;
      const tl = gsap.timeline({onComplete: resolve});

      tl
        .fromTo(item.scale, {
          x: 0.001,
          y: 0.001,
          z: 0.001,
        }, {
          onUpdate: () => item.updateMatrix(),
          x: item.baseScale.x,
          y: item.baseScale.y,
          z: item.baseScale.z,
          duration: 0.5
        })
        .fromTo(background.scale, {
          x: 0.001,
          y: 0.001,
          z: 0.001,
        }, {
          onUpdate: () => background.updateMatrix(),
          x: background.baseScale.x,
          y: background.baseScale.y,
          z: background.baseScale.z,
          duration: 0.5
        }, "<")
    })
  }
}

export function cycleAnimation({item, background}) {

  return {
    kill() {
      item.visible = false;
      gsap.killTweensOf(item.position);
      gsap.killTweensOf(item.rotation);

      background.visible = false;
      gsap.killTweensOf(background.position);
      gsap.killTweensOf(background.rotation);
    },
    promise: new Promise(resolve => {
      const tl = gsap.timeline({onComplete: resolve});
      const duration = 1;
      if (!item.basePosition) item.basePosition = item.position.clone();
      if (!item.baseRotation) item.baseRotation = item.rotation.clone();

      if (!background.basePosition) background.basePosition = background.position.clone();
      if (!background.baseRotation) background.baseRotation = background.rotation.clone();

      gsap.killTweensOf(item.position);
      gsap.killTweensOf(item.rotation);

      gsap.killTweensOf(background.position);
      gsap.killTweensOf(background.rotation);

      item.visible = true;
      background.visible = true;

      tl.fromTo(item.position, {
          y: item.basePosition.y
        }, {
          y: item.basePosition.y + 0.2,
          onUpdate: () => item.updateMatrix(),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          duration
        }
      )
        .fromTo(background.position, {
            y: background.basePosition.y
          }, {
            y: background.basePosition.y + 0.2,
            onUpdate: () => background.updateMatrix(),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            duration
          },
          "<"
        )
        .fromTo(item.rotation, {
          y: item.baseRotation.y
        }, {
          y: item.baseRotation.y + Math.PI * 2,
          ease: "sine.inOut",
          repeat: -1,
          duration,
          repeatDelay: duration * 2
        }, "<")
    })
  }
}
