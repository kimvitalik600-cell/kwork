import type { CatalogObject, Category, BlogPost, Donation, Comment } from '@/types'

export const mockCategories: Category[] = [
  {
    id: 'cat-1', slug: 'material-assets', name: { ru: 'Материальные активы', uk: 'Матеріальні активи', en: 'Material Assets', pl: 'Aktywa materialne' },
    icon: 'Package', allowedObjectTypes: ['material'], sortOrder: 1, isActive: true,
    children: [
      { id: 'cat-1-1', slug: 'clothing', name: { ru: 'Одежда', uk: 'Одяг', en: 'Clothing', pl: 'Odzież' }, parentId: 'cat-1', allowedObjectTypes: ['material'], sortOrder: 1, isActive: true },
      { id: 'cat-1-2', slug: 'accessories', name: { ru: 'Аксессуары', uk: 'Аксесуари', en: 'Accessories', pl: 'Akcesoria' }, parentId: 'cat-1', allowedObjectTypes: ['material'], sortOrder: 2, isActive: true },
      { id: 'cat-1-3', slug: 'tech', name: { ru: 'Техника', uk: 'Техніка', en: 'Electronics', pl: 'Elektronika' }, parentId: 'cat-1', allowedObjectTypes: ['material'], sortOrder: 3, isActive: true },
    ]
  },
  {
    id: 'cat-2', slug: 'digital-books', name: { ru: 'Цифровые книги', uk: 'Цифрові книги', en: 'Digital Books', pl: 'Książki cyfrowe' },
    icon: 'BookOpen', allowedObjectTypes: ['digital'], sortOrder: 2, isActive: true,
  },
  {
    id: 'cat-3', slug: 'keys-promo', name: { ru: 'Ключи / Промокоды', uk: 'Ключі / Промокоди', en: 'Keys / Promo codes', pl: 'Klucze / Kody promo' },
    icon: 'Key', allowedObjectTypes: ['digital'], sortOrder: 3, isActive: true,
  },
  {
    id: 'cat-4', slug: 'accounts', name: { ru: 'Аккаунты', uk: 'Акаунти', en: 'Accounts', pl: 'Konta' },
    icon: 'UserCircle', allowedObjectTypes: ['digital'], sortOrder: 4, isActive: true,
  },
  {
    id: 'cat-5', slug: 'services', name: { ru: 'Услуги продвижения', uk: 'Послуги просування', en: 'Promotion services', pl: 'Usługi promocji' },
    icon: 'Megaphone', allowedObjectTypes: ['service'], sortOrder: 5, isActive: true,
  },
  {
    id: 'cat-6', slug: '3d-models', name: { ru: '3D-модели', uk: '3D-моделі', en: '3D Models', pl: 'Modele 3D' },
    icon: 'Box', allowedObjectTypes: ['digital'], sortOrder: 6, isActive: true,
  },
  {
    id: 'cat-7', slug: 'ai-arts', name: { ru: 'AI-арты', uk: 'AI-арти', en: 'AI Arts', pl: 'Grafiki AI' },
    icon: 'Sparkles', allowedObjectTypes: ['ai_content'], sortOrder: 7, isActive: true,
  },
  {
    id: 'cat-8', slug: 'user-content', name: { ru: 'Пользовательский контент', uk: 'Користувацький контент', en: 'User Content', pl: 'Treści użytkowników' },
    icon: 'Users', allowedObjectTypes: ['digital', 'service', 'ai_content'], sortOrder: 8, isActive: true,
  },
]

export const mockObjects: CatalogObject[] = [
  {
    id: 'obj-1', slug: 'vintage-jacket-lot-4521',
    title: { ru: 'Винтажная куртка (Лот #4521)', uk: 'Вінтажна куртка (Лот #4521)', en: 'Vintage Jacket (Lot #4521)', pl: 'Kurtka vintage (Lot #4521)' },
    shortDescription: { ru: 'Извлечено из короба №12. Состояние: отличное. Проверено.', uk: 'Вилучено з коробу №12. Стан: відмінний. Перевірено.', en: 'Extracted from box #12. Condition: excellent. Verified.', pl: 'Wydobyte z kartonu #12. Stan: doskonały. Zweryfikowane.' },
    fullDescription: { ru: 'Винтажная кожаная куртка из аукционного лота #4521. Результат распаковки паллеты EU-2024-003.', uk: '', en: '', pl: '' },
    type: 'material', status: 'available', categoryId: 'cat-1', subcategoryId: 'cat-1-1',
    compensation: 2500, compensationCredits: 250, currency: 'UAH',
    images: ['/placeholder-1.jpg'], hasUnpacking: true, hasPdfProtocol: true,
    deliveryType: 'manual', countryOfOrigin: 'EU', internationalShipping: true,
    boxLabel: 'EU-2024-003-12', batchId: 'batch-1',
    viewCount: 342, commentCount: 5, createdAt: '2026-04-01T10:00:00Z', updatedAt: '2026-04-10T10:00:00Z',
  },
  {
    id: 'obj-2', slug: 'smartwatch-lot-4522',
    title: { ru: 'Смарт-часы (Лот #4522)', uk: 'Смарт-годинник (Лот #4522)', en: 'Smartwatch (Lot #4522)', pl: 'Smartwatch (Lot #4522)' },
    shortDescription: { ru: 'Извлечено из короба №8. Состояние: хорошее. Проверено.', uk: 'Вилучено з коробу №8. Стан: гарний. Перевірено.', en: 'Extracted from box #8. Condition: good. Verified.', pl: 'Wydobyte z kartonu #8. Stan: dobry. Zweryfikowane.' },
    fullDescription: { ru: '', uk: '', en: '', pl: '' },
    type: 'material', status: 'available', categoryId: 'cat-1', subcategoryId: 'cat-1-3',
    compensation: 4800, compensationCredits: 480, currency: 'UAH',
    images: ['/placeholder-2.jpg'], hasUnpacking: true, hasPdfProtocol: true,
    deliveryType: 'manual', countryOfOrigin: 'EU', internationalShipping: true,
    boxLabel: 'EU-2024-003-08',
    viewCount: 218, commentCount: 3, createdAt: '2026-04-02T10:00:00Z', updatedAt: '2026-04-10T10:00:00Z',
  },
  {
    id: 'obj-3', slug: 'ebook-fantasy-collection',
    title: { ru: 'Коллекция фэнтези-книг (PDF)', uk: 'Колекція фентезі-книг (PDF)', en: 'Fantasy Book Collection (PDF)', pl: 'Kolekcja fantasy (PDF)' },
    shortDescription: { ru: 'Набор из 12 книг в формате PDF/EPUB. Автоматическая выдача.', uk: 'Набір з 12 книг у форматі PDF/EPUB. Автоматична видача.', en: '12-book set in PDF/EPUB. Auto delivery.', pl: 'Zestaw 12 książek PDF/EPUB. Automatyczna dostawa.' },
    fullDescription: { ru: '', uk: '', en: '', pl: '' },
    type: 'digital', status: 'available', categoryId: 'cat-2',
    compensation: 350, compensationCredits: 35, currency: 'UAH',
    images: ['/placeholder-3.jpg'], hasUnpacking: false, hasPdfProtocol: false,
    deliveryType: 'auto', internationalShipping: false,
    viewCount: 891, commentCount: 12, createdAt: '2026-03-28T10:00:00Z', updatedAt: '2026-04-08T10:00:00Z',
  },
  {
    id: 'obj-4', slug: 'youtube-promo-1000',
    title: { ru: 'Продвижение YouTube — 1000 подписчиков', uk: 'Просування YouTube — 1000 підписників', en: 'YouTube Promo — 1000 subscribers', pl: 'Promocja YouTube — 1000 subskrybentów' },
    shortDescription: { ru: 'Услуга продвижения. Срок: 7 дней. Гарантия.', uk: 'Послуга просування. Термін: 7 днів. Гарантія.', en: 'Promotion service. 7 days. Guaranteed.', pl: 'Usługa promocji. 7 dni. Gwarancja.' },
    fullDescription: { ru: '', uk: '', en: '', pl: '' },
    type: 'service', status: 'available', categoryId: 'cat-5',
    compensation: 1200, compensationCredits: 120, currency: 'UAH',
    images: ['/placeholder-4.jpg'], hasUnpacking: false, hasPdfProtocol: false,
    deliveryType: 'manual', internationalShipping: false,
    viewCount: 156, commentCount: 8, createdAt: '2026-04-05T10:00:00Z', updatedAt: '2026-04-10T10:00:00Z',
  },
  {
    id: 'obj-5', slug: 'ai-portrait-pack',
    title: { ru: 'AI-арт: Набор портретов (10 шт.)', uk: 'AI-арт: Набір портретів (10 шт.)', en: 'AI Art: Portrait Pack (10 pcs)', pl: 'AI Art: Zestaw portretów (10 szt.)' },
    shortDescription: { ru: 'Уникальные AI-генерации в высоком качестве. 4K разрешение.', uk: 'Унікальні AI-генерації у високій якості. 4K роздільна здатність.', en: 'Unique AI generations in high quality. 4K resolution.', pl: 'Unikalne generacje AI w wysokiej jakości. Rozdzielczość 4K.' },
    fullDescription: { ru: '', uk: '', en: '', pl: '' },
    type: 'ai_content', status: 'available', categoryId: 'cat-7',
    compensation: 200, compensationCredits: 20, currency: 'UAH',
    images: ['/placeholder-5.jpg'], hasUnpacking: false, hasPdfProtocol: false,
    deliveryType: 'auto', internationalShipping: false,
    viewCount: 423, commentCount: 2, createdAt: '2026-04-08T10:00:00Z', updatedAt: '2026-04-10T10:00:00Z',
  },
  {
    id: 'obj-6', slug: 'leather-bag-lot-4530',
    title: { ru: 'Кожаная сумка (Лот #4530)', uk: 'Шкіряна сумка (Лот #4530)', en: 'Leather Bag (Lot #4530)', pl: 'Torba skórzana (Lot #4530)' },
    shortDescription: { ru: 'Извлечено из короба №15. Состояние: новое. Проверено.', uk: 'Вилучено з коробу №15. Стан: новий. Перевірено.', en: 'Extracted from box #15. Condition: new. Verified.', pl: 'Wydobyte z kartonu #15. Stan: nowy. Zweryfikowane.' },
    fullDescription: { ru: '', uk: '', en: '', pl: '' },
    type: 'material', status: 'verified', categoryId: 'cat-1', subcategoryId: 'cat-1-2',
    compensation: 3200, compensationCredits: 320, currency: 'UAH',
    images: ['/placeholder-6.jpg'], hasUnpacking: true, hasPdfProtocol: true,
    deliveryType: 'manual', countryOfOrigin: 'IT', internationalShipping: true,
    boxLabel: 'EU-2024-003-15',
    viewCount: 187, commentCount: 1, createdAt: '2026-04-03T10:00:00Z', updatedAt: '2026-04-10T10:00:00Z',
  },
]

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'post-1', slug: 'unpacking-eu-2024-003',
    title: { ru: 'Распаковка паллеты EU-2024-003', uk: 'Розпаковка палети EU-2024-003', en: 'Unpacking pallet EU-2024-003', pl: 'Rozpakowanie palety EU-2024-003' },
    content: { ru: '', uk: '', en: '', pl: '' },
    excerpt: { ru: 'Полный фото-отчет по распаковке европейской паллеты. 48 коробов, более 200 единиц.',
      uk: 'Повний фото-звіт по розпаковці європейської палети. 48 коробів, понад 200 одиниць.',
      en: 'Full photo report on European pallet unpacking. 48 boxes, 200+ items.',
      pl: 'Pełny raport fotograficzny z rozpakowania palety europejskiej. 48 kartonów, ponad 200 jednostek.' },
    type: 'unpacking', coverImage: '/placeholder-blog-1.jpg',
    authorId: 'admin', tags: ['распаковка', 'EU', 'паллета'],
    relatedObjectIds: ['obj-1', 'obj-2', 'obj-6'], isPinned: true,
    commentCount: 23, createdAt: '2026-04-05T10:00:00Z', publishedAt: '2026-04-05T12:00:00Z',
  },
  {
    id: 'post-2', slug: 'new-ai-models-april',
    title: { ru: 'Новые AI-модели в лаборатории', uk: 'Нові AI-моделі в лабораторії', en: 'New AI models in the laboratory', pl: 'Nowe modele AI w laboratorium' },
    content: { ru: '', uk: '', en: '', pl: '' },
    excerpt: { ru: 'Добавлены 3 новые модели для генерации изображений, включая улучшенный upscale.',
      uk: 'Додано 3 нові моделі для генерації зображень, включаючи покращений upscale.',
      en: 'Added 3 new models for image generation, including improved upscale.',
      pl: 'Dodano 3 nowe modele do generowania obrazów, w tym ulepszony upscale.' },
    type: 'news', coverImage: '/placeholder-blog-2.jpg',
    authorId: 'admin', tags: ['AI', 'обновление'],
    relatedObjectIds: [], isPinned: false,
    commentCount: 8, createdAt: '2026-04-08T10:00:00Z', publishedAt: '2026-04-08T14:00:00Z',
  },
  {
    id: 'post-3', slug: 'how-to-use-digital-inventory',
    title: { ru: 'Как работает цифровой инвентарь', uk: 'Як працює цифровий інвентар', en: 'How digital inventory works', pl: 'Jak działa cyfrowy inwentarz' },
    content: { ru: '', uk: '', en: '', pl: '' },
    excerpt: { ru: 'Подробный гайд по использованию цифрового инвентаря в личном кабинете.',
      uk: 'Детальний гайд з використання цифрового інвентарю в особистому кабінеті.',
      en: 'A detailed guide to using the digital inventory in your dashboard.',
      pl: 'Szczegółowy przewodnik po korzystaniu z cyfrowego inwentarza w panelu.' },
    type: 'guide', coverImage: '/placeholder-blog-3.jpg',
    authorId: 'admin', tags: ['гайд', 'инвентарь'],
    relatedObjectIds: [], isPinned: false,
    commentCount: 4, createdAt: '2026-04-10T10:00:00Z', publishedAt: '2026-04-10T16:00:00Z',
  },
]

export const mockDonations: Donation[] = [
  {
    id: 'don-1',
    title: { ru: 'Закупка паллеты US-2024-Q2', uk: 'Закупівля палети US-2024-Q2', en: 'US-2024-Q2 Pallet Purchase', pl: 'Zakup palety US-2024-Q2' },
    description: { ru: 'Сбор средств на закупку аукционной паллеты из США. Ожидаемое количество: 60+ коробов.',
      uk: 'Збір коштів на закупівлю аукціонної палети зі США. Очікувана кількість: 60+ коробів.',
      en: 'Fundraising for US auction pallet purchase. Expected: 60+ boxes.',
      pl: 'Zbiórka na zakup palety aukcyjnej z USA. Oczekiwane: 60+ kartonów.' },
    type: 'pallet_purchase', goalAmount: 50000, collectedAmount: 32500, currency: 'UAH',
    isActive: true, deadline: '2026-05-01T00:00:00Z', createdAt: '2026-03-15T10:00:00Z',
  },
  {
    id: 'don-2',
    title: { ru: 'Компенсация доставки EU-2024-003', uk: 'Компенсація доставки EU-2024-003', en: 'EU-2024-003 Delivery Compensation', pl: 'Rekompensata dostawy EU-2024-003' },
    description: { ru: 'Сбор на компенсацию международной доставки паллеты из Европы.',
      uk: 'Збір на компенсацію міжнародної доставки палети з Європи.',
      en: 'Collection for international delivery compensation from Europe.',
      pl: 'Zbiórka na rekompensatę dostawy międzynarodowej z Europy.' },
    type: 'delivery_compensation', goalAmount: 15000, collectedAmount: 15000, currency: 'UAH',
    isActive: false, createdAt: '2026-02-20T10:00:00Z',
  },
]

export const mockComments: Comment[] = [
  {
    id: 'com-1', userId: 'user-1', userName: 'Алексей К.',
    content: 'Отличный лот, куртка в идеальном состоянии!',
    targetType: 'object', targetId: 'obj-1',
    createdAt: '2026-04-08T14:30:00Z',
  },
  {
    id: 'com-2', userId: 'user-2', userName: 'Marina S.',
    content: 'Быстрая выдача ключей, всё работает. Спасибо!',
    targetType: 'object', targetId: 'obj-3',
    createdAt: '2026-04-09T10:15:00Z',
  },
  {
    id: 'com-3', userId: 'user-3', userName: 'Дмитрий П.',
    content: 'Распаковка шикарная, хотел бы увидеть больше видео-контента.',
    targetType: 'blog_post', targetId: 'post-1',
    createdAt: '2026-04-10T16:45:00Z',
  },
]
