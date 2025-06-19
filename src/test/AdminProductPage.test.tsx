import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminProductPage from '@/test/pages/AdminProductPage';

const products = [
  { id: '1', name: 'Áo khoác', price: 300000 },
  { id: '2', name: 'Giày thể thao', price: 500000 },
];

describe('AdminProductPage', () => {
  it('hiển thị sản phẩm và xử lý xoá', async () => {
    const handleDelete = jest.fn();
    render(<AdminProductPage products={products} onDelete={handleDelete} />);

    expect(screen.getByText(/áo khoác/i)).toBeInTheDocument();

    await userEvent.click(screen.getAllByText(/xoá/i)[0]);
    expect(handleDelete).toHaveBeenCalledWith('1');
  });

  it('hiển thị đúng tiêu đề và số dòng sản phẩm', () => {
  render(<AdminProductPage products={products} onDelete={jest.fn()} />);

  expect(screen.getByRole('heading', { name: /quản lý sản phẩm/i })).toBeInTheDocument();

  // Kiểm tra số dòng sản phẩm hiển thị
  const rows = screen.getAllByRole('row');
  expect(rows).toHaveLength(2); // 2 sản phẩm tương ứng 2 dòng (nếu không có <thead>)
});

it('hiển thị đúng tên và giá của từng sản phẩm', () => {
  render(<AdminProductPage products={products} onDelete={jest.fn()} />);

  expect(screen.getByText('Áo khoác')).toBeInTheDocument();
  expect(screen.getByText('300000')).toBeInTheDocument();
  expect(screen.getByText('Giày thể thao')).toBeInTheDocument();
  expect(screen.getByText('500000')).toBeInTheDocument();
});

it('gọi đúng onDelete khi bấm nút Xoá sản phẩm thứ 2', async () => {
  const handleDelete = jest.fn();
  render(<AdminProductPage products={products} onDelete={handleDelete} />);

  await userEvent.click(screen.getAllByText(/xoá/i)[1]); // sản phẩm 2

  expect(handleDelete).toHaveBeenCalledWith('2');
});

it('khớp với snapshot giao diện admin', () => {
  const { container } = render(<AdminProductPage products={products} onDelete={() => {}} />);
  expect(container).toMatchSnapshot();
});

});
