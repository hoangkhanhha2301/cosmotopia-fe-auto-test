import {
  AddCategory,
  DeleteBrand,
  getAllCategory,
  getCategoryById,
  UpdateCategory
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
import TextArea from 'antd/es/input/TextArea';
import { da } from 'date-fns/locale';
import dayjs from 'dayjs';
import React, { FC, useEffect, useState } from 'react';

interface CategoryProps {}

export const Category: FC<CategoryProps> = ({}) => {
  const [dataTable, setDataTable] = useState<null | any[]>(null);
  const [valueSearch, setValueSearch] = useState<string>('');
  const { Search } = Input;
  const [dataId, setDataId] = useState<string>('');
  const [form] = Form.useForm();
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
      title: 'description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'CreateAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => (date ? dayjs(date).format('DD/MM/YYYY') : '')
      // render: (n, o) => {
      //   return <>{getRole(n)}</>;
      // },
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
            showModal(record.categoryId);
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
                deleteData(record.categoryId);
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
  useEffect(() => {
    if (dataId.length > 1) {
      getCategoryById(dataId).then((data) => {
        const dataCurrent = data?.data;
        form.setFieldsValue({
          name: dataCurrent.name,
          description: dataCurrent.description
        });
      });
    }
  }, [dataId]);
  const addData = (model) => {
    AddCategory(model)
      .then((data) => {
        console.log(data);
        message.success('add new Category success!!!');
        handleCancel();
        getData();
      })
      .catch((error) => {
        console.log(error);
        message.error(error.response?.data?.msg);
      });
  };
  const updateData = (model) => {
    UpdateCategory(model, dataId)
      .then((data) => {
        console.log(data);
        message.success('Update new Category success!!!');
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
      description: values.description
    };
    dataId == '0' ? addData(model) : updateData(model);
  };
  const getData = () => {
    console.log('oke');
    getAllCategory()
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
        <h1 style={{ fontSize: '32px', color: 'rgb(38, 164, 255)' }}>
          Manage Category
        </h1>
        <Search
          placeholder="Search Name Category"
          onSearch={onSearch}
          enterButton
          style={{ maxWidth: '600px' }}
        />
        <div>
          <Modal
            title={`${dataId?.length > 1 ? 'Update' : 'Add New'}  Category`}
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
                style={{ backgroundColor: '#4096ff' }}
              >
                {` ${dataId?.length > 1 ? 'Update' : 'Add New'} Category`}
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
                          className="w-full"
                          rules={[
                            {
                              required: true,
                              message: 'Please Enter Name of Category!'
                            }
                          ]}
                        >
                          <Input placeholder="Enter Name Category" />
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
                        name="description"
                        label="Description"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter description for Category!'
                          }
                        ]}
                        className="w-full"
                      >
                        <TextArea rows={4}></TextArea>
                      </Form.Item>
                    </Row>
                  </Col>
                </Row>

                {/*  */}
              </Form>
            </div>
          </Modal>
          <Button onClick={() => showModal('0')} type="default">
            Add new Category
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
