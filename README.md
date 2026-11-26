# Mây Market — Sản phẩm yêu thích

Trang danh mục sản phẩm React + TypeScript với chức năng thêm/bỏ sản phẩm khỏi danh sách yêu thích và lọc các sản phẩm đã lưu.

## Chạy ứng dụng

```bash
npm install
npm run dev
```

## Quản lý trạng thái

Ứng dụng dùng `FavoritesContext` kết hợp `useReducer` để quản lý danh sách ID sản phẩm; `useMemo` giữ ổn định giá trị Context khi render. Danh sách được lưu trong bộ nhớ của phiên hiện tại.

## Nhận xét: Context + useReducer so với Redux Toolkit

- Context và `useReducer` đủ gọn cho một trạng thái yêu thích nhỏ, không cần cài thêm thư viện.
- Reducer gom thao tác thêm/bỏ vào một chỗ và cập nhật state theo kiểu bất biến.
- `useMemo` giúp tránh tạo lại giá trị Context khi các dependency không đổi.
- Context có thể khiến mọi consumer cùng context render lại; selector tối ưu không có sẵn như Redux.
- Redux Toolkit có cấu trúc slice, middleware và Redux DevTools thuận tiện hơn khi ứng dụng lớn.
- Đổi lại, Redux Toolkit cần thêm dependency và quy ước cấu hình; với bài toán này sẽ hơi dư.
