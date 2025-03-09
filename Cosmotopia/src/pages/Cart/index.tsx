import BasePages from '@/components/shared/base-pages.js';
import './styles.css';
import { useRouter } from '@/routes/hooks';
import {
  Button,
  Checkbox,
  Form,
  Image,
  InputNumber,
  Rate,
  Select,
  Table
} from 'antd';
import { PhanLoai } from './PhanLoai';
import { useState } from 'react';

export default function Cart() {
  const router = useRouter();
  const [data, setData] = useState<any>([
    {
      key: 1,
      name: 'Flower Knows',
      description: 'Bảng phấn mắt',
      variant: ['L01', 'L02', 'L03'],
      selectedVariant: 'L01',
      image: './detail.png',
      price: 379000,
      quantity: 1,
      selected: true
    },
    {
      key: 2,
      name: 'Flower Knows',
      description: 'Bảng phấn mắt',
      variant: ['L01', 'L02', 'L03', 'L04'],
      selectedVariant: 'L01',
      image: './detail.png',
      price: 379000,
      quantity: 1,
      selected: true
    },
    {
      key: 3,
      name: 'Flower Knows',
      description: 'Bảng phấn mắt',
      variant: ['L01', 'L02', 'L033'],
      selectedVariant: 'L01',
      image: './detail.png',
      price: 379000,
      quantity: 1,
      selected: true
    },
    {
      key: 4,
      name: 'Flower Knows',
      description: 'Bảng phấn mắt',
      variant: ['L01', 'L02', 'L033'],
      selectedVariant: 'L01',
      image: './detail.png',
      price: 379000,
      quantity: 1,
      selected: true
    },
    {
      key: 5,
      name: 'Flower Knows',
      description: 'Bảng phấn mắt',
      variant: ['L01', 'L02', 'L033'],
      selectedVariant: 'L01',
      image: './detail.png',
      price: 379000,
      quantity: 1,
      selected: true
    }
  ]);

  console.log('re-render');
  const handleChangeData = (key, record) => {
    console.log('oke');
    setData((pre) => pre.map((item) => (item.key == key ? record : item)));
  };
  const [selectedKeyRows, setSelectedKeyRows] = useState([]);
  const keySet = new Set(selectedKeyRows);

  const selectedRows = data.filter((item) => keySet.has(item.key));
  const totalPrice = selectedRows
    ?.reduce((total, product) => {
      return total + product?.price * product?.quantity;
    }, 0)
    .toLocaleString('vi-VN');
  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      render: (text, record) => (
        <div className="flex gap-2">
          {/* <Image src={record.image} width={80} preview={false} /> */}
          <div className="rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-[1px]">
            <img
              src={record.image} // Thay bằng ảnh sản phẩm
              alt="Flower Knows"
              className="h-20 w-20 rounded-lg bg-white object-cover p-1"
            />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#4E4663]">
              {record.name}
            </h3>
            <p className="mb-1 text-gray-500">{record.description}</p>
            <div>
              <Select
                style={{
                  width: 80,
                  height: 25
                }}
                defaultValue={record.selectedVariant}
                onChange={(a) => {
                  console.log(a);
                }}
                options={record.variant.map((v, index) => ({
                  value: v,
                  label: v
                }))}
              />
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      render: (quantity, record) => (
        <div className="flex  w-32 items-center justify-between rounded-xl bg-gray-100 ">
          <button
            className="border-none px-3 py-2 text-xl font-bold text-gray-600"
            onClick={() => {
              handleChangeData(record.key, {
                ...record,
                quantity: quantity > 1 ? quantity - 1 : 1
              });
            }}
          >
            -
          </button>
          <input
            min={0}
            value={quantity}
            // type="number"

            onChange={(e) => {
              const value = Number(e.target.value);
              // setQuantity(value);
              //   quantity = value > 123 ? 123 : value;
              handleChangeData(record.key, { ...record, quantity: value });
            }}
            className="w-12 border-none bg-gray-100  py-2 text-center font-bold text-[#9C3CFD]"
          />

          <button
            className="text-b border-none px-3 py-2 font-bold text-gray-600"
            onClick={() =>
              handleChangeData(record.key, {
                ...record,
                quantity: quantity + 1
              })
            }
          >
            +
          </button>
        </div>
      )
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      render: (price, record) => (
        <span className="text-base font-bold text-[#9C3CFD]">
          {Number(price).toLocaleString('vi-VN')} VNĐ
        </span>
      )
    }
  ];
  // const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  // const onSelectChange = (newSelectedRowKeys) => {
  //   setSelectedRowKeys(newSelectedRowKeys);
  // };
  const rowSelection = {
    selectedRowKeys: selectedKeyRows,
    onChange: (newSelectedRowkeys, NewSelectedRows) => {
      setSelectedKeyRows(newSelectedRowkeys);
    }
  };

  return (
    <>
      <BasePages
        className="relative mx-auto w-[80%] flex-1 p-4 "
        pageHead="ProductDetail"
      >
        <h2 className=" mb-4 text-xl font-bold text-gray-800">Giỏ Hàng</h2>
        <div className="flex gap-5">
          <div className="w-2/3 rounded-2xl bg-white p-6 shadow-lg">
            <Table
              columns={columns}
              dataSource={data}
              rowSelection={{
                type: 'checkbox',
                ...rowSelection,
                // onChange(selectedRowKeys, selectedRows, info) {
                //   console.log(selectedRowKeys);
                // },
                columnTitle: <></>
              }}
              //   footer={() => 'Footer'}
            />
            {/* <Button onClick={handleSelectAll} type="default">
              {isAllSelected ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
            </Button> */}
            <div>
              <Checkbox
                checked={selectedKeyRows?.length == data.length}
                onChange={(a) => {
                  a.target.checked
                    ? setSelectedKeyRows(data.map((a) => a.key))
                    : setSelectedKeyRows([]);
                }}
              />
              Chọn tất cả
            </div>
          </div>
          <div className="flex-1">
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h2 className="text-center text-xl font-bold text-gray-800">
                Thông Tin Đơn Hàng
              </h2>
              <div className="mt-4 space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Tổng cộng</span>
                  <span>
                    {totalPrice}
                    VNĐ
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Giảm giá</span>
                  <span>0VNĐ</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span>0VNĐ</span>
                </div>
              </div>
              <hr className="my-3 border-purple-400" />
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Tổng thanh toán</span>
                <span>{totalPrice}</span>
              </div>
            </div>

            <div className="mt-4 flex cursor-pointer items-center justify-between rounded-2xl bg-white p-3 font-semibold text-purple-600 shadow-lg">
              <span>Mã giảm giá</span>
              <span>&rarr;</span>
            </div>

            <button className="mt-4 w-full rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 py-3 font-bold text-white shadow-lg">
              Thanh toán
            </button>
          </div>
        </div>
      </BasePages>
    </>
  );
}
