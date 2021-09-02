import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../components/Button/Button'
import Checkbox from '../../components/Checkbox/Checkbox'
import Input from '../../components/Input/Input'
import { useDispatch } from 'react-redux'
import { updateSeatsCount, updateSeatsNearBy } from '../../features/order/orderSlice'
import Alert from '../../components/Alert/Alert'

import alertStyles from '../../components/Alert/Alert.module.css'
import buttonStyles from '../../components/Button/Button.module.css'

import useAlert from '../../components/Alert/useAlert'



const Homepage = () => {
    const [seats_count, setSeatsCount] = useState(0)
    const [seats_near_by, setSeatsNearBy] = useState(false)
    const [checkbox_disabled, setCheckboxDisabled] = useState(true)
    
    const { handleDisplayAlert, display, alert_text } = useAlert()

    const dispatch = useDispatch()
    const history = useHistory()


    const handleInputOnChange = (e) => {
        setSeatsCount(e.target.value)

        if (e.target.value === '0' || e.target.value === '1') {
            setCheckboxDisabled(true) 
        } else {
            setCheckboxDisabled(false)
        }
    }


    const handleCheckboxOnChange = () => {
        setSeatsNearBy(!seats_near_by)
    }


    const handleUpdateSeatsCount = () => {
        dispatch(updateSeatsCount(seats_count))
    }


    const handleUpdateSeatsNearBy = () => {
        dispatch(updateSeatsNearBy(seats_near_by))
    }
    

    const handleOnFormSubmit = (e) => {
        e.preventDefault()

        if ( seats_count === 0) {
            handleDisplayAlert('Nie wybrano żadnych miejsc, spróbuj ponownie.')


        } else if (seats_near_by === true && seats_count > 5) {
            handleDisplayAlert('Maksymalna ilość miejsc obok siebie: 5.')

        } else {
            handleUpdateSeatsCount()
            handleUpdateSeatsNearBy()
            history.push('/reservation-view')
        }
    }
    

    return (
        <section className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            {display && 
                <Alert type={`${alertStyles.alertBox} ${alertStyles.alertBoxDanger}`} text={alert_text} />
            }
            <form onSubmit={handleOnFormSubmit}>
                <div className="row my-3">
                    <Input label="Liczba miejc:" value={seats_count} onChange={handleInputOnChange} />
                </div>
                <div className="row my-3">
                    <div className="col-md-12 d-flex justify-content-center"> 
                        <Checkbox label="Czy miejsca mają być obok siebie?" value={seats_near_by} onChange={handleCheckboxOnChange} disabled={checkbox_disabled} />
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-md d-flex justify-content-center">
                        <Button buttonStyles={`${buttonStyles.button} ${buttonStyles.buttonLg} ${buttonStyles.buttonSecondary}`} text="Wybierz miejsca" />
                    </div>
                </div>
            </form>
        </section>
    )
}

export default Homepage