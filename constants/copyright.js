import React from "react";
import {baseTypes, officeTypes, roadTypes} from "./empire";

export const header = {
  menuList: {
    customMenuItems: [
      {
        index: "1",
        itemsHref: "#",
        itemsText: "Link 1"
      },
      {
        index: "2",
        itemsHref: "#",
        itemsText: "Link 2"
      }
    ]
  }
};

export const research = "Исследовать";
export const think = "Ещё подумаю";

export const buildOfficeTitle = "Хотите построить здесь офис?";

export const buildRoadTitle = "Хотите построить здесь дорогу?";

export const storeContent = {
  base: {types: baseTypes},
  office: {types: officeTypes, title: buildOfficeTitle},
  road: {types: roadTypes, title: buildRoadTitle}
}

export const buildingShopStatic = {
  mod: "crane",
  bg: {
    base: "images/building-store/crane-base.png",
    path: "images/building-store/crane-path.png"
  },
  title: "Выберите, что хотите построить",

};
export const buildInfo = {
  mod: "box",
  bg: {
    base: "images/building-store/box-base.png",
    path: "images/building-store/box-path.png"
  },

};
export const updateBuildStatic = {
  mod: "crane",
  bg: {
    base: "images/building-store/crane-base.png",
    path: "images/building-store/crane-path.png"
  },
  title: "Улучшим постройку?",
};

export const checklistModal = {
  mod: "clip",
  bg: {
    path: "images/building-store/clip.png"
  },
  title: "Список заданий",
  checklist: [
    {
      text: "Построить первое здание"
    },
    {
      text: "Построить первое здание fdsfsf ssf dsfds fdsf "
    },
    {
      text: "Построить первое здание"
    },
    {
      text: "Построить первое здание"
    },
    {
      text: "Построить первое здание fsd sdd fer tregfdg drger dtert ert"
    },
    {
      text: "Построить первое здание"
    },
    {
      text: "Построить первое здание"
    },
    {
      text: "Построить первое здание"
    },
    {
      text: "Построить первое здание"
    },
    {
      text: "Построить первое здание"
    },
    {
      text: "Построить первое здание"
    },
    {
      text: "Построить первое здание fg d"
    },
    {
      text: "Построить первое здание gfgfd g dfgdf g"
    },
    {
      text: "Построить первое здание"
    },
    {
      text: "Построить первое здание ds sf s fdsg gdfgdf gdf "
    },
    {
      text: "Построить первое здание"
    },
    {
      text: "Построить первое здание"
    },
    {
      text: "Построить первое здание"
    },
    {
      text: "Построить первое здание"
    }
  ]
};

export const confirmationModal = {
  text: "Вы уверены, что хотите снести данную постройку?",
  buttons: [
    {
      action: "close",
      text: "Сохранить"
    },
    {
      action: "destroy",
      text: "Снести",
      className: "button_red"
    }
  ]
};


export const startModal = {
  image: "images/start-modal/main.png",
  title: "Добро пожаловать!",
  text: "Узнайте, смогли бы Вы построить собственную табачную империю.",
  button: {
    text: "Начать игру",
  }
};

export const tutorial = {
  list:[
    {
      image: "images/start-modal/item-1.png",
      text: "В&nbsp;Вашем распоряжении находится табачное поле, разделённое на&nbsp;3&nbsp;области. \nЧасть этого поля занимают леса. На&nbsp;Вашем счету 30&nbsp;000&nbsp;монет, которые&nbsp;Вы можете потратить на&nbsp;застройку этих участков.",
    },
    {
      image: "images/start-modal/item-2.png",
      text: "Ваша задача — расчистить поле \nи построить на нем новые здания будущей Табачной империи.",
    },
    {
      image: "images/start-modal/item-3.png",
      text: "В процессе игры Вы можете строить, ремонтировать, улучшать и даже сносить объекты. За эти действия из Вашего виртуального счета будет вычтена определенная сумма. Некоторые действия занимают также время."
    },
    {
      image: "images/start-modal/item-4.png",
      text: "У Вас есть ресурсы, позволяющие Вам развиваться: табак, упаковка и деньги. Каждый новый объект приносит Вам дополнительные ресурсы."
    },
    {
      image: "images/start-modal/item-5.png",
      text: "В&nbsp;ходе игры Вам предстоит столкнуться с&nbsp;природными катаклизмами: торнадо, потоп, землетрясение и&nbsp;заморозки."
    },
    {
      image: "images/start-modal/item-6.png",
      text: "В&nbsp;Вашу задачу входит также строительство дорог, чтобы наладить коммуникацию между зданиями, офисами и&nbsp;торговыми точками."
    },
    {
      image: "images/start-modal/item-7.png",
      text: "Ещё мы&nbsp;для вас подготовили ряд заданий, выполнив которые, вы&nbsp;сможете получить дополнительные бонусы на&nbsp;свой профиль на&nbsp;сайте."
    }
  ]


};

export const exchangeModal = {
  title:"Обмен ресурсов",
  text:"Можно обменять 5&nbsp;раз. \nКурс обмена 5&nbsp;к 1.",
  fromProps:{
    title:"Обменять",
    list:[],
    activeResource:0
  },
  toProps:{
    title:"Получить",
    activeResource:0
  },
  buttons: [
    {
      action: "change",
      text: "Обменять"
    },
    {
      action: "close",
      text: "Отмена",
      className: "button_red"
    }
  ]
};

export const actionsTexts = {
  tornado: "Торнадо повредило часть построек.\n Необходимо проверить всё\n и отремонтировать.",
  snowstorm: "Заморозки повредили часть построек.\n Необходимо проверить всё\n и отремонтировать.",
  flood: "Наводнение повредило часть построек.\n Необходимо проверить всё\n и отремонтировать.",
  earthquake: "Землетрясение повредило часть построек.\n Необходимо проверить всё\n и отремонтировать.",
};

export const actionModal = {
  title: "О нет!",
  text: "Непогода повредила часть построек.\n Необходимо проверить всё\n и отремонтировать.",
  buttons: [
    {
      text: "Понятно"
    }
  ]
};

export const extensionModal = {
  title: "Расширим границы империи?",
  text: "С новыми территориями, появятся новые места для постройки зданий, что повысит доход вашей империи.",
  price: '500',
  pricePrefix: "Стоимость исследования: ",
  buttons: [
    {
      text: "Исследовать"
    },
    {
      text: "Ещё подумаю",
      className: "button_red"
    }
  ]
};

export const firstField = {
  image:"images/help-modal/field.png",
  text:"Постройте ваше первое поле. Поле позволяет производить табак. Нажмите на&nbsp;стройку и&nbsp;выберите поле 1&nbsp;уровня."
};
export const firstFactory = {
  image:"images/help-modal/factory.png",
  text:"Постройте вашу первую фабрику. Фабрика позволяет производить коробки, перерабатывая табак. Нажмите на&nbsp;стройку и&nbsp;выберите фабрику 1&nbsp;уровня."
};
export const firstStore = {
  image:"images/help-modal/store.png",
  text:"Постройте вашу первую торговую точку. Она позволяет получить деньги, продавая коробки. Нажмите на&nbsp;стройку и&nbsp;выберите торговую точку 1&nbsp;уровня."
};
export const firstRoad = {
  image:"images/help-modal/road.png",
  text:"Осталось улучшить дорогу. Это поднимет производительность построенных зданий. Нажмите на&nbsp;иконку с&nbsp;дорогой и&nbsp;постройте&nbsp;её."
};
