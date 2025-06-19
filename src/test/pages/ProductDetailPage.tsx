import React from 'react';

type Props = {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
  };
  addToCart: (productId: string) => void;
};

export default function ProductDetailPage({ product, addToCart }: Props) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>Giá: {product.price} VND</p>
      <p>{product.description || 'Không có mô tả.'}</p>
      <button onClick={() => addToCart(product.id)}>Thêm vào giỏ hàng</button>
    </div>
  );
}
