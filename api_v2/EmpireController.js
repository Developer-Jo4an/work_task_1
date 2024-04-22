import {basicGameData} from './constants/basicGameData';
import {empireTimeController} from './EmpireTimeController';
import moment from 'moment/moment';

class EmpireController {

  constructor() {
    this.gameData = {};
    // { account, areas, buildings, exchanger }
  }

  setGameData() {
    const gameData = localStorage.getItem('gameData');

    if (!gameData) {
      localStorage.setItem('gameData', JSON.stringify(basicGameData));
      this.gameData = basicGameData;
      return;
    }
    this.gameData = JSON.parse(gameData);
  }

  getGameData() {
    return this.gameData;
  }

  isHaveArea(area) {
    return this.gameData.account.world_state.hasOwnProperty(area);
  }

  subtractMoney(sum) {
    this.gameData.account.money_amount -= sum;
  }

  updateAccount(date) {
    this.gameData.account.update_at = moment(date).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')
  }

  build({area, building_type, cell}) {
    if (!this.isHaveArea(area)) {
      return {
        message: 'Area unavailable',
        error_code: 'error'
      };
    }

    const building = this.gameData.buildings.find(({type}) => type === building_type).improvements[0];

    const {start, end} = empireTimeController.countTime(building.construction_time);

    this.subtractMoney(building.cost);
    this.updateAccount(start);

    const prevWorldState = this.gameData.account.world_state
    const newCell = {
      [cell]: {
        type: building_type,
        cell: cell,
        improvement: building,
        'produce_start': null,
        'is_broken': false,
        'last_time_collected': null,
        'start_upgrading': start,
        'last_time_upgraded': end
      }
    }

    this.gameData.account.world_state = {
      ...prevWorldState,
      [area]: {
        ...prevWorldState[area],
        ...newCell
      }
    };

    // localStorage.setItem('gameData', JSON.stringify(this.gameData))

    return Promise.resolve(this.gameData.account)
  }

  upgrade() {

  }
}

export const empireController = new EmpireController();
