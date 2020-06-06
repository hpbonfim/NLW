import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import './styles.css';
import UFs from './uf.json'
import { Link, useHistory } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet'
import API from '../../services/api'
import axios from 'axios';
import Dropzone from '../../components/Dropzone';

interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

interface SanitizeMapClickedResponse {
    uf: string;
    localidade: string
}


const CreatePoint = () => {
    const history = useHistory(); // RETORNAR AO INICIO

    /* ITENS */
    const [items, setItems] = useState<Item[]>([]); // array ou objeto tem que ser definido o tipo da variável
    useEffect(() => {
        // useEffect CARREGA COMPONENTES APENAS UMA VEZ, LIMITADO PELO RECARREGAMENTO (se o array estiver vazio)
        API.get('items').then(response => {
            setItems(response.data);
        });

    }, []);
    /* --- */


    /* IBGE UF */
    const [ufs, setUfs] = useState<string[]>([]);
    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => {
                setUfs(response.data.map(uf => uf.sigla));
            })
    }, [])
    /* --- */


    /* IBGE CIDADE */
    const [selectedUf, setSelectedUfs] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [cities, setCities] = useState<string[]>([]);

    useEffect(() => {
        // useEffect CARREGA COMPONENTES APENAS UMA VEZ, E VALOR É ALTERADO QUANDO MUDAR O VALOR DO ARRAY
        if (selectedUf === '0') {
            return
        }
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
            .then(response => {
                setCities(response.data.map(city => city.nome))
            })
    }, [selectedUf])

    useEffect(() => {
        axios.get(`https://nominatim.openstreetmap.org/search?format=json&state=${selectedUf}&city=${selectedCity}`)
            .then(response => {
                if (selectedCity !== "0" && selectedUf !== "0") {
                    const { data } = response
                    setSelectedPosition([data[0].lat, data[0].lon])
                }
                else {
                    return -1;
                }
            })
            .catch((err) => {
                console.error(err)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCity])
    /* --- */


    /* MAP */
    const [zoomIn, setZoomIn] = useState<number>(2); // SELECT POSITION ON CLICK MAP
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]); // SELECT POSITION ON CLICK MAP
    const [initPosition, setInitPosition] = useState<[number, number]>([0, 0]); // SELECT POSITION ON INIT MAP

    useEffect(() => {
        if (!navigator.geolocation) {
            const [latitude, longitude] = selectedPosition;
            setInitPosition([latitude, longitude])
        } else {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                setInitPosition([latitude, longitude])
            })

        }

    }, [selectedPosition, initPosition])

    useEffect(() => {
        const [latitude, longitude] = selectedPosition;
        axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then(async response => {
                const { data } = response
                // VERIFICA SE NÃO É DEFAULT VALUES
                if (latitude !== 0 && longitude !== 0) {
                    try {
                        if (data === undefined) {
                            throw new Error("no data received")
                        }

                        if (data.address.country_code !== "br") {
                            return (
                                alert("Selecione somente estados Brasileiros"),
                                setSelectedPosition([0, 0]),
                                setSelectedUfs("0"),
                                setSelectedCity("0")
                            )
                        } else
                            if (data.address.postcode != null || undefined) {
                                const postcode = response.data.address.postcode;
                                const sanitizedCEP = postcode.split('-').join("");

                                await axios.get<SanitizeMapClickedResponse>(`https://viacep.com.br/ws/${sanitizedCEP}/json`)
                                    .then(async res => {
                                        const { uf, localidade } = res.data
                                        return (
                                            setSelectedUfs(uf),
                                            setSelectedCity(localidade),
                                            setZoomIn(11)
                                        )
                                    })
                            } else
                                if (data.address.state != null || undefined) {
                                    const { state, city_district, city, village, town } = data.address;

                                    UFs.UF
                                        .filter(info => info.nome === state)
                                        .map(filtered_uf => {
                                            return setSelectedUfs(filtered_uf.sigla)
                                        })

                                    cities
                                        .filter(info =>
                                            city === info ||
                                            town === info ||
                                            village === info ||
                                            city_district === info
                                        )
                                        .map(filtered_city => {
                                            return (
                                                setSelectedCity(filtered_city),
                                                setZoomIn(11)
                                            )
                                        })
                                } else {
                                    throw new Error("invalid data")
                                }
                    }
                    catch (err) {
                        return (
                            alert("Selecione somente estados Brasileiros"),
                            setSelectedPosition([0, 0]),
                            setSelectedUfs("0"),
                            setSelectedCity("0"),
                            setZoomIn(0)
                        )
                    }
                } else {
                    return -1;
                }
            })
            .catch((err) => {
                console.error(err)
            })
    }, [selectedPosition, cities, zoomIn])
    /* --- */

    /* INPUTS */
    const [inputData, setInputData] = useState({
        name: "",
        email: "",
        whatsapp: ""
    });

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target

        setInputData({ ...inputData, [name]: value })
    }

    /* MAP */
    function handleMapClick(event: LeafletMouseEvent) {
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ])
        setZoomIn(18)
    }

    /* SELECTS */
    const [selectedItems, setSelectedItems] = useState<number[]>([])
    function handleSelectItem(id: number) {
        const alreadySelected = selectedItems.findIndex(item => item === id)

        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id)
            setSelectedItems(filteredItems)
        } else {
            setSelectedItems([...selectedItems, id])
        }
    }

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        setSelectedUfs(event.target.value)
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        setSelectedCity(event.target.value)
    }
    /* --- */

    /* FILES  */
    const [selectedFile, setSelectedFile] = useState<File>();
    /* --- */


    /* SUBMIT */
    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        console.log(selectedFile)

        const { name, email, whatsapp } = inputData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;
        const items = selectedItems;
        const data = new FormData()
        data.append("name", name)
        data.append("email", email)
        data.append("whatsapp", whatsapp)
        data.append("uf", uf)
        data.append("city", city)
        data.append("latitude", String(latitude))
        data.append("longitude", String(longitude))
        data.append("items", items.join(','))

        if(selectedFile) {
            data.append("image", selectedFile)
        }

        await API.post('points', data)
        alert('Criado com sucesso')
        history.push('/')
    }

    /* --- */

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />

                <Link to="/">
                    <FiArrowLeft />
        Voltar para home
        </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>
                    Cadastro do <br /> Ponto de Coleta
        </h1>
                <Dropzone onFileUploaded={setSelectedFile} />
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input type="text" name="name" id="name" onChange={handleInputChange} />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" name="email" id="email" onChange={handleInputChange} />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">WhatsApp</label>
                            <input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange} />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>
                </fieldset>

                <Map center={selectedPosition} zoom={zoomIn} onClick={handleMapClick}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {selectedPosition[0] !== 0 && (
                        <Marker position={selectedPosition} />
                    )}
                </Map>

                <div className="field-group">
                    <div className="field">
                        <label htmlFor="uf">Estado (UF)</label>
                        <select name="uf" id="uf" value={selectedUf} onChange={handleSelectUf}>
                            <option value="0">Selecione uma UF</option>
                            {ufs.map(uf => (
                                <option key={uf} value={uf}>{uf}</option>
                            ))}
                        </select>
                    </div>
                    <div className="field">
                        <label htmlFor="city">Cidade</label>
                        <select name="city" id="city" value={selectedCity} onChange={handleSelectCity}>
                            <option value="0">Selecione uma Cidade</option>
                            {cities.map(city => (
                                <option key={city} value={city}>{city} </option>
                            ))}
                        </select>
                        <div>
                            {/*
                          <datalist id="city" onChange={handleSelectCity}>
                            <option value="0">Selecione uma Cidade</option>
                            {cities.map(city => (
                                <option key={city} value={city}>{city} </option>
                            ))}
                        </datalist>
                         */}
                        </div>


                    </div>
                </div>


                <fieldset>
                    <legend>
                        <h2>Ítens de Coleta</h2>
                        <span>Selecioe um ou mais ítens abaixo</span>
                    </legend>
                    <ul className="items-grid">
                        {items.map(item => (
                            <li
                                key={item.id}
                                onClick={() => handleSelectItem(item.id)}
                                className={selectedItems.includes(item.id) ? 'selected' : ''}
                            >
                                <img src={item.image_url} alt={item.title} />
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </fieldset>

                <button type="submit">Cadastrar ponto de Coleta</button>
            </form>
        </div>
    )
}

export default CreatePoint;