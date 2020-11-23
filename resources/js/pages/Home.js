import { connect } from 'react-redux'
const Home = ({ user }) => {
  return (
    <div style={{ flex: 1 }}>
      <h1>Welcome to KeepUp!</h1>
      <p>{JSON.stringify(user)}</p>
    </div>
  )
}

const mapState = (state) => {
  return { user: state.user }
}
export default connect(mapState, null)(Home)
