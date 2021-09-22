export default ({ store, redirect, route }) => {
  if (route.path === '/') {
    if (store.state.auth.loggedIn) {
      redirect('/online-classes')
    }
  }
}
