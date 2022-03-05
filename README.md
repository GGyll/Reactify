# Reactify
Create rooms for listening to music together, YOU create a room YOU decide if other users have access to play/pause and how many votes are needed to skip the current song.

Written with Django rest-framework as a backend and React (Router V6) on the frontend using mainly functional components.
Music data is pulled using JSON by the backend through the Spotify API.


![Alt Text](https://github.com/GGyll/Reactify/blob/main/demonstration.gif)

## To run

In spotify/credentials.py update the following to your Spotify API credentials:

`
CLIENT_ID = ''
CLIENT_SECRET = ''
`

In the project directory
`py manage.py runserver`
To run the Django server

Open a new terminal to frontend/ and run
`npm start`
To start the React app



Open [http://localhost:8000](http://localhost:8000) to view it in your browser.



