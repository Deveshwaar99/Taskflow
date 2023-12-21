async function logoutUser() {
  try {
    const authToken = window.localStorage.token
    const apiUrl = 'http://localhost:3000/users/profile/logout'
    await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
  } catch (error) {
    console.log(error)
  }
}
export { logoutUser }
