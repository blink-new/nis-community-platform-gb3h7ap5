import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { 
  Home, 
  Megaphone, 
  Users, 
  BookOpen, 
  Trophy, 
  User,
  GraduationCap
} from 'lucide-react'

const navigation = [
  { name: 'Главная', href: '/', icon: Home },
  { name: 'Объявления', href: '/announcements', icon: Megaphone },
  { name: 'Сообщества', href: '/communities', icon: Users },
  { name: 'Материалы', href: '/materials', icon: BookOpen },
  { name: 'Рейтинг', href: '/leaderboard', icon: Trophy },
  { name: 'Профиль', href: '/profile', icon: User },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 lg:block hidden">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">НИШ</h1>
              <p className="text-xs text-gray-500">Платформа</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200',
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                )}
              >
                <item.icon className={cn(
                  'w-5 h-5 mr-3',
                  isActive ? 'text-white' : 'text-gray-400'
                )} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            НИШ Платформа v1.0
          </div>
        </div>
      </div>
    </div>
  )
}