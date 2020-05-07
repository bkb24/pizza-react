import React, { useContext } from 'react'
import useForm from '../hooks/useForm'
import { shippingDetails } from '../utils/validations'
import StoreContext from '../context/store-context'

const ShippingDetailsForm = props => {
    const context = useContext(StoreContext)

    const {
        data, errors, onChange, hasErrors,
    } = useForm({
            first_name: context.user ? context.user.name : '',
            last_name: context.user ? context.user.last_name : '',
            phone: context.user ? context.user.phone : '',
            address: context.user ? context.user.address : '',
            city: '',
            state: '',
        },
        shippingDetails
    )

    const order = e => {
        e.preventDefault()

        if (hasErrors()) return

        props.order(data)
    }

    return (
        <div>

            <form>
                <div>
                    <label htmlFor="first_name">First name</label>
                    <input value={data.first_name} onChange={onChange} id="first_name" name="first_name" type="text" />
                    { errors.first_name && <p className="validation-error">{errors.first_name}</p> }
                </div>

                <div>
                    <label htmlFor="last_name">Last name</label>
                    <input value={data.last_name} onChange={onChange} id="last_name" name="last_name" type="text" />
                    { errors.last_name && <p className="validation-error">{errors.last_name}</p> }
                </div>

                <div>
                    <label htmlFor="phone">Phone</label>
                    <input value={data.phone} onChange={onChange} id="phone" name="phone" type="number" />
                    { errors.phone && <p className="validation-error">{errors.phone}</p> }
                </div>

                <div>
                    <label htmlFor="address">Address</label>
                    <textarea value={data.address} onChange={onChange} id="address" name="address"></textarea>
                    { errors.address && <p className="validation-error">{errors.address}</p> }
                </div>

                <div>
                    <label htmlFor="city">City</label>
                    <input value={data.city} onChange={onChange} id="city" name="city" type="text" />
                    { errors.city && <p className="validation-error">{errors.city}</p> }
                </div>

                <div>
                    <label htmlFor="state">State</label>
                    <input value={data.state} onChange={onChange} id="state" name="state" type="text" />
                    { errors.state && <p className="validation-error">{errors.state}</p> }
                </div>

                <div>
                    <button onClick={order}>Order</button>
                </div>
            </form>

        </div>
    )
}

export default ShippingDetailsForm
