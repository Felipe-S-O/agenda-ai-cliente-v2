import { useEffect, useState } from "react";
import Entrada from "./Entrada";
import Botao from "./Botao";
import { pegarHorarioTempoReal, pegarTarefaTempoReal, salvarTarefa } from "../server/firestore";
import Swal from "sweetalert2";
import SelectHorario from "./SelectHorario";

export default function Formulario(props) {

    const [horario, setHorario] = useState([])
    const [tarefa, setTarefa] = useState([])
    const [horariosDisponevel, setHorariosDisponevel] = useState([])

    const [cliente, setCliente] = useState('')
    const [descricao, setDescricao] = useState('')
    const [telefone, setTelefone] = useState('')
    const [date, setDate] = useState('');

    const [horarioSelecionado, setHorarioSelecionado] = useState('');
    const [dataAtual, setDataAtual] = useState('');

    const [mensagemError, setMensagemError] = useState("");
    const [statusError, setStatusError] = useState("");

    useEffect(() => {
        let tempDate = new Date(date);
        let fdia = (tempDate.getDay() + 1);
        let fDate

        if ((tempDate.getMonth() + 1) < 9 && tempDate.getDate() < 9) {
            fDate = '0' + (tempDate.getDate() + 1) + '/0' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();

        } else if (tempDate.getDate() > 9 && (tempDate.getMonth() + 1) < 9) {
            fDate = (tempDate.getDate() + 1) + '/0' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();

        } else if (tempDate.getDate() < 9 && (tempDate.getMonth() + 1) > 9) {
            fDate = '0' + (tempDate.getDate() + 1) + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();

        } else {
            fDate = (tempDate.getDate() + 1) + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        }

        setDataAtual(fDate)
        pegarTarefaTempoReal(setTarefa, fDate, props.idEmpresaAtual)
        pegarHorarioTempoReal(setHorario, fdia, props.idEmpresaAtual)

    }, [date])


    useEffect(() => {
        const horarios = []
        const hrDisponevel = []
        let contador = 0
        console.log(tarefa)
        horario.forEach(function (horar) {
            if (tarefa.length > 1) {
                tarefa.forEach(function (tar) {
                    if (horar.id !== tar.idHorario) {
                        //ganbiara \o/ depois de 12 horas tentador                      
                        contador = (contador + 1)
                        console.log('id == ' + horar.id + " " + contador)
                        horarios.push({
                            dia: horar.dia,
                            disponivel: horar.disponivel,
                            hora: horar.hora,
                            id: horar.id,
                            minutos: horar.minutos,
                            contador: contador
                        })
                    }
                })
            } else if (tarefa.length == 1) {
                tarefa.forEach(function (tar) {
                    if (horar.id != tar.idHorario) {
                        //ganbiara \o/ depois de 12 horas tentador                   
                        horarios.push(horar)
                    }
                })
            }
            contador = 0
        })

        horarios.forEach(function (horas) {
            if (tarefa.length > horas.contador) {
                contador = 1
            }
            if ((horas.contador == tarefa.length) && (tarefa.length > 1) && (contador == 1)) {
                //ganbiara \o/ depois de 12 horas tentador
                hrDisponevel.push(horas)
            }
        })

        {
            hrDisponevel.length == 0 && (contador == 0) ?
                setHorariosDisponevel(horarios)
                :
                setHorariosDisponevel(hrDisponevel)
        }

    }, [tarefa])


    function salvarAgendamento() {
        if (date == '') {
            setMensagemError('O campo data é obrigatório!');
            setStatusError('data')
        } else if (cliente == '') {
            setMensagemError('O nome é obrigatório!');
            setStatusError('cliente')
        } else if (telefone == '') {
            setMensagemError('O telefone é obrigatório!');
            setStatusError('telefone')
        } else if (horarioSelecionado == '' || horarioSelecionado == 'vazio') {
            setMensagemError('O horario é obrigatório!');
            setStatusError('horario')
        } else {
            horario.forEach(function (hr) {
                if (hr.id == horarioSelecionado) {
                    salvar(hr.hora, hr.minutos)
                }
            })
        }
    }

    async function salvar(hora, minutos) {

        let resultado

        resultado = await salvarTarefa({
            cliente: cliente,
            descricao: descricao,
            hora: hora,
            minutos: minutos,
            telefone: telefone,
            idHorario: horarioSelecionado,
            data: dataAtual
        }, props.idEmpresaAtual)

        if (resultado === 'Error') {
            setStatusError('firebase')
            setMensagemError('Erro ao tentar salvar tarefa!');
        }

        Swal.fire(
            'Concluído',
            'Horario agendado com Sucesso! 😍',
            'success'
        )

        limpa()
    }

    function limpa() {
        setCliente('')
        setDate('')
        setDescricao('')
        setTelefone('')
        setHorarioSelecionado('')
        setStatusError('')
    }


    return (
        <div>
            <Entrada tipo="date" texto="Seleicione a Data*" valor={date} valorMudou={setDate}
                mensagemError={statusError == 'data' ? mensagemError : ''}
            />
            <Entrada tipo="text" texto="Digite seu Nome*" valor={cliente} valorMudou={setCliente}
                mensagemError={statusError == 'cliente' ? mensagemError : ''}
            />
            <Entrada tipo="text" texto="Descrição" valor={descricao} valorMudou={setDescricao} mensagemError={''}
            />
            <Entrada tipo="number" texto="Telefone*" valor={telefone} valorMudou={setTelefone}
                mensagemError={statusError == 'telefone' ? mensagemError : ''}
            />
            <SelectHorario
                texto="Selecione o Horario*"
                horariosDisponevel={horariosDisponevel}
                tarefa={tarefa}
                horario={horario}
                valorMudou={setHorarioSelecionado}
                statusError={statusError}
                mensagemError={mensagemError}
            />

            <Botao onClick={() => salvarAgendamento()}
                className="bg-gradient-to-r from-pink-700 to-pink-500 mr-2 hover:to-pink-700">
                Agendar
            </Botao>

        </div>
    )
}