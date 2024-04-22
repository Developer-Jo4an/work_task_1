import React, {useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Autoplay, Navigation, Pagination} from "swiper";
import InfoListItem from "./InfoListItem";
import useWindowSize from "../../hooks/useWindowSize";
import InfoInfo from "./InfoInfo";
import Button from "../baseComponents/gui/button/Button";
import classNames from "classnames";

SwiperCore.use([Autoplay, Pagination, Navigation]);

const InfoList = React.forwardRef(
  function InfoList({list, actions}, ref) {
    const [width, height] = useWindowSize();
    const [swiper, setSwiper] = useState(null);
    const [activeId, setActiveId] = useState(0);

    return (
      <div className={classNames("info__list", {
        "info__list_solo": list.length < 2
      })} ref={ref}>
        <div className="info__list-items">
          {list.length > 1
            ?
            <Swiper
              modules={[Pagination]}
              centeredSlides={true}
              slidesPerView={1}
              onInit={(i) => {
                setSwiper(i);
                console.log("i", i);
              }}
              onSlideChange={(i) => {
                setActiveId(i.realIndex);
              }}
              pagination={{
                el: '.info__list-pagination',
                clickable: true
              }}
              breakpoints={{
                1023: {
                  slidesPerView: list.length < 2 ? 1 : 3,
                  slidesPerGroup: list.length < 2 ? 1 : 3,
                  centeredSlides: list.length < 2,
                  spaceBetween: 15,
                }
              }}
            >
              {list?.map((item, index) =>
                <SwiperSlide key={`slide-${index}`}>
                  <InfoListItem {...item} actions={actions}/>
                </SwiperSlide>
              )}
            </Swiper>
            :
            <InfoListItem {...list[0]} actions={actions}/>
          }

        </div>

        {list.length > 1 && <div className="info__list-pagination"/>}
        {width < height && <InfoInfo className={"info__list-item-info"}
                                     {...list[activeId]}

        />}
        {width < height && swiper &&
          <Button className="info__list-item-button"
                  onClick={() => actions?.[list[swiper.realIndex].action ?? "base"]?.action?.(list[swiper.realIndex])}
                  disabled={!(actions?.[list[swiper.realIndex].action ?? "base"]?.checker?.(list[swiper.realIndex]) ?? true)}
          >
            Построить
          </Button>
        }
      </div>
    );
  });
export default InfoList;
InfoList.propTypes = {};

