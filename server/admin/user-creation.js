/*
  User Creation
  Functions for handling new user creation.
 */
Accounts.onCreateUser(function(options, user) {
  console.log(options);
  console.log(user);
  if (options.profile) {
    user.profile = options.profile;
  }
  return user;
});
