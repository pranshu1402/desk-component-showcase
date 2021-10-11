import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  DKIcons,
  DKLabel,
  DKIcon,
  DKLine,
  DKSpinner,
  DKSpaceV,
  DKListPicker,
} from "deskera-ui-library";
import "../styles/DKSidebar.css";

export interface ISidebarItem {
  name: string;
  icon: any;
  route?: string;
  subItems?: ISidebarItem[];
  className?: string;
  tooltipText?: string;
}
export interface IDKSidebarProps {
  items: ISidebarItem[];
  isMenuExpanded: boolean;
  expandedWidth: number;
  collapsedWidth: number;
  onExpandCollapse: (flag: boolean) => void;
  itemRenderer?: (item: ISidebarItem) => void;
  tenantList: { name: string; id: string }[];
  onTenantSelect: ({ name, id }) => void;
  activeTenantId: string;
  className?: string;
}
function DKSidebar(props: IDKSidebarProps) {
  const [activeMenuIndex, setActiveMenuIndex] = useState("0");
  const [currentMenuIndex, setCurrentMenuIndex] = useState("0");

  function getActiveTabId(menuItems) {
    let activeTabId = null;
    menuItems?.forEach((menuItem, tabIndex) => {
      if (menuItem.route === window.location.pathname) {
        activeTabId = `${tabIndex}`;
        return;
      } 
      
      const submenuActiveId = getActiveTabId(menuItem.subItems);
      if(submenuActiveId) {
        activeTabId = `${tabIndex}_${submenuActiveId}`;
      }
    });

    return activeTabId;
  }

  useEffect(() => {
    /* set activeMenus: on page load */
    let activeTabId = getActiveTabId(props.items);

    if (activeTabId) {
      setActiveMenuIndex(activeTabId);
      setCurrentMenuIndex(activeTabId);
    }
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
        <TenantPicker
          tenantList={props.tenantList}
          isMenuExpanded={props.isMenuExpanded}
          selectedTenantId={props.activeTenantId}
          onTenantSelect={props.onTenantSelect}
        />
        <DKLine
          className="mt-r"
          style={{
            opacity: 0.1,
          }}
        />
        <DKSpaceV value={15} />
        {props.items.map((item, index) =>
          props.itemRenderer ? (
            props.itemRenderer(item)
          ) : (
            <DkSideBarItem
              {...item}
              level={0}
              tabId={`${index}`}
              activeMenuIndex={activeMenuIndex}
              currentMenuIndex={currentMenuIndex}
              needTooltip={!props.isMenuExpanded}
              onLinkClick={(tabId) => {
                setActiveMenuIndex(tabId);
                setCurrentMenuIndex(tabId);
              }}
              onToggleSubMenu={(tabId) => {
                const isAlreadyActive = currentMenuIndex.indexOf(tabId) === 0;
                const tabIndex = tabId.lastIndexOf("_");
                setCurrentMenuIndex(
                  isAlreadyActive
                    ? tabIndex === -1
                      ? ""
                      : tabId.slice(0, tabIndex)
                    : tabId
                );
              }}
            />
          )
        )}
      </div>
    </div>
  );
}
export const DkSideBarItem = (props) => {
  const {
    route,
    icon,
    name,
    subItems,
    level,
    tabId,
    needTooltip,
    activeMenuIndex,
    currentMenuIndex,
    onLinkClick,
    onToggleSubMenu,
  } = props;

  const isExpanded = currentMenuIndex.indexOf(tabId) === 0;
  const hasActiveMenu = activeMenuIndex.indexOf(tabId) === 0;
  const isActive = window.location.pathname === route;

  return subItems?.length ? (
    <div
      className={`column align-items-end parent-width has-sub-menu hide-scroll-bar ${
        isExpanded ? "is-expanded" : ""
      }`}
    >
      <div
        className={`row p-v-m pl-s m-v-xs border-radius-m left-menu-button 
            ${!isExpanded && hasActiveMenu ? "active-menu-button" : ""} ${
          props?.className
        }
            position-relative`}
        onClick={() => onToggleSubMenu(tabId)}
      >
        <DKIcon
          src={icon}
          className={`ic-s-2 left-menu-icon ${needTooltip ? "mr-xs" : ""}`}
          style={{ opacity: 0.8 }}
        />
        {needTooltip ? null : (
          <div
            className="text-white ml-m text-wrap-none dk-sidebar-menu-item"
            style={{
              left: 33,
              top: -2,
              opacity: 0.9,
              display: "block",
            }}
          >
            {name}
          </div>
        )}
        <DKIcon
          src={DKIcons.white.ic_arrow_right}
          className="ic-xs mr-l menu-toggle-icon position-relative"
          style={{
            opacity: 0.8,
            marginLeft: needTooltip ? 2 : "auto",
            transform: isExpanded ? "rotateZ(90deg)" : "rotateZ(0deg)",
          }}
        />
      </div>
      <div
        className="width-90 sub-menu-items"
        style={{
          maxHeight: isExpanded ? 500 : 0,
          transition: "max-height 0.25s ease-in-out",
        }}
      >
        {subItems.map((subItem, index) => (
          <DkSideBarItem
            {...subItem}
            needTooltip={needTooltip}
            activeMenuIndex={activeMenuIndex}
            currentMenuIndex={currentMenuIndex}
            onLinkClick={onLinkClick}
            onToggleSubMenu={onToggleSubMenu}
            level={level + 1}
            tabId={`${tabId}_${index}`}
          />
        ))}
      </div>
    </div>
  ) : (
    <Link
      className={`row p-v-m pl-s m-v-xs border-radius-m left-menu-button ${
        isActive ? "active-menu-button" : ""
      } ${needTooltip ? "p-h-0 justify-content-center" : ""} ${
        props?.className
      }`}
      to={route}
      onClick={() => onLinkClick(tabId)}
    >
      <DKIcon
        src={icon}
        className="ic-s-2 left-menu-icon"
        style={{ opacity: 0.8 }}
      />
      {needTooltip ? (
        <div
          className="bg-app text-white position-absolute border-radius-s p-h-s p-v-xs text-wrap-none left-menu-tool-tip"
          style={{ left: 40 }}
        >
          {name}
        </div>
      ) : (
        <div
          className="text-white ml-m text-wrap-none dk-sidebar-menu-item"
          style={{
            left: 33,
            top: -2,
            opacity: 0.9,
            display: "block",
          }}
        >
          {name}
        </div>
      )}
    </Link>
  );
};
export const TenantPicker = (props) => {
  const { isMenuExpanded, tenantList, onTenantSelect } = props;
  const [showListPicker, setShowListPicker] = useState(false);
  let [selectedTenant, setSelectedTenant] = useState(null);
  useEffect(() => {
    let selected = tenantList.find(
      (tenant) => tenant.id == props.selectedTenantId
    );
    setSelectedTenant(selected);
  }, [props.selectedTenantId, tenantList]);
  return (
    <>
      <div
        className="row cursor-hand border-radius-m p-v-s text-white justify-content-left"
        style={{ pointerEvents: showListPicker ? "none" : "all" }}
        onClick={() => setShowListPicker(true)}
      >
        <DKLabel
          text={selectedTenant?.name[0]}
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
            text={selectedTenant?.name}
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
      {showListPicker && (
        <div
          className="position-absolute z-index-5"
          style={{ top: 50, left: 0, width: 250 }}
        >
          <DKListPicker
            className="shadow-l border-radius-m"
            iconClassName="bg-gray1 border-m"
            title="My Organizations"
            data={tenantList.map((item) => item.name)}
            onSelect={(index, value) => {
              setSelectedTenant(tenantList[index]);
              setShowListPicker(false);
              onTenantSelect?.(tenantList[index]);
            }}
            onClose={() => setShowListPicker(false)}
            needIcon={true}
            button={{
              title: "+ Add Organization",
              className: "bg-button text-white",
              onClick: () => {
                setShowListPicker(false);
                onTenantSelect?.();
              },
            }}
          />
        </div>
      )}
    </>
  );
};
export default DKSidebar;
