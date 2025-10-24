import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Product {
  id: string;
  name: string;
  marketplace: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  availability: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'MacBook Pro 14" M4',
    marketplace: 'Авито',
    price: 125000,
    originalPrice: 145000,
    image: 'https://v3b.fal.media/files/b/kangaroo/TDC4BHrv3WGDYbs2XQPxk_output.png',
    rating: 4.8,
    reviews: 142,
    availability: 'В наличии'
  },
  {
    id: '2',
    name: 'MacBook Pro 14" M4',
    marketplace: 'Wildberries',
    price: 135000,
    image: 'https://v3b.fal.media/files/b/kangaroo/TDC4BHrv3WGDYbs2XQPxk_output.png',
    rating: 4.6,
    reviews: 89,
    availability: 'В наличии'
  },
  {
    id: '3',
    name: 'MacBook Pro 14" M4',
    marketplace: 'Ozon',
    price: 142000,
    image: 'https://v3b.fal.media/files/b/kangaroo/TDC4BHrv3WGDYbs2XQPxk_output.png',
    rating: 4.7,
    reviews: 203,
    availability: 'Доставка 2-3 дня'
  }
];

const priceHistoryData = [
  { date: '01', avito: 130000, wb: 140000, ozon: 145000 },
  { date: '05', avito: 128000, wb: 138000, ozon: 144000 },
  { date: '10', avito: 127000, wb: 137000, ozon: 143000 },
  { date: '15', avito: 126000, wb: 136000, ozon: 143000 },
  { date: '20', avito: 125000, wb: 135000, ozon: 142000 }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('MacBook Pro 14 M4');
  const [activeTab, setActiveTab] = useState('search');
  const [priceRange, setPriceRange] = useState([100000, 200000]);
  const [selectedMarketplaces, setSelectedMarketplaces] = useState<string[]>(['Авито', 'Wildberries', 'Ozon']);
  const [showFilters, setShowFilters] = useState(false);

  const marketplaces = ['Авито', 'Wildberries', 'Ozon'];

  const toggleMarketplace = (marketplace: string) => {
    setSelectedMarketplaces(prev => 
      prev.includes(marketplace) 
        ? prev.filter(m => m !== marketplace)
        : [...prev, marketplace]
    );
  };

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => 
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      selectedMarketplaces.includes(product.marketplace)
    );
  }, [priceRange, selectedMarketplaces]);

  const lowestPrice = filteredProducts.length > 0 
    ? Math.min(...filteredProducts.map(p => p.price))
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Icon name="TrendingDown" className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">PRICE AGGREGATOR</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-1">
            <Button 
              variant={activeTab === 'search' ? 'default' : 'ghost'} 
              onClick={() => setActiveTab('search')}
              className="gap-2"
            >
              <Icon name="Search" className="h-4 w-4" />
              Поиск
            </Button>
            <Button 
              variant={activeTab === 'favorites' ? 'default' : 'ghost'} 
              onClick={() => setActiveTab('favorites')}
              className="gap-2"
            >
              <Icon name="Heart" className="h-4 w-4" />
              Избранное
            </Button>
            <Button 
              variant={activeTab === 'history' ? 'default' : 'ghost'} 
              onClick={() => setActiveTab('history')}
              className="gap-2"
            >
              <Icon name="History" className="h-4 w-4" />
              История
            </Button>
            <Button 
              variant={activeTab === 'profile' ? 'default' : 'ghost'} 
              onClick={() => setActiveTab('profile')}
              className="gap-2"
            >
              <Icon name="User" className="h-4 w-4" />
              Профиль
            </Button>
            <Button 
              variant={activeTab === 'help' ? 'default' : 'ghost'} 
              onClick={() => setActiveTab('help')}
              className="gap-2"
            >
              <Icon name="HelpCircle" className="h-4 w-4" />
              Помощь
            </Button>
          </nav>
        </div>
      </header>

      <main className="container px-4 py-8 max-w-7xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="search" className="mt-0 space-y-6">
            <div className="flex flex-col gap-4 animate-fade-in">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Найти товар на всех площадках..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-14 pl-12 pr-4 text-lg border-2 focus:border-primary"
                  />
                </div>
                <Button 
                  variant={showFilters ? 'default' : 'outline'} 
                  size="lg" 
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2 h-14 px-6"
                >
                  <Icon name="SlidersHorizontal" className="h-5 w-5" />
                  Фильтры
                  {filteredProducts.length !== mockProducts.length && (
                    <Badge variant="secondary" className="ml-1">
                      {filteredProducts.length}
                    </Badge>
                  )}
                </Button>
              </div>

              {showFilters && (
                <Card className="p-6 animate-scale-in">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-base font-semibold">Диапазон цен</Label>
                        <span className="text-sm text-muted-foreground">
                          {priceRange[0].toLocaleString('ru-RU')} - {priceRange[1].toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      <Slider
                        min={50000}
                        max={250000}
                        step={5000}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-4">
                      <Label className="text-base font-semibold">Маркетплейсы</Label>
                      <div className="space-y-3">
                        {marketplaces.map(marketplace => (
                          <div key={marketplace} className="flex items-center space-x-2">
                            <Checkbox
                              id={marketplace}
                              checked={selectedMarketplaces.includes(marketplace)}
                              onCheckedChange={() => toggleMarketplace(marketplace)}
                            />
                            <label
                              htmlFor={marketplace}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {marketplace}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6 pt-6 border-t">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setPriceRange([100000, 200000]);
                        setSelectedMarketplaces(['Авито', 'Wildberries', 'Ozon']);
                      }}
                      className="gap-2"
                    >
                      <Icon name="RotateCcw" className="h-4 w-4" />
                      Сбросить
                    </Button>
                    <div className="flex-1" />
                    <Badge variant="secondary" className="px-3 py-2">
                      Найдено: {filteredProducts.length} {filteredProducts.length === 1 ? 'товар' : filteredProducts.length < 5 ? 'товара' : 'товаров'}
                    </Badge>
                  </div>
                </Card>
              )}

              <Card className="p-6 animate-scale-in">
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="TrendingDown" className="h-6 w-6 text-success" />
                  <h2 className="text-2xl font-bold">Динамика цен</h2>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={priceHistoryData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line type="monotone" dataKey="avito" stroke="#2563EB" strokeWidth={3} />
                    <Line type="monotone" dataKey="wb" stroke="#10B981" strokeWidth={3} />
                    <Line type="monotone" dataKey="ozon" stroke="#EF4444" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex gap-6 mt-4 justify-center">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#2563EB]" />
                    <span className="text-sm">Авито</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#10B981]" />
                    <span className="text-sm">Wildberries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#EF4444]" />
                    <span className="text-sm">Ozon</span>
                  </div>
                </div>
              </Card>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.length === 0 ? (
                  <Card className="col-span-full p-12 text-center">
                    <Icon name="Search" className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-2xl font-bold mb-2">Ничего не найдено</h3>
                    <p className="text-muted-foreground mb-4">Попробуйте изменить фильтры или поисковый запрос</p>
                    <Button onClick={() => {
                      setPriceRange([100000, 200000]);
                      setSelectedMarketplaces(['Авито', 'Wildberries', 'Ozon']);
                    }}>
                      Сбросить фильтры
                    </Button>
                  </Card>
                ) : filteredProducts.map((product, index) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      {product.price === lowestPrice && (
                        <Badge className="absolute top-3 left-3 bg-success text-success-foreground">
                          <Icon name="TrendingDown" className="h-3 w-3 mr-1" />
                          Лучшая цена
                        </Badge>
                      )}
                      {product.originalPrice && (
                        <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">
                          -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </Badge>
                      )}
                    </div>
                    
                    <div className="p-4 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                          <Icon name="Heart" className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{product.marketplace}</Badge>
                        <div className="flex items-center gap-1 text-sm">
                          <Icon name="Star" className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{product.rating}</span>
                          <span className="text-muted-foreground">({product.reviews})</span>
                        </div>
                      </div>

                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold">{product.price.toLocaleString('ru-RU')} ₽</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {product.originalPrice.toLocaleString('ru-RU')} ₽
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Package" className="h-4 w-4" />
                        {product.availability}
                      </div>

                      <Button className="w-full" size="lg">
                        <Icon name="ShoppingCart" className="h-4 w-4 mr-2" />
                        Перейти к покупке
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="mt-0">
            <Card className="p-12 text-center animate-fade-in">
              <Icon name="Heart" className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-2xl font-bold mb-2">Избранное пусто</h3>
              <p className="text-muted-foreground">Добавьте товары в избранное, чтобы отслеживать их цены</p>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <Card className="p-12 text-center animate-fade-in">
              <Icon name="History" className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-2xl font-bold mb-2">История запросов пуста</h3>
              <p className="text-muted-foreground">Ваши поисковые запросы будут сохраняться здесь</p>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="mt-0">
            <Card className="p-8 animate-fade-in">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center">
                  <Icon name="User" className="h-10 w-10 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Профиль пользователя</h3>
                  <p className="text-muted-foreground">Настройте уведомления и предпочтения</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Уведомления о снижении цен</p>
                    <p className="text-sm text-muted-foreground">Получайте алерты при падении цены</p>
                  </div>
                  <Button variant="outline">Настроить</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Избранные маркетплейсы</p>
                    <p className="text-sm text-muted-foreground">Выберите приоритетные площадки</p>
                  </div>
                  <Button variant="outline">Выбрать</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="help" className="mt-0">
            <Card className="p-8 animate-fade-in">
              <h3 className="text-2xl font-bold mb-6">Помощь и FAQ</h3>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Icon name="HelpCircle" className="h-5 w-5 text-primary" />
                    Как работает агрегатор?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Мы сканируем популярные маркетплейсы и находим лучшие предложения по вашему запросу
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Icon name="TrendingDown" className="h-5 w-5 text-success" />
                    Как отслеживать изменения цен?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Добавьте товар в избранное - мы будем присылать уведомления о снижении цены
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Icon name="ShoppingCart" className="h-5 w-5 text-primary" />
                    Можно ли купить через агрегатор?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Мы перенаправляем вас на выбранную площадку, где вы можете оформить покупку
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;