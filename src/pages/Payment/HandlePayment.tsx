import BasePages from '@/components/shared/base-pages.js';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Result } from 'antd';
import {
  useGetDetailPayment,
  useUpdatePaymentStatus
} from '@/queries/payment.query';
import { getTransactions, HandleTransactions } from '@/queries/user.api';

export default function HandlePayment() {
  const [searchParams] = useSearchParams();
  const [props, setProps] = useState<any>(null);
  const [data, setData] = useState(null);
  const transactionId = searchParams.get('vnp_TxnRef');
  console.log(transactionId);
  // const { data } = useGetDetailPayment(transactionId);
  const updatePaymentStatus = useUpdatePaymentStatus();
  // console.log("Transaction: ", data?.status);
  // const statusTO = data?.status;

  useEffect(() => {
    // const responseCode = searchParams.get('vnp_ResponseCode');
    const transactionStatus = searchParams.get('vnp_TransactionStatus');
    console.log(transactionStatus);
    console.log(transactionId);
    // transactionId (0 ===> check transactionStatus => handle nó ?? 1||2 => đã xử lý rồi )
    getTransactions(transactionId).then((data) => {
      console.log(data);
      const statusTO = data.status;
      if (statusTO == 0) {
        if (transactionStatus == '00') {
          console.log('Handle Success');
          HandleTransactions(transactionId, 1).then((data) => {
            console.log(data);
          });
          setProps({
            status: 'success',
            title: 'Submission Success',
            subTitle: 'Đơn hàng của bạn đã thanh toán thành công'
          });
        } else if (transactionStatus == '02') {
          console.log('Handle Fail');
          HandleTransactions(transactionId, 2).then((data) => {
            console.log(data);
          });

          setProps({
            status: 'error',
            title: 'Payment Failed',
            subTitle: 'Thanh toán thất bại, đơn hàng của bạn đã bị hủy'
          });
          // callAPI
        }
      } else {
        if (statusTO == 1) {
          setProps({
            status: 'success',
            title: 'Submission Success',
            subTitle: 'Đơn hàng của bạn đã thanh toán thành công'
          });
        } else if (statusTO == 2) {
          setProps({
            status: 'error',
            title: 'Payment Failed',
            subTitle: 'Thanh toán thất bại, đơn hàng của bạn đã bị hủy'
          });
        }
      }
    });
  }, []);
  return (
    <>
      <BasePages className="relative mx-auto  w-[80%] flex-1 p-4">
        {props && (
          <Result
            extra={[]}
            status={props.status}
            title={props.title}
            subTitle={props.subTitle}
          ></Result>
        )}
      </BasePages>
    </>
  );
}
