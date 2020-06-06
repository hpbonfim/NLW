import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import './styles.css'
import { FiUpload, FiImage } from 'react-icons/fi'


interface Props {
    onFileUploaded: (file: File) => void;
}


const Dropzone: React.FC<Props> = ({onFileUploaded})  => {
    const [selectedFileUrl, setSelectedFileUrl] = useState('')

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        console.log(acceptedFiles)
        const file = acceptedFiles[0];
        const fileUrl = URL.createObjectURL(file)
        setSelectedFileUrl(fileUrl)
        onFileUploaded(file)
    }, [onFileUploaded])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/*"
    })

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps() } accept="image/*"/>
            {
                isDragActive ? 
                    <p> <FiImage/> Solte aqui sua imagem...</p> :
                    ( selectedFileUrl ?  <img src={selectedFileUrl} alt="Point Thumbnail"/> : <p> <FiUpload /> Arraste o arquivo aqui ou clique e selecione</p> ) 
            }
        </div>
    )
}

export default Dropzone