import Product_Layout_01 from "../product/layout_01"
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick"
import { ProductType } from "types/type";
import Home_Product_Layout from "./home_porudct_layout";

interface HomeLayout01Type {
    data: ProductType[] | null
    k: string
    title: string
    subTitle?: string
    link: string
    banner?: string
}

const Home_layout_01 = ({ data, k, title, subTitle, link, banner }: HomeLayout01Type): JSX.Element => {
    const navigate = useNavigate()
    let sliderRef = useRef<Slider>(null);
    const settings = {
        centerMode: true,
        centerPadding: '10px',
        slidesToShow: 6,
        speed: 500,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return <div className="w-full h-auto flex flex-wrap justify-center xl:justify-evenly items-center">
        <div className="relative w-full xl:w-[14%] h-[150px] xl:h-[274px] flex flex-wrap justify-center content-center p-4 rounded-md"
            style={{
                backgroundImage: `url(${banner})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}
        >
            <div className="overlay absolute top-0 left-0 w-full h-full flex items-center justify-center bg-zinc-950 bg-opacity-60 rounded-md cursor-pointer z-0"></div>
            <div className="relative w-full h-auto flex items-center justify-center text-[35px] text-center font-bold font-tech-shark text-white z-10">
                {title}
            </div>
            <div className="relative text-[15px] font-bold font-tech-shark text-red-500 z-10 my-1">{subTitle}</div>
            <div className='relative w-[150px] h-[50px]'>
                <div className='h-full flex items-center justify-center'
                    style={{
                        background: 'white',
                        clipPath: 'polygon(20% 0%, 100% 0px, 100% 60%, 80% 100%, 0px 100%, 0px 40%)',
                    }}
                ></div>
                <div className='absolute top-0 left-0 w-full h-full cursor-pointer flex items-center justify-center font-bold font-tech-shark text-[15px] px-3 border border-solid borderr-zinc-50'
                    style={{
                        backgroundImage: 'url(https://i.pinimg.com/564x/9e/73/d3/9e73d35a1fddcfcac26336e995ff9b4c.jpg)',
                        backgroundRepeat: 'repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        clipPath: 'polygon(21% 1%, 99.5% 1px, 99.5% 59%, 79% 99%, 1px 99%, 1px 41%)'
                    }}
                    onClick={() => navigate(link)}
                >
                    See all
                </div>
            </div>
        </div>
        <div className={`${k} w-full xl:w-4/5 h-auto flex flex-wrap justify-center items-around rounded-md p-4 my-10`}
            style={{ backgroundImage: 'url(https://i.pinimg.com/564x/ff/c6/6e/ffc66ec482e6e9c7e2f8f46236a5ae14.jpg)' }}>
            <div className='slider-container w-full h-auto flex justify-center'>
                <Slider className='w-full sm:w-[99%] lg:w-[95%] flex justify-around ' ref={sliderRef} {...settings} >
                    {data?.map((d: any) => <Home_Product_Layout data={d} key={`${k}-${d.idProduct}`} />)}
                </Slider>
            </div>
        </div>
    </div>
}

export default Home_layout_01