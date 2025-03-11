import {
  Button,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Modal,
  Popconfirm,
  Row,
  Select
} from 'antd';
import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import { useRef } from 'react';
import { AddProduct } from '@/queries/dashboard/dashboardAdmin.query';
import React, { FC } from 'react';

interface FormProductProps {
  getData: void;
  product?: any;
}

export const FormProduct: FC<FormProductProps> = ({ getData, product }) => {
  //   const handleUrlChange = (e) => {
  //     setLogoUrl(e.target.value);
  //     setIsValidImage(true);
  //   };
  //   const handleChange = (event) => {
  //     const newValue = event.target.value;

  //     // Xóa timeout cũ nếu có
  //     clearTimeout(timeoutRef.current);

  //     // Thiết lập timeout mới
  //     timeoutRef.current = setTimeout(() => {
  //       setUrlLogo(event.target.value);
  //     }, 1000); // Thay đổi sau 3 giây
  //   };
  return <></>;
};
