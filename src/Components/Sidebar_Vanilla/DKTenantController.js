import { useState } from "react";
import {
  DKIcons,
  DKLabel,
  DKIcon,
  DKSpinner,
  DKListPicker,
} from "deskera-ui-library";
import DKAddTenant from "./DKAddTenant";

export const TenantController = (props) => {
    const { isMenuExpanded, tenantList, selectedTenantDetails, onTenantSelect, onAddNewTenantTapped } = props;
    const [showListPicker, setShowListPicker] = useState(false);
    const [showAddOrgPopup, setShowAddOrgPopup] = useState(false);

    return (
      <>
        <div
          className="row cursor-hand border-radius-m p-h-m p-v-s text-white justify-content-left"
          style={{
            pointerEvents: showListPicker ? "none" : "all",
          }}
          onClick={() => setShowListPicker(true)}
        >
          <DKLabel
            text={selectedTenantDetails?.tenantName ? selectedTenantDetails.tenantName[0] : ""}
            className="border-radius-m row justify-content-center align-items-center fs-l fw-m"
            style={{
              width: 30,
              height: 30,
              minWidth: 30,
              minHeight: 30,
              backgroundColor: "rgba(255, 255, 255, 0.08)",
            }}
          />
          {isMenuExpanded && (
            <DKLabel
              text={selectedTenantDetails?.tenantName}
              className="ml-r fs-l fw-m"
              style={{
                width: "80%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            />
          )}
          {tenantList.length > 0 && isMenuExpanded ? (
            <DKIcon
              src={DKIcons.white.ic_arrow_down}
              className="ic-xs"
              style={{ opacity: 0.7 }}
            />
          ) : (
            isMenuExpanded && <DKSpinner isWhite={true} iconClassName="ic-s-2" />
          )}
        </div>
        {(showListPicker && tenantList?.length) && (
          <div
            className="position-absolute z-index-5"
            style={{ top: 50, left: 0, width: 250 }}
          >
            <DKListPicker
              className="shadow-l border-radius-m"
              iconClassName="bg-gray1 border-m"
              title="My Organizations"
              data={tenantList.map((item) => item.tenantName)}
              onSelect={(index, value) => {
                setShowListPicker(false);
                onTenantSelect?.(tenantList[index]);
              }}
              onClose={() => setShowListPicker(false)}
              needIcon={true}
              button={{
                title: "+ Add Organization",
                className: "bg-button text-white",
                onClick: onAddNewTenantTapped || (() => setShowAddOrgPopup(true))
              }}
            />
          </div>
        )}
        {showAddOrgPopup ? (
          <DKAddTenant
            onCancel={() => {
              setShowAddOrgPopup(false);
            }}
            onSaveNewTenantTapped={(newTenantName) => {
              setShowAddOrgPopup(false);
              props.onSaveNewTenantTapped(newTenantName);
            }}
          />
        ) : null}
      </>
    );
  };