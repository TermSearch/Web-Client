import React from 'react';

function Footer() {
  return (
    <footer className="row">
      <div className="col-xs-12 col-sm-10 col-md-8 col-lg-7">
        <ul className="list-unstyled">
          <li className="pull-right"><a href="#top">Naar boven</a></li>
          <li> <a href="/">Home</a></li>
          <li><a href="/duits-nederlands/vakgebied/">Vakgebieden</a></li>
          <li><a href="/woordenboeken">Woordenboeken</a></li>
          <li> <a href="/duits-nederlands/">Pagina's</a></li>
          <li> <a href="/colofon">Colofon</a></li>
        </ul>
        <p>Met <span className="glyphicon glyphicon-heart red"></span> gemaakt in <a href="/search?term=Utrecht">Utrecht</a> door <a href="http://www.vangilst.de/">Van Gilst Übersetzungen</a></p>
        <p>De broncode van deze website is beschikbaar op <a href="https://github.com/vnglst/term-search">GitHub </a>en valt onder de MIT-licentie.</p>
      </div>
    </footer>
  );
}

export default Footer;
