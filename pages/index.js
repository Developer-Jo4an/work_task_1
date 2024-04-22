import React, {useEffect} from 'react';
import PageDescription from "../components/baseComponents/head/pageDescription/PageDescription";
import defaultPage from "../constants/page-description";
import Game from "../components/game/Game";
import HeadPanel from "../components/headPanel/HeadPanel";
import {useModal} from "../hooks/useModal";
import scene, {useScene} from "../redux/reducer/scene";
import ChecklistButton from "../components/checklistButton/ChecklistButton";
import HelpButton from "../components/helpButton/HelpButton";
import ExchangeButton from "../components/exchangeButton/ExchangeButton";

export default function Home() {
  const {addModal} = useModal();

  function showChecklist() {
    addModal({
      type: "checklistModal",
      props: {
        // ...worldState.world_state.area_2.cell_2
      }
    });
  }

  return (
    <div className="container">
      <PageDescription {...defaultPage}/>
      <Game/>
      <HeadPanel trees={10000} boxes={10000} money={10000}/>
      <ChecklistButton click={() => showChecklist()}/>
      <HelpButton click={() => addModal({
        type: "tutorialModal",
        props: {}
      })}/>
      <ExchangeButton click={() => addModal({
        type: "exchange",
        props: {
          actions:[]
        }
      })}/>

    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
