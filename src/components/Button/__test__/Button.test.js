import { render, screen } from '@testing-library/react'
import Button from '../Button'
import buttonStyles from '../Button.module.css'


describe("Button", () => {
    it("should render a button component with provided text", async() => {
        render(<Button buttonText="Button component"/>)
        const buttonElement = screen.getByText(/Button component/i)
        expect(buttonElement).toBeInTheDocument()
    })

    it("should render a button component with class small", async() => {
        render(<Button buttonSize={buttonStyles['button-sm']} buttonText="Button component" />)
        const buttonElement = screen.getByText(/Button component/i)
        expect(buttonElement).toHaveClass('button', 'button-sm')
    })

    it("should render a button component with class large", async() => {
        render(<Button buttonSize={buttonStyles['button-lg']} buttonText="Button component" />)
        const buttonElement = screen.getByText(/Button component/i)
        expect(buttonElement).toHaveClass('button', 'button-lg')
    })
})