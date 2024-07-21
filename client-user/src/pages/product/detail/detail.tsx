import UiDetail from './ui'
import { useParams } from 'react-router-dom'

const DetailProduct = () => {
  const params = useParams()
  return <div className="font-[sans-serif] bg-white">
    <UiDetail nameType={params.nameType!} idProduct={Number(params.idProduct)} />
  </div>
}

export default DetailProduct