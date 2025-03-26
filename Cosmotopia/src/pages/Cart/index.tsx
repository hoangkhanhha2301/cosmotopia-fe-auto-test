import BasePages from '@/components/shared/base-pages.js';
import './styles.css';
import { useRouter } from '@/routes/hooks';
import { Button, Checkbox, ConfigProvider, message, Select, Table } from 'antd';
import { useEffect, useRef, useState } from 'react';
import helper from '@/helpers/index';
import { useNavigate } from 'react-router-dom';
import { DeleteCart, getAllCart, UpdateCart } from '@/queries/cart.api';
import { DeleteOutlined } from '@ant-design/icons';
import { sSpin } from '@/store/spin';

const dataFake = [
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
];
export default function Cart() {
  const [data, setData] = useState<any>([]);

  const [selectedKeyRows, setSelectedKeyRows] = useState([]);
  const navigate = useNavigate();
  const keySet = new Set(selectedKeyRows);
  const [tempQuantity, setTempQuantity] = useState(null);
  const selectedRows = data.filter((item) => keySet.has(item.key));
  // const handleChangeData = (key, record) => {
  //   console.log('oke');
  //   setData((pre) => pre.map((item) => (item.key == key ? record : item)));
  // };
  const totalPrice = selectedRows
    ?.reduce((total, product) => {
      return total + product?.product.price * product?.quantity;
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
              src={record?.product?.imageUrls[0]} // Thay bằng ảnh sản phẩm
              alt="Flower Knows"
              className="h-20 w-20 rounded-lg bg-white object-cover p-1"
            />
          </div>
          <div>
            <h3
              className="cursor-pointer text-base font-bold text-[#4E4663] hover:underline"
              onClick={() => navigate(`/product/${record.productId}`)}
            >
              {record?.product.name}
            </h3>
            <p className="mb-1 text-gray-500">{record?.product.description}</p>
            <div>
              <p>Còn {record?.product.stockQuantity} sản phẩm </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      render: (quantity, record) => (
        <input
          min={0}
          value={quantity}
          type="number"
          max={Number(record.product?.stockQuantity)}
          onChange={(e) => {
            if (e.target.value == '') {
              updateCart(1, record.product?.productId);
            } else {
              updateCart(e.target.value, record.product?.productId);
            }

            // setQuantity(value);
            //   quantity = value > 123 ? 123 : value;
          }}
          className="w-12 border-none bg-gray-100  py-2 text-center font-bold text-[#9C3CFD]"
        />
      )
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      render: (price, record) => (
        <span className="text-base font-bold text-[#9C3CFD]">
          {Number(record.product.price).toLocaleString('vi-VN')} VNĐ
        </span>
      )
    },
    {
      title: 'Delete',
      key: 'action',
      render: (record) => (
        // <Button
        //   type="dashed"
        //   style={{ backgroundColor: 'red' }}
        //   // disabled={
        //   //   record.admin_approve != "0" && user.role != 0 ? true : false
        //   // }
        //   onClick={() => {
        //     console.log(record.brandId);
        //     // SIdCampaign.set(record.id);
        //   }}
        // >
        //   Delete
        // </Button>
        <Button danger>
          <DeleteOutlined
            onClick={() => {
              deleteCart(record?.productId);
              // SIdCampaign.set(record.id);
            }}
          />
        </Button>
      )
    }
  ];
  useEffect(() => {
    const token = helper.cookie_get('AT');
    if (!token) {
      navigate(-1);
      message.error('Bạn phải đăng nhập mới có thể sử dụng tính năng này');
    } else {
      getCart();
    }
  }, []);
  // const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  // const onSelectChange = (newSelectedRowKeys) => {
  //   setSelectedRowKeys(newSelectedRowKeys);
  // };
  const rowSelection = {
    selectedRowKeys: selectedKeyRows,
    onChange: (newSelectedRowkeys) => {
      console.log(newSelectedRowkeys);
      setSelectedKeyRows(newSelectedRowkeys);
    }
  };

  const getCart = () => {
    getAllCart().then((data) => {
      console.log(data);
      const dataHaveKey = data?.map((data, index) => ({ ...data, key: index }));

      setData(dataHaveKey);
    });
  };
  const updateCart = (quantity, productId) => {
    const model = {
      productId: productId,
      quantity: quantity
    };
    console.log(model);
    UpdateCart(model).then((data) => {
      console.log(data);
      getCart();
    });
  };
  const deleteCart = (productId) => {
    // console.log(productId);
    // sSpin.set(true);
    DeleteCart(productId)
      .then((data) => {
        console.log(data);
        getCart();
      })
      .finally(() => {
        // sSpin.set(false);
      });
  };
  const handleCheckout = () => {
    if (selectedKeyRows?.length < 1) {
      return;
    }
    const productsToOrder = data
      .filter((product) => selectedKeyRows.includes(product?.key))
      .map((cart) => ({
        productId: cart.productId,
        name: cart.product.name,
        price: cart.product.price,
        quantity: cart.quantity,
        imageUrl: cart.product?.imageUrls[0] || 'abc'
      }));
    console.log(productsToOrder);
    navigate('/payment', { state: productsToOrder });
  };
  return (
    <>
      <BasePages
        className="relative mx-auto w-[80%] flex-1 p-4 "
        pageHead="Giỏ hàng"
      >
        <h2 className=" mb-4 text-xl font-bold text-gray-800">Giỏ Hàng</h2>
        <div className="flex gap-5">
          <div className="w-2/3 rounded-2xl bg-white p-6 shadow-lg">
            {/* <Button onClick={handleSelectAll} type="primary">
              {isAllSelected ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
            </Button> */}
            {data?.length > 0 ? (
              <>
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
              </>
            ) : (
              <>
                <p className="text-center">
                  Chưa có sản phẩm nào trong giỏ hàng của bạn
                </p>
              </>
            )}
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
                <span>{totalPrice} VNĐ</span>
              </div>
            </div>

            <div className="mt-4 flex cursor-pointer items-center justify-between rounded-2xl bg-white p-3 font-semibold text-purple-600 shadow-lg">
              <span>Mã giảm giá</span>
              <span>&rarr;</span>
            </div>

            <button
              className="mt-4 w-full rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 py-3 font-bold text-white shadow-lg"
              onClick={handleCheckout}
            >
              Thanh toán
            </button>
          </div>
        </div>
      </BasePages>
    </>
  );
}
