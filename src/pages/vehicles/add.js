import React, { useState, useEffect } from "react";
import { ModalSubmit } from "../../component";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { createVehicles } from "../../store/slice/vehicles-slice";
import { getAllTransporters } from "../../store/slice/transporters-slice";

import { ToastContainer, toast } from "react-toastify";

const Add = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTransporters());
  }, []);

  const { all_transporter } = useSelector((state) => state.transporters);
  const { exist_message, error_message } = useSelector(
    (state) => state.vehicles
  );

  const [vehicle, setVehicle] = useState({
    transporter_id: "",
    wheels: "",
    length: "",
    rc_number: "",
    body_type: "",
    load_capacity: "",
    owner_name: "",
  });

  const wheels = [
    {
      id: 1,
      value: "6",
      item: "06",
    },

    {
      id: 2,
      value: "8",
      item: "08",
    },
    {
      id: 3,
      value: "10",
      item: "10",
    },
    {
      id: 4,
      value: "12",
      item: "12",
    },
    {
      id: 5,
      value: "14",
      item: "14",
    },
    {
      id: 6,
      value: "16",
      item: "16",
    },
    {
      id: 7,
      value: "18",
      item: "18",
    },
    {
      id: 8,
      value: "20",
      item: "20",
    },
    {
      id: 9,
      value: "22",
      item: "22",
    },
    {
      id: 10,
      value: "24",
      item: "24",
    },
  ];

  const inputNumber = (e) => {
    const char = String.fromCharCode(e.which);
    if (!/[0-9]/.test(char)) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <ModalSubmit
        title="Add Vehicle"
        modalId="modal-vehicle-add"
        closeButton={exist_message === "success" && "modal"}
        modalClose={
          vehicle.transporter_id && vehicle.rc_number && vehicle.wheels
            ? false
            : true
        }
        onClick={() => {
          dispatch(createVehicles(vehicle))
            .unwrap()
            .then((originalPromiseResult) => {
              toast.warn("User Added successfully...", { type: "success" });
            }, setVehicle([]))
            .catch((rejectedValueOrSerializedError) => {
              toast.warn(error_message, { type: "error" });
            });
        }}
      >
        <form className="forms-sample">
          {exist_message ? (
            <div className="alert alert-info" role="alert">
              <span>{exist_message}</span>
            </div>
          ) : (
            ""
          )}
          <div className="form-group">
            <label for="#">Transporter Name</label>

            <Select
              id="react-select-tag"
              isClearable
              options={all_transporter}
              // hideSelectedOptions={false}
              getOptionLabel={(item) => item.user_name}
              getOptionValue={(item) => ({ _id: item._id })}
              onChange={(e) =>
                setVehicle((prev) => ({ ...prev, transporter_id: e }))
              }
            />
          </div>
          <div className="form-group">
            <label for="#">Owner Name</label>
            <input
              type="text"
              maxLength="25"
              minLength="4"
              className="form-control"
              id="#"
              onChange={(e) =>
                setVehicle((pev) => ({
                  ...pev,
                  owner_name: e.target.value,
                }))
              }
              placeholder="Owner Name"
              required
            />
          </div>

          <div className="form-group">
            <label for="#">Vehicle Number</label>
            <input
              type="text"
              maxLength="10"
              className="form-control"
              id="#"
              onChange={(e) =>
                setVehicle((pev) => ({
                  ...pev,
                  rc_number: e.target.value,
                }))
              }
              placeholder="Vehicle Number"
              required
            />
          </div>
          <div className="form-group">
            <label for="#">Length (foot)</label>
            <input
              type="text"
              maxLength="2"
              className="form-control"
              id="#"
              onChange={(e) =>
                setVehicle((pev) => ({
                  ...pev,
                  length: e.target.value,
                }))
              }
              onKeyPress={(e) => inputNumber(e)}
              placeholder="vehicle length"
            />
          </div>
          <div className="form-group">
            <label for="#">Body Type</label>

            <select
              className="form-control "
              onChange={(e) =>
                setVehicle((pev) => ({ ...pev, body_type: e.target.value }))
              }
            >
              <option value="Open">Open</option>
              <option value="Close">Close</option>
            </select>
            {/* <input
              type="text"
              maxLength="10"
              className="form-control"
              id="#"
              onChange={(e) =>
                setVehicle((pev) => ({ ...pev, body_type: e.target.value }))
              }
              placeholder="Body Type"
              required
            /> */}
          </div>

          <div className="form-group">
            <label for="#">Capacity (metric tons)</label>
            <input
              type="text"
              maxLength="2"
              className="form-control"
              id="#"
              onChange={(e) =>
                setVehicle((pev) => ({ ...pev, load_capacity: e.target.value }))
              }
              onKeyPress={(e) => inputNumber(e)}
              placeholder="Capacity"
              required
            />
          </div>
          <div className="form-group">
            <label for="#">Wheels</label>

            <select
              className="form-control"
              onChange={(e) =>
                setVehicle((pev) => ({ ...pev, wheels: e.target.value }))
              }
            >
              {wheels.map((list, index) => {
                return (
                  <option className="py-3" value={list.value} key={index}>
                    {list.item}
                  </option>
                );
              })}
            </select>
            {/* <input
              type="number"
              min="4"
              className="form-control"
              value={vehicle.wheels}
              onkeyup={wheelsType}
              id="#"
              onChange={(e) =>
                setVehicle((pev) => ({ ...pev, wheels: e.target.value }))
              }
              placeholder="Wheels"
            /> */}
          </div>
        </form>
      </ModalSubmit>
    </div>
  );
};

export default Add;
