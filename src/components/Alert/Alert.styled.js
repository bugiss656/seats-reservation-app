import styled from "styled-components"


const StyledAlert = styled.div`
    position: fixed;
    left: 0;
    top: 80px;
    width: 100%;
    padding: 12px;
    font-size: 16px;
    background-color: ${({ alertType }) => {
        switch(alertType) {
            case 'success':
                return '#ccffcc'
            case 'danger':
                return '#ffe6e6'
            default:
                return ''
        }
    }}
`

const Alert = ({ alertType, alertText }) => {
    return (
        <StyledAlert alertType={alertType}>{alertText}</StyledAlert>
    )
}

export default Alert