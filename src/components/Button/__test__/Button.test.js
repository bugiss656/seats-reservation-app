import { render, screen } from '@testing-library/react'
import Button from '../Button'
import buttonStyles from '../Button.module.css'


describe("Button", () => {
    it("should render a button component with provided text", async() => {
        render(<Button  text="Button component"/>)
        const buttonElement = screen.getByText(/Button component/i)
        expect(buttonElement).toBeInTheDocument()
    })

    it("should render a button component with class small", async() => {
        render(<Button buttonStyles={`${buttonStyles.button} ${buttonStyles.buttonSm}`} text="Button component" />)
        const buttonElement = screen.getByText(/Button component/i)
        expect(buttonElement).toHaveClass('button', 'buttonSm')
    })

    it("should render a button component with class large", async() => {
        render(<Button buttonStyles={`${buttonStyles.button} ${buttonStyles.buttonLg}`} text="Button component" />)
        const buttonElement = screen.getByText(/Button component/i)
        expect(buttonElement).toHaveClass('button', 'buttonLg')
    })
})