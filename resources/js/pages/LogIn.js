import * as Yup from 'yup'
import BaseForm from '../Components/BaseForm'
import AppTextField from '../Components/AppTextField'
import { auth } from '../store'
import { connect } from 'react-redux'
import { makeStyles, Avatar, CssBaseline, Typography, Container, Grid } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '75vh'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Login = ({ loginUser, error, history }) => {
  const classes = useStyles();
  const ValidationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required()
      .label('Email'),
    password: Yup.string()
      .min(8, 'Password is too short -- must be at least 8 characters')
      .required()
      .label('Password')
  })

  const finalCommand = () => history.push('/')

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <span style={{ color: 'red' }}>{error}</span>
        <BaseForm
          initialValues={{ email: '', password: '' }}
          validationSchema={ValidationSchema}
          fastValidation
          externalApi={{
            insertDocument: loginUser
          }}
          finalCommand={finalCommand}
          buttonText="Log In"
        >
          {(formProps) => (
            <>
              <AppTextField
                {...formProps}
                label="Email"
                type="email"
                name="email"
              />
              <AppTextField
                {...formProps}
                label="Password"
                type="password"
                name="password"
              />
              <Grid item space={5}>
                <Link to="/signup" className={'navLink'} >
                  {'Don\'t have an account? Sign Up'}
                </Link>
              </Grid>
            </>
          )}
        </BaseForm>
      </div>
    </Container>
  )
}
const mapState = (state) => ({ error: state.user.error })
const mapDispatch = (dispatch) => {
  return {
    loginUser: (payload) => dispatch(auth(payload, 'loginUser'))
  }
}

export default connect(mapState, mapDispatch)(Login)
