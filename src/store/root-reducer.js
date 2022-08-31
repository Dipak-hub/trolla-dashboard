import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import usersSlice from "./slice/users-slice";
import loadersSlice from "./slice/loaders-slice";
import materialTypesSlice from "./slice/material-types-slice";
import vehicleTypesSlice from "./slice/vehicle-types-slice";
import driversSlice from "./slice/drivers-slice";
import transportersSlice from "./slice/transporters-slice";
import vehiclesSlice from "./slice/vehicles-slice";

import loadsSlice from "./slice/loads-slice";
import dashboardsSlice from "./slice/dashboards-slice";
import pendingTripsSlice from "./slice/pending-trips-slice";
import confirmedTripsSlice from "./slice/confirmed-trips-slice";
import completedTripsSlice from "./slice/completed-trips-slice";
import closedTripsSlice from "./slice/closed-trips-slice";
import tripsSlice from "./slice/trips-slice";
import inTransactionsSlice from "./slice/in-transactions-slice";
import notificationsSlice from "./slice/notifications-slice";
import settingsSlice from "./slice/settings";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["user", "vehicle-type.vehicle_type"],
};

const usersConfig = {
  key: "users",
  version: 2,
  storage,
  keyPrefix: "",
  blacklist: ["error_message"],
};
const loadersConfig = {
  key: "loaders",
  version: 1,
  storage,
  keyPrefix: "",
  blacklist: [
    "error_message",
    "error",
    "loaders",
    "loader",
    "id_proof_loading",
    "error_message",
    "address_proof_loading",
    "exist_message",
  ],
};
const materialTypesConfig = {
  key: "material-types",
  version: 1,
  storage,
  keyPrefix: "",
  blacklist: ["error_message", "error", "material"],
};
const vehicleTypesConfig = {
  key: "vehicle_types",
  version: 1,
  storage,
  keyPrefix: "",
  blacklist: ["error_message", "error", "vehicle_types", "vehicle_type"],
};
const loadsConfig = {
  key: "loads",
  version: 1,
  storage,
  keyPrefix: "",
  blacklist: ["error_message", "error", "load"],
};
const dashboardsConfig = {
  key: "dashboards",
  version: 1,
  storage,
  keyPrefix: "",
  blacklist: ["error_message", "error", "load"],
};

// ------------------------------
const vehiclesConfig = {
  key: "vehicles",
  version: 1,
  storage,
  keyPrefix: "",
  blacklist: [
    "error_message",
    "exist_message",
    "rc_loading",
    "image_loading",
    "error",
    "vehicle",
    "vehicles",
  ],
};

const driversConfig = {
  key: "drivers",
  version: 1,
  storage,
  keyPrefix: "",
  blacklist: [
    "error_message",
    "is_loading",
    "exist_message",
    "error",
    "driver",
    "drivers",
  ],
};
const transportersConfig = {
  key: "transporters",
  version: 1,
  storage,
  keyPrefix: "",
  blacklist: [
    "error_message",
    "error",
    "transporter",
    "transporters",
    "address_proof_loading",
    "is_loading",
    "id_proof_loading",
  ],
};
//-------------
const pendingTripsConfig = {
  key: "pending-trips",
  version: 1,
  storage,
  keyPrefix: "",
  blacklist: ["error_message", "error", "pending_trips", "pending_trips"],
};

// -----------------
const confirmedTripsConfig = {
  key: "confirmed-trips",
  version: 1,
  storage,
  keyPrefix: "",
  blacklist: ["error_message", "error", "confirmed_trips", "confirmed_trip"],
};

// -----------------
const completedTripsConfig = {
  key: "completed-trips",
  version: 1,
  storage,
  keyPrefix: "",
  blacklist: ["error_message", "error", "completed_trips", "completed_trip"],
};
// close trips----
const closedTripsConfig = {
  key: "closed-trips",
  version: 1,
  storage,
  keyPrefix: "",
  blacklist: ["error_message", "error", "closed_trip", "closed_trips"],
};

const notificationsConfig = {
  key: "notifications",
  version: 1,
  storage,
  keyPrefix: "",
  blacklist: ["error_message", "error", "select"],
};

// booking search-------
const tripsConfig = {
  key: "trips",
  version: 1,
  storage,
  keyPrefix: "",
  blacklist: ["error_message", "error", "trips", "trip", "search"],
};

// transaction-------
const inTransactionsConfig = {
  key: "in-transactions",
  version: 1,
  storage,
  keyPrefix: "",
  blacklist: ["is_loading", "transaction", "transactions"],
};
const settingsConfig = {
  key: "settings",
  version: 1,
  storage,
  keyPrefix: "",
};

// pagination-----
// const paginationConfig = {
//   key: "pagination",
//   version: 1,
//   storage,
//   keyPrefix: "",
//   blacklist: ["page"],

// };

const rootReducer = combineReducers({
  users: persistReducer(usersConfig, usersSlice),
  loaders: persistReducer(loadersConfig, loadersSlice),
  material_types: persistReducer(materialTypesConfig, materialTypesSlice),
  vehicle_types: persistReducer(vehicleTypesConfig, vehicleTypesSlice),
  loads: persistReducer(loadsConfig, loadsSlice),
  dashboards: persistReducer(dashboardsConfig, dashboardsSlice),

  vehicles: persistReducer(vehiclesConfig, vehiclesSlice),
  drivers: persistReducer(driversConfig, driversSlice),
  transporters: persistReducer(transportersConfig, transportersSlice),
  pending_trips: persistReducer(pendingTripsConfig, pendingTripsSlice),
  confirmed_trips: persistReducer(confirmedTripsConfig, confirmedTripsSlice),
  completed_trips: persistReducer(completedTripsConfig, completedTripsSlice),
  closed_trips: persistReducer(closedTripsConfig, closedTripsSlice),
  // pagination: persistReducer(paginationConfig, paginationSlice),
  notifications: persistReducer(notificationsConfig, notificationsSlice),
  trips: persistReducer(tripsConfig, tripsSlice),
  in_transactions: persistReducer(inTransactionsConfig, inTransactionsSlice),
  settings: persistReducer(settingsConfig, settingsSlice),
});

export default persistReducer(persistConfig, rootReducer);
