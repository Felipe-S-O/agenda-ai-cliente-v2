import { useEffect, useState } from "react";
import Formulario from "../../components/Formulario";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { pegarEmpresaTempoReal } from "../../server/firestore";

export default function Agenda() {

  const [empresa, setEmpresa] = useState([])
  const [nomeEmpresaAtual, setNomeEmpresaAtua] = useState('')
  const [idEmpresaAtual, setIdEmpresaAtua] = useState('')

  const router = useRouter()
  const empresaNome = router.query.empresaId

  useEffect(() => {
    pegarEmpresaTempoReal(setEmpresa)

  }, [])

  useEffect(() => {
    empresa.forEach(function (empresa) {
      if (empresa.nome == empresaNome) {
        setIdEmpresaAtua(empresa.id)
        setNomeEmpresaAtua(empresa.nome)
      }
    })

    console.log(idEmpresaAtual)

  }, [empresa])

  return <>
    <div className="flex justify-center items-baseline py-4 ">
      {(empresaNome == nomeEmpresaAtual) ?
        <Layout >
          <Formulario idEmpresaAtual={idEmpresaAtual} />
        </Layout>
        :
        <div className=" flex flex-col  items-center w-96 mt-20">
          <img src="/pagina404.png" className=" mb-6 " />
          <h1>404 | Esta página não pôde ser encontrada!</h1>
        </div>
      }

    </div>
  </>
}