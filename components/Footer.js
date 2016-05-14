import React from 'react';

function Footer( {siteUrl} ) {

  return (
    <footer className="row">
      <div className="col-xs-12 col-sm-10 col-md-8 col-lg-7">
        <ul className="list-unstyled">
          <li className="pull-right"><a href="#top">Naar boven</a></li>
          <li> <a href={siteUrl}>Home</a></li>
          <li><a href={siteUrl+"duits-nederlands/vakgebied/"}>Vakgebieden</a></li>
          <li><a href={siteUrl+"woordenboeken"}>Woordenboeken</a></li>
          <li> <a href={siteUrl+"duits-nederlands/"}>Pagina's</a></li>
          <li> <a href={siteUrl+"colofon"}>Colofon</a></li>
        </ul>
        <p>Met <span className="glyphicon glyphicon-heart red"></span> gemaakt in <a href="/?term=Utrecht">Utrecht</a> door <a href="http://www.vangilst.de/">Van Gilst Übersetzungen</a></p>
        <p>De broncode van deze website is beschikbaar op <a href="https://github.com/vnglst/term-search">GitHub </a>en valt onder de MIT-licentie.</p>
      </div>
    </footer>

  );
}

export default Footer;
