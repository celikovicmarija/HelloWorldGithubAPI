const axios = require('axios');
const instance = require('./util/instance');

const functions_get = {

    getAllRepositories: () => instance.get('/users/celikovicmarija/repos').then(res => res).catch(err => err),
    getAllRepositoriesWithTypo: () => instance.get('/userss/celikovicmarija/repos').then(res => res).catch(err => err),
    getAllRepositoriesUnauthenticated: () => axios({
        url: "https://api.github.com/users/celikovicmarija/repos",
        headers: {
            "accept": "application/vnd.github.v3+json",
            "authorization": "Bearer " + "ghp_OHinUmOAnK3ShItmNMVuKHDhEcS3uL1lbw0c",
            "Content-Type": "application/json"
        }
    }).then(res => res).catch(err => err),

    getCertainRepository: () => instance.get('repos/celikovicmarija/ITEHPrviDomaci').then(res => res).catch(err => err),

    createNewRepo: () => instance({
        method: 'post',
        url: 'user/repos',
        data: {
            "name": "newRepoUsingAxios",
            "description": "This is a new repos created for learning Axios and Jest",
            private: true
        }
    }).then(res => res).catch(err => err),
    createNewRepoEmptyBody: () => instance({
        method: 'post',
        url: 'user/repos',
        data: {}
    }).then(res => res).catch(err => err),
    createNewRepoNoBody: () => instance({
        method: 'post',
        url: 'user/repos'
    }).then(res => res).catch(err => err),

    createRepoWithExistingName: () => instance({
        method: 'post',
        url: 'user/repos',
        data: {
            "name": "newRepoUsingAxios",
            "description": "This is a new, duplicate repos created for learning Axios and Jest",
            private: true //svejedno je da li se menjaju drugi propertiji
        }
    }).then(res => res).catch(err => err),
    createRepoWithoutName: () => instance({
        method: 'post',
        url: 'user/repos',
        data: {
            "description": "This is a new, duplicate repos created for learning Axios and Jest",
        }
    }).then(res => res).catch(err => err),
    createAlertForRepo: () => instance({
        method: 'put',
        headers: {
            'Accept': 'application/vnd.github.dorian-preview+json'
        },
        url: 'repos/celikovicmarija/newRepoUsingAxios/vulnerability-alerts',

    }).then(res => res).catch(err => err),

    updateRepo: () => instance({
        method: 'patch',
        url: 'repos/celikovicmarija/newRepoUsingAxios',
        data: {
            "name": "newRepoUsingAxiosUpdated",
            "description": "This is an updated repository created for learning Axios and Jest",
            private: false
        }
    }).then(res => res).catch(err => err),
    deleteRepo: () => instance({
        method: 'delete',
        url: 'repos/celikovicmarija/newRepoUsingAxiosUpdated',
    }).then(res => res).catch(err => err),
    deleteRepoNoRepoSpecified: () => instance({
        method: 'delete',
        url: 'repos/celikovicmarija',
    }).then(res => res).catch(err => err),

    accessNonexistentRepository: () => instance.get('repos/celikovicmarija/newRepoUsingAxiosUpdated').then(res => res).catch(err => err),
}
module.exports = functions_get;