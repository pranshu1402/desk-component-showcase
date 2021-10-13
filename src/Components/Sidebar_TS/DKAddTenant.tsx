import { useState } from "react";
import { DKButton, DKLabel, DKInput, getCapitalized } from "deskera-ui-library";

const DKAddTenant = (props) => {
  const [newOrgName, setNewOrgName] = useState("");
  const [saveOrgTapped, setSaveOrgTapped] = useState(false);

  function saveButtonTapped() {
    setSaveOrgTapped(true);

    if (!newOrgName.trim()) return;

    props.onSaveNewTenantTapped(newOrgName);
  }

  function cancelTapped() {
    setNewOrgName("");
    props.onCancel();
  }

  return (
    <div className="transparent-background">
      <div className="popup-window" style={{ maxWidth: 400 }}>
        <div className="row justify-content-between">
          <DKLabel text="Add organisation" className="fw-m fs-l" />
          <div>
            <div className="row">
              <DKButton
                title="Cancel"
                className="bg-gray1 border-m fw-m"
                onClick={cancelTapped}
              />
              <DKButton
                title="Add"
                className="bg-button ml-r text-white fw-m"
                onClick={saveButtonTapped}
              />
            </div>
          </div>
        </div>

        <div className="column mt-r parent-width">
          <div className="row " style={{ alignItems: "flex-start" }}>
            <DKInput
              autoFocus={true}
              className="parent-width"
              title="Company name"
              required={true}
              value={newOrgName}
              direction="vertical"
              onChange={(newValue) => {
                setNewOrgName(getCapitalized(newValue));
              }}
              canValidate={saveOrgTapped && !newOrgName?.trim()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DKAddTenant;
