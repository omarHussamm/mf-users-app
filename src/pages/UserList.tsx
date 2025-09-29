import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigation } from '../contexts/AppContext.js'
import { mockUsers } from '../data/mockUsers.js'
import type { User } from '../types/index.js'

export const UserList = () => {
  const { getPath } = useNavigation()
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const roleOptions = [
    { value: 'all', label: 'All Roles', count: users.length },
    { value: 'admin', label: 'Admin', count: users.filter(u => u.role === 'admin').length },
    { value: 'user', label: 'User', count: users.filter(u => u.role === 'user').length },
    { value: 'viewer', label: 'Viewer', count: users.filter(u => u.role === 'viewer').length },
  ]

  const statusOptions = [
    { value: 'all', label: 'All Status', count: users.length },
    { value: 'active', label: 'Active', count: users.filter(u => u.status === 'active').length },
    { value: 'inactive', label: 'Inactive', count: users.filter(u => u.status === 'inactive').length },
  ]

  const filteredUsers = users.filter(user => {
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesRole && matchesStatus && matchesSearch
  })

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'admin': return 'badge-primary'
      case 'user': return 'badge-secondary'
      case 'viewer': return 'badge-outline'
      default: return 'badge-outline'
    }
  }

  const getStatusBadgeClass = (status: string) => {
    return status === 'active' ? 'badge-success' : 'badge-danger'
  }

  const toggleUserStatus = (userId: string) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId 
          ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
          : user
      )
    )
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Users</h1>
        <Link to={getPath('/create')} className="btn">
          ➕ Add New User
        </Link>
      </div>

      <div className="card">
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ 
            width: '100%', 
            marginBottom: '20px',
            padding: '12px',
            fontSize: '16px'
          }}
        />

        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500' }}>
              Filter by Role:
            </label>
            <div className="user-filters">
              {roleOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setRoleFilter(option.value)}
                  className={`user-filter ${roleFilter === option.value ? 'active' : ''}`}
                >
                  {option.label} ({option.count})
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500' }}>
              Filter by Status:
            </label>
            <div className="user-filters">
              {statusOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setStatusFilter(option.value)}
                  className={`user-filter ${statusFilter === option.value ? 'active' : ''}`}
                >
                  {option.label} ({option.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <table className="user-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="user-profile">
                    <div 
                      className="user-avatar"
                      style={{
                        backgroundImage: user.avatar ? `url(${user.avatar})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      {!user.avatar && user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div style={{ fontWeight: '500' }}>
                        <Link 
                          to={getPath(`/detail/${user.id}`)}
                          style={{ color: '#007bff', textDecoration: 'none' }}
                        >
                          {user.name}
                        </Link>
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`badge ${getRoleBadgeClass(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`badge ${getStatusBadgeClass(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <div style={{ fontSize: '14px' }}>
                    {new Date(user.lastLogin).toLocaleDateString()}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {new Date(user.lastLogin).toLocaleTimeString()}
                  </div>
                </td>
                <td>
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <Link 
                      to={getPath(`/detail/${user.id}`)}
                      className="btn btn-outline"
                      style={{ padding: '4px 8px', fontSize: '12px' }}
                    >
                      View
                    </Link>
                    <button 
                      className={`btn ${user.status === 'active' ? 'btn-secondary' : ''}`}
                      style={{ padding: '4px 8px', fontSize: '12px' }}
                      onClick={() => toggleUserStatus(user.id)}
                    >
                      {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <h3>No Users Found</h3>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            No users match your current filter criteria.
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button 
              onClick={() => {
                setRoleFilter('all')
                setStatusFilter('all')
                setSearchTerm('')
              }}
              className="btn btn-outline"
            >
              Clear Filters
            </button>
            <Link to={getPath('/create')} className="btn">
              Add First User
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
