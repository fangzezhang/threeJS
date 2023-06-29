import React, {useState} from "react";
import './App.css';
import Hoc from "./view/component/Hoc";
import First3D from "./view/quickStart/1_First3D";
import Sun from "./view/quickStart/1_Sun";
import OrbitControls from "./view/quickStart/2_OrbitControls";
import ArrayCube from "./view/quickStart/3_ArrayCube";
import PhongAndSetRenderer from "./view/quickStart/4_PhongAndSetRenderer";
import GuiLib from "./view/quickStart/5_GuiLib";

function App() {
  const list = ['First3D', 'Sun', 'OrbitControls', 'ArrayCube', 'PhongAndSetRenderer', 'GuiLib'];
  const map = {
    First3D,
    Sun,
    OrbitControls,
    ArrayCube,
    PhongAndSetRenderer,
    GuiLib,
  };

  const [componentName, setComponentName] = useState('First3D');
  const renderComponent = () => {
    return <Hoc>{React.createElement(map[componentName], {key: componentName})}</Hoc>;
  };

  const elements = [];
  for (let i of list) {
    elements.push(<button key={i} onClick={() => setComponentName(i)}>{ i }</button>)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          { elements }
        </div>
        <div>
          {renderComponent()}
        </div>
      </header>
    </div>
  );
}

export default App;
