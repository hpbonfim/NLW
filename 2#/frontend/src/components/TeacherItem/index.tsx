import React from 'react'
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import './styles.css'

export default function TeacherItem() {
    return (
        <main>
            <article className="teacher-item">
                <header>
                    <img src="https://instagram.fcgh4-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/83895807_486590705372598_7389277521113129462_n.jpg?_nc_ht=instagram.fcgh4-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=sdrMIchnJrYAX-UoRpO&oh=f043634e2377b24dc6b9ab3e2d87e904&oe=5F53D543" alt="" />
                    <div>
                        <strong> Henrique Bonfim</strong>
                        <span>Cloud Architech</span>
                    </div>
                </header>

                <p>
                    Prontos para aprender sobre as melhores cloud tech
                    </p>

                <footer>
                    <p>
                        Preco/Hora
                            <strong>R$ 100</strong>
                    </p>
                    <button type="button">
                        <img src={whatsappIcon} alt="WhatsApp" />
                            Entrar e contato
                        </button>
                </footer>
            </article>
        </main>
    )

}