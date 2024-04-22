import declOfNum from "../components/info/DeclOfNum";

export const buildName = {
  store: "Магазин",
  factory: "Фабрика",
  field: "Поле",
  office: "Офис",
  road: "Дорога"
};

export const productionType = {
  tobacco: "табака",
  boxes: "коробок",
  money: "денег",
};

export const pricePrefixType = {
  update: "Стоимость улучшения: ",
  repair: "Стоимость ремонта: ",
  buy: "Стоимость постройки: ",
  study: "Стоимость исследования: ",
};

export const getStoreText = ({
                               production_cost, production_cost_type, production_quantity,
                               production_time, amplification_value, production_type
                             }) => ({
  store: `Позволяет продать ${production_cost}&nbsp;ед. ${productionType[production_cost_type]} за&nbsp;${production_quantity}&nbsp;ед. ${productionType[production_type]} за&nbsp;${production_time / 60 * 1}&nbsp;${declOfNum(production_time / 60 * 1, 'минуту', 'минуты', 'минут')}`,
  office: `Позволяет увеличить количество денег в&nbsp;${amplification_value}&nbsp;${declOfNum(production_time / 60 * 1, 'раз', 'раза', 'раз')}`,
  factory: `Позволяет переработать ${production_cost}&nbsp;ед. ${productionType[production_cost_type]} в&nbsp;${production_quantity}&nbsp;ед. ${productionType[production_type]} за&nbsp;${production_time / 60 * 1}&nbsp;${declOfNum(production_time / 60 * 1, 'минуту', 'минуты', 'минут')}`,
  field: `Позволяет произвести ${production_quantity}&nbsp;ед. ${productionType[production_type]} за&nbsp;${production_time / 60 * 1}&nbsp;${declOfNum(production_time / 60 * 1, 'минуту', 'минуты', 'минут')}`,
  road: `Дорога соединяет все важные объекты. Без дороги производство сильно замедляется.`
});

export const getLevelItem = (type, improvementsIndex) => `${buildName[type]} ${improvementsIndex + 1} уровня`;
