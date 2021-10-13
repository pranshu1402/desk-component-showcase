import { useState, useEffect } from "react";
import { DKButton, DKLabel, DKInput, getCapitalized, INPUT_TYPE, INPUT_VIEW_DIRECTION } from "deskera-ui-library";

const DKAddTenant = (props) => {
  const [newOrgName, setNewOrgName] = useState("");
  const [saveOrgTapped, setSaveOrgTapped] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", bindEnter);

    return () => {
      document.removeEventListener("keydown", bindEnter);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newOrgName]);

  const bindEnter = (event) => {
		event = event || window.event;
		if (event.key === "Enter") {
			saveButtonTapped();
		}
  };

  const saveButtonTapped = () => {
    setSaveOrgTapped(true);

    if (newOrgName?.trim()) {
      props.onSaveNewTenantTapped(getCapitalized(newOrgName));
    }
  }

  const cancelTapped = () => {
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
          <div className="row" style={{ alignItems: "flex-start" }}>
            <DKInput
              autoFocus={true}
              type={INPUT_TYPE.TEXT}
              className="parent-width"
              title="Company name"
              required
              value={newOrgName}
              direction={INPUT_VIEW_DIRECTION.VERTICAL}
              onChange={setNewOrgName}
              canValidate={saveOrgTapped}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DKAddTenant;
