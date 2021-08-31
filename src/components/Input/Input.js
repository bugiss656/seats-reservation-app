

const Input = ({ label, value, onChange }) => {
    return (
        <>
            <label htmlFor="input" className="col-md-5 col-form-label">{label}</label>
            <div className="col-md-7">
                <input type="number" min="0" className="form-control" id="input" value={value} onChange={onChange} />
            </div>
        </>
    )
}

export default Input