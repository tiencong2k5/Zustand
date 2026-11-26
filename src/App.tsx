import { useState } from 'react'
import { useFavorites } from './useFavorites'
import './App.css'

type Product = {
  id: string
  name: string
  category: string
  price: number
  description: string
  emoji: string
  color: string
}

const products: Product[] = [
  {
    id: 'mug',
    name: 'Cốc gốm Mộc',
    category: 'Đồ dùng',
    price: 189000,
    description: 'Gốm thủ công men mờ, vừa vặn cho buổi sáng chậm rãi.',
    emoji: '☕',
    color: 'sand',
  },
  {
    id: 'headphones',
    name: 'Tai nghe Studio',
    category: 'Công nghệ',
    price: 1290000,
    description: 'Âm thanh cân bằng và đệm tai êm ái cho cả ngày dài.',
    emoji: '🎧',
    color: 'lavender',
  },
  {
    id: 'lamp',
    name: 'Đèn bàn Nắng',
    category: 'Trang trí',
    price: 790000,
    description: 'Ánh sáng ấm dịu, điểm xuyết góc làm việc tối giản.',
    emoji: '💡',
    color: 'peach',
  },
  {
    id: 'tote',
    name: 'Túi vải Đi Chơi',
    category: 'Phụ kiện',
    price: 259000,
    description: 'Vải cotton dày dặn, sẵn sàng cho mọi lịch trình.',
    emoji: '👜',
    color: 'mint',
  },
  {
    id: 'camera',
    name: 'Máy ảnh Mini',
    category: 'Công nghệ',
    price: 2450000,
    description: 'Lưu lại những khoảnh khắc đẹp theo cách thật tự nhiên.',
    emoji: '📷',
    color: 'blue',
  },
  {
    id: 'plant',
    name: 'Chậu cây An Yên',
    category: 'Trang trí',
    price: 320000,
    description: 'Một chút xanh mát để căn phòng thêm nhiều sức sống.',
    emoji: '🪴',
    color: 'green',
  },
]

const currency = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
})

function App() {
  const { productIds, toggleFavorite } = useFavorites()
  const [showFavorites, setShowFavorites] = useState(false)
  const visibleProducts = showFavorites
    ? products.filter((product) => productIds.includes(product.id))
    : products

  return (
    <main className="storefront">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Mây Market - Trang chủ">
          <span className="brand-mark" aria-hidden="true">m</span>
          <span>mây market</span>
        </a>
        <span className="topbar-note">Những món đồ nhỏ, niềm vui lớn</span>
        <button
          className="favorites-summary"
          type="button"
          onClick={() => setShowFavorites((current) => !current)}
          aria-pressed={showFavorites}
        >
          <span aria-hidden="true">♡</span>
          <span>Yêu thích</span>
          <span className="favorites-count">{productIds.length}</span>
        </button>
      </header>

      <section className="intro" id="home">
        <p className="eyebrow">BỘ SƯU TẬP THÁNG NÀY</p>
        <h1>Chọn điều bạn <span>thương.</span></h1>
        <p className="intro-copy">
          Lưu lại những món đồ bạn yêu thích — danh sách luôn ở ngay đây.
        </p>
      </section>

      <section className="catalog" aria-label="Danh sách sản phẩm">
        <div className="catalog-heading">
          <div>
            <p className="eyebrow">{showFavorites ? 'BỘ SƯU TẬP CỦA BẠN' : 'GỢI Ý DÀNH CHO BẠN'}</p>
            <h2>{showFavorites ? 'Món đồ yêu thích' : 'Được chọn cho hôm nay'}</h2>
          </div>
          <button
            className={`filter-button${showFavorites ? ' is-active' : ''}`}
            type="button"
            onClick={() => setShowFavorites((current) => !current)}
            aria-pressed={showFavorites}
          >
            {showFavorites ? 'Xem tất cả sản phẩm' : `Đã lưu (${productIds.length})`}
          </button>
        </div>

        {visibleProducts.length > 0 ? (
          <div className="product-grid">
            {visibleProducts.map((product) => {
              const isFavorite = productIds.includes(product.id)

              return (
                <article className="product-card" key={product.id}>
                  <div className={`product-art product-art--${product.color}`}>
                    <span className="product-emoji" aria-hidden="true">{product.emoji}</span>
                    <button
                      className={`favorite-button${isFavorite ? ' is-favorite' : ''}`}
                      type="button"
                      onClick={() => toggleFavorite(product.id)}
                      aria-label={`${isFavorite ? 'Bỏ' : 'Thêm'} ${product.name} ${isFavorite ? 'khỏi' : 'vào'} danh sách yêu thích`}
                      aria-pressed={isFavorite}
                    >
                      {isFavorite ? '♥' : '♡'}
                    </button>
                    <span className="product-category">{product.category}</span>
                  </div>
                  <div className="product-info">
                    <div className="product-title-row">
                      <h3>{product.name}</h3>
                      <span className="product-price">{currency.format(product.price)}</span>
                    </div>
                    <p>{product.description}</p>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-heart" aria-hidden="true">♡</span>
            <h3>Danh sách còn đang chờ bạn</h3>
            <p>Chạm vào trái tim trên sản phẩm để lưu món đồ yêu thích nhé.</p>
            <button type="button" className="filter-button is-active" onClick={() => setShowFavorites(false)}>
              Khám phá sản phẩm
            </button>
          </div>
        )}
      </section>

      <footer className="page-footer">
        <span>Chọn bằng trái tim, lưu bằng một chạm.</span>
        <span>♡ {productIds.length} món đồ đã lưu</span>
      </footer>
    </main>
  )
}

export default App
