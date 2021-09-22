export default function ({ $auth, redirect }) {
  const user = $auth.state.user
  if (user && user.type === 'admin') {
  } else {
    redirect('/online-classes')
  }
}
