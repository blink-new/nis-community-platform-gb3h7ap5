import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import Dashboard from '@/pages/Dashboard'
import Announcements from '@/pages/Announcements'
import Communities from '@/pages/Communities'
import StudyMaterials from '@/pages/StudyMaterials'
import Leaderboard from '@/pages/Leaderboard'
import Profile from '@/pages/Profile'
import Login from '@/pages/Login'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  if (!isAuthenticated) {
    return <Login onLogin={setIsAuthenticated} setUser={setUser} />
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="flex">
          <Sidebar />
          <div className="flex-1 lg:ml-64">
            <Header user={user} />
            <main className="p-4 lg:p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/announcements" element={<Announcements />} />
                <Route path="/communities" element={<Communities />} />
                <Route path="/materials" element={<StudyMaterials />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/profile" element={<Profile user={user} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </div>
        <Toaster />
      </div>
    </Router>
  )
}

export default App