import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import { FiPlus } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import { ThemeContext } from "styled-components";
import { useHistory } from "react-router-dom";
import api from "../services/api";

import {
  Container,
  Form,
  Fieldset,
  InputBlock,
  ButtonSelect,
  ConfirmButton,
  ImagesContainer,
  ImagePreview,
} from "../styles/pages/create-orphanage";

interface Image {
  url: string;
  name: string;
}

export default function CreateOrphanage() {
  const history = useHistory();
  const { title } = useContext(ThemeContext);
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [opening_hours, setOpeningHours] = useState("");
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<Image[]>([]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat: latitude, lng: longitude } = event.latlng;

    setPosition({
      latitude,
      longitude,
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append("name", name);
    data.append("about", about);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("instructions", instructions);
    data.append("opening_hours", opening_hours);
    data.append("open_on_weekends", String(open_on_weekends));

    images.forEach((image) => {
      data.append("images", image);
    });

    await api.post("orphanages", data);

    console.log({
      name,
      about,
      instructions,
      opening_hours,
      latitude,
      longitude,
      open_on_weekends,
    });

    alert("Cadastro realizado com sucesso!");
    history.push("/app");
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;

    const selectedImages = Array.from(event.target.files);

    setImages([...images, ...selectedImages]);

    const selectedImagesPreview = selectedImages.map((image) => {
      console.log(image);
      return { url: URL.createObjectURL(image), name: image.name };
    });

    setPreviewImages([...previewImages, ...selectedImagesPreview]);
  }

  function handleDeleteImages(image: any) {
    console.log(image);

    console.log("---> IMAGES");
    const newImages = images.filter(
      (savedImage) => savedImage.name !== image.name
    );

    console.log(newImages);

    console.log("---> PREVIEW IMAGES");
    const newPreviewImages = previewImages.filter(
      (previewImage) => previewImage.url !== image.url
    );

    setPreviewImages(newPreviewImages);
    setImages(newImages);
  }

  return (
    <Container>
      <Sidebar />

      <main>
        <Form onSubmit={handleSubmit}>
          <Fieldset>
            <legend>Dados</legend>

            <Map
              onClick={handleMapClick}
              center={[-23.6663235, -46.7725582]}
              style={{ width: "100%", height: 280 }}
              zoom={10}
            >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {/*
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/${title}-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              */}

              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <InputBlock>
              <label htmlFor="name">Nome</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
              />
            </InputBlock>

            <InputBlock>
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                id="name"
                maxLength={300}
              />
            </InputBlock>

            <InputBlock>
              <label htmlFor="images">Fotos</label>

              <ImagesContainer>
                {previewImages.map((image) => {
                  return (
                    <ImagePreview key={image.url}>
                      <img src={image.url} alt={name} />
                      <button
                        type="button"
                        onClick={() => handleDeleteImages(image)}
                      >
                        <ImCross size={20} />
                      </button>
                    </ImagePreview>
                  );
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} />
                </label>
              </ImagesContainer>
              <input
                multiple
                onChange={handleSelectImages}
                type="file"
                id="image[]"
              />
            </InputBlock>
          </Fieldset>

          <Fieldset>
            <legend>Visitação</legend>

            <InputBlock>
              <label htmlFor="instructions">Instruções</label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                id="instructions"
              />
            </InputBlock>

            <InputBlock>
              <label htmlFor="opening_hours">Horário de Visita</label>
              <input
                value={opening_hours}
                onChange={(e) => setOpeningHours(e.target.value)}
                id="opening_hours"
              />
            </InputBlock>

            <InputBlock>
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <ButtonSelect>
                <button
                  onClick={() => setOpenOnWeekends(true)}
                  type="button"
                  className={open_on_weekends ? "active" : ""}
                >
                  Sim
                </button>
                <button
                  onClick={() => setOpenOnWeekends(false)}
                  type="button"
                  className={!open_on_weekends ? "active" : ""}
                >
                  Não
                </button>
              </ButtonSelect>
            </InputBlock>
          </Fieldset>

          <ConfirmButton type="submit">Confirmar</ConfirmButton>
        </Form>
      </main>
    </Container>
  );
}
