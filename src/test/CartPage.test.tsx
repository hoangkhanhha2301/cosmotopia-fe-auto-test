import { render, screen } from '@testing-library/react';
import CartPage from '@/test/pages/CartPage';

const cartItems = [
  { id: '1', name: 'Áo', quantity: 2, price: 100000 },
  { id: '2', name: 'Quần', quantity: 1, price: 200000 },
];

describe('CartPage', () => {
  it('hiển thị các mặt hàng và tổng giá trị', () => {
    render(<CartPage items={cartItems} />);
    expect(screen.getByText(/giỏ hàng/i)).toBeInTheDocument();
    expect(screen.getByText(/áo x2/i)).toBeInTheDocument();
    expect(screen.getByText(/quần x1/i)).toBeInTheDocument();
    expect(screen.getByText(/tổng cộng: 400000/i)).toBeInTheDocument();
  });

  it('tính đúng tổng tiền từ các sản phẩm', () => {
    const items = [
        { id: '1', name: 'Giày', quantity: 3, price: 50000 }, // 150000
        { id: '2', name: 'Mũ', quantity: 2, price: 30000 },    // 60000
    ];
    render(<CartPage items={items} />);
    expect(screen.getByText(/tổng cộng: 210000/i)).toBeInTheDocument();
  });

  it('hiển thị thông báo khi giỏ hàng rỗng', () => {
    render(<CartPage items={[]} />);
    expect(screen.getByText(/không có sản phẩm/i)).toBeInTheDocument();
  });

  it('hiển thị đúng số dòng sản phẩm trong giỏ', () => {
    render(<CartPage items={cartItems} />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
  });

  it('hiển thị đúng giá từng dòng = price * quantity', () => {
    render(<CartPage items={[{ id: '1', name: 'Áo', price: 120000, quantity: 3 }]} />);
    expect(screen.getByText(/áo x3 - 360000 VND/i)).toBeInTheDocument();
  });

  it('khớp với snapshot giao diện giỏ hàng', () => {
    const { container } = render(<CartPage items={cartItems} />);
    expect(container).toMatchSnapshot();
  });

});
