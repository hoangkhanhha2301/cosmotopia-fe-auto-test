import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Spin,
  Table
} from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import React, { FC, useEffect, useState } from 'react';
import { getAllLinkAffiliate } from '@/queries/affilate.api';
import { Link } from 'react-router-dom';

interface DanhSachProps {}

const fakeData = [
  {
    id: 'aff-001',
    product_id: 'ae345415-b4b6-48b9-a138-01b34',
    product_name: 'Điện thoại iPhone 15',
    product_price: '20.000.000đ',
    product_image: 'https://via.placeholder.com/150',
    affiliate_link:
      'https://store.com/product/ae345415-b4b6-48b9-a138-01b34?ref=AFF-5678',
    referral_code: 'AFF-5678',
    affiliate_id: 'user1234',
    commission_rate: '10%',
    clicks: 120,
    conversions: 10,
    total_earnings: '2.000.000đ',
    created_at: '2024-03-24T12:00:00Z',
    expiry_date: '2025-12-31'
  },
  {
    id: 'aff-002',
    product_id: 'bd876512-c1a9-42f7-b53a-bb1c5e6a7d2f',
    product_name: 'MacBook Air M2',
    product_price: '25.000.000đ',
    product_image: 'https://via.placeholder.com/150',
    affiliate_link:
      'https://store.com/product/bd876512-c1a9-42f7-b53a-bb1c5e6a7d2f?ref=AFF-5678',
    referral_code: 'AFF-5678',
    affiliate_id: 'user1234',
    commission_rate: '8%',
    clicks: 200,
    conversions: 15,
    total_earnings: '3.000.000đ',
    created_at: '2024-03-20T15:00:00Z',
    expiry_date: '2025-12-31'
  }
];
export const DanhSach: FC<DanhSachProps> = ({}) => {
  const [dataTable, setDataTable] = useState<null | any[]>(null);
  const [valueSearch, setValueSearch] = useState<string>('');
  const { Search } = Input;
  const [data, setData] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
    total: 0
  });
  const [form] = Form.useForm();
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const columns = [
    {
      title: 'Link ID',
      dataIndex: 'linkId',
      key: 'product_name',
      render: (text) => <>{text ? text : '-'}</>
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price) => (
        <>{price ? <p>{price.toLocaleString('vi-VN')} VND </p> : '-'}</>
      )
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
      render: (clicks) => <>{clicks ? clicks : 0}</>
    },
    {
      title: 'code',
      dataIndex: 'referralCode',
      key: 'referralCode',
      render: (code) => <>{code ? code : '-'}</>
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) =>
        date ? dayjs.utc(date).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY') : ''
    },
    {
      title: 'Hoa hồng',
      dataIndex: 'commissionRate',
      key: 'commissionRate',
      render: (rate) =>
        rate ? <p className="mt- font-bold text-green-600">{rate}%</p> : ''
    },
    {
      title: 'Đường dẫn Affiliate',

      key: 'total_earnings',
      render: (record) => (
        <>
          <Link
            target="_blank"
            className="underline"
            to={`/product/${record.productId}?ref=${record.referralCode}`}
          >
            Link
          </Link>
        </>
      )
    }
    // {
    //   title: 'Ngày tạo',
    //   dataIndex: 'created_at',
    //   key: 'created_at',
    //   render: (date) =>
    //     date ? dayjs.utc(date).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY') : '-'
    // },
    // {
    //   title: 'Hết hạn',
    //   dataIndex: 'expiry_date',
    //   key: 'expiry_date',
    //   render: (date) =>
    //     date ? dayjs.utc(date).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY') : '-'
    // },
    // {
    //   title: 'Chi tiết',

    //   render: (record) => (
    //     <Button
    //       onClick={() => {
    //         showModal(record);
    //       }}
    //     >
    //       View Detail
    //     </Button>
    //   )
    // }
    // {
    //   title: 'Edit',
    //   key: 'edit',
    //   render: (record) => (
    //     <Button
    //       type="default"
    //       onClick={() => {
    //         showModal(record.id);
    //         console.log(record);
    //       }}
    //     >
    //       Edit
    //     </Button>
    //   )
    // },
    // {
    //   title: 'Delete',
    //   key: 'delete',
    //   render: (record) => (
    //     <Popconfirm
    //       title="Xóa liên kết"
    //       description="Bạn có chắc chắn muốn xóa?"
    //       icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
    //       onConfirm={() => deleteData(record.id)}
    //     >
    //       <Button danger>
    //         <DeleteOutlined />
    //       </Button>
    //     </Popconfirm>
    //   )
    // }
  ];
  const showModal = (record) => {
    setData(record);
  };

  const handleCancel = () => {
    setData(null);
    form.resetFields();
  };
  const handleTableChange = (pagination) => {
    console.log(pagination);
    setPagination(pagination);
  };
  // useEffect(() => {
  //   if (dataId.length > 1) {
  //     getBrandById(dataId).then((data) => {
  //       const dataCurrent = data?.data;
  //       form.setFieldsValue({
  //         name: dataCurrent.name,
  //         isPremium: dataCurrent.isPremium
  //       });
  //     });
  //   }
  // }, [dataId]);
  useEffect(() => {
    console.log('dmm');
    getData(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);

  const getData = (Parampage?, PrampageSize?) => {
    console.log('oke');
    const page = Parampage ?? pagination.current;
    const pageSize = PrampageSize ?? pagination.pageSize;
    // setDataTable(fakeData);
    getAllLinkAffiliate()
      .then((data) => {
        console.log(data);
        setDataTable(data?.data);
        setPagination((prev) => ({ ...prev, total: data.totalCount }));
      })
      .catch((error) => {
        console.log(error);
        setDataTable([]);
      })
      .finally(() => {});
  };
  //     getAllCategory()
  //       .then((data) => {
  //         console.log(data);
  //         setCategory(data?.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         setDataTable([]);
  //       })
  //       .finally(() => {});
  //   };

  const onSearch = (value, _e, info) => {
    setValueSearch(value.length > 0 ? value : null);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0px 16px'
        }}
      >
        <h1
          style={{
            color: '#A020F0' /* Màu tím */,
            fontWeight: 'bold' /* In đậm */,
            fontSize: '32px' /* Kích thước tương đương "Danh sách" */
          }}
        >
          Quản lý link Affiliate
        </h1>
        {/* <Search
          placeholder="Search Name Brand"
          onSearch={onSearch}
          enterButton
          style={{ maxWidth: '600px' }}
        /> */}
        <div>
          <Modal
            visible={data ? true : false}
            onCancel={handleCancel}
            width={500}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>

              // <Button
              //   type="primary"
              //   onClick={() => {
              //     form.submit();
              //   }}
              // >
              //   {` ${dataId?.length > 1 ? 'Update' : 'Add New'} Brand`}
              // </Button>
            ]}
          >
            <div style={{ margin: 'auto' }}>
              <Form form={form} layout="vertical">
                <Row gutter={24}>
                  <Col span={24}>
                    <Row gutter={24}>
                      <Col span={24}>
                        <Form.Item
                          name="name"
                          label="Name"
                          rules={[
                            {
                              required: true,
                              message: 'Please Enter Name of Brand!'
                            }
                          ]}
                        >
                          <Input placeholder="Enter Name Brand" />
                        </Form.Item>
                      </Col>
                    </Row>
                    {/* <Row gutter={24}>
                          <Col span={24}>
                            <Form.Item
                              name="dateRange"
                              label="Date Range"
                              rules={[
                                {
                                  required: true,
                                  message:
                                    'Please select the date range for the campaign!'
                                }
                              ]}
                            >
                              <DatePicker.RangePicker
                                style={{ width: '100%' }}
                                placeholder={[
                                  'Select Start Date',
                                  'Select End Date'
                                ]}
                              />
                            </Form.Item>
                          </Col>
                        </Row> */}
                    <Row gutter={24}>
                      <Form.Item
                        name="isPremium"
                        valuePropName="checked"
                        rules={[]}
                      >
                        <Checkbox>Premium</Checkbox>
                      </Form.Item>
                    </Row>
                  </Col>
                </Row>

                {/*  */}
              </Form>
            </div>
          </Modal>
          {/* <Button onClick={() => showModal('0')} type="primary">
            Add new Brand
          </Button> */}
        </div>
        {/* <AddNewAccount GetProfileFunction={getProfile}></AddNewAccount> */}
      </div>
      {!dataTable ? (
        <Spin
          size="large"
          // style={{
          //   width: "100%",
          //   marginTop: "150px",
          // }}
          fullscreen
        ></Spin>
      ) : (
        <Table
          dataSource={
            valueSearch
              ? dataTable.filter((a) =>
                  a?.name?.toUpperCase().includes(valueSearch.toUpperCase())
                )
              : dataTable
          }
          columns={columns}
          pagination={pagination}
          style={{ marginTop: '24px' }}
          onChange={handleTableChange}
        />
      )}
    </div>
  );
};
