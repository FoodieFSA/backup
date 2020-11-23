import _ from 'lodash'

export const HandleError = (error) => {
  const errorText = error.toString()
  const myResponse = error.response
  const myRequest = error.request

  let myObject = ''
  let dataMessage = ''
  let errorUrl = ''
  let responseStatus = ''

  if (!isClear(error.config) && !isClear(error.config.url)) {
    errorUrl = error.config.url
  }

  if (!isClear(myResponse)) {
    myObject = JSON.stringify(myResponse)

    if (!isClear(myResponse.data)) {
      dataMessage = myResponse.data.message
    }

    if (!isClear(myResponse.status)) {
      responseStatus = myResponse.status
    }
  } else if (!isClear(myRequest)) {
    myObject = JSON.stringify(myRequest)
  }

  const consoleText = `${errorText} #url: ${errorUrl} #status: ${responseStatus} #message: ${dataMessage} #object: ${myObject} #complete: ${JSON.stringify(error)}`

  console.log(consoleText)
  setTimeout(() => {
    console.log('Error Response', `${errorText} #url: ${errorUrl} #status: ${responseStatus} #message: ${dataMessage} #object: ${myObject.replace(/[,\\]/g, ' ')}`)
  }, 100)
}

export const isClear = (useValue) => {
  // https://medium.com/@trmaphi/lodash-isempty-value-you-might-be-using-it-the-wrong-way-d83210d7decf
  return _.isUndefined(useValue) || _.isNull(useValue) || Number.isNaN(useValue) ||
    (_.isArray(useValue) && useValue.length === 0) ||
    (_.isString(useValue) && useValue.length === 0) ||
    (_.isObject(useValue) && Object.keys(useValue).length === 0)
}

export const SetFormMessage = (textValue) => {
  const useValue = textValue.replace(/_/g, ' ').replace(/\[object Object]/g, '')
  return useValue.charAt(0).toUpperCase() + useValue.slice(1)
}
