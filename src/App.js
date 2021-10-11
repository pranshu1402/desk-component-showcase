import './App.css';
import DKSidebar from './Components/DKSidebar';
import { useState } from 'react';
import { DKIcons } from 'deskera-ui-library';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [state, setState] = useState(true)
  return (
    <Router>
      {/* <Switch> */}
        <div style={{
          width: "100%",
          height: "100vh",
        }}>
          <DKSidebar
            items={[{
              name: 'Home',
              icon: DKIcons.white.ic_home,
              route: '/home'
            },{
              name: 'Company',
              icon: DKIcons.white.ic_company,
              route: '/home'
            },{
              name: 'User',
              icon: DKIcons.white.ic_user,
              route: '/home'
            },{
              name: 'Settings',
              icon: DKIcons.white.ic_settings,
              route: '/home'
            }
            ]}
            expandedWidth={230}
            collapsedWidth={60}
            tenantList={[{
              id: 111,
              name: 'Adarsh Org'
            }
            ]}
            activeTenantId={111}
            onTenantSelect={() => { }}
            onExpandCollapse={() => setState(!state)}
            isMenuExpanded={state}
          />
        </div>
      {/* </Switch> */}
    </Router>
  );
}

export default App;
