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
  const [fileList, setFileList] = useState<any[]>([]);

  const customUpload = async ({ file, onSuccess, onError }) => {
    console.log(file);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Cometis');
    formData.append('cloud_name', 'dhylbhwvb');
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dhylbhwvb/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    );
    const data = await response.json();
    console.log(data.secure_url);
    setFileList((prev) => [
      ...prev,
      {
        uid: data.asset_id,
        status: 'done',
        url: data.secure_url
      }
    ]);

    // try {
    //   const response = await axios.post(
    //     'https://your-api.com/upload',
    //     formData,
    //     {
    //       headers: {
    //         'Content-Type': 'multipart/form-data'
    //       }
    //     }
    //   );
    //   onSuccess(response.data); // Báo cho AntD biết upload thành công
    // } catch (error) {
    //   onError(error); // Báo lỗi nếu có
    // }
  };
  const handlePreview = async (file) => {};
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
        <Button
          type="default"
          disabled={record.status != 'Pending'}
          onClick={() => {
            setDataId(record.transactionAffiliatesId);
          }}
        >
          Handle
        </Button>
      )
    }
  ];
  const handleWithDraw = (isWithdraw) => {
    if (isWithdraw && !fileList[0]?.url) {
      message.error('Bạn phải tải hình lên để xác nhận thanh toán');
      return;
    }
    const model = {
      image: isWithdraw ? fileList[0].url : '',
      status: isWithdraw ? 'Paid' : 'Failed'
    };
    console.log(model);
    console.log(dataId);
    conFirmWithDraw(dataId, model).then((data) => {
      console.log(data);
      setDataId(null);
      setFileList([]);
      getData();
      message.success('Xử lý đơn rút tiền thành công');
    });
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

  // const ConfirmWithDraw = (id) => {
  //   const model = {
  //     status: 'Paid'
  //   };
  //   conFirmWithDraw(id, model)
  //     .then((data) => {
  //       console.log(data);
  //       message.success('Xác nhận chuyển tiền thành công');
  //       getData();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       message.error(error.response?.data?.msg);
  //     });
  // };

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
  const onFinish = async (values) => {
    // console.log(values);
    // const model = {
    //   firstName: values.firstName,
    //   lastName: values.lastName,
    //   phone: values.phone
    // };
    // updateAccountSelf(model)
    //   .then((data) => {
    //     console.log(data);
    //     message.success('Update Profile success!!!');
    //     getData();
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     message.error(error.response?.data?.msg);
    //   });
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
      <Modal
        title={'Xử lý thanh toán'}
        visible={dataId}
        onCancel={handleCancel}
        width={500}
        footer={
          [
            // <Button key="back" onClick={handleCancel}>
            //   Cancel
            // </Button>
            // <Button
            //   type="primary"
            //   onClick={() => {
            //     form.submit();
            //   }}
            // >
            //   {'Update User'}
            // </Button>
          ]
        }
      >
        <div style={{ margin: 'auto' }}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Upload
              multiple
              fileList={fileList}
              onPreview={handlePreview}
              listType="picture-card"
              onRemove={(file) => {
                setFileList((prev) =>
                  prev.filter((item) => item.uid !== file.uid)
                );
              }}
              accept=".jpg,.png,.pdf"
              // showUploadList={true}
              // beforeUpload={(file) => {
              //   setFileList((prev) => [...prev, file]);
              //   return false; // Ngăn Ant Design tự động upload
              // }}
              // fileList={fileList}
              // onRemove={(file) => {
              //   setFileList((prev) =>
              //     prev.filter((item) => item.uid !== file.uid)
              //   );
              // }}
              customRequest={customUpload}
            >
              {fileList.length == 0 && (
                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
              )}
            </Upload>

            <div className="mt-4 flex justify-between ">
              <Button
                type="primary"
                onClick={() => {
                  handleWithDraw(true);
                }}
              >
                Xác nhận chuyển tiền
              </Button>
              <Button
                type="primary"
                danger
                onClick={() => {
                  handleWithDraw(false);
                }}
              >
                Xác nhận hủy
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
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
