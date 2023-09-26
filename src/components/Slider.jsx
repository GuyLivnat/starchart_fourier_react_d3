const Slider = ({value, setValue, min, max, text, setTick, disabled, className}) => {
    const handleChange = (e) => {
        if (setValue)setValue(parseFloat(e.target.value));
        else value.current = parseFloat(e.target.value);

        setTick(Math.random());
        
    }
    return (<>
        <label
            htmlFor={text}
            className="form-label">
            {text}
        </label>
        <input
            type="range"
            id={text}
            min={min}
            max={max}
            onChange={handleChange}
            value={setValue? value: value.current}
            disabled={disabled}
            className="form-range"/>
    </>)
}

export default Slider;