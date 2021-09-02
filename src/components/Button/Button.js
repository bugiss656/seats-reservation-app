

const Button = ({ buttonStyles, text, handleOnClick }) => {
    return (
        <button className={buttonStyles} onClick={handleOnClick}>{text}</button>
    )
}

export default Button