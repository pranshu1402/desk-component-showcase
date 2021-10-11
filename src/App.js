import './App.css';
import DKSidebar from './Components/DKSidebar';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MENU_ITEMS from './Constants';

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
            items={MENU_ITEMS}
            expandedWidth={230}
            collapsedWidth={70}
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
