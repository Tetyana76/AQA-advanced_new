FROM cypress/included:cypress-13.15.2-node-22.11.0-chrome-130.0.6723.116-1-ff-132.0.1-edge-130.0.2849.68-1

WORKDIR /e2e

COPY ./package.json .
COPY ./package-lock.json .
COPY ./cypress.config.js .
COPY ./cypress ./cypress

RUN npm i

ENTRYPOINT ["npx", "cypress", "run"]