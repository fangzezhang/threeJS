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
import MeshTriangle from "./view/bufferGeometry/3.MeshTriangle";
import MeshRect from "./view/bufferGeometry/3.MeshRect";
import MeshRectNormal from "./view/bufferGeometry/3.MeshRectNormal";
import Snow from "./view/VR/1.snow";

function App() {
  const list = {
    QuickStart: ['First3D', 'Sun', 'OrbitControls', 'ArrayCube', 'PhongAndSetRenderer', 'GuiLib'],
    BufferGeometry: ['Points', 'Line', 'MeshTriangle', 'MeshRect', 'MeshRectNormal'],
    VR: ['Snow'],
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
    MeshTriangle,
    MeshRect,
    MeshRectNormal,
    Snow,
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
            Object.keys(list).map((key, index) => (
              <div key={key}>
                {index + 1}.{key}: {list[key].map(val => (
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
