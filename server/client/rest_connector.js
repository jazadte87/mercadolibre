var Q             = require("q"),
    restConnector = require('restler'),
    rest_errors   = require('../errors/rest-errors');


class RestConnector{
    constructor() { }

    get(url,options) {
        let deferred = Q.defer();
        let opts = (options||{})
        opts.timeout = opts.timeout || 5000
        restConnector.get(url, opts)
            .on('success', (response) => {
                deferred.resolve(response);
            })
            .on('fail', (err, response) => {deferred.reject(new rest_errors.ServerErrorException(`GET [${url}] -> Failed[${response.statusCode}] -> ${response.rawEncoded}`, err))})
            .on('error', (err) => {deferred.reject(new rest_errors.ClientErrorException(`GET [${url}]`, err)) } )
            .on('timeout', (err) => {deferred.reject(new rest_errors.TimeoutException(`GET [${url}] -> Timeout[${err}]`, err)) } )
        return deferred.promise;
    }

    put(url, headers) {
        let deferred = Q.defer();

        restConnector.put(url, {timeout:  5000, headers: headers})
            .on('success', (response) => deferred.resolve(response))
            .on('fail', (err, response) => deferred.reject(new rest_errors.ServerErrorException(`PUT [${url}] fail [${response.statusCode}] -> ${response.rawEncoded}`, err)) )
            .on('error', (err) => deferred.reject(new rest_errors.ClientErrorException(`PUT [${url}]`, err)) )
            .on('timeout', (err) =>  deferred.reject(new rest_errors.TimeoutException(`PUT [${url}]`, err)) )

        return deferred.promise;
    }

    post(url, options) {
        let deferred = Q.defer();

        options.timeout = options.timeout ||  5000;

        console.log('POST '+url+' \n '+JSON.stringify(options)+'\n');

        restConnector.post(url, options)
            .on('success', (response) => deferred.resolve(response))
            .on('fail', (err, response) => deferred.reject(new rest_errors.ServerErrorException(`POST [${url}] fail [${response.statusCode}] -> ${response.rawEncoded}`, err)) )
            .on('error', (err) => deferred.reject(new rest_errors.ClientErrorException(`POST [${url}]`, err)) )
            .on('timeout', (err) =>  deferred.reject(new rest_errors.TimeoutException(`POST [${url}]`, err)) )

        return deferred.promise;
    }

    delete(url, options) {
        let deferred = Q.defer();

        console.log('DELETE '+url+' \n '+JSON.stringify(options)+'\n');

        restConnector.del(url, options)
            .on('success', (response) => deferred.resolve(response))
            .on('fail', (err, response) => deferred.reject(new rest_errors.ServerErrorException(`DELETE [${url}] fail [${response.statusCode}] -> ${response.rawEncoded}`, err)) )
            .on('error', (err) => deferred.reject(new rest_errors.ClientErrorException(`DELETE [${url}]`, err)) )
            .on('timeout', (err) =>  deferred.reject(new rest_errors.TimeoutException(`DELETE [${url}]`, err)) )

        return deferred.promise;
    }

    postWithoutErrors(url, options) {
        let deferred = Q.defer();

        options.timeout = options.timeout ||  5000;

        console.log('POST '+url+' \n '+options+'\n');

        restConnector.post(url, options)
            .on('success', (response) => deferred.resolve(response))
            .on('fail', (err, response) => deferred.reject({type: "render", error: err, message: 'POST [' + url + '] fail ' + response.statusCode + ' -> ' + response.rawEncoded}))
            .on('error', (err) => deferred.reject({type: "error", error: err, message: 'POST [' + url + '] internal error -> ' + JSON.stringify(err)}))
            .on('timeout', (err) =>  deferred.reject({type: "error", error: err, message: 'POST [' + url + '] timeout -> ' + JSON.stringify(err)}));

        return deferred.promise;
    }

    putWithOptions(url, options){
        let deferred = Q.defer();

        options.timeout = options.timeout ||  5000;

        console.log('PUT '+url+' '+ options+ '\n');

        restConnector.put(url, options)
            .on('success', (response) => deferred.resolve(response))
            .on('fail', (err, response) => deferred.reject(new rest_errors.ServerErrorException(`PUT [${url}] fail [${response.statusCode}] -> ${response.rawEncoded}`, err)) )
            .on('error', (err) => deferred.reject(new rest_errors.ClientErrorException(`PUT [${url}]`, err)) )
            .on('timeout', (err) =>  deferred.reject(new rest_errors.TimeoutException(`PUT [${url}]`, err)) )

        return deferred.promise;
    }

    getWithOptions(url, options){
        var deferred = Q.defer();

        console.log("GET "+url+" "+ JSON.stringify(options));

        restConnector.get(url, options)
            .on('success', (response) => deferred.resolve(response))
            .on('fail', (err, response) => deferred.reject( new rest_errors.ServerErrorException(`GET [${url}] fail [${response.statusCode}] -> ${response.rawEncoded}`, err) ) )
            .on('error', (err) => deferred.reject(new rest_errors.ClientErrorException(`GET [${url}]`, err)) )
            .on('timeout', (err) =>  deferred.reject(new rest_errors.TimeoutException(`GET [${url}]`, err)) )

        return deferred.promise;
    }


}

module.exports = RestConnector;