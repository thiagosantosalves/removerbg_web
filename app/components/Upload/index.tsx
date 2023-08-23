"use client"
import Image from 'next/image'
import React,  { useState, useCallback, useEffect } from 'react';
import styles from './styles.module.css';
import imglyRemoveBackground from "@imgly/background-removal";
import { Lines } from 'react-preloaders';

import {useDropzone} from 'react-dropzone'

export default function Upload() {
    
    const [selectedFile, setSelectedFile] = useState<any>([]);
    const [file, setFile] = useState<any>(null);
    const [isFile, setIsFile] = useState(false);
    const [urlImage, setUrlImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const onDrop = useCallback( async (event: any) => {
        setIsFile(false);

        if(event.length) {
            setLoading(true);
            setSelectedFile(Object.assign(event[0], { preview: URL.createObjectURL(event[0]) }));

            try {
            
                await imglyRemoveBackground(event[0]).then((blob: Blob) => {
                    const url = URL.createObjectURL(blob);
                    setUrlImage(url);
                });

                setLoading(false);
                setIsFile(true);
            } catch (error) {
                console.log(error);
            }

        } else {
            setLoading(true);
            setError(true);

            setTimeout(() => {
                setError(false);
                setLoading(false);
            }, 3000);
        }

    }, [])


    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        maxFiles: 1, 
        accept: {
            'image/png': ['.png', '.jpg'],
        },
        onDrop
    });

    const handleFileChange = async (event: any) => {

        let type = event.target.files[0].type.split('/');
        if(type[0] === 'image') {

            setIsFile(false);
            setLoading(true);

            setSelectedFile(Object.assign(event.target.files[0], { preview: URL.createObjectURL(event.target.files[0]) }));

            try {
            
                await imglyRemoveBackground(event.target.files[0]).then((blob: Blob) => {
                    const url = URL.createObjectURL(blob);
                    setUrlImage(url);
                });
 
                setLoading(false);
                setIsFile(true);

            } catch (error) {
                console.log(error);
            }

        } else {
            setLoading(true);
            setError(true);

            setTimeout(() => {
                setError(false);
                setLoading(false);
            }, 2000);
        }

    };

    function downloadImage(imageURL: any) {
        const link = document.createElement('a');
        link.href = imageURL;
        link.download = 'fundo_removido.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className={styles.container}>
            <div className={styles.center}>

                <div className={styles.dropzone}>

                    {loading ? (
                        <div className={styles.areaUploadDropzone}>
                            <input {...getInputProps()} />
                            {isDragActive ? (
                                <p>Solte sua imagem aqui...</p>
                            ) : (
                                <p>Arraste e solte sua imagem aqui...</p>
                            )}
                        </div>
                    ) : (
                        <div className={styles.areaUploadDropzone} {...getRootProps()}>
                            <input {...getInputProps()} />
                            {isDragActive ? (
                                <p>Solte sua imagem aqui...</p>
                            ) : (
                                <p>Arraste e solte sua imagem aqui...</p>
                            )}
                        </div>
                    )}
                </div>   

                <div className={styles.areaButton}>
                    <div className={styles.fileinputwrapper}>
                        <input className={styles.fileinput} type="file" onChange={handleFileChange}  />
                        <span className={styles.customfilebutton}>Escolher imagem</span>
                    </div>
                </div>
            </div>
            
            <div className={styles.arePreviewImage}>
                
                {!loading && !error && !isFile && 
                    <div className={styles.areaImagePrincipal}>
                        <Image
                            src="/imagePrincipal.png"
                            alt={selectedFile?.name}
                            width={298}
                            height={298}
                        /> 
                    </div>
                }
                
                {loading && error === false && 

                    <div>
                        
                        <div className={styles.areaLoading}>
                            <div className={`${styles.spinner} ${styles.isAnimating}`}></div>  
                        </div>
                        
                        <Image
                            src={selectedFile?.preview}
                            alt={selectedFile?.name}
                            width={430}
                            height={290}
                            style={{
                                borderRadius: 8
                            }}
                        /> 
                    </div> 
                }

                {isFile &&
            
                    <div className={styles.areaImagePrincipal}>
                        <Image
                            src={urlImage}
                            alt="imagem com fundo removido"
                            width={430}
                            height={290}
                            style={{
                                borderRadius: 8
                            }}
                        />  
                        <div className={styles.areaButtonDownload}>
                            <button onClick={() => downloadImage(urlImage)} className={styles.buttonDownload}>Download</button>
                        </div>
                        
                    </div> 
                }

                {loading && error &&  

                    <div>
                        <p style={{
                            color: '#E83F5B'
                        }}>Arquivo inválido</p>   
                    </div> 
                }
                
            </div>
        </div>
    )
}


                    



