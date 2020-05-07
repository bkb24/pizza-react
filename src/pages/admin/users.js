import React, { useState, useEffect } from 'react'
import { getAllUsers } from '../../services/admin'
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/AdminLayout'

const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllUsers()
            .then(response => setUsers(response.data))
    }, [])

    return (
        <AdminLayout>
            {
                users.map((user, i) => {
                    return (
                        <div className="mb-3">
                            <Link key={user.id} to={`/admin/users/${user.id}`}>
                                <div className="card" style={{ width: '400px' }}>
                                    <div className="card-body d-flex">
                                        <div className="mr-2">({user.id}) | </div>
                                        <div className="mr-2">{user.name} {user.last_name}</div>

                                        <div>{user.isAdmin ? 'Administrator' : (user.isManager ? 'Manager' : '') }</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                })
            }
        </AdminLayout>
    )
}

export default Users
