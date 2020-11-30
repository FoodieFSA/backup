import { Avatar, IconButton, makeStyles } from '@material-ui/core'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { useRef, useState, useEffect } from 'react'
import Api from '../Api'
import { isClear } from './index'
const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(20),
    height: theme.spacing(20),
    alignSelf: 'center',
    backgroundColor: '#3490dc'
  },
  cameraIcon: {
    position: 'absolute',
    backgroundColor: 'gray',
    alignSelf: 'center',
    marginLeft: theme.spacing(10),
    bottom: 0,
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  container: {
    width: '100%',
    height: 'auto',
    position: 'relative',
    justifyContent: 'center',
    display: 'flex',
    alignItem: 'center'
  }
}));

const AppAvatarInput = (props) => {
  const classes = useStyles();
  const [img, setImage] = useState('');
  useEffect(() => {
    const userImg = props.values[props.myName]
    if (!isClear(userImg) && typeof userImg === 'string') {
      setImage(userImg)
    }
  }, [])

  const hiddenFileInput = useRef(null)
  const handleImageClick = event => {
    event.preventDefault();
    hiddenFileInput.current.click();
    const formData = new FormData()
    formData.append('avatar', event.target.files[0])
    formData.append('name', event.target.files[0].name)
    formData.append('id', props.values.id)
    const imageFile = event.target.files[0];
    if (imageFile) {
      const localImageUrl = URL.createObjectURL(imageFile);
      Api.post('user/uploadAvatar', formData).then(response => {
        const { data } = response
        if (!isClear(data)) {
          props.setFieldValue(props.myName, data)
          setImage(localImageUrl)
        }
      })
    }
  };
  return (<>
    <input type='file' id='file' ref={hiddenFileInput} onChange={(e) => handleImageClick(e)} style={{ display: 'none' }}/>
    <div className={classes.container}>
      <Avatar className={classes.avatar} src={img}/>
      <IconButton onClick={(e) => handleImageClick(e)} className={classes.cameraIcon} color="primary" aria-label="upload picture" component="span">
        <PhotoCamera />
      </IconButton>
    </div>
  </>)
}

export default AppAvatarInput
