const express = require('express');
const axios = require('axios');

const app = express();

app.get('/', async(req, res) => {
    try {
        const response = await axios.get('https://api.github.com/users/google/repos');
        //Se organizan los repositorios por estrellas
        const sortedRepositories = response.data.sort((a, b) => b.stargazers_count - a.stargazers_count);

        const topRepositories = sortedRepositories.slice(0, 10);

        //Aquí se crea el objeto JSON con la información organizada
        const result = topRepositories.map(repo => ({
            name: repo.name,
            url: repo.html_url
        }));

        res.json(result);
      } catch (error) {
        console.error('Error fetching repositories:', error.message);
        res.status(500).send('Internal server error');
      }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on: http://localhost:${port}`);
});