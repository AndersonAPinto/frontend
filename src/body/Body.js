import React, { useEffect, useState, useRef } from 'react';
import '../body/body.css';
import api from '../services/api';

function Body() {
    const [siglas, setSiglas] = useState([]);
    const [selectedSigla, setSelectedSigla] = useState('');
    const [potencValue, setpotencValue] = useState('');
    const [teste, setteste] = useState(null);
    const [InputActived, setInputActived] = useState(false);


    const scrollRef = useRef(null);
    const handleScrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft -= 150; // Ajuste este valor conforme necessário
        }
    };

    const handleScrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += 150; // Ajuste este valor conforme necessário
        }
    };

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
            <button className='scroll-left' onClick={handleScrollLeft}></button>
            <button className='scroll-right' onClick={handleScrollRight}></button>

            <div className="scroll_horizontal" ref={scrollRef}>
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
                    disabled={!InputActived} />
                    <p id='text-inf'>Valor em KWh</p>
                {teste && teste.map((item, index) => (
                    item.ColSigla === selectedSigla && <p className='paragraf' key={index}>Custo de Recarga: <h1>R$ {item.Custo_Recarga_total_R$}*</h1>
                        <p>*A alíquota do ICMS varia de acordo com cada estado, podendo ir de cerca de 18% a 35%</p>
                        <p>**A soma de PIS e COFINS geralmente fica em torno de 9% a 10%</p></p>

                ))}
            </div>

        </div>
    );
};

export default Body;