import { conFirmWithDraw, getAllWithDrawManager } from '@/queries/affilate.api';
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

interface WithdrawProps {}

export const Withdraw: FC<WithdrawProps> = ({}) => {
  const [dataTable, setDataTable] = useState<null | any[]>(null);
  const [valueSearch, setValueSearch] = useState<string>('');
  const { Search } = Input;
  const [dataId, setDataId] = useState<number>(0);
  const [form] = Form.useForm();
  const columns = [
    {
      title: 'ID',
      dataIndex: 'transactionAffiliatesId',
      key: 'transactionAffiliatesId'
    },
    {
      title: 'Tên',
      dataIndex: 'affiliateName',
      key: 'affiliateName'
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      render: (amount) => (
        <>{amount ? `${amount.toLocaleString('vi-VN')} VND` : 0}</>
      )
    },
    {
      title: 'Số tài khoản',
      dataIndex: 'bankAccountNumber'
    },

    {
      title: 'Tên ngân hàng',
      dataIndex: 'bankName',
      key: 'bankName'
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: 'Confirm',
      key: 'action',
      render: (record) => (
        <Popconfirm
          title="Xác nhận đã chuyển tiền"
          onConfirm={() => {
            ConfirmWithDraw(record.transactionAffiliatesId);
          }}
          okText="Xác nhận"
          cancelText="Hủy"
        >
          <Button
            type="default"
            disabled={record.status != 'Pending'}
            onClick={() => {
              // SIdCampaign.set(record.id);
            }}
          >
            Confirm
          </Button>
        </Popconfirm>
      )
    }
  ];

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

  const ConfirmWithDraw = (id) => {
    const model = {
      status: 'Paid'
    };
    conFirmWithDraw(id, model)
      .then((data) => {
        console.log(data);
        message.success('Xác nhận chuyển tiền thành công');
        getData();
      })
      .catch((error) => {
        console.log(error);
        message.error(error.response?.data?.msg);
      });
  };

  const getData = () => {
    console.log('oke');
    getAllWithDrawManager()
      .then((data) => {
        console.log(data);
        setDataTable(data?.data);
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
        <h1 style={{ fontSize: '32px', color: '#FF9538' }}>Manage WithDraw</h1>
        {/* <Search
          placeholder="Search Name User"
          onSearch={onSearch}
          enterButton
          style={{ maxWidth: '600px' }}
        /> */}
        <div>
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
                  (a?.firstName + a?.lastName)
                    ?.toUpperCase()
                    .includes(valueSearch.toUpperCase())
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
