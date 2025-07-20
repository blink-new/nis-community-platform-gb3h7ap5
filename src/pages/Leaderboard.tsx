import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Trophy,
  Medal,
  Star,
  Crown,
  TrendingUp,
  Users,
  BookOpen,
  MessageCircle,
  Calendar,
  Award,
  Zap
} from 'lucide-react'

export default function Leaderboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  const topUsers = [
    {
      id: 1,
      name: 'Алия Нурланова',
      grade: '11 класс',
      school: 'НИШ Астана',
      points: 2450,
      rank: 1,
      avatar: '/api/placeholder/64/64',
      badges: ['Активист', 'Лидер', 'Эксперт'],
      activities: {
        posts: 45,
        materials: 12,
        communities: 8,
        events: 15
      },
      weeklyGrowth: '+125',
      level: 'Платиновый'
    },
    {
      id: 2,
      name: 'Данияр Касымов',
      grade: '11 класс',
      school: 'НИШ Алматы',
      points: 2280,
      rank: 2,
      avatar: '/api/placeholder/64/64',
      badges: ['Математик', 'Помощник'],
      activities: {
        posts: 38,
        materials: 18,
        communities: 6,
        events: 12
      },
      weeklyGrowth: '+98',
      level: 'Золотой'
    },
    {
      id: 3,
      name: 'Айгерим Сарсенова',
      grade: '10 класс',
      school: 'НИШ Шымкент',
      points: 2150,
      rank: 3,
      avatar: '/api/placeholder/64/64',
      badges: ['Химик', 'Исследователь'],
      activities: {
        posts: 32,
        materials: 15,
        communities: 7,
        events: 10
      },
      weeklyGrowth: '+87',
      level: 'Золотой'
    }
  ]

  const leaderboardData = [
    ...topUsers,
    {
      id: 4,
      name: 'Арман Токтаров',
      grade: '11 класс',
      school: 'НИШ Павлодар',
      points: 1980,
      rank: 4,
      avatar: '/api/placeholder/64/64',
      badges: ['Программист'],
      activities: { posts: 28, materials: 11, communities: 5, events: 8 },
      weeklyGrowth: '+76',
      level: 'Серебряный'
    },
    {
      id: 5,
      name: 'Жанна Кенжебаева',
      grade: '10 класс',
      school: 'НИШ Актобе',
      points: 1850,
      rank: 5,
      avatar: '/api/placeholder/64/64',
      badges: ['Лингвист'],
      activities: { posts: 25, materials: 9, communities: 4, events: 7 },
      weeklyGrowth: '+65',
      level: 'Серебряный'
    },
    {
      id: 6,
      name: 'Нурлан Бекмуратов',
      grade: '9 класс',
      school: 'НИШ Костанай',
      points: 1720,
      rank: 6,
      avatar: '/api/placeholder/64/64',
      badges: ['Биолог'],
      activities: { posts: 22, materials: 8, communities: 3, events: 6 },
      weeklyGrowth: '+54',
      level: 'Серебряный'
    },
    {
      id: 7,
      name: 'Сауле Абдуллаева',
      grade: '9 класс',
      school: 'НИШ Тараз',
      points: 1590,
      rank: 7,
      avatar: '/api/placeholder/64/64',
      badges: ['Историк'],
      activities: { posts: 19, materials: 7, communities: 3, events: 5 },
      weeklyGrowth: '+43',
      level: 'Бронзовый'
    },
    {
      id: 8,
      name: 'Ерлан Мухамедов',
      grade: '10 класс',
      school: 'НИШ Астана',
      points: 1460,
      rank: 8,
      avatar: '/api/placeholder/64/64',
      badges: ['Физик'],
      activities: { posts: 16, materials: 6, communities: 2, events: 4 },
      weeklyGrowth: '+32',
      level: 'Бронзовый'
    },
    {
      id: 9,
      name: 'Камила Сейтова',
      grade: '11 класс',
      school: 'НИШ Алматы',
      points: 1330,
      rank: 9,
      avatar: '/api/placeholder/64/64',
      badges: ['Художник'],
      activities: { posts: 14, materials: 5, communities: 2, events: 3 },
      weeklyGrowth: '+28',
      level: 'Бронзовый'
    },
    {
      id: 10,
      name: 'Асель Турсынова',
      grade: '9 класс',
      school: 'НИШ Караганда',
      points: 1250,
      rank: 10,
      avatar: '/api/placeholder/64/64',
      badges: ['Эколог'],
      activities: { posts: 12, materials: 4, communities: 1, events: 2 },
      weeklyGrowth: '+21',
      level: 'Бронзовый'
    }
  ]

  const achievements = [
    { name: 'Первый пост', description: 'Опубликовать первое объявление', icon: MessageCircle, color: 'text-blue-500' },
    { name: 'Активист', description: 'Набрать 1000 очков', icon: Star, color: 'text-yellow-500' },
    { name: 'Лидер сообщества', description: 'Стать модератором клуба', icon: Crown, color: 'text-purple-500' },
    { name: 'Помощник', description: 'Загрузить 10 материалов', icon: BookOpen, color: 'text-green-500' },
    { name: 'Эксперт', description: 'Получить 100 лайков', icon: Award, color: 'text-red-500' },
    { name: 'Социальный', description: 'Присоединиться к 5 клубам', icon: Users, color: 'text-indigo-500' }
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />
      case 2: return <Medal className="w-6 h-6 text-gray-400" />
      case 3: return <Award className="w-6 h-6 text-amber-600" />
      default: return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-500">#{rank}</span>
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Платиновый': return 'from-purple-500 to-purple-600'
      case 'Золотой': return 'from-yellow-500 to-yellow-600'
      case 'Серебряный': return 'from-gray-400 to-gray-500'
      case 'Бронзовый': return 'from-amber-600 to-amber-700'
      default: return 'from-gray-400 to-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Рейтинг активности</h1>
        <p className="text-gray-600">Лидеры платформы НИШ по активности и вкладу в сообщество</p>
      </div>

      {/* Top 3 Podium */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <div className="text-center mb-6">
            <Trophy className="w-12 h-12 mx-auto mb-2" />
            <h2 className="text-xl font-semibold">Топ-3 лидера месяца</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topUsers.map((user, index) => (
              <div key={user.id} className={`text-center ${index === 0 ? 'md:order-2' : index === 1 ? 'md:order-1' : 'md:order-3'}`}>
                <div className={`relative inline-block mb-4 ${index === 0 ? 'transform scale-110' : ''}`}>
                  <Avatar className={`${index === 0 ? 'w-20 h-20' : 'w-16 h-16'} border-4 border-white`}>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-lg">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2">
                    {getRankIcon(user.rank)}
                  </div>
                </div>
                
                <h3 className={`font-semibold ${index === 0 ? 'text-lg' : 'text-base'}`}>{user.name}</h3>
                <p className="text-indigo-100 text-sm">{user.grade} • {user.school}</p>
                <div className={`mt-2 ${index === 0 ? 'text-2xl' : 'text-xl'} font-bold`}>
                  {user.points.toLocaleString()} очков
                </div>
                <Badge className={`mt-2 bg-gradient-to-r ${getLevelColor(user.level)} text-white`}>
                  {user.level}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leaderboard */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Общий рейтинг</CardTitle>
                <div className="flex space-x-2">
                  <Button 
                    variant={selectedPeriod === 'week' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setSelectedPeriod('week')}
                  >
                    Неделя
                  </Button>
                  <Button 
                    variant={selectedPeriod === 'month' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setSelectedPeriod('month')}
                  >
                    Месяц
                  </Button>
                  <Button 
                    variant={selectedPeriod === 'year' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setSelectedPeriod('year')}
                  >
                    Год
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {leaderboardData.map((user, index) => (
                <div key={user.id} className={`flex items-center space-x-4 p-3 rounded-lg transition-colors ${
                  index < 3 ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200' : 'hover:bg-gray-50'
                }`}>
                  <div className="flex items-center justify-center w-8">
                    {getRankIcon(user.rank)}
                  </div>
                  
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">{user.name}</h4>
                      <Badge className={`bg-gradient-to-r ${getLevelColor(user.level)} text-white text-xs`}>
                        {user.level}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{user.grade}</span>
                      <span>•</span>
                      <span>{user.school}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {user.badges.map((badge, badgeIndex) => (
                        <Badge key={badgeIndex} variant="outline" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {user.points.toLocaleString()}
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-green-600">
                      <TrendingUp className="w-3 h-3" />
                      <span>{user.weeklyGrowth}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* My Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ваша статистика</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">1,250</div>
                <div className="text-sm text-gray-500">очков</div>
                <div className="text-sm text-green-600 flex items-center justify-center space-x-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>+45 за неделю</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ваш рейтинг</span>
                  <span className="font-medium">#15</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">В классе</span>
                  <span className="font-medium">#3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">В школе</span>
                  <span className="font-medium">#8</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">12</div>
                  <div className="text-xs text-gray-500">Постов</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">5</div>
                  <div className="text-xs text-gray-500">Материалов</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">3</div>
                  <div className="text-xs text-gray-500">Клубов</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">7</div>
                  <div className="text-xs text-gray-500">Событий</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Достижения</CardTitle>
              <CardDescription>Получайте бейджи за активность</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className={`w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center ${achievement.color}`}>
                    <achievement.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{achievement.name}</h4>
                    <p className="text-xs text-gray-500">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* How to Earn Points */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Как заработать очки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Создание поста</span>
                  <span className="font-medium text-green-600">+10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Загрузка материала</span>
                  <span className="font-medium text-green-600">+25</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Комментарий</span>
                  <span className="font-medium text-green-600">+5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Участие в событии</span>
                  <span className="font-medium text-green-600">+15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Лайк материала</span>
                  <span className="font-medium text-green-600">+20</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Вступление в клуб</span>
                  <span className="font-medium text-green-600">+30</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}