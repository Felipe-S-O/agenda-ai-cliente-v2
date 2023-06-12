import { db } from "../config/Firbase";
import { collection, addDoc, query, where, onSnapshot} from "firebase/firestore";


export async function salvarTarefa(dados, idEmpresaAtual) {
    try {
        await addDoc(collection(db, 'tarefa:'+idEmpresaAtual), dados)
        return 'ok'
    } catch (error) {
        console.log('Erro add Horario: ', error)
        return 'erro'
    }
}

export async function pegarHorarioTempoReal(setHorario, dia, idEmpresaAtual) {
    try {
        const q = query(collection(db, 'horario:'+idEmpresaAtual), where("dia", "==", dia));
        onSnapshot(q, (querySnapshot) => {
            const horarios = [];
            querySnapshot.forEach((doc) => {
                horarios.push({ id: doc.id, ...doc.data() });
            });
            setHorario(horarios)
        });
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function pegarTarefaTempoReal(setTarefa, fData, idEmpresaAtual) {
    try {
        const ref = query(collection(db, 'tarefa:'+idEmpresaAtual), where("data", "==", fData))
        onSnapshot(ref, (querySnapshot) => {
            const tarefas = []
            querySnapshot.forEach((doc) => {
                tarefas.push({ id: doc.id, ...doc.data() })
            })
            setTarefa(tarefas)
        });

    } catch (error) {
        console.log(error)
        return []
    }
}
export async function pegarEmpresaTempoReal(setEmpresa) {
    try {
        const ref = query(collection(db, 'empresa'))
        onSnapshot(ref, (querySnapshot) => {
            const empresas = []
            querySnapshot.forEach((doc) => {
                empresas.push({ id: doc.id, ...doc.data() })
            })
            setEmpresa(empresas)           
        });

    } catch (error) {
        console.log(error)
        return []
    }
}

