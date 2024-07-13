import { useContext, useEffect, useState } from "react"
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
/* import { createEvent, deleteEvent, editEvent } from "~/api/product"; */
import { CiTrash } from "react-icons/ci";
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
/* import EventDetail from "~/common/detail/detailEvent"; */
import { StateContext } from "../../context/state";
import { formatDate } from "../../utils/utils";
import { productStore } from "../../store/product";
import { GetToken } from "../../utils/token";
import { createEvent, deleteEvent, updateEvent } from "../../api/product";

const Event = () => {
  const { isDark, sale, setSale } = useContext(StateContext);
  const [idEdit, setIdEdit] = useState(0);
  const [formValue, setFormValue] = useState<any>({ title: '', start_date: '', end_date: '' })
  const [addForm, setAddForm] = useState(false);
  const [detailEvent, setDetailEvent] = useState(false)
  const [idDetail, setIdDetail] = useState(0)
  const editEventSale = async () => {
    const resultObj = sale.filter((f: any) => f.idSale === idEdit).map((s: any) => ({
      title: s.title,
      start_date: formatDate(s.start_date),
      end_date: formatDate(s.end_date)
    }))
    const keyChange = Object.keys(formValue).filter((e: any) => formValue[e] !== "").filter((f: any) => formValue[f] !== resultObj[0][f])


    if (keyChange.length === 0) {
      setIdEdit(0)
      setFormValue({ title: '', start_date: '', end_date: '' })
      return
    }
    const keyUpdate = keyChange.reduce((acc, key) => {
      return { ...acc, [key]: formValue[key] };
    }, {});
    console.log(keyUpdate)
    console.log('Data event', resultObj)
    console.log('Form value', formValue)
    console.log('Key', keyChange)
    const dataUpdate = {
      idSale: idEdit,
      sale: [keyUpdate]
    }
    const token = await GetToken()
    /* ????????????????????????????????????? */
    updateEvent(dataUpdate, token).then(res => {
      if (res.status === 200) {
        const currentData = sale
        setSale(currentData.map((e: any) => {
          return e.idSale === idEdit ? { ...e, ...keyUpdate } : { ...e }
        }
        ))

/* Convert date from dd/mm/yyy to yyyy-mm-dd */
const Event = () => {
  const { sale, setSale } = useContext(StateContext);
  const [idEdit, setIdEdit] = useState(0);
  const [formValue, setFormValue] = useState({ title: '', start_date: '', end_date: '' })
  const [addForm, setAddForm] = useState(false);
  const [detailEvent, setDetailEvent] = useState(false)
  const [idDetail, setIdDetail] = useState(0)
  const editEventSale = () => {
    /* const resultObj = sale.filter(f => f.idSale === idEdit)
    const validateForm = Object.keys(formValue).every(e => formValue[e] === "")
    const checkForm = resultObj.flatMap(e => e.title === formValue.title && e.startDate === formValue.startDate && e.endDate === formValue.endDate)
    if (validateForm || checkForm[0]) {
      setIdEdit(0)
      setFormValue({ title: '', startDate: '', endDate: '' })
      return
    }
    const data = {
      idSale: idEdit,
      title: formValue.title !== "" ? formValue.title : resultObj[0].title,
      startDate: formValue.startDate !== "" ? formatDate(formValue.startDate) : formatDate(resultObj[0].startDate),
      endDate: formValue.endDate !== "" ? formatDate(formValue.endDate) : formatDate(resultObj[0].endDate),
    }
    editEvent(data).then(res => {
      if (res.status === 200) {
        setSale(sale.map(e => {
          return e.idSale !== idEdit ? { ...e } : ({
            ...e,
            title: formValue.title !== "" ? formValue.title : resultObj[0].title,
            startDate: formValue.startDate !== "" ? formValue.startDate : resultObj[0].startDate,
            endDate: formValue.endDate !== "" ? formValue.endDate : resultObj[0].endDate,
          })
        }))
        setIdEdit(0)
        setFormValue({ title: '', startDate: '', endDate: '' })

      }
      alert(res.message)
    })
  }
  const delEvent = async (idSale: number) => {
    const token = await GetToken()
    deleteEvent(idSale, token).then(res => {
      if (res.status === 200) {
        setSale(sale.filter((f: any) => f.idSale !== idSale))
      }
      alert(res.message)
    })
  }
  return <div className={`event-detail relative w-full h-auto min-h-[95.5vh] flex flex-wrap justify-center content-start lg:justify-between ${isDark ? "bg-[#3d3d3d]" : "bg-[#F5F5F5]"} px-8`}>
    <h1 className={`w-full h-[30px] text-[30px] font-bold ${isDark ? "text-white" : "text-black"} text-center my-8`}>Event management</h1>
    <button onClick={() => { setAddForm(!addForm) }} className="w-[150px] h-[30px] bg-green-500 rounded-lg my-8 text-white font-bold">Add new event</button>

    <div className="tbHead w-full h-[30px] flex flex-wrap justify-around border bg-zinc-800 p-2 my-2 rounded-md">
      <div className="tbBody w-[15%] h-full flex items-center justify-center  text-[20px] text-white font-semibold">Id sale event</div>
      <div className="tbBody w-2/5 h-full flex items-center justify-center  text-[20px] text-white font-semibold">Title</div>
      <div className="tbBody w-[15%] h-full flex items-center justify-center  text-[20px] text-white font-semibold">Start date</div>
      <div className="tbBody w-[15%] h-full flex items-center justify-center  text-[20px] text-white font-semibold">End date</div>
      <div className="tbBody w-[15%] h-full flex items-center justify-center text-white font-semibold">Action</div>
    </div>
    {sale !== null && sale.map((s: any) => <div className={`tbHead w-full h-[50px] flex flex-wrap justify-around 
      ${isDark ? "text-white" : "text-black"} border-b border-black border-solid shadow-2xl py-1`}>
      <div className="tbBody w-[15%] h-full flex items-center justify-center font-semibold">{s.idSale}</div>
      <div className="tbBody w-2/5 h-full flex items-center justify-center font-semibold">
    }) */
  }
  const delEvent = (idSale: number) => {
    /* deleteEvent(idSale).then(res => {
      if (res.status === 200) {
        setSale(sale.filter(f => f.idSale !== idSale))
      }
      alert(res.message)
    }) */
  }
  return <div className="event-detail relative w-full h-auto flex flex-wrap justify-center content-start lg:justify-between px-8 my-10">
    <h1 className="w-full h-[30px] text-[30px] font-bold text-white text-center my-8">Event management</h1>
    <button onClick={() => { setAddForm(!addForm) }} className="w-[150px] h-[30px] bg-green-500 rounded-lg my-8 text-white font-bold">Add new event</button>

    <div className="tbHead w-full h-[30px] flex flex-wrap justify-around border bg-slate-500 border-black border-solid">
      <div className="tbBody w-[15%] h-full flex items-center justify-center border-r bg-slate-500 border-black border-solid text-white font-semibold">Id sale event</div>
      <div className="tbBody w-2/5 h-full flex items-center justify-center border-r bg-slate-500 border-black border-solid text-white font-semibold">Title</div>
      <div className="tbBody w-[15%] h-full flex items-center justify-center border-r bg-slate-500 border-black border-solid text-white font-semibold">Start date</div>
      <div className="tbBody w-[15%] h-full flex items-center justify-center border-r bg-slate-500 border-black border-solid text-white font-semibold">End date</div>
      <div className="tbBody w-[15%] h-full flex items-center justify-center text-white font-semibold">Action</div>
    </div>
    {sale !== null && sale.map((s: any) => <div className="tbHead w-full h-[50px] flex flex-wrap justify-around border-b border-l border-r bg-slate-500 border-black border-solid">
      <div className="tbBody w-[15%] h-full flex items-center justify-center text-white font-semibold">{s.idSale}</div>
      <div className="tbBody w-2/5 h-full flex items-center justify-center text-white font-semibold">
        {idEdit === s.idSale ? <input type="text" className="w-4/5 h-[90%] border-slate-500 rounded-lg px-2 border-solid border bg-transparent outline-none"
          onChange={(e) => { setFormValue({ ...formValue, title: e.target.value ? e.target.value : s.title }) }}
          placeholder={s.title} /> : s.title}
      </div>
      <div className="tbBody w-[15%] h-full flex items-center justify-center font-semibold">
        {idEdit === s.idSale ? <input type="text" className="w-4/5 h-[90%] border-slate-500 rounded-lg px-2 border-solid border bg-transparent outline-none"
          onChange={(e) => { setFormValue({ ...formValue, start_date: e.target.value ? e.target.value : formatDate(s.start_date) }) }}
          placeholder={formatDate(s.start_date)} /> : formatDate(s.start_date)}</div>
      <div className="tbBody w-[15%] h-full flex items-center justify-center font-semibold">
      <div className="tbBody w-[15%] h-full flex items-center justify-center text-white font-semibold">
        {idEdit === s.idSale ? <input type="text" className="w-4/5 h-[90%] border-slate-500 rounded-lg px-2 border-solid border bg-transparent outline-none"
          onChange={(e) => { setFormValue({ ...formValue, start_date: e.target.value ? e.target.value : formatDate(s.start_date) }) }}
          placeholder={formatDate(s.start_date)} /> : formatDate(s.start_date)}</div>
      <div className="tbBody w-[15%] h-full flex items-center justify-center text-white font-semibold">
        {idEdit === s.idSale ? <input type="text" className="w-4/5 h-[90%] border-slate-500 rounded-lg px-2 border-solid border bg-transparent outline-none"
          onChange={(e) => { setFormValue({ ...formValue, end_date: e.target.value ? e.target.value : formatDate(s.end_date) }) }}
          placeholder={formatDate(s.end_date)} /> : formatDate(s.end_date)}</div>
      <div className="tbBody w-[15%] h-full flex items-center justify-evenly text-white font-semibold">
        {idEdit !== s.idSale && <button onClick={() => { setDetailEvent(!detailEvent); setIdDetail(s.idSale) }} className="w-[50px] h-[20px] rounded-lg flex justify-center items-center bg-blue-500 "><FaEye /></button>}
        {idEdit !== s.idSale && <button onClick={() => { setIdEdit(s.idSale) }} className="w-[50px] h-[20px] rounded-lg flex justify-center items-center bg-green-500 "><FaEdit /></button>}
        {idEdit !== s.idSale && <button onClick={() => { delEvent(s.idSale) }} className="w-[50px] h-[20px] rounded-lg flex justify-center items-center bg-red-500 "><FaTrash /></button>}
        {idEdit === s.idSale && <button onClick={() => { editEventSale() }} className="w-[50px] h-[20px] rounded-lg flex justify-center items-center bg-green-500 ">Save</button>}
        {idEdit === s.idSale && <button onClick={() => { setIdEdit(0); setFormValue({ title: '', start_date: '', end_date: '' }) }} className="w-[50px] h-[20px] rounded-lg flex justify-center items-center bg-red-500 ">Close</button>}
      </div>
    </div>)}
    {addForm && <FormAddEvent props={{ setAddForm }} />}
    {/* {detailEvent && <EventDetail props={{ idDetail, setDetailEvent }} />} */}
  </div>
}
const FormAddEvent = ({ props }: { props: any }) => {
  const { sale, setSale } = useContext(StateContext)
  /* const { sale, setSale } = useContext(StateContext) */
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
  const onSubmit = (data: any) => {
    const result = {
      title: data.title,
      start_date: data.start,
      end_date: data.end,
      detail: dataSale.map((e: any) => {
        return {
          discount: data[`percent-${e}`],
          listProduct: data[`select${e}`].map((p: any) => p.value)
        }
      })
    }
    console.log(result)
    console.log(dataSale)
    const token = await GetToken()
    createEvent(result, token).then((res: any) => {
      if (res.status === 201) {
        alert(res.message)
        const lastData = {
          idSale: res.data.id,
          title: data.title,
          start_date: data.start.split('-').reverse().join("/"),
          end_date: data.end.split('-').reverse().join("/")
    /* createEvent(result).then((res: any) => {
      if (res.status === 201) {
        alert(res.data.message)
        const lastData = {
          idSale: res.data.id,
          title: data.title,
          startDate: data.start.split('-').reverse().join("/"),
          endDate: data.end.split('-').reverse().join("/")
        }
        setSale([...sale, lastData])
        props.setAddForm(false)
      } else {
        alert(res.message)
      }
    })
    }) */
  }
  return <div className="t-detailItem w-full h-auto flex flex-wrap items-center justify-start my-4">
    <div className="tbHead w-full h-[30px] flex flex-wrap justify-around bg-slate-500 border-l border-r border-t border-black border-solid">
      <div className="tbBody w-1/5 h-full flex items-center justify-center border-r bg-slate-500 border-black border-solid text-white font-semibold">Title</div>
      <div className="tbBody w-[15%] h-full flex items-center justify-center border-r bg-slate-500 border-black border-solid text-white font-semibold">Start date</div>
      <div className="tbBody w-[15%] h-full flex items-center justify-center border-r bg-slate-500 border-black border-solid text-white font-semibold">End date</div>
      <div className="tbBody w-2/4 h-full flex items-center justify-center bg-slate-500 border-black border-solid text-white font-semibold">Detail</div>
    </div>
    <div className="tbContent w-full h-auto min-h-[35px] flex flex-wrap items-center justify-around bg-slate-500 border border-black border-solid">
      <form className="w-2/4 h-auto flex flex-wrap">
        <div className="tbBody w-2/5 h-full flex items-center justify-center border-r bg-slate-500 border-black border-solid text-white font-semibold">
          <input {...register(`title`, { required: true })} type="text" className="w-[95%] h-4/5 bg-transparent rounded-lg outline-none" placeholder="Title" />
        </div>
        <div className="tbBody w-[30%] h-full flex items-center justify-center border-r bg-slate-500 border-black border-solid text-white font-semibold">
          <input {...register(`start`, { required: true })} type="date" className="w-[95%] h-4/5 bg-transparent rounded-lg outline-none" placeholder="Date" />
        </div>
        <div className="tbBody w-[30%] h-full flex items-center justify-center border-r bg-slate-500 border-black border-solid text-white font-semibold">
          <input {...register(`end`, { required: true })} type="date" className="w-[95%] h-4/5 bg-transparent rounded-lg outline-none" placeholder="Date" />
        </div>
      </form>
      <div className="tbBody w-2/4 h-full flex flex-wrap items-center justify-start bg-slate-500 px-2 border-black border-solid text-white font-semibold">
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
export default Event