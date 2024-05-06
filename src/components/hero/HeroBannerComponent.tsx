import Link from "next/link"

export default function HeroBannerComponent() {
    return (
        <>
        <div className="hero min-h-20">
            <div className="hero-content text-center text-neutral-content bg-base-color-red">
                <div className=" max-w-screen min-h-20 pt-32">
                    <div className="flex items-center flex-col gap-5">
                        <div className="bg-base-color-white flex w-80 text-center justify-center items-center pt-4 rounded-xl">
                        <h1 className="mb-5 text-5xl font-bold">Hello there!</h1>
                        </div>
                    <p className="text-base-color-white">Shop the latest trends with confidence and find your perfect fit today. <br /> Join us and experience the joy of shopping reimagined!</p>
                    <button className="btn bg-base-color-white text-base-color-red p-3 hover:text-base-color-green sha rounded-lg">
                        <Link href={"/about-us"}>
                        Get Started
                        </Link>
                    </button>
                    </div>
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#F2F1F2" fill-opacity="1" d="M0,96L21.8,101.3C43.6,107,87,117,131,154.7C174.5,192,218,256,262,256C305.5,256,349,192,393,160C436.4,128,480,128,524,112C567.3,96,611,64,655,90.7C698.2,117,742,203,785,229.3C829.1,256,873,224,916,202.7C960,181,1004,171,1047,154.7C1090.9,139,1135,117,1178,117.3C1221.8,117,1265,139,1309,128C1352.7,117,1396,75,1418,53.3L1440,32L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}