import React, {useState} from "react";
import {useScene} from "../../redux/reducer/scene";
import {resources} from "../../constants/empire";
import {safeHTML} from "../../utils/safeHTML";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Autoplay, EffectCoverflow, Navigation, Pagination} from "swiper";
import classNames from "classnames";
import Icon from "../baseComponents/gui/icon/Icon";

SwiperCore.use([Autoplay, Pagination, Navigation, EffectCoverflow]);


const Exchange = React.forwardRef(
  function Exchange({title, items, type, value, setValue, onChange, onIncrease, onDecrease}, ref) {
    const images = [
      "tobacco",
      "boxes",
      "money",
    ]

    return (
      <div className={classNames("exchange", {
        [`exchange_${type}`]: type
      })} ref={ref}>
        <div className="exchange__title">{safeHTML(title)}</div>
        <div className="exchange__resources">
          {items?.length > 1 ?
            <button className="exchange__resources-button exchange__resources-button_prev">
              <Icon name={"up"}/>
            </button>
            : null}
          <div className="exchange__resources-list">
            <Swiper
              key={`carousel_${items?.length}`}
              direction={"vertical"}
              spaceBetween={2}
              navigation={{
                prevEl: `.exchange_${type} .exchange__resources-button_prev`,
                nextEl: `.exchange_${type} .exchange__resources-button_next`
              }}
              onSlideChange={({realIndex}) => onChange?.(realIndex)}
            >
              {items?.map((resource, index) => (
                <SwiperSlide key={`item-${index}`}>
                  <div className="exchange__item-image">
                    <img src={`images/head-panel/icon-${images.indexOf(resource) + 1}.png`} alt={resource}/>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {items?.length > 1 ?
            <button className="exchange__resources-button exchange__resources-button_next">
              <Icon name={"down"}/>
            </button>
            : null}
        </div>
        <div className="exchange__settings">
          {type === "to"
            ? <>
              <div className="exchange__settings-value">{value}</div>
            </>
            : <>
              <button className="exchange__settings-button exchange__settings-button_add"
                      onClick={onIncrease}
              >+
              </button>
              <div className="exchange__settings-value">{value}</div>
              <button className="exchange__settings-button exchange__settings-button_del"
                      onClick={onDecrease}
              >-
              </button>
            </>}

        </div>
      </div>
    );
  });
export default Exchange;
Exchange.propTypes = {};

