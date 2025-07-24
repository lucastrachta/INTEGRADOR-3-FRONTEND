import './Footer.css';

export default function Footer() {
  return (
    <>
      {/* =============== MAIN FOOTER =============== */}
      <footer className="main-footer">
        <section>
          <h3>Redes Sociales</h3>
          <ul>
            <li>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
            <li>Instragram</li>
            <li>Linkedin</li>
          </ul>
        </section>
        <section>
          <h3>Casa Argentina (LOGO)</h3>
          <p> 2025 - Copyright © </p>
        </section>
        <section>
          <h3>Contacto</h3>
          <ul>
            <li>Telefono: 3704-685941</li>
            <li>Celular: 3704-685941</li>
            <li>Email: Casa-Argentina@gmail.com</li>
            <li>Direccion: BuenosAires</li>
          </ul>
        </section>
      </footer>
    </>
  );
}