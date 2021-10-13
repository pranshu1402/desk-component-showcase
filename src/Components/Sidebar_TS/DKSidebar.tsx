import { useEffect, useState } from "react";
import { DKIcons, DKIcon, DKLine, DKSpaceV } from "deskera-ui-library";
import "./DKSidebar.css";
import { DkSideBarItem, ISidebarItem } from "./DKSidebarItem";
import { TenantController } from "./DKTenantController";

export interface IDKSidebarProps {
  className?: string;
  menuItemList: ISidebarItem[];
  expandedWidth?: number;
  collapsedWidth?: number;
  isMenuExpanded: boolean;
  tenantList: any[];
  onTenantSelect: (tenantDetails: any) => void;
  onAddNewTenantTapped?: () => void;
  onSaveNewTenantTapped: (newOrgName: string) => void;
  onExpandCollapse: (flag: boolean) => void;
  itemRenderer?: (item: ISidebarItem) => void;
  selectedTenantDetails: { tenantName: string; tenantId: string };
}

function DKSidebar(props: IDKSidebarProps) {
  const [activeMenuItemId, setActiveMenuItemId] = useState("0");
  const [expandedItemsId, setExpandedItemsId] = useState(["0"]);

  function getActiveTabId(menuItems: ISidebarItem[]) {
    let activeTabId = null;
    menuItems?.forEach((menuItem, tabIndex) => {
      if (menuItem.route === window.location.pathname) {
        activeTabId = `${tabIndex}`;
        return;
      }

      const submenuActiveId = getActiveTabId(menuItem.subItems);
      if (submenuActiveId) {
        activeTabId = `${tabIndex}_${submenuActiveId}`;
      }
    });

    return activeTabId;
  }

  useEffect(() => {
    /* set activeMenus: on page load */
    let activeTabId = getActiveTabId(props.menuItemList);

    if (activeTabId) {
      const newCurrentMenuIndex = [];
      const tabIndexes = activeTabId.split("_");
      /* getting tab id's for all levels */
      tabIndexes.reduce((parentTabId, currentTabIndex) => {
        const currentTabId = parentTabId
          ? `${parentTabId}_${currentTabIndex}`
          : `${currentTabIndex}`;
        newCurrentMenuIndex.push(currentTabId);
        return currentTabId;
      }, "");
      setActiveMenuItemId(activeTabId);
      setExpandedItemsId(newCurrentMenuIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      id="dk-sidebar"
      className={`dk-sidebar parent-height bg-app p-m pb-l column justify-content-between z-index-4 flex-shrink-0 ${props?.className}`}
      style={{
        width: props.isMenuExpanded
          ? props.expandedWidth
          : props.collapsedWidth,
      }}
    >
      <div
        className="dk-sidebar-toggle p-s expandable-button cursor-hand z-index-4"
        style={{
          position: "fixed",
          left:
            (props.isMenuExpanded
              ? props.expandedWidth
              : props.collapsedWidth) - 20,
          top: 45,
        }}
        onClick={() => {
          props.onExpandCollapse?.(!props.isMenuExpanded);
        }}
      >
        <div className="shadow-m border-radius-l bg-white d-flex text-white align-items-center justify-content-center">
          <DKIcon
            src={DKIcons.ic_arrow_left}
            className={`p-s ic-xs dk-sidebar-arrow-icon ${
              props.isMenuExpanded ? "rotate-360" : "rotate-180"
            }`}
          />
        </div>
      </div>
      <div className="column parent-width position-relative parent-height bottom-0">
        <TenantController
          tenantList={props.tenantList}
          isMenuExpanded={props.isMenuExpanded}
          selectedTenantDetails={props.selectedTenantDetails}
          onTenantSelect={props.onTenantSelect}
          onAddNewTenantTapped={props.onAddNewTenantTapped}
          onSaveNewTenantTapped={props.onSaveNewTenantTapped}
        />
        <DKLine
          className="mt-r"
          style={{
            opacity: 0.1,
          }}
        />
        <DKSpaceV value={15} />
        {props.menuItemList.map((item, index) =>
          props.itemRenderer ? (
            props.itemRenderer(item)
          ) : (
            <DkSideBarItem
              {...item}
              level={0}
              tabId={`${index}`}
              activeMenuItemId={activeMenuItemId}
              expandedItemsId={expandedItemsId}
              isSidebarCollapsed={!props.isMenuExpanded}
              onLinkClick={(tabId: string) => {
                setActiveMenuItemId(tabId);

                /* RESET EXPANDED MENUS: AND ONLY OPEN THE ONE WITH ACTIVE LINK
                
                const newCurrentMenuIndex = [];
                const tabIndexes = tabId.split("_");
                tabIndexes.reduce((parentTabId, currentTabIndex) => {
                  const currentTabId = parentTabId ? `${parentTabId}_${currentTabIndex}` : `${currentTabIndex}`;
                  newCurrentMenuIndex.push(currentTabId);
                  return currentTabId;
                }, "");
                setCurrentMenuIndex(newCurrentMenuIndex); */
              }}
              onToggleSubMenu={(tabId: string) => {
                const newCurrentMenuIndex = [];
                let isExisting = false;
                expandedItemsId.forEach((expandedTabId) => {
                  if (expandedTabId === tabId) {
                    isExisting = true;
                  } else {
                    newCurrentMenuIndex.push(expandedTabId);
                  }
                });

                if (!isExisting) {
                  newCurrentMenuIndex.push(tabId);
                }

                setExpandedItemsId(newCurrentMenuIndex);
              }}
            />
          )
        )}
      </div>
    </div>
  );
}

export default DKSidebar;
