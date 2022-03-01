import { render, screen } from '@testing-library/react'
import Input from '../Input'

describe("Input", () => {
    it("should render Input component with provided lable text", async() => {
        render(<Input label="Input component" />)
        const inputElement = screen.getByLabelText(/Input component/i)
        expect(inputElement).toBeInTheDocument()
    })

    it("should render Input component with provided number value", async() => {
        render(<Input label="Input component" value={6} onChange={() => {}} />)
        const inputElement = screen.getByLabelText(/Input component/i)
        expect(inputElement).toHaveValue(6)
    })
})