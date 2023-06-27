import React, {useState} from "react";
import './App.css';
import First3D from "./view/1_First3D";
import Sun from "./view/1_Sun";
import Hoc from "./view/component/Hoc";

function App() {
  const list = ['First3D', 'Sun'];
  const map = {
    First3D,
    Sun
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
