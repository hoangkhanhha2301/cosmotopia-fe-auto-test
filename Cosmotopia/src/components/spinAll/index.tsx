import React from 'react';

import { Spin } from 'antd';
import { sSpin } from '../../store/spin.ts';
import { useSelector } from 'react-redux';

export default function SpinAll() {
  const isSpin = sSpin.use();
  // console.log(isSpin);
  // const isSpin = useSelector((state: RootState) => state.spin.isSpin);
  return <>{isSpin ? <Spin style={{ width: '100%' }} fullscreen /> : <></>}</>;
}
