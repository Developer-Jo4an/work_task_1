import React, {useEffect} from "react";
import Info from "../info/Info";
import {useDispatch} from "react-redux";
import scene, {useScene} from "../../redux/reducer/scene";

const ChecklistModal = React.forwardRef(
  function ChecklistModal(props, ref) {
    const dispatch = useDispatch();
    const {tasks} = useScene();

    useEffect(() => {
      dispatch(scene.thunks.tasks());
    }, []);

    return (
      <Info {...props} checklist={tasks}/>
    );
  });
export default ChecklistModal;
ChecklistModal.propTypes = {};

