import { Link } from "react-router-dom";
import {
    DKIcons,
    DKIcon,
  } from "deskera-ui-library";

export interface ISidebarItem {
name: string;
icon: any;
route?: string;
subItems?: ISidebarItem[];
className?: string;
tooltipText?: string;
}

export const DkSideBarItem = (props) => {
    const {
      name,
      icon,
      route,
      subItems,
      externalRoute,
      level,
      tabId,
      isSidebarCollapsed,
      activeMenuItemId,
      expandedItemsId,
      onLinkClick,
      onToggleSubMenu,
    } = props;
  
    const isExpanded = expandedItemsId.some((expandedTabId: string) => expandedTabId === tabId);
    const hasActiveMenu = activeMenuItemId.indexOf(tabId) === 0;
    const isActive = window.location.pathname === route;
  
    return subItems?.length ? (
      <div
        className={`column align-items-end parent-width has-sub-menu hide-scroll-bar ${
          isExpanded ? "is-expanded" : ""
        }`}
      >
        <div
          className={`row p-v-m m-v-xs border-radius-m left-menu-button cursor-hand
            ${!isExpanded && hasActiveMenu ? "active-menu-button" : ""} ${
            props?.className || ""
          }`}
          onClick={() => onToggleSubMenu(tabId)}
        >
          <DKIcon
            src={icon}
            className={`ic-s-2 left-menu-icon`}
            style={{ opacity: 0.8 }}
          />
          {isSidebarCollapsed ? (
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
          {isSidebarCollapsed ? (
            // <DKIcon
            //     src={DKIcons.white.ic_arrow_right}
            //     className={`menu-toggle-icon position-absolute`}
            //     style={{
            //         height: 6,
            //         opacity: 0.8,
            //         top: 6,
            //         right: 2,
            //         transform: isExpanded ? "rotateZ(90deg)" : "rotateZ(0deg)",
            //     }}
            // />
            <span className="text-red position-relative" style={{top: -20, float: "right", fontWeight: 900}}>.</span>
          ) : (
            <DKIcon
              src={DKIcons.white.ic_arrow_right}
              className={`ic-xs mr-l menu-toggle-icon position-relative`}
              style={{
                opacity: 0.8,
                marginLeft: "auto",
                transform: isExpanded ? "rotateZ(90deg)" : "rotateZ(0deg)",
              }}
            />
          )}
        </div>
        <div
          className="width-90 sub-menu-items hide-scroll-bar"
          style={{
            maxHeight: isExpanded ? 500 : 0,
            transition: "max-height 0.3s ease-in-out",
          }}
        >
          {subItems.map((subItem, index) => (
            <DkSideBarItem
              {...subItem}
              isSidebarCollapsed={isSidebarCollapsed}
              activeMenuItemId={activeMenuItemId}
              expandedItemsId={expandedItemsId}
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
        } ${
          props?.className || ""
        }`}
        to={externalRoute ? { pathname: externalRoute } : route}
        target={externalRoute ? "_blank" : "_self"}
        onClick={externalRoute ? () => {} : () => onLinkClick(tabId)}
      >
        <DKIcon
          src={icon}
          className="ic-s-2 left-menu-icon"
          style={{ opacity: 0.8 }}
        />
        {isSidebarCollapsed ? (
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