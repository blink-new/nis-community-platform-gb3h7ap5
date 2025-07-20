import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calendar, 
  Users, 
  Clock,
  MapPin,
  Heart,
  MessageCircle,
  Share2,
  Search,
  Filter,
  Plus
} from 'lucide-react'

export default function Announcements() {
  const [searchQuery, setSearchQuery] = useState('')

  const announcements = [
    {
      id: 1,
      title: 'Олимпиада по математике',
      description: 'Регистрация на республиканскую олимпиаду по математике открыта до 25 января. Участвовать могут ученики 9-11 классов.',
      category: 'Олимпиады',
      type: 'internal',
      date: '2025-01-25',
      time: '14:00',
      location: 'Актовый зал',
      author: 'Администрация НИШ',
      participants: 45,
      maxParticipants: 100,
      image: '/api/placeholder/400/250',
      tags: ['математика', 'олимпиада', 'конкурс'],
      isRegistered: false,
      likes: 23,
      comments: 8
    },
    {
      id: 2,
      title: 'Клуб дебатов: новый набор',
      description: 'Приглашаем всех желающих присоединиться к клубу дебатов. Развивайте навыки публичных выступлений и критического мышления.',
      category: 'Клубы',
      type: 'internal',
      date: '2025-01-22',
      time: '15:30',
      location: 'Кабинет 205',
      author: 'Клуб дебатов',
      participants: 23,
      maxParticipants: 30,
      image: '/api/placeholder/400/250',
      tags: ['дебаты', 'клуб', 'ораторское искусство'],
      isRegistered: true,
      likes: 18,
      comments: 12
    },
    {
      id: 3,
      title: 'Межшкольный турнир по шахматам',
      description: 'Сеть НИШ проводит межшкольный турнир по шахматам. Регистрация команд до 30 января.',
      category: 'Спорт',
      type: 'network',
      date: '2025-02-05',
      time: '10:00',
      location: 'НИШ Астана',
      author: 'Спортивный комитет',
      participants: 67,
      maxParticipants: 120,
      image: '/api/placeholder/400/250',
      tags: ['шахматы', 'турнир', 'межшкольный'],
      isRegistered: false,
      likes: 34,
      comments: 15
    },
    {
      id: 4,
      title: 'Научная конференция "Будущее науки"',
      description: 'Ежегодная научная конференция для учеников 10-11 классов. Презентуйте свои исследовательские проекты.',
      category: 'Наука',
      type: 'network',
      date: '2025-02-15',
      time: '09:00',
      location: 'НИШ Алматы',
      author: 'Научное общество',
      participants: 89,
      maxParticipants: 200,
      image: '/api/placeholder/400/250',
      tags: ['наука', 'конференция', 'исследования'],
      isRegistered: false,
      likes: 42,
      comments: 21
    }
  ]

  const categories = ['Все', 'Олимпиады', 'Клубы', 'Спорт', 'Наука', 'Культура']

  const handleRegister = (id: number) => {
    // Handle registration logic
    console.log('Registering for event:', id)
  }

  const filteredAnnouncements = announcements.filter(announcement =>
    announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    announcement.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Объявления</h1>
          <p className="text-gray-600">Актуальные новости и мероприятия</p>
        </div>
        <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Создать объявление
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Поиск объявлений..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Фильтры
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Все объявления</TabsTrigger>
          <TabsTrigger value="internal">Внутришкольные</TabsTrigger>
          <TabsTrigger value="network">Сетевые</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredAnnouncements.map((announcement) => (
              <Card key={announcement.id} className="card-hover overflow-hidden">
                <div className="relative">
                  <img 
                    src={announcement.image} 
                    alt={announcement.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge 
                      variant="secondary" 
                      className={`${announcement.type === 'network' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}
                    >
                      {announcement.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-white/90">
                      {announcement.type === 'network' ? 'Сетевое' : 'Школьное'}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {announcement.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {announcement.description}
                      </p>
                    </div>

                    {/* Event Details */}
                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(announcement.date).toLocaleDateString('ru-RU')} в {announcement.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{announcement.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{announcement.participants}/{announcement.maxParticipants} участников</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {announcement.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">{announcement.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">{announcement.comments}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>

                      <Button 
                        onClick={() => handleRegister(announcement.id)}
                        variant={announcement.isRegistered ? "outline" : "default"}
                        size="sm"
                        className={announcement.isRegistered ? "" : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"}
                      >
                        {announcement.isRegistered ? 'Зарегистрирован' : 'Участвовать'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="internal" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredAnnouncements.filter(a => a.type === 'internal').map((announcement) => (
              <Card key={announcement.id} className="card-hover overflow-hidden">
                {/* Same card structure as above */}
                <div className="p-6">
                  <h3 className="font-semibold">{announcement.title}</h3>
                  <p className="text-gray-600 text-sm mt-2">{announcement.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="network" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredAnnouncements.filter(a => a.type === 'network').map((announcement) => (
              <Card key={announcement.id} className="card-hover overflow-hidden">
                {/* Same card structure as above */}
                <div className="p-6">
                  <h3 className="font-semibold">{announcement.title}</h3>
                  <p className="text-gray-600 text-sm mt-2">{announcement.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}