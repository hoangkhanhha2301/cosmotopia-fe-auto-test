import React from 'react';
import { Link } from 'react-router-dom';

type Product = {
  id: string;
  name: string;
  price: number;
};

type Props = {
  products: Product[];
};

export default function ProductListPage({ products }: Props) {
  return (
    <div>
      <h1>Danh sách sản phẩm</h1>
      {products.length === 0 ? (
        <p>Không có sản phẩm nào</p>
        ) : (
        <ul>
            {products.map((p) => (
            <li key={p.id}>
            <Link to={`/products/${p.id}`}>{p.name}</Link> - {p.price} VND
            </li>
            ))}
        </ul>
        )}
    </div>
  );
}
