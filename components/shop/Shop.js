import React from "react";
import Info from "../info/Info";
import {useScene} from "../../redux/reducer/scene";
import {getLevelItem, getStoreText, pricePrefixType} from "../../constants/texts";


const Shop = React.forwardRef(
  function Shop(props, ref) {
    const {types} = props;
    const {settings: {buildings}} = useScene();

    const buildingsList = buildings.filter(({type}) => types.includes(type));

    const list = buildingsList?.map(({type, improvements}, index) => {
      const improvementsIndex = improvements.indexOf(
        improvements.find(({is_start_improvement}) => is_start_improvement === true)
      );

      const activeInfo = improvements[improvementsIndex];
      const text = getStoreText(activeInfo);

      return {
        type,
        level: improvementsIndex,
        title: getLevelItem(type, improvementsIndex),
        text: `${text[type]}`,
        price: activeInfo.cost,
        pricePrefix: pricePrefixType.buy
      };
    });

    return (
      <Info {...props} list={list}/>
    );
  });
export default Shop;
Shop.propTypes = {};

