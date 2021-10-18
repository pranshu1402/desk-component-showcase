import { useState, useEffect } from "react";
import { API_URLS, MENU_ITEMS } from "../Constants";
import DKSidebar from "./Sidebar_Vanilla/DKSidebar";
import DKAddTenant from "./Sidebar_Vanilla/DKAddTenant";

const Playground = () => {
  const [isMenuExpanded, setIsMenuExpanded] = useState(true);
  const [tenantList, setTenantList] = useState([]);
  const [showAddOrgPopup, setShowAddOrgPopup] = useState(false);
  const [selectedTenantDetails, setSelectedTenantDetails] = useState({
    tenantName: "DK Test 1",
    id: "85251",
  });

  async function getAllTenants() {
    const tenantListApiResponse = await fetch(
      `${API_URLS.BASE_URL}${API_URLS.GET_ALL_TENANTS}`,
      {
        credentials: "include",
      }
    );
    return await tenantListApiResponse.json();
  }

  function addNewTenant(newOrgName) {
    fetch(`${API_URLS.BASE_URL}${API_URLS.CREATE_NEW_ORG}`, {
      method: "POST",
      credentials: "include",
      // mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        accept: "*/*",
      },
      body: JSON.stringify({
        tenantName: newOrgName,
        isBookkeeper: "false",
        refreshToken: "refreshToken",
      }),
    })
      .then((response) => response.json())
      .then((newTenant) => {
        const newTenantList = [...tenantList, newTenant];
        setTenantList(newTenantList);
        setSelectedTenantDetails({
          id: newTenant.id,
          tenantName: newTenant.tenantName,
        });
      })
      .catch((error) => {
        console.log(error);

        /* Adding dummy tenant for testing purpose */
        const newTenant = {
          id: `${tenantList.length}`,
          tenantName: `DK Org ${tenantList.length}`,
        };
        const newTenantList = [...tenantList, newTenant];
        setTenantList(newTenantList);
        setSelectedTenantDetails(newTenant);
      });
  }

  useEffect(() => {
    getAllTenants()
      .then((tenantList) => {
        setTenantList(tenantList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <DKSidebar
        menuItemList={MENU_ITEMS}
        tenantList={tenantList}
        isMenuExpanded={isMenuExpanded}
        selectedTenantDetails={selectedTenantDetails}
        /* FOR CUSTOMIZING ADD_NEW_ORG UX 
            onAddNewTenantTapped={() => {
              setShowAddOrgPopup(true);
            }}
          */
        onSaveNewTenantTapped={addNewTenant}
        onTenantSelect={(newTenantDetails: any) => {
          setSelectedTenantDetails({
            id: newTenantDetails.id,
            tenantName: newTenantDetails.tenantName,
          });
        }}
        onExpandCollapse={() => setIsMenuExpanded(!isMenuExpanded)}
      />

      {/* For testing the optional onAddNewTenantTapped prop on DKSidebar */}
      {showAddOrgPopup ? (
        <DKAddTenant
          onCancel={() => {
            setShowAddOrgPopup(false);
          }}
          onSaveNewTenantTapped={(newTenantName) => {
            setShowAddOrgPopup(false);
            addNewTenant(newTenantName);
          }}
        />
      ) : null}
    </div>
  );
};

export default Playground;
