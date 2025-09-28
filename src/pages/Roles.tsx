import { useState } from 'react'
import { Link } from 'react-router-dom'
import { mockRoles } from '../data/mockUsers.js'

export const Roles = () => {
  const [roles] = useState(mockRoles)

  const permissions = [
    'users.create',
    'users.read', 
    'users.update',
    'users.delete',
    'products.create',
    'products.read',
    'products.update', 
    'products.delete',
    'orders.create',
    'orders.read',
    'orders.update',
    'orders.delete',
    'analytics.read'
  ]

  const getPermissionLabel = (permission: string) => {
    const [resource, action] = permission.split('.')
    return `${action.charAt(0).toUpperCase() + action.slice(1)} ${resource.charAt(0).toUpperCase() + resource.slice(1)}`
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Roles & Permissions</h1>
        <Link to="/list" className="btn btn-outline">
          ← Back to Users
        </Link>
      </div>

      <div className="role-grid">
        {roles.map(role => (
          <div key={role.id} className="role-card">
            <div className="role-icon">
              {role.name === 'Admin' ? '👑' : 
               role.name === 'User' ? '👤' : '👁️'}
            </div>
            <h3 style={{ margin: '0 0 10px 0' }}>{role.name}</h3>
            <p style={{ color: '#666', marginBottom: '15px', minHeight: '40px' }}>
              {role.description}
            </p>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '15px'
            }}>
              <span className="badge badge-primary">
                {role.userCount} users
              </span>
              <span className="badge badge-outline">
                {role.permissions.length} permissions
              </span>
            </div>
            <button className="btn btn-outline" style={{ width: '100%' }}>
              ⚙️ Manage Role
            </button>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Permission Matrix</h3>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          Overview of permissions across all roles
        </p>

        <div className="permission-matrix">
          <div className="header">Permission</div>
          <div className="header">Admin</div>
          <div className="header">User</div>
          <div className="header">Viewer</div>

          {permissions.map(permission => (
            <div key={permission} className="permission-row">
              <div className="permission-name">
                {getPermissionLabel(permission)}
              </div>
              {roles.map(role => (
                <div 
                  key={`${role.id}-${permission}`}
                  className={`permission-check ${
                    role.permissions.includes(permission) ? 'allowed' : 'denied'
                  }`}
                >
                  {role.permissions.includes(permission) ? '✅' : '❌'}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="card">
          <h3>Role Management</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button className="btn">
              ➕ Create New Role
            </button>
            <button className="btn btn-outline">
              📋 Export Permissions
            </button>
            <button className="btn btn-outline">
              🔄 Sync with LDAP
            </button>
            <button className="btn btn-outline">
              📊 Permission Audit
            </button>
          </div>
        </div>

        <div className="card">
          <h3>Quick Stats</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Total Roles:</span>
              <span style={{ fontWeight: '500' }}>{roles.length}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Total Permissions:</span>
              <span style={{ fontWeight: '500' }}>{permissions.length}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Active Users:</span>
              <span style={{ fontWeight: '500' }}>
                {roles.reduce((sum, role) => sum + role.userCount, 0)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Admin Users:</span>
              <span style={{ fontWeight: '500', color: '#007bff' }}>
                {roles.find(r => r.name === 'Admin')?.userCount || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
