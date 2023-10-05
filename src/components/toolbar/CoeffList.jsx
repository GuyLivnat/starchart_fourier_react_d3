import createCoeff from '../chart/math/createCoeff';
import List from '../general_components/List';
import cat from '../../assets/defaults/cat.json'
import dog from '../../assets/defaults/dog.json'
import mushu from '../../assets/defaults/mushu.json'


const defaults = [mushu, cat, dog]



const CoeffList = ({coeff, activeId, setActiveId, coeffList, setCoeffList, saveCoeff, units, stop, setPathName}) => {

    const loadCoeff = (e) => {
        let id = null
        if (e.target.id) id = e.target.id
        else if (e.target.parentElement.id) id = e.target.parentElement.id;
        else if (e.target.parentElement.parentElement.id) id = e.target.parentElement.parentElement.id;
        if (id && (id !== activeId) && (id !== 'setNewName')) {
            const obj = JSON.parse(localStorage.getItem(id));
            coeff.current = obj.coeff;
            stop();
            setActiveId(id);
            setPathName('Now running ' + obj.name);
        }
    }

    const deleteCoeff = (e) => {
        e.stopPropagation();
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

    const saveDefault = (coeffs, name, id) => {
        const obj = JSON.stringify({name: name, coeff: coeffs});
        localStorage.setItem(id, obj);
    }

    const resetDefaultCoeff = () => {
        const missingDefaults = [];

        for (const object of defaults) {
            let flag = false;

            for (const item of coeffList) {
                if (item.id === object.id) flag = true;
            }
            if (!flag) { // object not found
                missingDefaults.push({name: object.name, id: object.id, default:true})
                saveDefault(object.coeff, object.name, object.id);
            }
        }
        setCoeffList([ ...coeffList, ...missingDefaults])
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
        setCoeffList(newList);
        setPathName('Now running ' + newName);
    }

    const uploadSVG = (event) => {   // converts an uploaded SVG to something readable 
        const file = event.target.files[0];
        if (file) {
          const name = nameParser(file.name)
          const reader = new FileReader();
          reader.onload = (e) => {
              const string = e.target.result;
              const parser = new DOMParser();
              const parsedFile = parser.parseFromString(string, "image/svg+xml");
              const path = parsedFile.querySelector("path");
              const coeff = createCoeff(path, units);
              saveCoeff(coeff, name) // this function ends here and chains to a new function!
          }
          reader.readAsText(file);
        };
      }

    const nameParser = (name) => {
        return (name.replace('.svg', '') + ` with ${units} points`)
    }

    return (
        <List
            lst={coeffList}
            load={loadCoeff}
            del={deleteCoeff}
            delAll={deleteAllCoeff}
            resetDefaults={resetDefaultCoeff}
            rename={renameCoeff}
            focus={activeId}
            upload={uploadSVG}
            uploadTooltip="upload an SVG file with a single path"/>
    )
};

export default CoeffList;
