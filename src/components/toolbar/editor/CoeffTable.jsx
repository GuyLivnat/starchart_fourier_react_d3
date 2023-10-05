import CloseButton from "../../general_components/CloseButton";
import AngleIcon from "../../../assets/icons/AngleIcon";
import RadiusIcon from "../../../assets/icons/RadiusIcon";
import { useContext } from "react";
import { TooltipContext } from "../../general_components/TooltipWithContext";


const CoeffTable = ({lst, del}) => {
    const tableItems = [];
    const {tooltipIn, tooltipOut} = useContext(TooltipContext);

    for (let i=2; i<lst.length;) {
        tableItems.push(<tr key={i} id={i}>
            <td
                data-tooltip={lst[i]}
                onMouseEnter={tooltipIn}
                onMouseLeave={tooltipOut}
            >
                {(lst[i++]).toFixed(1)}
            </td>
            <td
                data-tooltip={lst[i]}
                onMouseEnter={tooltipIn}
                onMouseLeave={tooltipOut}
            >
                {(lst[i++]).toFixed(2)}
            </td>
            <td><CloseButton handleClick={del}/></td>
        </tr>)
    }

    return (<>
            <table className="table table-sm table-dark table-striped table-hover" >
                <thead >
                    <tr>
                        <th scope="col">Radius <RadiusIcon/></th>
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