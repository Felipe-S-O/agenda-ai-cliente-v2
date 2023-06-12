interface EntradaProps {
    tipo?: 'text' | 'number' | 'date'
    texto: string
    valor: any
    somenteLeitura?: boolean
    valorMudou?: (valor: any) => void
    mensagemError: string
}

export default function Entrada(props: EntradaProps) {
    return (
        <div className=" flex flex-col">
            <label>
                {props.texto}
            </label>
            <input
                type={props.tipo ?? 'text'}
                value={props.valor}
                readOnly={props.somenteLeitura}
                onChange={e => props.valorMudou?.(e.target.value)}
                className={` border border-pink-500 rounded-lg
                        focus: outline-none bg-gray-200 px-4 py-2  focus:bg-white`}
                maxLength={props.texto == 'Titulo' ? 18 : 28}
            />
            <label className="text-red-700 text-sm px-2 mb-2">{props.mensagemError}</label>
        </div>
    )
}