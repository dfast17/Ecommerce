import { useContext, useEffect, useRef, useState } from "react";
import { StateContext } from "../../context/stateContext";
const Slideshow = () => {
  const { product } = useContext(StateContext);
  const [index, setIndex] = useState(0);
  const [data, setData] = useState<any[] | null>(null);
  useEffect(() => {
    product && setData(product.filter((f: any) => f.type === "laptop")[0].data.filter((f: any) => f.view > 24))
  }, [product]);
  const timeoutRef = useRef<any | null>(null);
  const delay = 10000;

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      // Thêm class 'inactive' vào phần tử hiện tại
      const currentElement = document.querySelector(".slide.active");
      if (currentElement) {
        currentElement.classList.add("inactive");
      }

      // Chờ 1 giây trước khi chuyển class 'active'
      setTimeout(() => {
        data !== null &&
          setIndex((prevIndex) =>
            prevIndex === data.length - 1 ? 0 : prevIndex + 1
          );

        // Xóa class 'inactive' sau khi đã chuyển 'active'
        if (currentElement) {
          currentElement.classList.remove("inactive");
        }
      }, 1000);
    }, delay);

    return () => {
      resetTimeout();
    };
  }, [index, data]);
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      // Thêm class 'inactive' vào phần tử hiện tại
      const currentElement = document.querySelector(".slide.active");
      if (currentElement) {
        currentElement.classList.remove("active");
        currentElement.classList.add("inactive");
      }

      // Chờ 1 giây trước khi chuyển class 'active'
      setTimeout(() => {
        data !== null &&
          setIndex((prevIndex) =>
            prevIndex === data.length - 1 ? 0 : prevIndex + 1
          );

        // Xóa class 'inactive' sau khi đã chuyển 'active'
        if (currentElement) {
          currentElement.classList.remove("inactive");
        }
      }, 1000);
    }, delay);

    return () => {
      resetTimeout();
    };
  }, [index, data]);

  return (
    <div className="slideshow relative min-h-[600px] flex flex-col justify-between">
      <div className="absolute w-full h-auto">
        <div className="w-full h-[50px] bg-gradient-to-b from-white to-zinc-100"></div>
        <div className="w-full h-[50px] bg-gradient-to-b from-zinc-100 to-zinc-200"></div>
        <div className="w-full h-[200px] bg-gradient-to-b from-zinc-200 to-zinc-200"></div>
        <div className="w-full h-[200px] bg-gradient-to-b from-zinc-200 to-zinc-200"></div>
        <div className="w-full h-[50px] bg-gradient-to-b from-zinc-200 to-zinc-100"></div>
        <div className="w-full h-[50px] bg-gradient-to-b from-zinc-100 to-white"></div>
      </div>
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {data !== null &&
          data.map((items, s) => (
            <div
              className={`slide${index === s ? " active" : ""
                } inline-flex flex-col md:flex-row`}
              key={items.idProduct}
            >
              <div className="image w-full relative md:w-[35%] h-[30%] md:h-full">
                <img
                  src={items.imgProduct}
                  alt=""
                  className="imgProduct w-1/2 md:w-[500px] h-full md:h-[500px] object-contain flex justify-center items-center"
                />
              </div>
              <div className="content relative w-full md:w-2/5 h-full flex items-start justify-center">
                <div className="w-full h-full absolute top-0 left-0 backdrop-blur-sm bg-white bg-opacity-40">
                  <div className="bg-detail relative w-full h-full border-[3px] border-dashed border-gray-300">
                    <div className="absolute -top-[3px] -left-[3px] w-[32px] h-[32px] border-t-[3px] border-l-[3px] border-solid border-cyan-500"></div>
                    <div className="absolute -top-[3px] -right-[3px] w-[32px] h-[32px] border-t-[3px] border-r-[3px] border-solid border-cyan-500"></div>
                    <div className="absolute -bottom-[3px] -left-[3px] w-[32px] h-[32px] border-b-[3px] border-l-[3px] border-solid border-cyan-500"></div>
                    <div className="absolute -bottom-[3px] -right-[3px] w-[32px] h-[32px] border-b-[3px] border-r-[3px] border-solid border-cyan-500"></div>
                  </div>
                </div>
                <div className="items w-full lg:w-3/5 h-4/5 flex flex-col flex-wrap justify-center content-center">
                  <div className="title mt-6">
                    <span className="truncate flex items-center justify-center !text-zinc-900 !text-[30px] font-tech-shark font-semibold">
                      {items.nameProduct}
                    </span>
                  </div>
                  <div className="inf">
                    <div className="infDetail">
                      <p className="text-[17px] font-semibold !text-black cursor-pointer scale-100 hover:scale-105 transition-all">
                        Cpu: {items.detail.map((e: any) => e.cpu)}
                      </p>
                      <p className="text-[17px] font-semibold !text-black cursor-pointer scale-100 hover:scale-105 transition-all">
                        Display: {items.detail.map((e: any) => e.sizeInch.toFixed())}{" "}
                        inch - {items.detail.map((e: any) => e.resolution)}
                      </p>
                      <p className="text-[17px] font-semibold !text-black cursor-pointer scale-100 hover:scale-105 transition-all">
                        Ram: {items.detail.map((e: any) => e.capacity)}
                      </p>
                      <p className="text-[17px] font-semibold !text-black cursor-pointer scale-100 hover:scale-105 transition-all">
                        Hard drive:
                        {items.detail.map((e: any) => e.storage)}
                      </p>
                      <p className="text-[17px] font-semibold !text-black cursor-pointer scale-100 hover:scale-105 transition-all">
                        Os: {items.detail.map((e: any) => e.os)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="slideshowDots">
        {data !== null &&
          data.map((_, idx) => (
            <div onClick={() => {
              setIndex(idx);
            }} className="w-[60px] h-[40px] flex flex-wrap justify-center items-center -translate-y-10 mx-2 cursor-pointer">
              <img src={_.imgProduct} className={`w-full object-contain ${index === idx ? "border border-solid border-cyan-600 rounded-md" : ""} my-1`} />
              <div
                key={_.idProduct + _.nameProduct}
                className={`slideshowDot${index === idx ? " active" : ""}`}
              ></div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Slideshow;