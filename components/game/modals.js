import {getBuildingData, isEnough} from "../../utils/empire/data";
import scene from "../../redux/reducer/scene";
import {storeContent} from "../../constants/copyright";

export function requestInfo({data: {cell, area}}, {closeModal, dispatch, addModal}) {
  const buildingData = getBuildingData(cell, area);

  if (buildingData.is_broken) return requestUpdate({data: {cell, area}}, {closeModal, dispatch, addModal});

  addModal({
    type: "infoModal",
    props: {
      bg: {
        base: `images/building-store/${buildingData.type}-base.png`,
        path: `images/building-store/${buildingData.type}-path.png`
      },
      mod: buildingData.type,
      actions: {
        repair: {
          checker() {
            return !buildingData.disabledRepair;
          },
          action() {
            closeModal("all");
            dispatch(scene.thunks.repair({area, cell}))
          }
        },
        destroy: {
          checker() {
            return true;
          },
          action() {
            closeModal("all");
            requestDestroy({data: {cell, area}}, {closeModal, dispatch, addModal})

          }
        },
        upgrade: {
          checker() {
            return !buildingData.disabledUpgrade;
          },
          action() {
            closeModal("all");
            requestUpdate({data: {cell, area}}, {closeModal, dispatch, addModal});

          }
        }
      },
      ...buildingData
    }
  });
}

export function requestDestroy({data: {cell, area}}, {closeModal, dispatch, addModal}) {
  const buildingData = getBuildingData(cell, area);
  console.log("dd")
  addModal({
    type: "confirmationModal",
    props: {
      actions: {
        close: {
          checker() {
            return true;
          },
          action() {
            closeModal("all");
          }
        },
        destroy: {
          checker() {
            return !buildingData.disabledDestroy;
          },
          action() {
            closeModal("all");
            dispatch(scene.thunks.destroy({area, cell}))
          }
        },
      }
    }
  });
}

export function requestUpdate({data: {cell, area}}, {closeModal, dispatch, addModal}) {
  const buildingData = getBuildingData(cell, area);
  addModal({
    type: "updateModal",
    props: {
      bg: {
        base: `images/building-store/${buildingData.type}-base.png`,
        path: `images/building-store/${buildingData.type}-path.png`
      },
      mod: buildingData.type,
      actions: {
        repair: {
          checker() {
            return !buildingData.disabledRepair;
          },
          action() {
            closeModal("all");
            dispatch(scene.thunks.repair({area, cell}))
          }
        },
        destroy: {
          checker() {
            return true;
          },
          action() {
            closeModal("all");
            requestDestroy({data: {cell, area}}, {closeModal, dispatch, addModal})
          }
        },
        upgrade: {
          checker() {
            return !buildingData.disabledUpgrade;
          },
          action() {
            closeModal("all");
            dispatch(scene.thunks.upgrade({area, cell}))
          }
        }
      },
      ...buildingData
    }
  });
}

export function requestBuild({data: {cell, area, storeType}}, {closeModal, dispatch, addModal}, {wrapper: {eventBus}}) {
  const type = "storeModal";
  const event = {type: "check-modal-content", data: {type, content: storeContent[storeType]}};
  eventBus?.dispatchEvent(event);

  const {data: {content}} = event;

  addModal({
    type,
    props: {
      actions: {
        base: {
          checker({type}) {
            return isEnough(type, 0);
          },
          action({type}) {
            dispatch(scene.thunks.build({type, cell, area}));
            closeModal("all");
          }
        }
      },
      ...content
    }
  });
}
