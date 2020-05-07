import React, { useContext } from 'react'
import StoreContext from '../context/store-context'
import useForm from '../hooks/useForm'
import { phoneUpdate, addressUpdate } from '../utils/validations'
import { savePhone, saveAddress } from '../services/user'
import { Link } from 'react-router-dom'

const Profile = props => {
    const context = useContext(StoreContext)

    const phoneForm = useForm(
        { phone: context.user.phone },
        phoneUpdate
    );

    const addressForm = useForm(
        { address: context.user.address },
        addressUpdate
    );

    const updatePhone = e => {
        if (!phoneForm.hasErrors()) {
            savePhone(phoneForm.data.phone)
                .then(response => {
                    context.setUserData({ ...context.user, phone: phoneForm.data.phone })
                })
        }
    }

    const updateAddress = e => {
        if (!addressForm.hasErrors()) {
            saveAddress(addressForm.data.address)
                .then(response => {
                    context.setUserData({ ...context.user, address: addressForm.data.address })
                })
        }
    }

    return (
        <div className="mt-4">

            <div className="profile-main">
                <div>Hello, {context.user.name + ' ' + context.user.last_name }</div>
            </div>

            <div className="d-flex">
                <nav className="d-inline-block mt-3">
                    <ul className="list-group nav flex-column justify-content-center">
                        <li className="list-group-item nav-item">
                            <Link className="nav-link" to="/orders">Order history</Link>
                        </li>
                    </ul>
                </nav>

                <div className="profile-info ml-4 mt-2" style={{ width: '400px' }}>
                    <div>
                        <div>
                            <label htmlFor="phone">Phone: </label>
                            <input className="form-control"
                                onChange={phoneForm.onChange} onBlur={phoneForm.onBlur} id="phone" maxLength="15" name="phone" type="text"
                                value={phoneForm.data.phone} />

                        </div>

                        { phoneForm.errors.phone && <p className="text-danger">{phoneForm.errors.phone}</p> }

                        <div>
                            <button className="mt-2 btn btn-primary" onClick={updatePhone}>Save phone</button>
                        </div>
                    </div>

                    <div className="mt-3">
                        <div>
                            <label htmlFor="address">Address: </label>
                            <textarea rows="3" className="form-control" onChange={addressForm.onChange}
                                onBlur={addressForm.onBlur} id="address" name="address" value={addressForm.data.address}></textarea>
                        </div>

                        { addressForm.errors.address && <p className="text-danger">{addressForm.errors.address}</p> }

                        <div>
                            <button className="mt-2 btn btn-primary" onClick={updateAddress}>Save address</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile
