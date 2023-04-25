# Stori Technical Challenge

For this challenge you will need to code a simple newsletter sending app. The app should consist of
both front and back end. You can either make completely separate components (like a SPA + a rest
api) or a front + back combo (for example, a php website that can be both the UI and send the
newsletters).

We prefer that you code in Python, Javascript/Typescript or Golang; but other languages are ok too.
Package your code in one or more Docker images. Include any build or run scripts, Dockerfiles or
docker-compose files needed to build and execute your code.

## Bonus points
1. Email is personalized and using html format
2. Recipient user can opt for only unsubscribe from specific newsletters
3. A statistics dashboard is provided (number of sent mails, number of recipients, etc.)
4. Newsletter sending can be scheduled.

## Delivery and code requirements
1. Admin user can upload a pdf or png image (the newsletter)
2. Admin user can submit an email list of recipients of the newsletter
3. Admin user can add a single email to the recipient list
4. Admin user can click a button to trigger the newsletter submission
5. PDF of png document should be attached to the email
6. Recipient users can click a "unsubscribe" link contained in the email, the user should not receive
any more emails.

## Available Scripts
In the project directory, you can run:

### `npm run start`
### `npm run build`
### `npm run test`
