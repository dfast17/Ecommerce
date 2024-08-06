import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StateContext } from "../../context/state";
import { productStore } from "../../store/product";
import { GetToken } from "../../utils/token";
import { createEvent } from "../../api/product";
import { CiTrash } from "react-icons/ci";
import Select from "react-select";

const FormAddEvent = ({ props }: { props: any }) => {
    const { sale, setSale } = useContext(StateContext)
    const { product } = productStore()
    const [dataSale, setDataSale] = useState<any>([1]);
    const { register, handleSubmit, control } = useForm();
    const [newData, setNewData] = useState<any>(null)
    useEffect(() => {
        product !== null && setNewData(product.map((e: any) => { return { value: e.idProduct, label: e.nameProduct, isDis: false } }))
    }, [product])
    const handleChange = (data: any) => {
        setNewData(newData?.map((e: any) => {
            return {
                ...e,
                isDis: data.map((d: any) => d.value).includes(e.value) ? !e.isDis : e.isDis
            }
        }))
    }
    const onSubmit = async (data: any) => {
        const result = {
            sale: {
                title: data.title,
                start_date: data.start,
                end_date: data.end,
            },
            detail: dataSale.map((e: any) => {
                return {
                    discount: Number(data[`percent-${e}`]),
                    idProduct: Number(data[`select${e}`].map((p: any) => p.value))
                }
            })
        }
        const token = await GetToken()
        createEvent(result, token).then((res: any) => {
            if (res.status === 201) {
                alert(res.message)
                const lastData = {
                    idSale: res.data.id,
                    title: data.title,
                    start_date: data.start.split('-').reverse().join("/"),
                    end_date: data.end.split('-').reverse().join("/")
                }
                setSale([...sale, lastData])
                props.setAddForm(false)
            } else {
                alert(res.message)
            }
        })
    }
    return <div className="t-detailItem w-full h-auto flex flex-wrap items-center justify-start my-4">
        <div className="tbHead w-full h-[30px] flex flex-wrap justify-around bg-zinc-100 border-l border-r border-t border-black border-solid">
            <div className="tbBody w-1/5 h-full flex items-center justify-center border-r bg-zinc-100 border-black border-solid text-black font-semibold">Title</div>
            <div className="tbBody w-[15%] h-full flex items-center justify-center border-r bg-zinc-100 border-black border-solid text-black font-semibold">Start date</div>
            <div className="tbBody w-[15%] h-full flex items-center justify-center border-r bg-zinc-100 border-black border-solid text-black font-semibold">End date</div>
            <div className="tbBody w-2/4 h-full flex items-center justify-center bg-zinc-100 border-black border-solid text-black font-semibold">Detail</div>
        </div>
        <div className="tbContent w-full h-auto min-h-[35px] flex flex-wrap items-center justify-around bg-zinc-100 border border-black border-solid">
            <form className="w-2/4 h-auto flex flex-wrap">
                <div className="tbBody w-2/5 h-full flex items-center justify-center border-r bg-zinc-100 border-black border-solid text-black font-semibold">
                    <input {...register(`title`, { required: true })} type="text" className="w-[95%] h-4/5 bg-transparent rounded-lg outline-none" placeholder="Title" />
                </div>
                <div className="tbBody w-[30%] h-full flex items-center justify-center border-r bg-zinc-10 border-black border-solid text-black font-semibold">
                    <input {...register(`start`, { required: true })} type="date" className="w-[95%] h-4/5 bg-transparent rounded-lg outline-none" placeholder="Date" />
                </div>
                <div className="tbBody w-[30%] h-full flex items-center justify-center border-r bg-zinc-10 border-black border-solid text-black font-semibold">
                    <input {...register(`end`, { required: true })} type="date" className="w-[95%] h-4/5 bg-transparent rounded-lg outline-none" placeholder="Date" />
                </div>
            </form>
            <div className="tbBody w-2/4 h-full flex flex-wrap items-center justify-start bg-zinc-100 px-2 border-black border-solid text-black font-semibold">
                <form className="w-full h-auto flex flex-wrap">
                    {dataSale.map((e: any) => (
                        <div key={e} className="w-[90%] flex items-center mr-4 my-2">
                            #{e} - <input {...register(`percent-${e}`, { required: true })} type="text" className="w-[30px] h-[30px] flex justify-center items-center rounded-lg bg-transparent border-solid border-slate-300 border outline-none mx-2 px-2" placeholder="%" />
                            {'=>'}
                            <Controller
                                name={`select${e}`}
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        className="w-4/5 rounded-lg bg-transparent text-black border-slate-400 border-solid border outline-none mx-2"
                                        options={newData?.filter((f: any) => !f.isDis)}
                                        isMulti
                                        onChange={(change: any) => {
                                            field.onChange(change)
                                            handleChange(change)
                                        }}
                                    />
                                )}
                            />
                            <div onClick={() => setDataSale(dataSale.filter((f: any) => f !== e))} className="w-[25px] h-[25px] flex items-center justify-center rounded-lg bg-red-500 cursor-pointer">
                                <CiTrash />
                            </div>
                        </div>
                    ))}
                </form>
                <div className="w-full h-[30px] flex items-center justify-center">
                    <button onClick={() => { setDataSale([...dataSale, dataSale.length + 1]) }} className="w-[150px] bg-green-500 rounded-lg">Add more</button>
                </div>
            </div>
        </div>
        <button onClick={() => { handleSubmit(onSubmit)() }} className="w-[150px] h-[30px] bg-green-500 rounded-lg my-8 text-white font-bold">Add event</button>
        <button onClick={() => { props.setAddForm(false) }} className="w-[150px] h-[30px] bg-red-500 rounded-lg my-8 text-white font-bold mx-2">Close</button>
    </div>
}
export default FormAddEvent