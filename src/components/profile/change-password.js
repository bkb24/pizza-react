import React from 'react'

const ChangePassword = props => {


    return (
        <div className="profile-change-password">
            <div>
                <label for="current_password">Current password: </label>
                <input id="current_password" maxLength="255" name="current_password" type="password" />
            </div>

            <div>
                <label for="password">New password: </label>
                <input id="password" maxLength="255" name="password" type="password" />
            </div>

            <div>
                <label for="password_confirmation">Repeat: </label>
                <input id="password_confirmation" maxLength="255" name="password_confirmation" type="password" />
            </div>

            <div>
                <button onClick="">Change password</button>
            </div>
        </div>
    )
}

export default ChangePassword
