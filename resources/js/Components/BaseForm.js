import { useState, useEffect } from 'react'
import { makeStyles, Modal, CircularProgress } from '@material-ui/core'
import { isClear, HandleError } from './index'
import { Formik } from 'formik'
import _ from 'lodash'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: '10px',
    fontWeight: 'bolder'
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: '#282c34',
    border: '2px solid #000',
    padding: '20px',
    outline: 'none'
  },
  loadingPaper: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
    margin: '20px',
    alignItems: 'center'
  }
}))

export default (props) => {
  const [state, setState] = useState({})
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (useValue, formActions) => {
    setLoading(true)
    const finalRedirect = (id) => {
      if (typeof props.finalCommand === 'function') {
        setLoading(false)
        props.finalCommand(id)
      }
    }

    const { dataMode } = useValue
    if (typeof props.onSubmitTransform === 'function') {
      useValue = props.onSubmitTransform(useValue)
    }

    if (dataMode === 'insert') {
      props.externalApi
        .insertDocument(useValue)
        .then((response) => {
          formActions.setSubmitting(false)
          finalRedirect(response.data.id)
        })
        .catch((error) => {
          HandleError(error)
          setError(error.message)
          setLoading(false)
          formActions.setSubmitting(false)
        })
    } else if (dataMode === 'update') {
      props.externalApi
        .updateDocument(useValue)
        .then((response) => {
          formActions.setSubmitting(false)
          finalRedirect(response.data.id)
        })
        .catch((error) => {
          HandleError(error)
          setError(error.message)
          setLoading(false)
          formActions.setSubmitting(false)
        })
    }
  }

  const NullToEmpty = (value) => {
    if (_.isNumber(value)) {
      return value.toString()
    }

    return _.isNil(value) ? '' : undefined
  }
  const ModifyInfo = (data) => {
    if (
      !isClear(props.onStartTransform) &&
      typeof props.onStartTransform === 'function'
    ) {
      data = props.onStartTransform(data)
    }
    setState(data)
  }

  const SetInsertMode = (data) => {
    data.precursory = _.cloneDeep(data)
    data.dataMode = 'insert'
    ModifyInfo(data)
  }

  useEffect(() => {
    if (!isClear(props.id) && !isClear(props.externalApi) && typeof props.externalApi.retrieveDocument === 'function') {
      props.externalApi
        .retrieveDocument(props.id)
        .then(
          /**
           * @param {string} data.dataMode
           * @param {any} data.precursory
           */
          ({ data }) => {
            // console.log('beforeClone', data)
            data.precursory = _.cloneDeep(data)
            data.dataMode = 'update'
            data = _.cloneDeepWith(data, NullToEmpty)
            // console.log('afterClone', data)
            console.log(data, 'sdsdsddsdsd')
            ModifyInfo(data)
          }
        )
        .catch((error) => {
          setState({ dataMode: 'error' })
          HandleError(error)
        })
    } else {
      const data = props.initialValues
      if (!isClear(props.externalApi) && typeof props.externalApi.initializeDocument === 'function') {
        props.externalApi
          .initializeDocument()
          .then((allResponse) => {
            data.initialized = allResponse.data
            SetInsertMode(data)
          })
          .catch((error) => {
            setState({ dataMode: 'error' })
            HandleError(error)
          })
      } else {
        SetInsertMode(data)
      }
    }
  }, [])

  if (state.dataMode === 'error') {
    return <p>Error</p>
  } else if (state.dataMode === 'insert' || state.dataMode === 'update') {
    return (
      <>
        <Formik
          initialValues={state}
          validationSchema={props.validationSchema}
          // validate={props.validate}
          validateOnChange={!props.fastValidation}
          validateOnBlur={!props.fastValidation}
          onSubmit={handleSubmit}
        >
          {(formProps) => (
            <form className="form-container" autoComplete="off">
              <span style={{ color: 'red' }}>{error}</span>
              {props.children(formProps)}
              {/* <Button */}
              {/*  variant="contained" */}
              {/*  color="primary" */}
              {/*  className={classes.button} */}
              {/*  type="submit" */}
              {/*  onClick={formProps.handleSubmit} */}
              {/* > */}
              {/*  {props.buttonText} */}
              {/* </Button> */}
            </form>
          )}
        </Formik>
        <Modal
          open={loading}
          onClose={() => setLoading(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className={classes.loadingPaper}
        >
          <CircularProgress color="secondary" size ={100} style={{ padding: '20px', boarderWidth: '0px', borderStyle: 'none' }}/>
        </Modal>
      </>
    )
  } else {
    return <p>loading</p>
  }
}
