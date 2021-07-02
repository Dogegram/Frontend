import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <main className="not-found-page grid">
    <div
      style={{
        gridColumn: 'center-start / center-end',
        textAlign: 'center',
        padding: '0 2rem',
      }}
    >
      <h1 className="heading-1">Sorry, but this page looks pretty empty. 404 - Not found</h1>
      <h3 className="heading-3 font-medium">
        The link you followed maybe broken, or you are broken, Just joking, nevermind. ;) <br/>
        <Link to="/" className="link">
          Go back to Dogegram (Homepage of the internet, there are many, you know) .
        </Link>
      </h3>
    </div>
  </main>
);

export default NotFoundPage;
