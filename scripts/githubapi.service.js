import app from './app.module';

const languagesObjectToLanguagesArray = languagesObject => {
    const ks = Object.keys(languagesObject);
    const vs = ks.map(k => languagesObject[k]);
    const total = vs.reduce((acc, v) => acc + v);
    return ks.map((k, i) => ({
        name: k,
        percentage: Math.round(vs[i] * 100 / total)
    }));
};

const getNumPages = (response, page) => {
    const links = parseLinkHeader(response);
    const lastLink = links.find(link => link.rel === 'last');
    const numPages = lastLink ? Number(/page=(\d+)/.exec(lastLink.href)[1]) : page;
    return numPages;
};

const parseLinkHeader = response => {
    const linkHeader = response.headers('link');
    if (!linkHeader) {
        return [];
    }
    return linkHeader
        .split(',')
        .map(link => link.split(';').map(bit => bit.trim()))
        .map(bits => {
            const bit0 = bits[0];
            const bit1 = bits[1];
            const href = /^\<(.*)\>$/.exec(bit0)[1];
            const rel = /^rel=\"(.*)\"$/.exec(bit1)[1];
            return { href, rel };
        });
};

class GitHubApiService {

    constructor($http, $q, constants) {
        this.$http = $http;
        this.$q = $q;
        this.constants = constants;
    }

    getRepos(username, sortBy, sortDirection, pageSize, page) {

        const url = `${this.constants.GITHUBAPI_BASE_URL}/users/${username}/repos`;

        const config = {
            params: {
                sort: sortBy,
                direction: sortDirection,
                per_page: pageSize,
                page: page
            }
        };

        return this.$http.get(url, config)
            .then(response => ({
                data: response.data,
                numPages: getNumPages(response, page)
            }));
    };

    getUser(username) {
        const url = `${this.constants.GITHUBAPI_BASE_URL}/users/${username}`;
        return this.$http.get(url)
            .then(response => response.data);
    };

    getLanguages(repo) {
        return this.$http.get(repo.languages_url)
            .then(response => languagesObjectToLanguagesArray(response.data));
    };
};

GitHubApiService.$inject = ['$http', '$q', 'constants'];

app.service(GitHubApiService.name, GitHubApiService);
