import React from 'react';

type Product = {
  id: string;
  name: string;
  price: number;
};

type Props = {
  products: Product[];
  onDelete: (id: string) => void;
};

export default function AdminProductPage({ products, onDelete }: Props) {
  return (
    <div>
      <h1>Quản lý sản phẩm</h1>
      <table>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>
                <button onClick={() => onDelete(p.id)}>Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
