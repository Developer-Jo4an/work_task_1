import React, {useCallback, useEffect, useMemo, useRef, useState, useTransition} from "react";
import {setImportPromise} from "../../utils/scene/utils/helpers/import";
import {ignoreNextStates} from "../../constants/empire";
import {useDispatch} from "react-redux";
import useStateReducer from "../../utils/scene/react/hooks/useStateReducer";
import sceneRedux, {getNextState, load, requestState, useScene} from "../../redux/reducer/scene";
import EmpireReduxBridge from "../../controllers/empire/bridge/EmpireReduxBridge";
import TestBuildings from "../testBuildings/TestBuildings";
import Exchanger from "../exchanger/Exchanger";
import {useModal} from "../../hooks/useModal";
import scene from "../../redux/reducer/scene";
import {actionsTexts, research, storeContent, think} from "../../constants/copyright";
import {getBuildingData, isEnough} from "../../utils/empire/data";
import {requestBuild, requestInfo} from "./modals";
import ProgressBar from "../progressBar/ProgressBar";
import MapPin from "../mapPin/MapPin";
import EventEffect from "../eventEffect/EventEffect";
import {CSSTransition, SwitchTransition} from "react-transition-group";


const Game = React.forwardRef(
  function Game({}, ref) {
    const wrapperRef = useRef();
    const {addModal, closeModal} = useModal();
    const dispatch = useDispatch();
    const {worldState, settings, isTutorialShown} = scene.selectors.useScene();
    const [, startTransition] = useTransition();

    const [constructionList, setConstructionList] = useState([]);
    const [buildingList, setBuildingList] = useState([]);
    const [closedAreas, setClosedAreas] = useState([]);
    const [eventData, setEventData] = useState(null);

    const data = useMemo(() => ({}), []);

    const [wrapper, setScene] = useState();

    const callbacks = useMemo(() => ({
      completeTutorial() {
        dispatch(scene.thunks.completeTutorial());
      },
      requestModal({data: {type}}) {
        addModal({
          type,
        })
      },
      openArea({onClick, areaName}) {
        const area = data.settings.areas.find(({name}) => name === areaName);
        addModal({
          type: "extensionModal",
          props: {
            buttons: [
              {
                text: research,
                action: "research"
              },
              {
                text: think,
                className: "button_red"
              }
            ],
            actions: {
              research: {
                checker() {
                  return true;
                },
                action: onClick
              }
            },
            price: area.open_cost
          }
        });
      },
      onRemoveEffect({data: {type}}) {
        setEventData(null);
        addModal({
          type: "actionModal",
          props: {
            text: actionsTexts[type]
          }
        });
      },
      onApplyEvent({data: {type, onComplete}}) {
        setEventData({type, onComplete});
      },
      requestInfo(event) {
        requestInfo(event, {closeModal, dispatch, addModal}, data);
      },
      requestBuild(event) {
        requestBuild(event, {closeModal, dispatch, addModal}, data);
      }
    }), []);

    const {state} = useScene();

    const eventEffect = useMemo(() => eventData ?
      <EventEffect {...eventData}/>
      : <></>, [eventData]);
    // const eventEffect = useMemo(() => <EventEffect type={"tornado"}/>, [eventData]);

    data.wrapper = wrapper;
    data.settings = settings;
    data.worldState = worldState;


    useEffect(() => {
      if (!isTutorialShown) {
        addModal({
          type: "startModal",
          props: {
            onClick() {
              addModal({
                type: "tutorialModal",
                props: {
                  onClose(){
                    dispatch(scene.actions.onShowTutorial());
                  }
                }
              });
            }
          }
        });
      }
    }, []);

    useEffect(() => {
      if (!wrapper) return;

      function update() {
        const {buildings, constructionBuildings, closedAreas} = wrapper;

        startTransition(() => {
          setConstructionList([...constructionBuildings]);
          setBuildingList([...buildings]);
          setClosedAreas([...closedAreas]);
        });

        requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
    }, [wrapper]);

    useEffect(() => {
      const promise =
        import("../../utils/scene/three/three")
          .then(() => import("../../controllers/empire/EmpireWrapper"))
          .then((data) => {
            const {default: EmpireWrapper} = data;

            new EmpireReduxBridge({
              dispatch,
              builderResult: sceneRedux,
              wrapper: EmpireWrapper.instance,
            });

            EmpireWrapper.instance.init();
            return data;
          });

      dispatch(load());
      setImportPromise(promise);

      promise.then(async ({default: EmpireWrapper}) => {
        const scene = EmpireWrapper.instance;
        const {eventBus} = scene;

        eventBus.addEventListener("complete-tutorial", callbacks.completeTutorial);
        eventBus.addEventListener("request-modal", callbacks.requestModal);
        eventBus.addEventListener("request-build", callbacks.requestBuild);
        eventBus.addEventListener("request-info", callbacks.requestInfo);
        eventBus.addEventListener("event:remove-effect", callbacks.onRemoveEffect);
        eventBus.addEventListener("event:apply", callbacks.onApplyEvent);

        setScene(scene);
        scene.appendContainer(wrapperRef.current);
      });

    }, []);

    useStateReducer({},
      ignoreNextStates,
      state => dispatch(requestState(getNextState(state))),
      state,
      wrapper
    );

    return (
      <div className={"game"} ref={ref}>
        <div className={"game__wrapper"} ref={wrapperRef}/>
        {constructionList
          .map((
              {stateProgress, buildProgressPin: {uuid, setView, viewData: {x, y, isVisible}}}, index
            ) =>
              <ProgressBar
                setView={setView}
                key={`progress_${uuid}`}
                progress={stateProgress * 100}/>
          )}
        {buildingList
          .map((
              {
                iconName, iconPin: {
                uuid,
                setView
              }
              }, index
            ) =>
              <MapPin
                key={uuid}
                type={iconName}
                setView={setView}
              />
          )}
        {closedAreas
          .map((
              {
                pin: {
                  data: {areaName},
                  setView, uuid, onClick
                }
              }, index
            ) =>
              <MapPin
                key={uuid}
                type={"empty"}
                interactive={true}
                onClick={() => callbacks.openArea({onClick, areaName})}
                setView={setView}
              />
          )}
        <SwitchTransition>
          <CSSTransition key={eventData ? 'show' : 'hide'} timeout={500}>
            {eventEffect}
          </CSSTransition>
        </SwitchTransition>

      </div>
    );
  });
export default Game;
Game.propTypes = {};

