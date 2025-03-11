import React from 'react';

import { Spin } from 'antd';
import { sSpin } from '../../signify/store';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
export default function SpinAll() {
  // const isSpin = sSpin.use();
  // console.log(isSpin);
  const isSpin = useSelector((state: RootState) => state.spin.isSpin);
  return <>{isSpin ? <Spin style={{ width: '100%' }} fullscreen /> : <></>}</>;
}
