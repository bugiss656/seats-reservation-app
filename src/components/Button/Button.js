import buttonStyles from './Button.module.css'


const Button = ({ size, text, onClick }) => {
    return (
        <button className={`${buttonStyles['button']} ${size}`} onClick={onClick}>{text}</button>
    )
}

export default Button