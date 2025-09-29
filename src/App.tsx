import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './contexts/AppContext.js'
import { AppLayout } from './components/layout/AppLayout.js'
import { UserList } from './pages/UserList.js'
import { UserDetail } from './pages/UserDetail.js'
import { CreateUser } from './pages/CreateUser.js'
import { Roles } from './pages/Roles.js'

// Flag to determine if app runs standalone or as a federated remote
const STANDALONE = false // Set to false when running in federation mode

interface AppProps {
  basePath?: string;
}

function App({ basePath = '' }: AppProps) {
  const AppContent = (
    <AppProvider basePath={basePath}>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to={STANDALONE ? "/list" : `${basePath}/list`} replace />} />
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
              <Navigate to={STANDALONE ? "/list" : `${basePath}/list`} replace />
            </div>
          } />
        </Routes>
      </AppLayout>
    </AppProvider>
  )

  // Conditionally wrap with BrowserRouter for standalone mode
  return STANDALONE ? (
    <BrowserRouter>
      {AppContent}
    </BrowserRouter>
  ) : (
    AppContent
  )
}

export default App
