import "./Footer.css";


export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-info">
          <div className="footer-title">

          </div>
          <p className="footer-tagline">🦾We hope this *Lifted* your spirits!<var id="flipped">🦾</var></p>
          {/* using the var element tag prevents errors, certain tags like div cant (or shouldnt be) be nested in a p tag. */}
        </div>
        <div className="footer-section-wrapper">
          <div className="footer-section">
            <h2 className="footer-category">Contact</h2>
            <nav className="footer-list">

              <li>
                <a href="https://github.com/tbarns" className="footer-link">
                  Timothy Barnaby
                </a>
              </li>

              <li>
                <a href="https://github.com/206Dorian" className="footer-link">
                  Dorian Birch
                </a>
              </li>
            </nav>
          </div>
          <div className="footer-section">
            <h2 className="footer-category">Tip Us!</h2>
            <nav className="footer-list">
              <li>

              </li>
            </nav>
          </div>

        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-container">
            <p className="footer-copyright">Ⓒ 2023 Last Ditch Effort</p>
            <div className="footer-social">
           
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
