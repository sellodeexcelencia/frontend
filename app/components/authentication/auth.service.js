class AuthService {
  constructor(Api,$http) {
    'ngInject'
    this.API = Api
    this.$http = $http
  }

  signUp(user) {
    const url = `${this.API}/auth/register`
    return this.$http.post(url,user)
      .then(({data}) => data)
      .catch(({data}) => data)
  }

  activeAccount(email) {
    const url = `${this.API}/auth/activate?email=${email}`
    return this.$http.get(url)
      .then(({data}) => data)
  }
}

export default AuthService