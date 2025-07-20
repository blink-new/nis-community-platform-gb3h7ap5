import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GraduationCap, Users, BookOpen, Trophy } from 'lucide-react'

interface LoginProps {
  onLogin: (isAuthenticated: boolean) => void
  setUser: (user: any) => void
}

export default function Login({ onLogin, setUser }: LoginProps) {
  const [phone, setPhone] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    // Simulate login
    setTimeout(() => {
      setUser({
        id: 1,
        name: 'Алия Нурланова',
        grade: '11 класс',
        points: 1250,
        avatar: '/api/placeholder/32/32'
      })
      onLogin(true)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="text-center lg:text-left space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">НИШ Платформа</h1>
                <p className="text-gray-600">Социальная экосистема для школьников</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Добро пожаловать в единое пространство НИШ
            </h2>
            <p className="text-lg text-gray-600">
              Находи сообщества, участвуй в мероприятиях, делись материалами и расти вместе с нами
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Сообщества</h3>
              <p className="text-sm text-gray-600">Клубы по интересам</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                <BookOpen className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Материалы</h3>
              <p className="text-sm text-gray-600">Обмен конспектами</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
                <Trophy className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Рейтинг</h3>
              <p className="text-sm text-gray-600">Система достижений</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mb-3">
                <GraduationCap className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">События</h3>
              <p className="text-sm text-gray-600">Объявления и мероприятия</p>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-semibold">Вход в систему</CardTitle>
              <CardDescription>
                Введите номер телефона для входа в платформу
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Номер телефона</label>
                <Input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12 text-lg"
                />
              </div>
              
              <Button 
                onClick={handleLogin}
                disabled={isLoading || !phone}
                className="w-full h-12 text-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              >
                {isLoading ? 'Вход...' : 'Войти'}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Нет аккаунта? Обратитесь к администратору школы
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}