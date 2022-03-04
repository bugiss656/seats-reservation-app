import styled from "styled-components"


const StyledButton = styled.button`
    background-color: #ffffff;
    color: #000000;
    border: 3px solid #3399ff;
    border-radius: 60px;
    margin: 10px;
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
        color: #ffffff;
        background-color: #3399ff;
    }
`

export const StyledButtonSm = styled(StyledButton)`
    padding: 8px 24px;
    font-size: 14px;
`

export const StyledButtonLg = styled(StyledButton)`
    padding: 12px 28px;
    font-size: 18px;
`