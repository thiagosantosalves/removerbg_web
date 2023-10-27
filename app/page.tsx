import Image from 'next/image'
import styles from './page.module.css'

import Upload from './components/Upload'

export default function Home() {
  return (
    <main className={styles.main}>
      
      <div className={styles.description}>
        <p>
          Removedor automático e gratuito de fundo com IA&nbsp;
        </p>
        <div>
            <Image
              src="/logo.svg"
              alt="removerBG Logo"
              width={140}
              height={37}
              priority
            />
        </div>
      </div>

      <div className={styles.centerCard}>

        <div className={styles.areaAdvertising}>
          <p>banner para o google ads</p>
        </div>

          <Upload />

        <div className={styles.areaAdvertising}>
          <p>banner para o google ads</p>
        </div>
      
      </div>

      <div className={styles.areaExempleImage}>
        
        <div className={styles.cardExempleImage}>
          
          <div className={styles.cardExempleImageText}>
            <p>Teste qualquer teste qualquer teste qualquer  teste qualquer</p>
            <p>Teste qualquer teste teste qualquer teste</p>
          </div>

          <Image
            src="/imagePrincipal.png"
            alt="removerBG Logo"
            width={180}
            height={180}
          />

        </div>

        <div className={styles.cardExempleImage}>
        
          <div className={styles.cardExempleImageText}>
            <p>Teste qualquer teste qualquer teste qualquer  teste qualquer</p>
            <p>Teste qualquer teste teste qualquer teste</p>
          </div>

          <Image
            src="/imagePrincipal.png"
            alt="removerBG Logo"
            width={180}
            height={180}
          />

        </div>

      </div>

      <div className={styles.line}></div>

      <footer className={styles.areaFooter}>
        <p>©2023 removerBG</p>
      </footer>
      
    </main>
  )
}
