import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Users, 
  Search,
  Plus,
  MessageCircle,
  Calendar,
  Star,
  Crown,
  Zap
} from 'lucide-react'

export default function Communities() {
  const [searchQuery, setSearchQuery] = useState('')

  const communities = [
    {
      id: 1,
      name: 'Клуб дебатов',
      description: 'Развиваем навыки публичных выступлений и критического мышления через дебаты на актуальные темы.',
      category: 'Образование',
      members: 156,
      posts: 234,
      isJoined: true,
      isActive: true,
      level: 'Золотой',
      image: '/api/placeholder/300/200',
      color: 'from-blue-500 to-blue-600',
      recentActivity: '2 часа назад',
      moderators: ['Айгерим С.', 'Данияр К.'],
      tags: ['дебаты', 'ораторское искусство', 'логика']
    },
    {
      id: 2,
      name: 'Шахматный клуб',
      description: 'Изучаем стратегии, участвуем в турнирах и развиваем логическое мышление через игру в шахматы.',
      category: 'Спорт',
      members: 89,
      posts: 156,
      isJoined: false,
      isActive: true,
      level: 'Серебряный',
      image: '/api/placeholder/300/200',
      color: 'from-green-500 to-green-600',
      recentActivity: '1 день назад',
      moderators: ['Арман Т.'],
      tags: ['шахматы', 'стратегия', 'турниры']
    },
    {
      id: 3,
      name: 'IT клуб',
      description: 'Программирование, веб-разработка, искусственный интеллект и современные технологии.',
      category: 'Технологии',
      members: 234,
      posts: 445,
      isJoined: true,
      isActive: true,
      level: 'Платиновый',
      image: '/api/placeholder/300/200',
      color: 'from-purple-500 to-purple-600',
      recentActivity: '30 минут назад',
      moderators: ['Алия Н.', 'Ерлан М.', 'Жанна К.'],
      tags: ['программирование', 'AI', 'веб-разработка']
    },
    {
      id: 4,
      name: 'Литературный клуб',
      description: 'Обсуждаем книги, пишем стихи и прозу, развиваем творческие способности.',
      category: 'Искусство',
      members: 67,
      posts: 89,
      isJoined: false,
      isActive: false,
      level: 'Бронзовый',
      image: '/api/placeholder/300/200',
      color: 'from-pink-500 to-pink-600',
      recentActivity: '3 дня назад',
      moderators: ['Сауле А.'],
      tags: ['литература', 'поэзия', 'творчество']
    },
    {
      id: 5,
      name: 'Клуб математики',
      description: 'Решаем олимпиадные задачи, изучаем высшую математику и готовимся к конкурсам.',
      category: 'Образование',
      members: 123,
      posts: 267,
      isJoined: true,
      isActive: true,
      level: 'Золотой',
      image: '/api/placeholder/300/200',
      color: 'from-amber-500 to-amber-600',
      recentActivity: '4 часа назад',
      moderators: ['Нурлан Б.', 'Камила С.'],
      tags: ['математика', 'олимпиады', 'логика']
    },
    {
      id: 6,
      name: 'Экологический клуб',
      description: 'Изучаем экологию, участвуем в природоохранных проектах и развиваем экологическое сознание.',
      category: 'Наука',
      members: 78,
      posts: 134,
      isJoined: false,
      isActive: true,
      level: 'Серебряный',
      image: '/api/placeholder/300/200',
      color: 'from-emerald-500 to-emerald-600',
      recentActivity: '6 часов назад',
      moderators: ['Асель Т.'],
      tags: ['экология', 'природа', 'проекты']
    }
  ]

  const categories = ['Все', 'Образование', 'Спорт', 'Технологии', 'Искусство', 'Наука']
  const [selectedCategory, setSelectedCategory] = useState('Все')

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'Все' || community.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleJoinCommunity = (id: number) => {
    console.log('Joining community:', id)
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'Платиновый': return <Crown className="w-4 h-4 text-purple-500" />
      case 'Золотой': return <Star className="w-4 h-4 text-yellow-500" />
      case 'Серебряный': return <Zap className="w-4 h-4 text-gray-400" />
      default: return <Users className="w-4 h-4 text-amber-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Сообщества</h1>
          <p className="text-gray-600">Присоединяйтесь к клубам по интересам</p>
        </div>
        <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Создать сообщество
        </Button>
      </div>

      {/* Search and Categories */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Поиск сообществ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-gradient-to-r from-indigo-500 to-purple-600" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* My Communities */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Мои сообщества</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {communities.filter(c => c.isJoined).map((community) => (
            <Card key={community.id} className="card-hover overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${community.color}`} />
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900">{community.name}</h3>
                    {getLevelIcon(community.level)}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {community.category}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{community.members}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{community.posts}</span>
                    </div>
                  </div>
                  <span className="text-xs">{community.recentActivity}</span>
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  Открыть
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Communities */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Все сообщества</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCommunities.map((community) => (
            <Card key={community.id} className="card-hover overflow-hidden">
              <div className="relative">
                <img 
                  src={community.image} 
                  alt={community.name}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-white/90">
                    {community.category}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3 flex items-center space-x-1">
                  {getLevelIcon(community.level)}
                  <Badge variant="outline" className="bg-white/90 text-xs">
                    {community.level}
                  </Badge>
                </div>
                {community.isActive && (
                  <div className="absolute bottom-3 left-3">
                    <div className="flex items-center space-x-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      <span>Активно</span>
                    </div>
                  </div>
                )}
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {community.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {community.description}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{community.members} участников</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{community.posts} постов</span>
                      </div>
                    </div>
                  </div>

                  {/* Moderators */}
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Модераторы:</span>
                    <div className="flex -space-x-1">
                      {community.moderators.slice(0, 3).map((moderator, index) => (
                        <Avatar key={index} className="w-6 h-6 border-2 border-white">
                          <AvatarFallback className="text-xs bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                            {moderator.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {community.moderators.length > 3 && (
                        <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                          <span className="text-xs text-gray-600">+{community.moderators.length - 3}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {community.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Action */}
                  <div className="pt-2">
                    <Button 
                      onClick={() => handleJoinCommunity(community.id)}
                      variant={community.isJoined ? "outline" : "default"}
                      size="sm"
                      className={`w-full ${!community.isJoined ? "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700" : ""}`}
                    >
                      {community.isJoined ? 'Участник' : 'Присоединиться'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}