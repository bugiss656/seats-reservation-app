

const Button = ({ text, handleOnClick }) => {
    return (
        <button className="btn btn-primary m-2" onClick={handleOnClick}>{text}</button>
    )
}

export default Button