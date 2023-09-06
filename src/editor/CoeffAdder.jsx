import { useState } from "react";
import NumberInput from "../NumberInput";
import Button from "../Button";

const CoeffAdder = ({setRadius, setAngle, angle, radius, pushCoeff, resetCoeff}) => {

    return (<>
        <div>
            <Button
            handleClick={resetCoeff}
            text="reset"
            className="btn btn-outline-primary"
            />
        </div>
        <div className="input-group">
            <span className="input-group-text text-bg-secondary">radian</span>
            <NumberInput
            number={angle}
            setNumber={setAngle}
            step={0.1}
            placeholder={"i"}
            className={"text-bg-info"}
            />
        </div>
        <div className="input-group">
            <span className="input-group-text text-bg-secondary">radius</span>
            <NumberInput
            number={radius}
            setNumber={setRadius}
            min={0}
            className={"text-bg-info"}
            />
            <Button
            handleClick={pushCoeff}
            text="add"
            className="btn btn-outline-primary"
            />
        </div>
    </>)

}

export default CoeffAdder;
