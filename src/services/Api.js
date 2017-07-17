const API_BASE_URL = "https://api.skypicker.com/";

class Api {

    static getFlights(params) {
        const options = {
            endpoint: 'flights',
            method: 'GET',
            params: params,
        };
        return Api.request(options);
    }

    static getPlaces(params) {

        params.locale = "en";

        const options = {
            endpoint: 'places',
            method: 'GET',
            params: params,
        };
        return Api.request(options);
    }

    static request({ endpoint, method, params }) {
        let url = `${API_BASE_URL}${endpoint}`;
        if (params) {
            const query = Api.urlEncode(params)
            url = `${url}?${query}`
        }

        return new Promise((resolve, reject) => {
            fetch(url, {method: method})
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    else {
                        console.log('Something went wrong')
                        reject();
                    }
                })
                .then(resolve)
                .catch((error) => {
                  console.log('There has been a problem: ' + error.message);
                  reject(error);
                })
        })
        

    }

    static urlEncode(params) {
        return Object.keys(params)
            .map(key => `${key}=${params[key]}`)
            .join('&');
    }

};

export default Api