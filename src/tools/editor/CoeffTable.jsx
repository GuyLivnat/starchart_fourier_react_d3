import CloseButton from "../../components/CloseButton";
import AngleIcon from "../../assets/icons/AngleIcon";
import {Tooltip} from 'bootstrap'

const CoeffTable = ({lst, del}) => {
  
    const tableItems = [];

    for (let i=2; i<lst.length;) {
        tableItems.push(<tr key={i} id={i}>
            <td>{(lst[i++]).toFixed(1)}</td>
            <td>{(lst[i++]).toFixed(2)}</td>
            <td><CloseButton handleClick={del}/></td>
        </tr>)
    }

    return (<>
            <table className="table table-sm table-dark table-striped table-hover" >
                <thead >
                    <tr>
                        <th scope="col">Radius {'\u2300'}</th>
                        <th scope="col">Angle <AngleIcon/></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tableItems}
                </tbody>
            </table>
        </>)
};

export default CoeffTable;