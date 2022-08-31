import ReactDOM from "react-dom";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Drivers,
  Dashboards,
  Loaders,
  Transporters,
  Loads,
  Vehicles,
  PendingTrips,
  ConfirmedTrips,
  ClosedTrips,
  CompletedTrips,
  Trips,
  MaterialTypes,
  VehicleTypes,
  Error404,
  Notifications,
  InTransactions,
  Settings,
} from "../pages";
import GodEye from "../pages/god-eye/god-eye";

const UserNavigation = () => {
  return (
    // <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboards />} />
      <Route path="/transporters" element={<Transporters />} />
      <Route path="/loaders" element={<Loaders />} />
      <Route path="/drivers" element={<Drivers />} />
      <Route path="/loads" element={<Loads />} />
      <Route path="/vehicles" element={<Vehicles />} />

      <Route path="/pending-trips" element={<PendingTrips />} />
      <Route path="/trips" element={<Trips />} />
      <Route path="/confirmed-trips" element={<ConfirmedTrips />} />
      <Route path="/completed-trips" element={<CompletedTrips />} />
      <Route path="/closed-trips" element={<ClosedTrips />} />

      <Route path="/material-types" element={<MaterialTypes />} />
      <Route path="/vehicle-types" element={<VehicleTypes />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/transactions" element={<InTransactions />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/god-eye" element={<GodEye/>} />

      <Route path="/*" element={<Error404 />} />
    </Routes>
    // </BrowserRouter>
  );
};

export default UserNavigation;
