import BasePages from '@/components/shared/base-pages.js';
import Logo from '@/assets/62 1.png';
import { useRouter } from '@/routes/hooks';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOrderById } from '@/queries/dashboard/dashboardAdmin.query';
import { Button, Result, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
const { Paragraph, Text } = Typography;
export default function HandlePayment() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const router = useRouter();
  const [props, setProps] = useState<any>(null);

  const navigate = useNavigate();

  //   useEffect(() => {}, []);
  //   const state = location.state;
  //   if (state.type === 'Đặt hàng') {
  //     setContent({
  //       type: 'Đặt hàng',
  //       message: 'Bạn đã đặt thành công, hãy thanh toán mã QR VNPay'
  //     });
  //   }
  //   window.open(state.url, '_blank');
  useEffect(() => {
    const responseCode = searchParams.get('vnp_ResponseCode');
    // const transactionStatus = searchParams.get('vnp_TransactionStatus')
    const transactionStatus = searchParams.get('vnp_TransactionStatus');
    console.log(transactionStatus);
    // transactionId (0 ===> check transactionStatus => handle nó ?? 1||2 => đã xử lý rồi )
    const statusTO = '0';
    if (statusTO == '0') {
      if (transactionStatus == '00') {
        // callAPI
        setProps({
          status: 'success',
          title: 'Submission Success',
          subTitle: 'Đơn hàng của bạn đã thanh toán thành công'
        });
      } else if (transactionStatus == '02') {
        // callAPI
        setProps({
          status: 'error',
          title: 'Payment Failed',
          subTitle: 'Thanh toán thất bại, đơn hàng của bạn đã bị hủy'
        });
      }
    }
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
          >
            {/* <div className="desc">
            <Paragraph>
              <Text
                strong
                style={{
                  fontSize: 16
                }}
              >
                The content you submitted has the following error:
              </Text>
            </Paragraph>
            <Paragraph>
              <CloseCircleOutlined className="site-result-demo-error-icon" />{' '}
              Your account has been frozen. <a>Thaw immediately &gt;</a>
            </Paragraph>
            <Paragraph>
              <CloseCircleOutlined className="site-result-demo-error-icon" />{' '}
              Your account is not yet eligible to apply.{' '}
              <a>Apply Unlock &gt;</a>
            </Paragraph>
          </div> */}
          </Result>
        )}
      </BasePages>
    </>
  );
}
