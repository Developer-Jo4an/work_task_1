import React, {useMemo} from 'react';
import {
  buildInfo,
  buildingShopStatic,
  checklistModal,
  updateBuildStatic,
  actionModal, confirmationModal,
  extensionModal, startModal, tutorial, firstField, firstFactory, firstStore, firstRoad, exchangeModal
} from "../../constants/copyright";
import {node} from "prop-types";
import ModalProvider from "../baseComponents/controllers/modalController/ModalProvider";
import Preloader from "../baseComponents/gui/preloader/Preloader";
import Shop from "../shop/Shop";
import UpdateBuild from "../updateBuild/UpdateBuild";
import InfoModal from "../infoModal/InfoModal";
import MessageModal from "../messageModal/MessageModal";
import StartModal from "../startModal/StartModal";
import Tutorial from "../tutorial/Tutorial";
import ChecklistModal from "../checklistModal/ChecklistModal";
import HelpModal from "../helpModal/HelpModal";
import ExchangeModal from "../exchangeModal/ExchangeModal";

export default function MainLayout({children}) {
  return (
    <ModalProvider
      aliases={useMemo(() => ({
        startModal: {Modal: StartModal, props: {...startModal}},
        tutorialModal: {Modal: Tutorial, props: {...tutorial}},
        storeModal: {Modal: Shop, props: {...buildingShopStatic}},
        infoModal: {Modal: InfoModal, props: {...buildInfo}},
        checklistModal: {Modal: ChecklistModal, props: {...checklistModal}},
        updateModal: {Modal: UpdateBuild, props: {...updateBuildStatic}},
        actionModal: {Modal: MessageModal, props: {...actionModal}},
        confirmationModal: {Modal: MessageModal, props: {...confirmationModal}},
        extensionModal: {Modal: MessageModal, props: {...extensionModal}},
        firstField: {Modal: HelpModal, props: {...firstField}},
        firstFactory: {Modal: HelpModal, props: {...firstFactory}},
        firstStore: {Modal: HelpModal, props: {...firstStore}},
        firstRoad: {Modal: HelpModal, props: {...firstRoad}},
        exchange: {Modal: ExchangeModal, props: {...exchangeModal}},
        // infoModal: {Modal: InfoModal, props: {message: "Lorem ipsum"}}
      }), [])}
    >
      <Preloader/>
      <input type={"checkbox"} className={"custom-header__input"} id={"menu-burger"}/>
      <div className={'main-container'}>
        <div className={'content-wrapper'}>{children}</div>
      </div>
    </ModalProvider>
  )
}

MainLayout.propTypes = {
  children: node,
};
