export default function SelectHorario(props) {

    return (
        <div className=" flex flex-col">
            <label className="mb-1">
                {props.texto}
            </label>
            <select name="selectedFruit" onChange={e => props.valorMudou?.(e.target.value)} defaultValue="vazio" className={` border border-pink-500 rounded-lg
                        focus: outline-none bg-gray-200 px-4 py-2  focus:bg-white`}>
                <option key='vazio' value="vazio">-- : --</option>
                {props.tarefa.length == 0 ?
                    props.horario.map((horario) => (
                        <option  key={horario.id} value={horario.id}>{horario.hora + ":" + horario.minutos}</option>
                    )).sort(function (a, b) {
                        if (a.hora > b.hora) {
                            return 1;
                        }
                        if (a.hora < b.hora) {
                            return -1;
                        }
                        return 0;
                    })
                    :
                    props.horariosDisponevel.map((horario) => (
                        <option key={horario.id} value={horario.id}>{horario.hora + ":" + horario.minutos}</option>
                    )).sort(function (a, b) {
                        if (a.hora > b.hora) {
                            return 1;
                        }
                        if (a.hora < b.hora) {
                            return -1;
                        }
                        return 0;
                    })
                }
            </select>
            <label className="text-red-700 text-sm px-2">{props.statusError == 'horario' ? props.mensagemError : ''}</label>
        </div>
    );
}
