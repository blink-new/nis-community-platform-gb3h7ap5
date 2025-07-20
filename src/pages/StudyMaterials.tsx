import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Search,
  Upload,
  Download,
  Heart,
  MessageCircle,
  Share2,
  FileText,
  Image as ImageIcon,
  File,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Filter
} from 'lucide-react'

export default function StudyMaterials() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [selectedGrade, setSelectedGrade] = useState('all')

  const materials = [
    {
      id: 1,
      title: 'Конспект по физике - Механика',
      description: 'Подробный конспект по разделу механики с формулами, примерами и решениями задач.',
      subject: 'Физика',
      grade: '11 класс',
      type: 'pdf',
      size: '2.4 MB',
      author: {
        name: 'Данияр Касымов',
        avatar: '/api/placeholder/32/32',
        grade: '11 класс'
      },
      uploadDate: '2025-01-18',
      downloads: 156,
      likes: 24,
      dislikes: 2,
      comments: 8,
      views: 234,
      tags: ['механика', 'формулы', 'задачи'],
      isLiked: false,
      isDisliked: false,
      thumbnail: '/api/placeholder/200/150'
    },
    {
      id: 2,
      title: 'Шпаргалка по химии - Органическая химия',
      description: 'Краткая шпаргалка по органической химии с основными реакциями и механизмами.',
      subject: 'Химия',
      grade: '10 класс',
      type: 'image',
      size: '1.8 MB',
      author: {
        name: 'Айгерим Сарсенова',
        avatar: '/api/placeholder/32/32',
        grade: '10 класс'
      },
      uploadDate: '2025-01-17',
      downloads: 89,
      likes: 18,
      dislikes: 1,
      comments: 12,
      views: 167,
      tags: ['органика', 'реакции', 'шпаргалка'],
      isLiked: true,
      isDisliked: false,
      thumbnail: '/api/placeholder/200/150'
    },
    {
      id: 3,
      title: 'Математика - Производные и интегралы',
      description: 'Полный разбор темы производных и интегралов с примерами решений и графиками.',
      subject: 'Математика',
      grade: '11 класс',
      type: 'pdf',
      size: '3.2 MB',
      author: {
        name: 'Арман Токтаров',
        avatar: '/api/placeholder/32/32',
        grade: '11 класс'
      },
      uploadDate: '2025-01-16',
      downloads: 203,
      likes: 31,
      dislikes: 0,
      comments: 15,
      views: 298,
      tags: ['производные', 'интегралы', 'графики'],
      isLiked: false,
      isDisliked: false,
      thumbnail: '/api/placeholder/200/150'
    },
    {
      id: 4,
      title: 'История Казахстана - Конспект лекций',
      description: 'Конспект лекций по истории Казахстана с важными датами и событиями.',
      subject: 'История',
      grade: '9 класс',
      type: 'text',
      size: '0.8 MB',
      author: {
        name: 'Сауле Абдуллаева',
        avatar: '/api/placeholder/32/32',
        grade: '9 класс'
      },
      uploadDate: '2025-01-15',
      downloads: 67,
      likes: 14,
      dislikes: 1,
      comments: 6,
      views: 123,
      tags: ['история', 'даты', 'события'],
      isLiked: false,
      isDisliked: false,
      thumbnail: '/api/placeholder/200/150'
    },
    {
      id: 5,
      title: 'Английский язык - Грамматические таблицы',
      description: 'Удобные таблицы по английской грамматике с примерами использования времен.',
      subject: 'Английский язык',
      grade: '10 класс',
      type: 'image',
      size: '2.1 MB',
      author: {
        name: 'Жанна Кенжебаева',
        avatar: '/api/placeholder/32/32',
        grade: '10 класс'
      },
      uploadDate: '2025-01-14',
      downloads: 134,
      likes: 22,
      dislikes: 0,
      comments: 9,
      views: 189,
      tags: ['грамматика', 'времена', 'таблицы'],
      isLiked: false,
      isDisliked: false,
      thumbnail: '/api/placeholder/200/150'
    },
    {
      id: 6,
      title: 'Биология - Клеточное строение',
      description: 'Схемы и описания клеточного строения растений и животных с подробными подписями.',
      subject: 'Биология',
      grade: '9 класс',
      type: 'pdf',
      size: '4.1 MB',
      author: {
        name: 'Нурлан Бекмуратов',
        avatar: '/api/placeholder/32/32',
        grade: '9 класс'
      },
      uploadDate: '2025-01-13',
      downloads: 98,
      likes: 19,
      dislikes: 2,
      comments: 11,
      views: 156,
      tags: ['клетка', 'строение', 'схемы'],
      isLiked: false,
      isDisliked: false,
      thumbnail: '/api/placeholder/200/150'
    }
  ]

  const subjects = ['Все предметы', 'Математика', 'Физика', 'Химия', 'Биология', 'История', 'Английский язык', 'Казахский язык', 'Русский язык']
  const grades = ['Все классы', '9 класс', '10 класс', '11 класс']

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesSubject = selectedSubject === 'all' || material.subject === selectedSubject
    const matchesGrade = selectedGrade === 'all' || material.grade === selectedGrade
    return matchesSearch && matchesSubject && matchesGrade
  })

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />
      case 'image': return <ImageIcon className="w-5 h-5 text-blue-500" />
      case 'text': return <File className="w-5 h-5 text-gray-500" />
      default: return <File className="w-5 h-5 text-gray-500" />
    }
  }

  const handleLike = (id: number) => {
    console.log('Liking material:', id)
  }

  const handleDislike = (id: number) => {
    console.log('Disliking material:', id)
  }

  const handleDownload = (id: number) => {
    console.log('Downloading material:', id)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Учебные материалы</h1>
          <p className="text-gray-600">Делитесь конспектами и находите полезные материалы</p>
        </div>
        <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
          <Upload className="w-4 h-4 mr-2" />
          Загрузить материал
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Поиск материалов по названию, описанию или тегам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Выберите предмет" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все предметы</SelectItem>
                {subjects.slice(1).map((subject) => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Выберите класс" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все классы</SelectItem>
                {grades.slice(1).map((grade) => (
                  <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Фильтры
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => (
          <Card key={material.id} className="card-hover overflow-hidden">
            <div className="relative">
              <img 
                src={material.thumbnail} 
                alt={material.title}
                className="w-full h-32 object-cover bg-gray-100"
              />
              <div className="absolute top-3 left-3">
                <Badge variant="secondary" className="bg-white/90">
                  {material.subject}
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <Badge variant="outline" className="bg-white/90">
                  {material.grade}
                </Badge>
              </div>
              <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                {getFileIcon(material.type)}
                <span>{material.size}</span>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                    {material.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {material.description}
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={material.author.avatar} />
                    <AvatarFallback className="text-xs bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                      {material.author.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">{material.author.name}</span>
                    <span className="mx-1">•</span>
                    <span>{material.author.grade}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {material.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{material.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Download className="w-3 h-3" />
                      <span>{material.downloads}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>{material.comments}</span>
                    </div>
                  </div>
                  <span>{new Date(material.uploadDate).toLocaleDateString('ru-RU')}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleLike(material.id)}
                      className={`flex items-center space-x-1 px-2 py-1 rounded-lg transition-colors ${
                        material.isLiked ? 'bg-green-100 text-green-600' : 'text-gray-500 hover:bg-green-50 hover:text-green-600'
                      }`}
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span className="text-xs">{material.likes}</span>
                    </button>
                    <button 
                      onClick={() => handleDislike(material.id)}
                      className={`flex items-center space-x-1 px-2 py-1 rounded-lg transition-colors ${
                        material.isDisliked ? 'bg-red-100 text-red-600' : 'text-gray-500 hover:bg-red-50 hover:text-red-600'
                      }`}
                    >
                      <ThumbsDown className="w-3 h-3" />
                      <span className="text-xs">{material.dislikes}</span>
                    </button>
                  </div>

                  <Button 
                    onClick={() => handleDownload(material.id)}
                    size="sm"
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Скачать
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredMaterials.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Материалы не найдены</h3>
            <p className="text-gray-600 mb-4">
              Попробуйте изменить параметры поиска или загрузите первый материал
            </p>
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
              <Upload className="w-4 h-4 mr-2" />
              Загрузить материал
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}