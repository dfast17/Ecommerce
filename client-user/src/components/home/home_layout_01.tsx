import Product_Layout_01 from "../product/layout_01"
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick"
import { ProductType } from "types/type";

const Home_layout_01 = ({data,k,title,subTitle,link}:{data:ProductType[] | null,k:string,title:string,subTitle?:string,link:string}) => {
    useEffect(() => {console.log(title)},[title])
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
  return <div className={`${k} w-[90%] h-auto flex flex-wrap justify-center items-around rounded-md p-4 my-10`} 
  style={{backgroundImage:'url(https://i.pinimg.com/564x/ff/c6/6e/ffc66ec482e6e9c7e2f8f46236a5ae14.jpg)'}}>
      <div className='w-full h-auto flex flex-wrap justify-between my-2 py-2'>
            <div className='w-2/4 flex flex-col'>
                <span className="text-[35px] font-bold font-tech-shark text-white">{title}</span>
                <span className="text-[15px] font-bold font-tech-shark text-red-500">{subTitle}</span>
            </div>
            <div className='relative w-[10%] h-4/5'>
                <div className='h-full flex items-center justify-center'
                    style={{
                        background:'white',
                        clipPath: 'polygon(20% 0%, 100% 0px, 100% 60%, 80% 100%, 0px 100%, 0px 40%)',
                    }}
                ></div>
                <div className='absolute top-0 left-0 w-full h-full cursor-pointer flex items-center justify-center font-bold font-tech-shark text-[15px] px-3 border border-solid borderr-zinc-50'
                style={{
                    backgroundImage:'url(https://i.pinimg.com/564x/9e/73/d3/9e73d35a1fddcfcac26336e995ff9b4c.jpg)',
                    backgroundRepeat:'repeat',
                    backgroundPosition:'center',
                    backgroundSize:'contain',
                    clipPath: 'polygon(21% 1%, 99.5% 1px, 99.5% 59%, 79% 99%, 1px 99%, 1px 41%)'
                }}
                onClick={() => navigate(link)}
                >
                    See all
                </div>
            </div>
        </div>
      <div className='slider-container w-full h-auto flex justify-center'>
          <Slider className='w-full sm:w-[99%] lg:w-[95%] flex justify-around ' ref={sliderRef} {...settings} >
              {data?.map((d: any) => <Product_Layout_01 data={d} key={`${k}-${d.idProduct}`} name={k}/>)}
          </Slider>
      </div>
  </div>
}

export default Home_layout_01