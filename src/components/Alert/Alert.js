

const Alert = ({ alertType, alertText }) => {
    return (
        <div className={alertType}>{alertText}</div>
    )
}

export default Alert