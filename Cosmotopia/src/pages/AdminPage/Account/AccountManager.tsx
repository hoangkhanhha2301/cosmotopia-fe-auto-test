import {
  DeleteBrand,
  getAccountById,
  getAllAccount,
  getBrandById,
  updateAccountByAdmin,
  UpdateBrand
} from '@/queries/dashboard/dashboardAdmin.query';
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  UploadOutlined
} from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Spin,
  Table,
  Upload
} from 'antd';
import { da } from 'date-fns/locale';
import dayjs from 'dayjs';
import React, { FC, useEffect, useState } from 'react';

interface AccountProps {}
export const optionsRole = [
  // { value: 0, label: 'Administrator' },
  { value: 1, label: 'Manager' },
  { value: 2, label: 'Affiliates' },
  { value: 3, label: 'Customers' },
  { value: 4, label: 'Sales Staff' },
  { value: 5, label: 'Shipper Staff' }
];
const showRole = (value) => {
  let role = '';
  optionsRole.forEach((a) => {
    if (a.value == value) {
      role = a.label;
      return false;
    }
  });
  return <span>{role}</span>;
};
export const Account: FC<AccountProps> = ({}) => {
  const [dataTable, setDataTable] = useState<null | any[]>(null);
  const [valueSearch, setValueSearch] = useState<string>('');
  const { Search } = Input;
  const [dataId, setDataId] = useState<number>(0);
  const [form] = Form.useForm();
  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'First Name',
      dataIndex: 'firstName'
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone'
    },

    {
      title: 'Role',
      dataIndex: 'roleType',
      key: 'roleType',
      render: (record) => showRole(record)
    },
    {
      title: 'Status',
      dataIndex: 'userStatus',
      key: 'userStatus',
      render: (record) => <span>{record == '1' ? 'Block' : 'Active'}</span>
    },
    {
      title: 'Edit',
      key: 'action',
      render: (record) => (
        <Button
          type="default"
          // disabled={
          //   record.admin_approve != "0" && user.role != 0 ? true : false
          // }
          onClick={() => {
            showModal(record.userId);

            // SIdCampaign.set(record.id);
          }}
        >
          Edit
        </Button>
      )
    }
  ];

  const showModal = (id) => {
    setDataId(id);
  };

  const handleCancel = () => {
    setDataId(0);
    form.resetFields();
  };
  useEffect(() => {
    console.log('abc', dataId);
    if (dataId > 0) {
      console.log('oke');
      getAccountById(dataId).then((data) => {
        const dataCurrent = data?.data;

        form.setFieldsValue({
          email: dataCurrent.email,
          phone: dataCurrent.phone,
          firstName: dataCurrent.firstName,
          lastName: dataCurrent.lastName,
          roleType: dataCurrent.roleType,
          userStatus: dataCurrent.userStatus
        });
      });
    }
  }, [dataId]);

  const updateData = (model) => {
    console.log(dataId);
    updateAccountByAdmin(model, dataId)
      .then((data) => {
        console.log(data);
        message.success('Update Account success!!!');
        handleCancel();
        getData();
      })
      .catch((error) => {
        console.log(error);
        message.error(error.response?.data?.msg);
      });
  };

  const onFinish = async (values) => {
    const model = {
      userStatus: Number(values.userStatus),
      roleType: Number(values.roleType)
    };

    updateData(model);
  };
  const getData = () => {
    console.log('oke');
    getAllAccount()
      .then((data) => {
        setDataTable(data?.data.filter((account) => account.roleType != 0));
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
        <h1 style={{ fontSize: '32px', color: 'rgb(38, 164, 255)' }}>
          Manage User
        </h1>
        <Search
          placeholder="Search Name User"
          onSearch={onSearch}
          enterButton
          style={{ maxWidth: '600px' }}
        />
        <div>
          <Modal
            title={'Update User'}
            visible={dataId > 0 ? true : false}
            onCancel={handleCancel}
            width={500}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>,

              <Button
                type="primary"
                onClick={() => {
                  form.submit();
                }}
              >
                {'Update User'}
              </Button>
            ]}
          >
            <div style={{ margin: 'auto' }}>
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Row gutter={24}>
                  <Col span={24}>
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          name="email"
                          label="Email"
                          rules={[
                            {
                              required: true,
                              message: 'Please Enter Email of User!'
                            }
                          ]}
                        >
                          <Input placeholder="Enter Email User" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="phone" label="Phone">
                          <Input placeholder="Enter Name User" readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          name="firstName"
                          label="First Name"
                          rules={[
                            {
                              required: true,
                              message: 'Please Enter First Name of User!'
                            }
                          ]}
                        >
                          <Input placeholder="Enter First Name User" readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="lastName"
                          label="Last Name"
                          rules={[
                            {
                              required: true,
                              message: 'Please Enter Last Name of User!'
                            }
                          ]}
                        >
                          <Input placeholder="Enter Last Name User" readOnly />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          name="roleType"
                          label=" Role"
                          rules={[
                            {
                              required: true,
                              message: 'Please Enter Role of User!'
                            }
                          ]}
                        >
                          <Select
                            style={{ width: '100%' }}
                            options={optionsRole}
                            placeholder="Select Role"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="userStatus"
                          label="User Status"
                          rules={[
                            {
                              required: true
                            }
                          ]}
                        >
                          <Select
                            style={{ width: '100%' }}
                            options={[
                              { value: '0', label: 'Active' },
                              { value: '1', label: 'Block' }
                            ]}
                            placeholder="Select Role"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                {/*  */}
              </Form>
            </div>
          </Modal>
          {/* <Button onClick={() => showModal('0')} type="primary">
            Add new User
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
          pagination={{
            pageSize: 8
          }}
          style={{ marginTop: '24px' }}
          // onChange={onChangePaging}
        />
      )}
    </div>
  );
};
