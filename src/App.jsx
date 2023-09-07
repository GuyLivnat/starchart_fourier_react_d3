import StarChart from './starchart/StarChart'
import Button from './Button';
import timestep from './starchart/timestep';
import { useRef, useState } from 'react';
import StarChartInit from './starchart/StarChartInit';
import UploadButton from './UploadButton';
import createCoeff from './starchart/createCoeff';
import List from './List';
import Slider from './slider';
import ToggleSwitch from './ToggleSwitch';
import CoeffEditor from './editor/CoeffEditor';
import useInterval from './utilities/useInterval';



function App() {
  const units = 256;  // must be a power of 2! 256 suggested, 512 smoothes the edges

  const lineSegments = 40;
  const maxSpeed = 66;
  const updateSpeed = useRef(45);  //in miliseconds. 33 is 30 fps
  const coeff = useRef([]);
  let playable = coeff.current.length < 3;
  const frame = useRef(timestep(coeff, 0));
  const edge = useRef([]);
  const time = useRef(0);
  const [tick, setTick] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [zoom, setZoom] = useState(500);
  const [radiiActive, setRadiiActive] = useState("true");
  const [circlesActive, setCirclesActive] = useState("true");
  const [outlineActive, setOutlineActive] = useState("true");
  const [coeffList, setCoeffList] = useState(() => {
    const keys = Object.keys(localStorage);
    let localCoeff = [];
    for(let i=0; i < keys.length; i++) {
      let key = keys[i];
      let obj = JSON.parse(localStorage.getItem(key));
      localCoeff.push({id:key, name:obj.name});
    }
    return localCoeff;
  })


  const timeTick = () => {
    setTick(time.current);
  }
      // localStorage.clear();  // use this if you mess up a save file and need to reset

  const handleFile = (event) => {   // converts an uploaded SVG to something readable 
    const reader = new FileReader();
    reader.onload = (e) => {
        const string = e.target.result;
        const parser = new DOMParser();
        const parsedFile = parser.parseFromString(string, "image/svg+xml");
        const path = parsedFile.querySelector("path");
        const coeff = createCoeff(path, units);
        saveCoeff(coeff, name) // this function ends here and chains to a new function!
    }
    const file = event.target.files[0];
    if (!file) return; // will only fire if upload was cancelled in the (file explorer / finder)
    const name = nameParser(file.name)
    reader.readAsText(file);
  }

  const nameParser = (name) => {
    return (name.replace('.svg', '') + ` with ${units} points`)
  }
  
  const saveCoeff = (coeffs, name) => {
    const obj = JSON.stringify({name: name, coeff: coeffs});
    const id = crypto.randomUUID();
    localStorage.setItem(id, obj);
    setCoeffList([...coeffList, {name:name, id:id}])
    if (!coeff.length) { // will auto select if nothing is loaded
      setActiveId(id);
      coeff.current = coeffs;
    }
  }

  const stop = () => {
    if (isPlaying) {
      setIsPlaying(false)
    }
    frame.current = timestep([], 0);
    time.current = 0;
    edge.current = [];
    timeTick();
  }

  const pausePlay = () => {
    setIsPlaying(!isPlaying)
  }
  
  const update = () => {  // computes the next frame 
    const step = 1/(units*2);
    if (time.current === 1) {
      time.current = 0
    } else {
      time.current += step
    }
    frame.current = timestep(coeff.current, time.current);
    edge.current.unshift({ x: frame.current.edge.x, y: frame.current.edge.y });
    if (edge.current.length > units) edge.current.pop();
    timeTick();
  };
  
  const loadCoeff = (e) => {
    const id = e.target.parentElement.parentElement.id;
    const obj = JSON.parse(localStorage.getItem(id));
    coeff.current = obj.coeff;
    stop();
    setActiveId(id);
  }

  const deleteCoeff = (e) => {
    const id = e.target.parentElement.parentElement.id;
    if (activeId === id) {
      stop();
      coeff.current = [];
    };
    localStorage.removeItem(id)
    setCoeffList(coeffList.filter(item => item.id != id))
  }

  const deleteAllCoeff = () => {
    stop();
    coeff.current = [];
    setCoeffList([]);
    localStorage.clear();
  }

  const renameCoeff = (id, newName) => {
    const obj = JSON.parse(localStorage.getItem(id));
    obj.name = newName;
    const stringObj = JSON.stringify(obj);
    localStorage.setItem(id, stringObj);
    const newList = coeffList.map((item) => {
      if (item.id === id) return {name:newName, id:id}
      else return item;
    });
    setCoeffList(newList)
  }

  const showHideCircles = () => {
    setCirclesActive((circlesActive === "none")? "true" : "none")
  };

  const showHideRadii = () => {
    setRadiiActive((radiiActive === "none")? "true" : "none")
  }

  const showHideOutline = () => {
    setOutlineActive((outlineActive === "none")? "true" : "none")
  }

  useInterval(update, isPlaying? (maxSpeed - updateSpeed.current) : null) //runs the chart

  return (
  <section className="container-fluid text-bg-dark">
    <div className="row">
      <div className="col-lg-5 col-md-10 col-sm-12 order-4 order-lg-5 mt-5" id="starchart" >
        <StarChartInit zoom={zoom}
          circlesActive={circlesActive}
          radiiActive={radiiActive}
          outlineActive={outlineActive}
          lineSegments={lineSegments}/>
        <StarChart data = {frame.current} edge = {edge.current} lineSegments={lineSegments} units={units}/>
        <div className="row align-items-center justify-content-start">
          <div className="col-1 m-3" id="pausePlay">
            <Button handleClick={pausePlay}
              text={isPlaying? '\u23F8' : "\u23F5"}
              isDisabled={playable}
              className={"btn btn-primary btn-lg"}/>
            </div>
          <div className="col-1 m-2">
            <Button handleClick={stop}
              text={'\u23F9'}
              isDisabled={playable}
              className={"btn btn-outline-primary"}/>
          </div>
          <div className="col-1 m-2">
            <Slider startValue={updateSpeed}
              min={0}
              max={maxSpeed}
              text={"speed"}/>
          </div>
        </div>
      </div>
      <div className="col-lg-3 order-6 order-lg-4 mt-5" id="uploadList">
        <h1 className="mb-3">Images</h1>
        <div><UploadButton handleFile={handleFile} /></div>
          <List lst={coeffList}
            load={loadCoeff}
            del={deleteCoeff}
            delAll={deleteAllCoeff}
            rename={renameCoeff}
            focus={activeId}/>
      </div>
      <div className="col-md-2 order-5 order-lg-6 mt-5" id="filters">
        <h1>Tools</h1>
          <div className="col">
            <ToggleSwitch
              label={"Circles"}
              handleClick={showHideCircles}
              isDisabled={playable}
              checked={(circlesActive === "none")? false : true}/>
          </div>
          <div>
            <ToggleSwitch
              label={"Radii"}
              handleClick={showHideRadii}
              isDisabled={playable}
              checked={(radiiActive === "none")? false : true}/>
          </div>
          <div className="col">
            <ToggleSwitch
              label={"Outline"}
              handleClick={showHideOutline}
              isDisabled={playable}
              checked={(outlineActive === "none")? false : true}/>
          </div>
          <div className="col">
            <Slider startValue={zoom}
              setValue={setZoom}
              min={100}
              max={1000}
              text={"zoom"}/>
          </div>
          <CoeffEditor
            playable={playable}
            coeff={coeff}
            tick={tick}
            setTick={setTick}
            saveCoeff={saveCoeff}
            setActiveId={setActiveId}
            stop={stop}/>
      </div>
    </div>
  </section>)
};

export default App
