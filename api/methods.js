import axios from "axios";

const IS_DEV = /dev\.(peppers-studio|page-view)\.ru$/.test(global?.location?.hostname);

export function post({url, headers, data, success, fail, responseType, dataType, contentType}) {
  return IS_DEV ?
    send({
      url: `${url}Post`,
      headers: {...headers, 'Content-Type': 'application/json', 'Accept': 'application/json'},
      success,
      fail
    }) :
    send({url, headers, data, success, responseType, fail, dataType, contentType, type: "POST"})
}

export function del({url, headers, data, success, fail, responseType, dataType, contentType}) {
  return IS_DEV ?
    send({
      url: `${url}Post`,
      headers: {...headers, 'Content-Type': 'application/json', 'Accept': 'application/json'},
      success,
      fail
    }) :
    send({url, headers, data, success, responseType, fail, dataType, contentType, type: "DELETE"})
}

export function put({url, headers, data, success, fail, responseType, dataType, contentType}) {
  return IS_DEV ?
    send({
      url: `${url}Post`,
      headers: {...headers, 'Content-Type': 'application/json', 'Accept': 'application/json'},
      success,
      fail
    }) :
    send({url, headers, data, success, responseType, fail, dataType, contentType, type: "PUT"})
}

export function get({url, data, headers, success, fail}) {
  return send({url, headers, data, success, fail});
}

function send({url, headers, data, success, responseType = "json", fail, type = "get"}) {
  return axios({
    responseType,
    url: `${url}${IS_DEV ? ".json" : ""}`,
    method: type,
    headers,
    data
  })
    .then(success, fail);
}
