

const Checkbox = ({ label, value, onChange, disabled }) => {
    return (
        <div className="form-check">
            <input type="checkbox" className="form-check-input" id="checkbox" checked={value} onChange={onChange} disabled={disabled} />
            <label htmlFor="checkbox" className="form-check-label">{label}</label>
        </div>
    )
}

export default Checkbox