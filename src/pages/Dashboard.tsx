import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Calendar, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Clock,
  MapPin,
  Heart,
  MessageCircle,
  Share2,
  ChevronRight
} from 'lucide-react'

export default function Dashboard() {
  const recentAnnouncements = [
    {
      id: 1,
      title: 'Олимпиада по математике',
      description: 'Регистрация на республиканскую олимпиаду открыта до 25 января',
      category: 'Олимпиады',
      date: '2025-01-20',
      author: 'Администрация',
      participants: 45,
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      title: 'Клуб дебатов: новый набор',
      description: 'Приглашаем всех желающих присоединиться к клубу дебатов',
      category: 'Клубы',
      date: '2025-01-19',
      author: 'Клуб дебатов',
      participants: 23,
      image: '/api/placeholder/300/200'
    }
  ]

  const popularCommunities = [
    { name: 'Клуб дебатов', members: 156, category: 'Образование', color: 'bg-blue-500' },
    { name: 'Шахматный клуб', members: 89, category: 'Спорт', color: 'bg-green-500' },
    { name: 'IT клуб', members: 234, category: 'Технологии', color: 'bg-purple-500' },
    { name: 'Литературный клуб', members: 67, category: 'Искусство', color: 'bg-pink-500' }
  ]

  const recentMaterials = [
    { title: 'Конспект по физике - Механика', subject: 'Физика', grade: '11 класс', likes: 24, author: 'Данияр К.' },
    { title: 'Шпаргалка по химии', subject: 'Химия', grade: '10 класс', likes: 18, author: 'Айгерим С.' },
    { title: 'Математика - Производные', subject: 'Математика', grade: '11 класс', likes: 31, author: 'Арман Т.' }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Добро пожаловать, Алия! 👋</h1>
            <p className="text-indigo-100 mb-4">
              У вас 3 новых уведомления и 2 предстоящих мероприятия
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">1,250 очков</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>5 сообществ</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-white/10 rounded-2xl flex items-center justify-center">
              <Calendar className="w-16 h-16 text-white/80" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Новые объявления</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Активные клубы</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Новые материалы</p>
                <p className="text-2xl font-bold text-gray-900">25</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ваш рейтинг</p>
                <p className="text-2xl font-bold text-gray-900">#15</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Announcements */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Последние объявления</CardTitle>
                <Button variant="ghost" size="sm">
                  Все объявления
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAnnouncements.map((announcement) => (
                <div key={announcement.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={announcement.image} 
                      alt={announcement.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {announcement.category}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {announcement.author}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {announcement.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {announcement.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>2 дня назад</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{announcement.participants} участников</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Popular Communities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Популярные сообщества</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {popularCommunities.map((community, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className={`w-10 h-10 ${community.color} rounded-lg flex items-center justify-center`}>
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{community.name}</p>
                    <p className="text-xs text-gray-500">{community.members} участников</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Materials */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Новые материалы</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentMaterials.map((material, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                  <h4 className="font-medium text-gray-900 text-sm mb-1">
                    {material.title}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>{material.subject} • {material.grade}</span>
                    <span>от {material.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-3 h-3 text-red-500" />
                    <span className="text-xs text-gray-600">{material.likes}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}