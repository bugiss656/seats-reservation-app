import { useState, useCallback } from 'react'


const useAlert = () => {
    const [display, setDisplay] = useState(false)
    const [alert_text, setAlertText] = useState('')

    const handleDisplayAlert = useCallback((text) => {
        setDisplay(true)
        setAlertText(text)

        setTimeout(() => {
            setDisplay(false)
            setAlertText('')
        }, 3000)
    }, [])

    return { handleDisplayAlert, display, alert_text }
}

export default useAlert