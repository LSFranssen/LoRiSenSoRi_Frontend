import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/update";

const initialState = {
  loading: false,

  tanks: [],
  sensorlogTanks: [],

  sensorlogTank: [],
  sensorData: [],
  
  tankId: null,
  dev_id: null,
  openingstijd: null,
  sluitingstijd: null,
  sensorId: null,
  accuniveau: null,
  dieselniveau: null,
  lat: null,
  lng: null,
  vermogenZonnepaneel: null,
  slotStatus: 0,
  bouwjaar: null,
  diameter: null,
  gewicht: null,
  inhoud: null,
  lengte: null,
  meldingTanken: null,
  status: null,
  tanknaam: null,
  tanknummer: null,
  type: null
};

// fetch all tanks
const fetchTanksStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchTanksSucces = (state, action) => {
  return updateObject(state, {
    tanks: action.tanks,
    loading: false
  });
};

const fetchTanksFail = (state, action) => {
  return updateObject(state, { loading: false });
};

// add user
const addTankStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const addTankSucces = (state, action) => {
  const newTank = updateObject(action.tankData); 
  return updateObject(state, {
    loading: false,
    tanks: state.tanks.concat(newTank) 
  });
};

const addTankFail = (state, action) => {
  return updateObject(state, { loading: false });
};

// fetch tank by id
const fetchTankByIdStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchTankByIdSucces = (state, action) => {
  return updateObject(state, {
    bouwjaar: action.tank.bouwjaar,
    diameter: action.tank.diameter,
    gewicht: action.tank.gewicht,
    inhoud: action.tank.inhoudLiters,
    lengte: action.tank.lengte,
    meldingTanken: action.tank.meldingtanken,
    openingstijd: action.tank.openingstijd,
    sluitingstijd: action.tank.sluitingstijd,
    status: action.tank.status,
    tankId: action.tank.tankId,
    tanknaam: action.tank.tanknaam,
    tanknummer: action.tank.tanknummer,
    type: action.tank.type,
    loading: false
  });
};

const fetchTankByIdFail = (state, action) => {
  return updateObject(state, { loading: false });
};

// fetch laatste sensordata tank by id
const fetchTankOverviewByIdStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchTankOverviewByIdSucces = (state, action) => {
  let gpsBreedtegraad = action.sensorDataTank.gpsBreedtegraad;
  let gpsBreedteMinuut = action.sensorDataTank.gpsBreedteMinuut;
  let gpsBreedteSeconde = action.sensorDataTank.gpsBreedteSeconde;
  let gpsBreedteTiendeSec = action.sensorDataTank.gpsBreedteTiendeSec;
  let lat = gpsBreedtegraad + gpsBreedteMinuut / 60 + gpsBreedteSeconde / (60 * 60) + gpsBreedteTiendeSec / (60 * 60 * 10);

  let gpsLengtegraad = action.sensorDataTank.gpsLengtegraad;
  let gpsLengteMinuut = action.sensorDataTank.gpsLengteMinuut;
  let gpsLengteSeconde = action.sensorDataTank.gpsLengteSeconde;
  let gpsLengteTiendeSec = action.sensorDataTank.gpsLengteTiendeSec;
  let lng = gpsLengtegraad + gpsLengteMinuut / 60 + gpsLengteSeconde / (60 * 60) + gpsLengteTiendeSec / (60 * 60 * 10);

  return updateObject(state, {
    loading: false,
    dev_id: action.sensorDataTank.devId,
    tankId: action.sensorDataTank.tankId,
    sensorId: action.sensorDataTank.sensorId,
    accuniveau: action.sensorDataTank.accuniveau,
    dieselniveau: action.sensorDataTank.dieselniveau,
    lat: lat,
    lng: lng,
    vermogenZonnepaneel: action.sensorDataTank.vermogenZonnepaneel,
    slotStatus: action.sensorDataTank.slotStatus,
    openingstijd: action.sensorDataTank.openingstijd,
    sluitingstijd: action.sensorDataTank.sluitingstijd
  });
};

const fetchTankOverviewByIdFail = (state, action) => {
  return updateObject(state, { loading: false });
};

// fetch sensorlog one tank
const fetchTankSensorlogByIdStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchTankSensorlogByIdSucces = (state, action) => {
  return updateObject(state, {
    sensorlogTank: action.sensorlogTank,
    loading: false
  });
};

const fetchTankSensorlogByIdFail = (state, action) => {
  return updateObject(state, { loading: false });
};

// TODO fetch sensordata all tanks
const fetchTanksOverviewStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchTanksOverviewSucces = (state, action) => {
  return updateObject(state, {
    // sensorlogTanks: action.tanksSensorLog,
    loading: false
  });
};

const fetchTanksOverviewFail = (state, action) => {
  return updateObject(state, { loading: false });
};

// delete tank
const deleteTankByIdStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const deleteTankByIdSucces = (state, action) => {
  const updatedTanks = state.tanks.filter(
    tank => tank.tankId !== action.tankId
  );
  return updateObject(state, {
    loading: false,
    tanks: updatedTanks
  });
};

const deleteTankByIdFail = state => {
  return updateObject(state, { loading: false });
};

// verander slotstand
const postSlotStatusStart = state => {
  return updateObject(state);
};

const postSlotStatusSuccess = state => {
  return updateObject(state);
};

const postSlotStatusFail = state => {
  return updateObject(state);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TANKS_START: return fetchTanksStart(state, action);
    case actionTypes.FETCH_TANKS_SUCCESS: return fetchTanksSucces(state, action);
    case actionTypes.FETCH_TANKS_FAIL: return fetchTanksFail(state, action);

    case actionTypes.ADD_TANK_START: return addTankStart(state, action);
    case actionTypes.ADD_TANK_SUCCESS: return addTankSucces(state, action);
    case actionTypes.ADD_TANK_FAIL: return addTankFail(state, action);

    case actionTypes.FETCH_TANK_BY_ID_START: return fetchTankByIdStart(state, action);
    case actionTypes.FETCH_TANK_BY_ID_SUCCESS: return fetchTankByIdSucces(state, action);
    case actionTypes.FETCH_TANK_BY_ID_FAIL: return fetchTankByIdFail(state, action);

    case actionTypes.FETCH_TANK_OVERVIEW_BY_ID_START: return fetchTankOverviewByIdStart(state, action);
    case actionTypes.FETCH_TANK_OVERVIEW_BY_ID_SUCCESS: return fetchTankOverviewByIdSucces(state, action);
    case actionTypes.FETCH_TANK_OVERVIEW_BY_ID_FAIL: return fetchTankOverviewByIdFail(state, action);

    case actionTypes.FETCH_TANK_SENSORLOG_BY_ID_START: return fetchTankSensorlogByIdStart(state, action);
    case actionTypes.FETCH_TANK_SENSORLOG_BY_ID_SUCCESS: return fetchTankSensorlogByIdSucces(state, action);
    case actionTypes.FETCH_TANK_SENSORLOG_BY_ID_FAIL: return fetchTankSensorlogByIdFail(state, action);

    case actionTypes.FETCH_TANKS_OVERVIEW_START: return fetchTanksOverviewStart(state, action);
    case actionTypes.FETCH_TANKS_OVERVIEW_SUCCESS: return fetchTanksOverviewSucces(state, action);
    case actionTypes.FETCH_TANKS_OVERVIEW_FAIL: return fetchTanksOverviewFail(state, action);

    case actionTypes.DELETE_TANK_BY_ID_START: return deleteTankByIdStart(state, action);
    case actionTypes.DELETE_TANK_BY_ID_SUCCESS: return deleteTankByIdSucces(state, action);
    case actionTypes.DELETE_TANK_BY_ID_FAIL: return deleteTankByIdFail(state, action);

    case actionTypes.POST_SLOTSTATUS_TANK_START: return postSlotStatusStart(state, action);
    case actionTypes.POST_SLOTSTATUS_TANK_SUCCESS: return postSlotStatusSuccess(state, action);
    case actionTypes.POST_SLOTSTATUS_TANK_FAIL: return postSlotStatusFail(state, action);
    default: return state;
  }
};

export default reducer;
