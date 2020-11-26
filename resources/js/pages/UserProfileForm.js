import * as Yup from 'yup'
import BaseForm from '../Components/BaseForm'
import AppTextField from '../Components/AppTextField'
import {
  FormControl,
  Select,
  InputLabel,
  Button,
  Container,
  Avatar,
  Typography,
  makeStyles,
  IconButton
} from '@material-ui/core'
import { connect } from 'react-redux'
import { useRef, useState } from 'react'
// import produce from 'immer'
import api from '../Api'
import history from '../history'
import { updateUserThunk } from '../store'
// import image from '../Assets/images/test.png'
import PhotoCamera from '@material-ui/icons/PhotoCamera';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '79vh'
  },
  button: {
    margin: '10px',
    fontWeight: 'bolder'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(20),
    height: theme.spacing(20),
    alignSelf: 'center'
  },
  cameraIcon: {
    position: 'absolute',
    backgroundColor: 'gray',
    alignSelf: 'center',
    marginLeft: '100px',
    bottom: 0,
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
function UserProfileForm ({ userId, updateUser, userData }) {
  console.log(userData)
  const classes = useStyles();
  const [img, setImage] = useState(null);
  const hiddenFileInput = useRef(null)
  // https://www.pluralsight.com/guides/how-to-create-a-simple-form-submit-with-files?clickid=2nZQSxW6txyOT1NwUx0Mo38VUkEwEK2VsSM9xc0&irgwc=1&mpid=29332&aid=7010a000001xAKZAA2&utm_medium=digital_affiliate&utm_campaign=29332&utm_source=impactradius
  const handleImageClick = event => {
    hiddenFileInput.current.click();
    // const formData = new FormData()
    console.log(event.target.files[0])
    // formData.append('image',event.target.files[0])
    event.preventDefault();
    const imageFile = event.target.files[0];
    if (imageFile) {
      const localImageUrl = URL.createObjectURL(imageFile);
      const imageObject = new window.Image();

      imageObject.onload = () => {
        imageFile.width = imageObject.naturalWidth;
        imageFile.height = imageObject.naturalHeight;
        // input.onChange(imageFile);
        URL.revokeObjectURL(imageFile);
      };
      imageObject.src = localImageUrl;
      setImage(localImageUrl)
    }
  };
  const onStartTransform = (data) => {
    // setState(data)
    return data
  }
  /*
  firstname
  lastname
  gender
  dob
  height
  weight
  */
  const ValidationSchema = Yup.object({
    first_name: Yup.string()
      .max(15, 'Must be 15 characters or less').required()
      .label('First Name'),
    last_name: Yup.string()
      .max(20, 'Must be 20 characters or less').required()
      .label('Last Name'),
    user_gender: Yup.mixed()
      .oneOf(['Male', 'Female', 'Prefer not to say']).label('Gender'),
    user_dob: Yup.date().label('dob'),
    user_height: Yup.number().label('Height'),
    user_weight: Yup.number().label('Weight')
  })

  // TODO after user submit the form, run this function
  const finalCommand = () => history.push('/user-profile')
  // TODO: decide if we should have password, address, exp level field
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
              Update Your Information
        </Typography>
        <BaseForm
          // initialValues={state}
          validationSchema={ValidationSchema}
          // fastValidation
          externalApi={{
            // TODO: add the API call for submitting log-in credentials
            retrieveDocument: () => api.get(`user/getUser?id=${userId}`),
            updateDocument: updateUser
          }}
          id={userId}
          onStartTransform={onStartTransform}
          finalCommand={finalCommand}
          buttonText="Update Profile"
        >
          {(formProps) => (<>

            <input type='file' id='file' ref={hiddenFileInput} value={formProps.values.socialAvatarUrl} onChange={(e) => handleImageClick(e)} style={{ display: 'none' }}/>
            <div style={{ width: '100%', height: 'auto', position: 'relative', justifyContent: 'center', display: 'flex', alignItem: 'center' }}>
              <Avatar className={classes.avatar} src={formProps.values.socialAvatarUrl || img}/>
              <IconButton onClick={(e) => handleImageClick(e)} className={classes.cameraIcon} color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
            </div>
            <AppTextField
              {...formProps}
              label="First Name"
              type="text"
              name="first_name"
            />
            <AppTextField
              {...formProps}
              label="Last Name"
              type="text"
              name="last_name"
            />
            <FormControl>
              <InputLabel
                shrink
                id="demo-simple-select-placeholder-label-label"
              >
                Gender
              </InputLabel>
              <Select
                native
                label="Gender"
                name="user_gender"
                value={formProps.values.user_gender}
                onChange={formProps.handleChange}
                // TODO: Need to change color from grey to white
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </Select>
            </FormControl>

            <AppTextField
              // not sure if we are doing age groups
              {...formProps}
              label="DOB"
              type="date"
              name="user_dob"
            />
            <AppTextField
              {...formProps}
              // height ranges? or options
              label="Height (cm)"
              type="height"
              name="user_height"
            />
            <AppTextField
              {...formProps}
              // weight ranges or options?
              label="Weight (lbs)"
              type="weight"
              name="user_weight"
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
              onClick={formProps.handleSubmit}
            >
                  Update
            </Button>
          </>
          )
          }
        </BaseForm>
      </div>
    </Container>
  )
}
const mapState = (state) => {
  return { userId: state.user.id, userData: state.user.userData }
}
const mapDispatch = (dispatch) => {
  return {
    updateUser: (userPayload) => dispatch(updateUserThunk(userPayload))
  }
}

export default connect(mapState, mapDispatch)(UserProfileForm)
