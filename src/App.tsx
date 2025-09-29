import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './contexts/AppContext.js'
import { AppLayout } from './components/layout/AppLayout.js'
import { UserList } from './pages/UserList.js'
import { UserDetail } from './pages/UserDetail.js'
import { CreateUser } from './pages/CreateUser.js'
import { Roles } from './pages/Roles.js'

// Flag to determine if app runs standalone or as a federated remote
// Default to true for development, override with VITE_STANDALONE env var
const STANDALONE = import.meta.env.VITE_STANDALONE !== 'false'

// Import User type from context
import type { User } from './contexts/AppContext.js'

interface AppProps {
  basePath?: string;
  user?: User | null;
}

function App({ basePath = '', user = null }: AppProps) {
  const AppContent = (
    <AppProvider basePath={basePath} user={user}>
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
