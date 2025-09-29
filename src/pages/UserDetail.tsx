import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useNavigation } from '../contexts/AppContext.js'
import { mockUsers, mockActivity } from '../data/mockUsers.js'
import type { User, ActivityItem } from '../types/index.js'

export const UserDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getPath } = useNavigation()
  const [user, setUser] = useState<User | null>(null)
  const [userActivity, setUserActivity] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      const foundUser = mockUsers.find(u => u.id === id)
      const activity = mockActivity.filter(a => a.userId === id)
      setUser(foundUser || null)
      setUserActivity(activity)
      setLoading(false)
    }
  }, [id])

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

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div>Loading user...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
        <h2>User Not Found</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          The user you're looking for doesn't exist.
        </p>
        <Link to={getPath('/list')} className="btn">
          ← Back to Users
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <button 
            onClick={() => navigate(-1)} 
            className="btn btn-outline"
            style={{ marginRight: '15px' }}
          >
            ← Back
          </button>
          <Link to={getPath('/list')} className="btn btn-outline">
            All Users
          </Link>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary">
            ✏️ Edit User
          </button>
          <button className="btn">
            📧 Send Email
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <div className="card">
            <div className="user-profile" style={{ marginBottom: '30px' }}>
              <div 
                className="user-profile-avatar"
                style={{
                  backgroundImage: user.avatar ? `url(${user.avatar})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {!user.avatar && user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="user-profile-info">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <span className={`badge ${getRoleBadgeClass(user.role)}`}>
                    {user.role}
                  </span>
                  <span className={`badge ${getStatusBadgeClass(user.status)}`}>
                    {user.status}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '15px' }}>
              <div>
                <h4>Account Information</h4>
                <div style={{ display: 'grid', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666' }}>User ID:</span>
                    <span style={{ fontFamily: 'monospace' }}>{user.id}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666' }}>Role:</span>
                    <span style={{ textTransform: 'capitalize', fontWeight: '500' }}>{user.role}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666' }}>Status:</span>
                    <span style={{ textTransform: 'capitalize', fontWeight: '500' }}>{user.status}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666' }}>Last Login:</span>
                    <span>{new Date(user.lastLogin).toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666' }}>Joined:</span>
                    <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h4>Quick Actions</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button className="btn btn-outline">
                🔄 Reset Password
              </button>
              <button className="btn btn-outline">
                🛡️ Change Role
              </button>
              <button className="btn btn-outline">
                📋 Export User Data
              </button>
              <button className="btn btn-outline">
                🔐 View Login History
              </button>
              <button 
                className="btn"
                style={{ 
                  backgroundColor: user.status === 'active' ? '#dc3545' : '#28a745',
                  borderColor: user.status === 'active' ? '#dc3545' : '#28a745'
                }}
              >
                {user.status === 'active' ? '❌ Deactivate' : '✅ Activate'} User
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="card">
            <h4>Role Permissions</h4>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '10px',
                padding: '10px 15px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px'
              }}>
                <div style={{ fontSize: '24px' }}>
                  {user.role === 'admin' ? '👑' : user.role === 'user' ? '👤' : '👁️'}
                </div>
                <div>
                  <div style={{ fontWeight: '600', textTransform: 'capitalize' }}>
                    {user.role}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {user.role === 'admin' && 'Full system access'}
                    {user.role === 'user' && 'Standard permissions'}
                    {user.role === 'viewer' && 'Read-only access'}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '10px' }}>
              {[
                { name: 'Create Users', allowed: user.role === 'admin' },
                { name: 'Edit Users', allowed: user.role === 'admin' },
                { name: 'View Products', allowed: true },
                { name: 'Create Orders', allowed: user.role !== 'viewer' },
                { name: 'View Orders', allowed: true },
                { name: 'View Analytics', allowed: user.role === 'admin' },
              ].map((permission, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '8px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px'
                }}>
                  <span>{permission.name}</span>
                  <span style={{ 
                    color: permission.allowed ? '#28a745' : '#dc3545',
                    fontSize: '16px'
                  }}>
                    {permission.allowed ? '✅' : '❌'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h4>Recent Activity</h4>
            <div className="user-activity">
              {userActivity.length > 0 ? (
                userActivity.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">
                      {activity.icon}
                    </div>
                    <div className="activity-content">
                      <div className="title">{activity.description}</div>
                      <div className="time">
                        {new Date(activity.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
                  No recent activity
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
