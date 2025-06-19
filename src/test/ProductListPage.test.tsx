import { render, screen } from '@testing-library/react';
import ProductListPage from '@/test/pages/ProductListPage';
import { BrowserRouter } from 'react-router-dom';

const mockProducts = [
  { id: '1', name: 'Áo thun', price: 100000 },
  { id: '2', name: 'Quần jean', price: 200000 },
];

describe('ProductListPage', () => {
  it('hiển thị danh sách sản phẩm', () => {
    render(
      <BrowserRouter>
        <ProductListPage products={mockProducts} />
      </BrowserRouter>
    );

    expect(screen.getByText(/danh sách sản phẩm/i)).toBeInTheDocument();
    expect(screen.getByText(/áo thun/i)).toBeInTheDocument();
    expect(screen.getByText(/quần jean/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  it('các link sản phẩm trỏ đúng đường dẫn chi tiết', () => {
    render(
        <BrowserRouter>
        <ProductListPage products={mockProducts} />
        </BrowserRouter>
    );

    const links = screen.getAllByRole('link');

    expect(links[0]).toHaveAttribute('href', '/products/1');
    expect(links[1]).toHaveAttribute('href', '/products/2');
  });

  it('hiển thị đúng giá sản phẩm theo đơn vị VND', () => {
    render(
        <BrowserRouter>
        <ProductListPage products={mockProducts} />
        </BrowserRouter>
    );

    expect(screen.getByText(/100000 VND/i)).toBeInTheDocument();
    expect(screen.getByText(/200000 VND/i)).toBeInTheDocument();
  });

  it('hiển thị thông báo nếu không có sản phẩm', () => {
    render(
        <BrowserRouter>
        <ProductListPage products={[]} />
        </BrowserRouter>
    );

    expect(screen.getByText(/không có sản phẩm/i)).toBeInTheDocument();
   });

});