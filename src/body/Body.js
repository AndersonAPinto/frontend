import React, { useEffect, useState } from 'react';
import '../body/body.css';
import api from '../services/api';


function Body() {
    const [siglas, setSiglas] = useState([]);
    const [selectedSigla, setSelectedSigla] = useState('');
    const [potencValue, setpotencValue] = useState('');
    const [teste, setteste] = useState(null);
    const [InputActived, setInputActived] = useState(false);


    useEffect(() => {
        async function getAllSiglas() {
            try {
                const response = await api.get('/findData');
                setSiglas(response.data);
                console.log("Dados do back", response)
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        }
        getAllSiglas()
    }, []);

    useEffect(() => {
        const sendToBackend = async () => {
            if (potencValue && !isNaN(potencValue)) {
                try {
                    const response = await api.post('/receive', { potencia: potencValue });
                    setteste(response.data);
                } catch (error) {
                    console.log("Erro ao enviar o valor de potencia ao Backend", error);
                }
            }
        };
        sendToBackend();
    }, [potencValue]);

    const returnSigla = (sigla) => {
        setSelectedSigla(sigla.ColSigla);
        setInputActived(true);
    };
    return (
        <div className="container">
            <h1>Custo de Recarga de Veículos Elétricos</h1>
            <h3>Escolha a distribuidora de Luz:</h3>
            <div className="scroll_horizontal">
                {siglas.map((data, index) => (
                    <div key={index} style={{ marginRight: '10px' }} onClick={() => returnSigla(data)} >
                        <h4>{data.ColSigla}</h4>
                    </div>
                ))}
            </div>
            <div><h2>{selectedSigla}</h2></div>
            <div className='navInput'>
                <strong>Digite a Potência da Bateria</strong>
            </div>
            <div>
                <input
                    value={potencValue}
                    onChange={(e) => setpotencValue(parseFloat(e.target.value))}
                    placeholder='Valor em KWh'
                    disabled={!InputActived} />
                    {teste && teste.map((item, index) =>(
                        item.ColSigla === selectedSigla && <p className='paragraf' key={index}>Custo de Recarga: <h1>R$ {item.Custo_Recarga_total_R$}</h1></p>
                    ))}
            </div>
        </div>
    );
};

export default Body;