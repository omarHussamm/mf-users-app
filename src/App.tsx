import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout.js'
import { UserList } from './pages/UserList.js'
import { UserDetail } from './pages/UserDetail.js'
import { CreateUser } from './pages/CreateUser.js'
import { Roles } from './pages/Roles.js'

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/list" replace />} />
          <Route path="/list" element={<UserList />} />
          <Route path="/detail/:id" element={<UserDetail />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="*" element={
            <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
              <h2>Page Not Found</h2>
              <p style={{ color: '#666', marginBottom: '20px' }}>
                The page you're looking for doesn't exist.
              </p>
              <Navigate to="/list" replace />
            </div>
          } />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App
