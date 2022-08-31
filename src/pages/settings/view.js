import React from "react";

import { ModalView, VisibleStatusUpdater } from "../../component";
import { changeSettingsStatus } from "../../store/slice/settings";

const View = ({ data: value }) => {
  return (
    <ModalView
      title="Value "
      modalId="modal-setting-details"
      cancelButtonText="Ok"
    >
      <div className="form-group">
        <VisibleStatusUpdater
          bootstapId="status-changer-2"
          status={value.visible}
          id={value._id}
          changeStatus={changeSettingsStatus}
        />
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <b>Key :</b> {value.key}
        </li>
        <li className="list-group-item">
          <b>Value :</b> {value.value}
        </li>
        <li className="list-group-item">
          <b>Created date :</b> {value.created_date}
        </li>
      </ul>
    </ModalView>
  );
};

export default View;
