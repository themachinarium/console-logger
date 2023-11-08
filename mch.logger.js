"use strict"

const {inspect} = require('util')
const serviceName = process.env.SERVICE_NAME || null
const mchLogTypes = {
    WARNING: 'warning',
    ERROR: 'error',
    CRITICAL: 'critical',
    POST_REQUEST: 'post-request',
    GET_REQUEST: 'get-request',
    PUT_REQUEST: 'put-request',
    DELETE_REQUEST: 'delete-request',
    RESPONSE: 'response',
    LOG: 'log',
}
const logType = Object.values(mchLogTypes)

const mchLogger = function (type, endpoint, method = null, log, note = null) {

    if (!logType.includes(type)) {
        throw new Error('Invalid console logger type')
    }
    if (log !== 'string') {
        log = JSON.stringify(inspect(log?.error || log?.response || log))
    }
    if (typeof endpoint !== 'string') {
        throw new Error('Endpoint must be a string')
    }
    if (note !== null && typeof note !== 'string') {
        throw new Error('Note must be a string')
    }

    console.log("type: " + type, "service: " + serviceName, "endpoint: " + endpoint, "log: " + log, +"note: " + note)
}

module.exports = {mchLogger, mchLogTypes}