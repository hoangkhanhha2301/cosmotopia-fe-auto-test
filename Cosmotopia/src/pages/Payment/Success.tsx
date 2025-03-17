import BasePages from '@/components/shared/base-pages.js';
import Logo from '@/assets/62 1.png';
import { useRouter } from "@/routes/hooks"

export default function Payment() {
    const router = useRouter();

    return (
        <>
            <BasePages
                className="relative mx-auto min-h-screen w-[80%] flex-1 p-4"
            >
                <div className="flex w-full flex-col items-center justify-center gap-6">
                    {/* Success Image */}
                    <div className="relative w-[435px] h-[435px]">
                        <img
                            src={Logo}
                            alt="Payment Success"
                            width={435}
                            height={435}
                        />
                    </div>

                    {/* Thank you message with gradient text */}
                    <div className="flex flex-col items-center gap-3 mt-4">
                        <h1 className="font-bold text-[44px] leading-[50px] text-center font-montserrat bg-gradient-to-r from-[#ED1DBF] via-[#A831F1] to-[#3561FE] bg-clip-text text-transparent">
                            Thank you !
                        </h1>

                        <h2 className="font-bold text-[22px] leading-7 text-[#423A59] font-montserrat">
                            Thanh toán thành công
                        </h2>
                    </div>

                    {/* View order link */}
                    <span
                        onClick={() => router.push('/profile/orders')}
                        className="text-base text-[#4E4663] underline font-monsterrat mt-2 cursor-pointer"
                    >
                        Xem đơn hàng của bạn
                    </span>
                    {/* Description text */}
                    <p className="text-base text-[#4E4663] text-center font-montserrat max-w-[739px]">
                        Cảm ơn bạn đã mua hàng của chúng tôi, nếu có bất kỳ vấn để gì hãy liên lạc với chúng tôi
                    </p>

                </div>
            </BasePages>
        </>
    );
}

