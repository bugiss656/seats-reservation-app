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
    const [seatsCount, setSeatsCount] = useState(0)
    const [seatsNearBy, setSeatsNearBy] = useState(false)
    const [checkboxDisabled, setCheckboxDisabled] = useState(true)
    
    const { handleDisplayAlert, display, alertText } = useAlert()

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
        setSeatsNearBy(!seatsNearBy)
    }


    const handleUpdateSeatsCount = () => {
        dispatch(updateSeatsCount(seatsCount))
    }


    const handleUpdateSeatsNearBy = () => {
        dispatch(updateSeatsNearBy(seatsNearBy))
    }
    

    const handleOnFormSubmit = (e) => {
        e.preventDefault()

        if ( seatsCount === 0) {
            handleDisplayAlert('Nie wybrano żadnych miejsc, spróbuj ponownie.')


        } else if (seatsNearBy === true && seatsCount > 5) {
            handleDisplayAlert('Maksymalna ilość miejsc obok siebie: 5.')

        } else {
            handleUpdateSeatsCount()
            handleUpdateSeatsNearBy()
            history.push('/reservation-view')
        }
    }
    

    return (
        <section className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            {display && <Alert type={`${alertStyles['alert-box']} ${alertStyles['alert-box--danger']}`} text={alertText} />}
            <form onSubmit={handleOnFormSubmit}>
                <div className="row my-4">
                    <Input label="Liczba miejc:" value={seatsCount} onChange={handleInputOnChange} />
                </div>
                <div className="row my-4">
                    <div className="col-md-12 d-flex justify-content-center"> 
                        <Checkbox labelText="Czy miejsca mają być obok siebie?" isChecked={seatsNearBy} onChange={handleCheckboxOnChange} isDisabled={checkboxDisabled} />
                    </div>
                </div>
                <div className="row my-4">
                    <div className="col-md d-flex justify-content-center">
                        <Button size={buttonStyles['button-lg']} text="Wybierz miejsca" />
                    </div>
                </div>
            </form>
        </section>
    )
}

export default Homepage