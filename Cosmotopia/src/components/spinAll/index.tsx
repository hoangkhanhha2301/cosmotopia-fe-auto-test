import React from 'react';

import { Spin } from 'antd';
import { sSpin } from '../../signify/store.ts';
export default function SpinAll() {
  const isSpin = sSpin.use();

  // console.log(isSpin);
  return <>{isSpin ? <Spin style={{ width: '100%' }} fullscreen /> : <> </>}</>;
}
