const resolveActiveAccount = ($q,$state,$stateParams,AuthService)=> {
  const deferred = $q.defer()
  const { email,token } = $stateParams
  if (email && token && token.length > 30) {
    deferred.resolve(AuthService.activeAccount(email))
  } else {
    $state.go('landingPage')
    deferred.reject()
  }
  return deferred.promise
}
export {
  resolveActiveAccount
}