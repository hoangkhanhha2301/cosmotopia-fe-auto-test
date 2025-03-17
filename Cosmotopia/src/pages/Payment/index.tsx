import BasePages from '@/components/shared/base-pages.js';
import OrderInfo from './OrderInfo';
import { MapPin } from 'lucide-react';
import PaymentMethods from './PaymentMethod';
export default function Payment() {
    return (
        <>
            <BasePages
                className="relative mx-auto max-h-screen w-[80%] flex-1 p-4"
            >
                <div className="flex w-full  justify-between gap-10 mb-8">
                    <div className="flex w-2/5 flex-col gap-5">
                        <OrderInfo />
                    </div>
                    <div className="flex w-4/5 flex-col rounded-md gap-5">
                        <div className='flex h-2/5 flex-row rounded-md bg-white p-5 shadow-lg '>
                            <div className="w-full flex flex-col">
                                <div className="flex flex-row items-center gap-3 w-full">
                                    <div className="w-7 h-7 flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-[#4E4663] stroke-[1.5px]" />
                                    </div>
                                    <span className="font-medium text-[22px] text-[#4E4663] font-montserrat">Địa chỉ</span>
                                </div>

                                <div className="flex flex-row justify-between items-center w-full">
                                    <div className="flex flex-col gap-0.5">
                                        <h3 className="text-[22px] text-[#4E4663] font-normal font-montserrat">Thu Trang (+84) 123456798</h3>
                                        <p className="text-base text-[#837D92] font-normal font-montserrat">
                                            s101 Nguyễn Xiển, phường Long Thạch Mỹ, Thành phố Thủ Đức
                                        </p>
                                    </div>
                                    <button className="text-[#936EFF] text-lg font-normal font-montserrat">Thay đổi</button>
                                </div>
                            </div>
                        </div>
                        <div className='flex h-4/5 flex-row rounded-md bg-white p-5 shadow-lg'>
                            <PaymentMethods/>
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
            </BasePages>
        </>
    );
}

