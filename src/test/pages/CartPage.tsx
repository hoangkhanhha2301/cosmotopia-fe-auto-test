import React from 'react';

type CartItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

type Props = {
  items: CartItem[];
};

export default function CartPage({ items }: Props) {
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div>
      <h1>Giỏ hàng</h1>
      {items.length === 0 ? (
        <p>Không có sản phẩm trong giỏ hàng</p>
        ) : (
            <ul>
                {items.map((i) => (
                <li key={i.id}>
                    {i.name} x{i.quantity} - {i.price * i.quantity} VND
                </li>
                ))}
            </ul>
        )}
      <p>Tổng cộng: {total} VND</p>
    </div>
  );
}
