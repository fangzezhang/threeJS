import React, {useState} from "react";
import './App.css';
import Hoc from "./component/Hoc";
import First3D from "./view/quickStart/1_First3D";
import Sun from "./view/quickStart/1_Sun";
import OrbitControls from "./view/quickStart/2_OrbitControls";
import ArrayCube from "./view/quickStart/3_ArrayCube";
import PhongAndSetRenderer from "./view/quickStart/4_PhongAndSetRenderer";
import GuiLib from "./view/quickStart/5_GuiLib";
import Points from "./view/bufferGeometry/1.Points";
import Line from "./view/bufferGeometry/2.Line";

function App() {
  const list = {
    QuickStart: ['First3D', 'Sun', 'OrbitControls', 'ArrayCube', 'PhongAndSetRenderer', 'GuiLib'],
    BufferGeometry: ['Points', 'Line']
  };
  const map = {
    First3D,
    Sun,
    OrbitControls,
    ArrayCube,
    PhongAndSetRenderer,
    GuiLib,
    Points,
    Line,
  };

  const [componentName, setComponentName] = useState('First3D');
  const renderComponent = () => {
    return <Hoc>{React.createElement(map[componentName], {key: componentName})}</Hoc>;
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {
            Object.keys(list).map(key => (
              <div key={key}>
                {key}: {list[key].map(val => (
                  <button key={val} onClick={() => setComponentName(val)}>{ val }</button>
                ))}
              </div>
            ))
          }
        </div>
        <div>
          {renderComponent()}
        </div>
      </header>
    </div>
  );
}

export default App;
