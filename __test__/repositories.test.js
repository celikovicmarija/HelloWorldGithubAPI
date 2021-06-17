const functions_get = require('../repositories');
describe('Get repository(repositories) of a user', () => {
    let data;
    test('should return all the repositories of authorized user data', async() => {
        expect.assertions(5);
        data = await functions_get.getAllRepositories();
        expect(data).not.toBeNull();
        expect(data.status).toBe(200);
        expect(data.statusText).toBe('OK');
        expect(data.data).toBeInstanceOf(Array);
        expect(data.data[1].default_branch).toBe('main');
    });

    test('should return error when trying to get all repositories from the wrong user', async() => {
        expect.assertions(1);
        data = await functions_get.getAllRepositoriesWithTypo();
        expect(data.response.status).toBe(404);
    });
    test('should return error when trying to get all repositories by unauthenticated user', async() => {
        expect.assertions(1);
        data = await functions_get.getAllRepositoriesUnauthenticated();
        expect(data.response.status).toBe(401);
    });
    test('should return requested repository', async() => {
        expect.assertions(3);
        data = await functions_get.getCertainRepository();
        expect(data.status).toBe(200);
        expect(data.statusText).toBe('OK');
        expect(data.data.name).toBe('ITEHPrviDomaci');
    });

})

describe('Create new repository', () => {
    let data;
    test('Authenticated user creates a private repository', async() => {
        data = await functions_get.createNewRepo();
        expect.assertions(5);
        expect(data.status).toBe(201);
        expect(data.statusText).toBe('Created');
        expect(data.headers['content-type']).toBe('application/json; charset=utf-8');
        expect(data.data.name).toBe('newRepoUsingAxios');
        expect(data.data.private).toBe(true);
    });
    test('Authenticated user cannot create repository with empty body', async() => {
        data = await functions_get.createNewRepoEmptyBody();
        expect.assertions(1);
        expect(data.response.status).toBe(422);
    });

    test('Authenticated user cannot create repository with no body', async() => {
        data = await functions_get.createNewRepoNoBody();
        expect.assertions(1);
        expect(data.response.status).toBe(400);
    });
    test('Authenticated user creates a repository from existing name', async() => {
        data = await functions_get.createRepoWithExistingName();
        expect.assertions(2);
        expect(data.response.status).toBe(422);
        expect(data.response.statusText).toBe('Unprocessable Entity');
    });

    test('Authenticated user creates a repository from existing name', async() => {
        data = await functions_get.createRepoWithoutName();
        expect.assertions(1);
        expect(data.response.status).toBe(422);
    });
})
describe('Manipulation of alerts in the repo', () => {
    let data;
    test('Authenticated user creates an alert for his repo', async() => {
        data = await functions_get.createAlertForRepo();
        expect.assertions(2);
        expect(data.response.status).toBe(415);
        expect(data.response.statusText).toBe('Unsupported Media Type');
    });
})

describe('User updates the repository', () => {
    let data;
    test('Authenticated user updates a private repository', async() => {
        data = await functions_get.updateRepo();
        expect.assertions(6);
        expect(data.status).toBe(200);
        expect(data.statusText).toBe('OK');
        expect(data.headers['content-type']).toBe('application/json; charset=utf-8');
        expect(data.data.name).toBe('newRepoUsingAxiosUpdated');
        expect(data.data.description).toBe('This is an updated repository created for learning Axios and Jest');
        expect(data.data.private).toBe(false);
    });
})



describe('User deletes a repository', () => {
    let data;
    test('Authenticated user deletes a repository', async() => {
        data = await functions_get.deleteRepo();
        expect.assertions(2);
        expect(data.status).toBe(204);
        expect(data.statusText).toBe('No Content');
    });
    test('Authenticated user deletes a repository not specified', async() => {
        data = await functions_get.deleteRepoNoRepoSpecified();
        expect.assertions(2);
        expect(data.response.status).toBe(404);
        expect(data.response.statusText).toBe('Not Found');
    });

    test('Authenticated user tries to access a deleted repository', async() => {
        data = await functions_get.accessNonexistentRepository();
        expect.assertions(2);
        expect(data.response.status).toBe(404);
        expect(data.response.statusText).toBe('Not Found');
    });
})