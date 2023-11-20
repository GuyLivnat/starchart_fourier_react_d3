import { useState } from "react";
import ChainEditor from "./ChainEditor";
import SavedPaths from "./SavedPaths";
import CollapseTitle from "../general_components/CollapseTitle";
import ColorEditor from "./ColorEditor";

const ToolBar = ({
  coeff,
  playable,
  setPathName,
  units,
  chartColors,
  setChartColors,
}) => {
  const [activeId, setActiveId] = useState(null);
  const [coeffList, setCoeffList] = useState(() => {
    const keys = Object.keys(localStorage);
    let localCoeff = [];
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let obj = JSON.parse(localStorage.getItem(key));
      localCoeff.push({ id: key, name: obj.name });
    }
    return localCoeff;
  });

  const stop = () => {
    document.getElementById("stop-button").click(); // function found in ../chart/Chart.jsx
  };

  const saveCoeff = (coeffs, name) => {
    const obj = JSON.stringify({ name: name, coeff: coeffs });
    const id = crypto.randomUUID();
    localStorage.setItem(id, obj);
    setCoeffList([...coeffList, { name: name, id: id }]);
    if (!coeff.current.length || name === new Date().toLocaleString()) {
      // nothing is loaded || new coeffs saved => load
      setActiveId(id);
      coeff.current = coeffs;
      setPathName(name);
    }
  };
  return (
    <>
      <CollapseTitle title="Saved Paths" forBody="uploads" />
      <div className="collapse" id="uploads">
        <SavedPaths
          activeId={activeId}
          setActiveId={setActiveId}
          coeffList={coeffList}
          setCoeffList={setCoeffList}
          saveCoeff={saveCoeff}
          units={units}
          coeff={coeff}
          stop={stop}
          setPathName={setPathName}
        />
      </div>
      <CollapseTitle title="Chain Editor" forBody="editor" />
      <div className="collapse" id="editor">
        <ChainEditor
          playable={playable}
          coeff={coeff}
          setPathName={setPathName}
          saveCoeff={saveCoeff}
          setActiveId={setActiveId}
          stop={stop}
        />
      </div>
      <CollapseTitle title="Color Editor" forBody="color-changer" />
      <div className="collapse" id="color-changer">
        <ColorEditor {...{ chartColors, setChartColors }} />
      </div>
    </>
  );
};

export default ToolBar;
