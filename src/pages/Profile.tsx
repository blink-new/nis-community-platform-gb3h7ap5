import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Edit,
  Settings,
  Trophy,
  Users,
  BookOpen,
  Calendar,
  MessageCircle,
  Heart,
  Download,
  Star,
  Crown,
  Award,
  TrendingUp,
  MapPin,
  Mail,
  Phone
} from 'lucide-react'

interface ProfileProps {
  user: any
}

export default function Profile({ user }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false)

  const profileData = {
    name: 'Алия Нурланова',
    grade: '11 класс',
    school: 'НИШ Астана',
    email: 'aliya.nurlanova@nis.edu.kz',
    phone: '+7 (777) 123-45-67',
    bio: 'Увлекаюсь математикой и программированием. Активно участвую в олимпиадах и научных проектах. Люблю делиться знаниями с одноклассниками.',
    location: 'Астана, Казахстан',
    joinDate: '2024-09-01',
    avatar: '/api/placeholder/128/128',
    points: 1250,
    rank: 15,
    level: 'Золотой'
  }

  const stats = {
    posts: 12,
    materials: 5,
    communities: 3,
    events: 7,
    likes: 89,
    downloads: 156
  }

  const badges = [
    { name: 'Активист', description: 'Набрал 1000 очков', icon: Star, color: 'bg-yellow-100 text-yellow-800' },
    { name: 'Помощник', description: 'Загрузил 5 материалов', icon: BookOpen, color: 'bg-green-100 text-green-800' },
    { name: 'Социальный', description: 'Присоединился к 3 клубам', icon: Users, color: 'bg-blue-100 text-blue-800' }
  ]

  const recentActivity = [
    {
      type: 'material',
      title: 'Загрузил конспект по физике',
      description: 'Механика - основные формулы и законы',
      date: '2025-01-18',
      points: '+25'
    },
    {
      type: 'comment',
      title: 'Прокомментировал материал',
      description: 'Отличный конспект по химии!',
      date: '2025-01-17',
      points: '+5'
    },
    {
      type: 'event',
      title: 'Зарегистрировался на олимпиаду',
      description: 'Республиканская олимпиада по математике',
      date: '2025-01-16',
      points: '+15'
    },
    {
      type: 'community',
      title: 'Присоединился к клубу',
      description: 'IT клуб',
      date: '2025-01-15',
      points: '+30'
    }
  ]

  const myMaterials = [
    {
      id: 1,
      title: 'Конспект по физике - Механика',
      subject: 'Физика',
      grade: '11 класс',
      downloads: 45,
      likes: 12,
      date: '2025-01-18'
    },
    {
      id: 2,
      title: 'Решения задач по математике',
      subject: 'Математика',
      grade: '11 класс',
      downloads: 67,
      likes: 18,
      date: '2025-01-10'
    },
    {
      id: 3,
      title: 'Шпаргалка по английскому',
      subject: 'Английский язык',
      grade: '11 класс',
      downloads: 34,
      likes: 8,
      date: '2025-01-05'
    }
  ]

  const myCommunities = [
    { name: 'IT клуб', role: 'Участник', members: 234, joined: '2025-01-15' },
    { name: 'Клуб математики', role: 'Модератор', members: 123, joined: '2024-12-20' },
    { name: 'Клуб дебатов', role: 'Участник', members: 156, joined: '2024-11-10' }
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'material': return <BookOpen className="w-4 h-4 text-green-500" />
      case 'comment': return <MessageCircle className="w-4 h-4 text-blue-500" />
      case 'event': return <Calendar className="w-4 h-4 text-purple-500" />
      case 'community': return <Users className="w-4 h-4 text-indigo-500" />
      default: return <Star className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-6">
              <Avatar className="w-24 h-24 border-4 border-white">
                <AvatarImage src={profileData.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-2xl">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <h1 className="text-2xl font-bold mb-1">{profileData.name}</h1>
                <p className="text-indigo-100 mb-2">{profileData.grade} • {profileData.school}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Trophy className="w-4 h-4" />
                    <span className="font-medium">{profileData.points} очков</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>Рейтинг #{profileData.rank}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button 
                variant="secondary" 
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Edit className="w-4 h-4 mr-2" />
                Редактировать
              </Button>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.posts}</div>
              <div className="text-sm text-gray-500">Постов</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.materials}</div>
              <div className="text-sm text-gray-500">Материалов</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.communities}</div>
              <div className="text-sm text-gray-500">Клубов</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.events}</div>
              <div className="text-sm text-gray-500">Событий</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.likes}</div>
              <div className="text-sm text-gray-500">Лайков</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.downloads}</div>
              <div className="text-sm text-gray-500">Скачиваний</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="activity">Активность</TabsTrigger>
              <TabsTrigger value="materials">Материалы</TabsTrigger>
              <TabsTrigger value="communities">Клубы</TabsTrigger>
              <TabsTrigger value="settings">Настройки</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Последняя активность</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                      <div className="mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{activity.title}</h4>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">
                            {new Date(activity.date).toLocaleDateString('ru-RU')}
                          </span>
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            {activity.points}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="materials" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Мои материалы</CardTitle>
                  <CardDescription>Загруженные вами учебные материалы</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {myMaterials.map((material) => (
                    <div key={material.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{material.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                            <span>{material.subject}</span>
                            <span>•</span>
                            <span>{material.grade}</span>
                            <span>•</span>
                            <span>{new Date(material.date).toLocaleDateString('ru-RU')}</span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Download className="w-3 h-3" />
                              <span>{material.downloads} скачиваний</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-3 h-3" />
                              <span>{material.likes} лайков</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Редактировать
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="communities" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Мои сообщества</CardTitle>
                  <CardDescription>Клубы, в которых вы участвуете</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {myCommunities.map((community, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-gray-900">{community.name}</h4>
                            <Badge variant={community.role === 'Модератор' ? 'default' : 'secondary'}>
                              {community.role}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Users className="w-3 h-3" />
                              <span>{community.members} участников</span>
                            </div>
                            <span>Присоединился {new Date(community.joined).toLocaleDateString('ru-RU')}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Открыть
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки профиля</CardTitle>
                  <CardDescription>Управление личной информацией</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Имя</label>
                      <Input value={profileData.name} disabled={!isEditing} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Класс</label>
                      <Input value={profileData.grade} disabled={!isEditing} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                      <Input value={profileData.email} disabled={!isEditing} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Телефон</label>
                      <Input value={profileData.phone} disabled={!isEditing} />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">О себе</label>
                    <Textarea 
                      value={profileData.bio} 
                      disabled={!isEditing}
                      rows={3}
                    />
                  </div>

                  {isEditing && (
                    <div className="flex space-x-2">
                      <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                        Сохранить
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Отмена
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Контактная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{profileData.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{profileData.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{profileData.location}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Присоединился {new Date(profileData.joinDate).toLocaleDateString('ru-RU')}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Достижения</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {badges.map((badge, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className={`w-8 h-8 rounded-lg ${badge.color} flex items-center justify-center`}>
                    <badge.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{badge.name}</h4>
                    <p className="text-xs text-gray-500">{badge.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Level Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Прогресс уровня</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="text-lg font-semibold text-gray-900">{profileData.level}</div>
                <div className="text-sm text-gray-500">Уровень</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">До следующего уровня</span>
                  <span className="font-medium">250 очков</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
                <div className="text-xs text-gray-500 text-center">
                  1,250 / 1,500 очков
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}