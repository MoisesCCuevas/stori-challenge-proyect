import React from 'react';

const Navbar : React.FC = () => (
  <div className="home">
    <h1>Proyect Description</h1>
    <p>
      A newsletters application is used to create digital publications that are emailed 
      to subscribers for inform, entertain, and receive positive feedback from customers.
    </p>
    <br />
    <h1>Instrunctions</h1>
    <p>
       For this challenge you will need to code a simple newsletter sending app. The app should consist of
       both front and back end. You can either make completely separate components (like a SPA + a rest
       api) or a front + back combo (for example, a php website that can be both the UI and send the
       newsletters).
    </p>
    <p>
      We prefer that you code in Python, Javascript/Typescript or Golang; but other languages are ok too.
      Package your code in one or more Docker images. Include any build or run scripts, Dockerfiles or
      docker-compose files needed to build and execute your code.
    </p>
    <br />
    <h2>Bonus points</h2>
    <ul>
      <li>Email is personalized and using html format</li>
      <li>Recipient user can opt for only unsubscribe from specific newsletters</li>
      <li>A statistics dashboard is provided (number of sent mails, number of recipients, etc.)</li>
      <li>Newsletter sending can be scheduled.</li>
    </ul>
    <h2>Delivery and code requirements</h2>
    <ul>
      <li>Admin user can upload a pdf or png image (the newsletter)</li>
      <li>Admin user can submit an email list of recipients of the newsletter</li>
      <li>Admin user can add a single email to the recipient list</li>
      <li>Admin user can click a button to trigger the newsletter submission</li>
      <li>PDF of png document should be attached to the email</li>
      <li>
        Recipient users can click a unsubscribe link contained in the email, the user should not receive
        any more emails.
      </li>
    </ul>
  </div>
);

export default Navbar;
