

const Alert = ({ type, text }) => {
    return (
        <div className={type}>{text}</div>
    )
}

export default Alert