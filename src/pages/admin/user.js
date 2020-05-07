import React, { useState, useEffect } from 'react'
import { getAUser, getRoles, addUserARole, removeUserRole } from '../../services/admin'
import { useParams } from 'react-router-dom'
import AdminLayout from '../../components/AdminLayout'
import { Link } from 'react-router-dom'

const Users = () => {
    const [roles, setRoles] = useState([])
    const [user, setUser] = useState({})

    let { id } = useParams()

    useEffect(() => {
        getAUser(id)
            .then(response => {
                setUser(response.data)

                return getRoles()
            })
            .then(response => setRoles(response.data))
    }, [id])

    const addRole = (role) => {
        addUserARole(user.id, role.slug)
            .then(response => {
                let newUser = { ...user }
                newUser.roles.push(role)
                setUser(newUser)
            })
    }

    const removeRole = (role) => {
        removeUserRole(user.id, role.slug)
            .then(response => {
                let newUser = { ...user }
                let index = newUser.roles.findIndex(userRole => userRole.id === role.id)
                newUser.roles.splice(index, 1)
                setUser(newUser)
            })
    }

    return (
        <AdminLayout>
            <div className="card d-block">
                <div className="card-body">

                    <div>id: {user.id}</div>
                    <div className="mb-3">full name: {user.name} {user.last_name}</div>

                    { user.roles &&
                        <div>
                            <h4 className="mb-3 border-bottom pb-3">User roles</h4>
                            {
                                user.roles.map((role, i) => {
                                    return (
                                        <div key={role.id}>
                                            <div className="d-flex">
                                                <div>{ role.name }</div>
                                                <button className="ml-2 btn btn-danger" onClick={e => removeRole(role)}>&times; Remove role</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }

                    { !user.isAdmin &&

                        <div className="mt-4">
                            <h4 className="mb-3 border-bottom pb-3">Add roles</h4>
                            {
                                roles.map((role, i) => {
                                    let indexRole = user.roles.findIndex(item => item.id === role.id)

                                    if (indexRole < 0)
                                        return (
                                            <div key={role.id} className="d-flex mb-2">
                                                <div style={{ width: '200px' }}>{role.name}</div>
                                                <button className="btn btn-primary" onClick={e => addRole(role)}>add role</button>
                                            </div>
                                        )

                                    return ''
                                })
                            }
                        </div>
                    }
                </div>
            </div>

            <Link className="mt-4 btn btn-outline-primary" to={`/admin/users/${id}/orders`}>Orders history</Link>

        </AdminLayout>
    )
}

export default Users
