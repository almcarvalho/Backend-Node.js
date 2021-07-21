const express = require('express');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json()); //permitir receber json no método post

const projects = [];


// app.get('/', (request, response) => {
//     return response.json({ message: 'Hello' });
// });

app.get('/projetos', (request, response) => {

    //inteiro 
    // const params = request.query;
    // console.log(params);

    //fragmentar
    // const { tittle, name } = request.query;
    // console.log(tittle);
    // console.log(owner);

    // return response.json([
    //     "projeto 1",
    //     "projeto 2"
    // ]);

    const { title } = request.query;

    console.log(title);

    const results = title
        ? projects.filter(project => project.title.includes(title))
        : projects;

    return response.json(results);
});

app.post('/projetos', (request, response) => {
    //console.log(request.body);

    const { title, owner } = request.body;
    // console.log(title);
    // console.log(owner);

    const project = { id: uuidv4(), title, owner };

    projects.push(project);

    return response.json(project);

});

//alterar
app.put('/projetos/:id', (request, response) => {

    const { id } = request.params;

    const { title, owner } = request.body;

    const projectIndex = projects.findIndex(project => project.id == id);

    //console.log(projectIndex);

    if (projectIndex < 0) {
        return response.status(400).json({ error: "Projeto não encontrado!" });
    }

    const project = {
        id,
        title,
        owner,
    };

    projects[projectIndex] = project;

    return response.json(project);
});

app.delete('/projetos/:id', (request, response) => {
    // const params = request.params;
    // console.log(params);

    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id == id);

    if (projectIndex < 0) {
        return response.status(400).json({ error: "Projeto não encontrado!" });
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();

});


app.listen(3333, () => {
    console.log('🙌 Back-end started')
});
