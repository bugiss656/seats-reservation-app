

const Checkbox = ({ checkboxLabelText, isChecked, onChange, isDisabled }) => {
    return (
        <div className="form-check">
            <input type="checkbox" className="form-check-input" id="checkbox" checked={isChecked} onChange={onChange} disabled={isDisabled} />
            <label htmlFor="checkbox" className="form-check-label">{checkboxLabelText}</label>
        </div>
    )
}

export default Checkbox