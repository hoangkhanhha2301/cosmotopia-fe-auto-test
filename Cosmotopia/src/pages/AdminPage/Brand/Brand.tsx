import {
  AddBrand,
  AddProduct,
  DeleteBrand,
  getAllBrand,
  getAllCategory,
  getAllProduct,
  getBrandById,
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

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { FC, useEffect, useState } from 'react';

interface BrandProps {}

export const Brand: FC<BrandProps> = ({}) => {
  const [dataTable, setDataTable] = useState<null | any[]>(null);
  const [valueSearch, setValueSearch] = useState<string>('');
  const { Search } = Input;
  const [dataId, setDataId] = useState<string>('');
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (n, o) => {
        return <>{n ? n : '-'}</>;
      }
    },
    {
      title: 'isPremium',
      dataIndex: 'isPremium',
      key: 'isActive',
      render: (n, o) => {
        return <>{n ? 'true' : 'false'}</>;
      }
    },
    {
      title: 'CreateAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => (date ? dayjs.utc(date).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY') : '')
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
            showModal(record.brandId);
            console.log(record);
            // SIdCampaign.set(record.id);
          }}
        >
          Edit
        </Button>
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
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          icon={
            <QuestionCircleOutlined
              style={{
                color: 'red'
              }}
            />
          }
          onConfirm={() => deleteData(record.brandId)}
        >
          <Button danger>
            <DeleteOutlined
              onClick={() => {
                // deleteData(record.brandId);
                // SIdCampaign.set(record.id);
                console.log('okeee');
              }}
            />
          </Button>
        </Popconfirm>
      )
    }
  ];
  const props = {
    name: 'file',
    // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    // headers: {
    //   authorization: 'authorization-text'
    // },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  const showModal = (id) => {
    setDataId(id);
  };

  const handleCancel = () => {
    setDataId('');
    form.resetFields();
  };
  const handleTableChange = (pagination) => {
    console.log(pagination);
    setPagination(pagination);
  };
  useEffect(() => {
    if (dataId.length > 1) {
      getBrandById(dataId).then((data) => {
        const dataCurrent = data?.data;
        form.setFieldsValue({
          name: dataCurrent.name,
          isPremium: dataCurrent.isPremium
        });
      });
    }
  }, [dataId]);
  useEffect(() => {
    console.log('dmm');
    getData(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);
  const addData = (model) => {
    AddBrand(model)
      .then((data) => {
        console.log(data);
        message.success('add new Brand success!!!');
        handleCancel();
        getData();
      })
      .catch((error) => {
        console.log(error);
        message.error(error.response?.data?.msg);
      });
  };
  const updateData = (model) => {
    UpdateBrand(model, dataId)
      .then((data) => {
        console.log(data);
        message.success('Update Brand success!!!');
        handleCancel();
        getData();
      })
      .catch((error) => {
        console.log(error);
        message.error(error.response?.data?.msg);
      });
  };
  const deleteData = (id) => {
    DeleteBrand(id)
      .then((data) => {
        console.log(data);
        message.success('Delete Brand success!!!');
        getData();
      })
      .catch((error) => {
        console.log(error);
        message.error(error.response?.data?.msg);
      });
  };
  const onFinish = async (values) => {
    console.log(values);
    const model = {
      name: values.name,
      isPremium: values.isPremium
    };
    console.log(dataId);
    dataId == '0' ? addData(model) : updateData(model);
  };
  const getData = (Parampage?, PrampageSize?) => {
    console.log('oke');
    const page = Parampage ?? pagination.current;
    const pageSize = PrampageSize ?? pagination.pageSize;
    getAllBrand(page, pageSize)
      .then((data) => {
        console.log(data);
        setDataTable(data?.brands);
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
        <h1 style={{ fontSize: '32px', color: '#FF9538' }}>Manage Brand</h1>
        <Search
          placeholder="Search Name Brand"
          onSearch={onSearch}
          enterButton
          style={{ maxWidth: '600px' }}
        />
        <div>
          <Modal
            title={`${dataId?.length > 1 ? 'Update' : 'Add New'}  Brand`}
            visible={dataId.length > 0 ? true : false}
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
                {` ${dataId?.length > 1 ? 'Update' : 'Add New'} Brand`}
              </Button>
            ]}
          >
            <div style={{ margin: 'auto' }}>
              <Form form={form} layout="vertical" onFinish={onFinish}>
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
                    <Row gutter={24} className="px-2">
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
          <Button onClick={() => showModal('0')} type="primary">
            Add new Brand
          </Button>
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
