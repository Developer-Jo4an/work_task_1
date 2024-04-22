import React, {useEffect, useRef, useState} from "react";
import CustomModal from "../baseComponents/gui/customModal/CustomModal";
import {useModal} from "../../hooks/useModal";
import Button from "../baseComponents/gui/button/Button";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Pagination} from "swiper";
import {safeHTML} from "../../utils/safeHTML";

SwiperCore.use([Pagination]);

const Tutorial = React.forwardRef(
  function Tutorial(props, ref) {
    const swiperRef = useRef();
    const [swiper, setSwiper] = useState(null);
    const [activeId, setActiveId] = useState(0);
    const {list, onClose} = props;
    const {id, closeModal} = useModal();


    useEffect(() => {
      swiperRef.current.swiper.slideTo(activeId);
    }, [swiper, activeId]);

    return (
      <CustomModal className={"custom-modal__message"}>
        <div className={"tutorial"} ref={ref}>
          <div className="tutorial__bg">
            <img src={"images/building-store/bg.svg"} alt=""/>
          </div>
          <div className="tutorial__content">
            <Swiper
              ref={swiperRef}
              modules={[Pagination]}
              centeredSlides={true}
              slidesPerView={1}
              slidesPerGroup={1}
              onInit={(i) => {
                setSwiper(i);
              }}
              onSlideChange={(i) => {
                setActiveId(i.realIndex);
              }}
              pagination={{
                el: '.tutorial__list-pagination',
                clickable: true
              }}
            >
              {list?.map(({image}, index) => (
                <SwiperSlide key={`slide-${index}`}>
                  <div className="tutorial__image">
                    <img src={image} alt=""/>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="tutorial__list-pagination"/>
            <div className="tutorial__text">{safeHTML(list[activeId]?.text)}</div>
            <Button className={"tutorial__button tutorial__button_next"}
                    onClick={() => {
                      if (activeId < list.length - 1) {
                        setActiveId(activeId + 1)
                      } else {
                        closeModal(id)
                        onClose?.();
                      }
                    }}
            >{
              activeId < list.length - 1 ?
                "Далее" : "Закрыть"
            }</Button>
            <Button className={"button_circle tutorial__close-button"}
                    onClick={() => {
                      closeModal(id);
                      onClose?.();
                    }}
            >
              <span className="tutorial__close-button-icon"/>
            </Button>
          </div>
        </div>
      </CustomModal>
    );
  });
export default Tutorial;
Tutorial.propTypes = {};

