import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const CreateUser = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    status: 'active'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.email.trim()) {
      alert('Please fill in all required fields')
      return
    }

    console.log('Creating user:', formData)
    alert('User created successfully!')
    navigate('/list')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Create New User</h1>
        <Link to="/list" className="btn btn-outline">
          ← Back to Users
        </Link>
      </div>

      <div style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit}>
          <div className="card">
            <h3>User Information</h3>
            
            <div style={{ display: 'grid', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                  style={{ width: '100%', padding: '12px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="user@company.com"
                  required
                  style={{ width: '100%', padding: '12px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '12px' }}
                >
                  <option value="viewer">Viewer - Read-only access</option>
                  <option value="user">User - Standard permissions</option>
                  <option value="admin">Admin - Full access</option>
                </select>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                  Choose the appropriate role based on the user's responsibilities
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '12px' }}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card">
            <h3>Role Permissions Preview</h3>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                padding: '15px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px'
              }}>
                <div style={{ fontSize: '32px' }}>
                  {formData.role === 'admin' ? '👑' : 
                   formData.role === 'user' ? '👤' : '👁️'}
                </div>
                <div>
                  <div style={{ fontWeight: '600', textTransform: 'capitalize', fontSize: '18px' }}>
                    {formData.role}
                  </div>
                  <div style={{ color: '#666' }}>
                    {formData.role === 'admin' && 'Full system access with all permissions'}
                    {formData.role === 'user' && 'Standard user with limited permissions'}
                    {formData.role === 'viewer' && 'Read-only access to basic information'}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '8px' }}>
              {[
                { name: 'View Products', admin: true, user: true, viewer: true },
                { name: 'Create/Edit Products', admin: true, user: false, viewer: false },
                { name: 'View Orders', admin: true, user: true, viewer: true },
                { name: 'Create Orders', admin: true, user: true, viewer: false },
                { name: 'Manage Users', admin: true, user: false, viewer: false },
                { name: 'View Analytics', admin: true, user: false, viewer: false },
              ].map((permission, index) => {
                const hasPermission = permission[formData.role as keyof typeof permission] as boolean
                return (
                  <div key={index} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '8px 12px',
                    backgroundColor: hasPermission ? '#e8f5e8' : '#f8f8f8',
                    borderRadius: '4px'
                  }}>
                    <span>{permission.name}</span>
                    <span style={{ 
                      color: hasPermission ? '#28a745' : '#dc3545',
                      fontSize: '16px'
                    }}>
                      {hasPermission ? '✅' : '❌'}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
              <Link to="/list" className="btn btn-outline">
                Cancel
              </Link>
              <button type="submit" className="btn">
                👤 Create User
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
