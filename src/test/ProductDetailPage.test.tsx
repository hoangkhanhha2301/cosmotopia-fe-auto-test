import { render, screen } from '@testing-library/react';
import ProductDetailPage from '@/test/pages/ProductDetailPage';
import userEvent from '@testing-library/user-event';

const product = {
  id: '1',
  name: 'Áo sơ mi',
  price: 150000,
  description: 'Chất liệu cotton, thoáng mát.',
};

describe('ProductDetailPage', () => {
  it('hiển thị thông tin chi tiết sản phẩm', () => {
    const addToCart = jest.fn();
    render(<ProductDetailPage product={product} addToCart={addToCart} />);
    expect(screen.getByText(/áo sơ mi/i)).toBeInTheDocument();
    expect(screen.getByText(/150000/i)).toBeInTheDocument();
    expect(screen.getByText(/cotton/i)).toBeInTheDocument();
  });

  it('hiển thị tên, giá và mô tả chi tiết đầy đủ', () => {
    const addToCart = jest.fn();
    render(<ProductDetailPage product={product} addToCart={addToCart} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Áo sơ mi');
    expect(screen.getByText(/giá: 150000 VND/i)).toBeInTheDocument();
    expect(screen.getByText(/chất liệu cotton, thoáng mát/i)).toBeInTheDocument();
   });

  it('hiển thị đúng đơn vị tiền tệ VND', () => {
    const addToCart = jest.fn();
    render(<ProductDetailPage product={product} addToCart={addToCart} />);
    const priceText = screen.getByText(/giá:/i).textContent;
    expect(priceText).toMatch(/150000.*VND/);
  });

  it('hiển thị thông báo nếu mô tả trống', () => {
    const noDescProduct = { ...product, description: '' };
    const addToCart = jest.fn();
    render(<ProductDetailPage product={noDescProduct} addToCart={addToCart} />);

    expect(screen.getByText(/không có mô tả/i)).toBeInTheDocument();
  });

  it('khớp với giao diện hiện tại (snapshot)', () => {
    const addToCart = jest.fn();
    const { container } = render(<ProductDetailPage product={product} addToCart={addToCart} />);
    expect(container).toMatchSnapshot();
  });

  it('gọi callback khi click Thêm vào giỏ hàng', async () => {
    const addToCart = jest.fn();
    render(<ProductDetailPage product={product} addToCart={addToCart} />);

    await userEvent.click(screen.getByText(/thêm vào giỏ hàng/i));
    expect(addToCart).toHaveBeenCalledWith('1');
  });


});
