/*
  Startup
  Collection of methods and functions to run on server startup.
 */
Meteor.startup(function() {
  var checkUser, createServiceConfiguration, i, id, len, results, user, users;
  createServiceConfiguration = function(service, clientId, secret) {
    ServiceConfiguration.configurations.remove({
      service: service
    });
    if (service === 'facebook') {
      return ServiceConfiguration.configurations.insert({
        service: service,
        appId: clientId,
        secret: secret
      });
    } else {
      return ServiceConfiguration.configurations.insert({
        service: service,
        clientId: clientId,
        secret: secret
      });
    }
  };

  /*
    Configure Third-Party Login Services
    Note: We're passing the Service Name, Client Id, and Secret. These values
    are obtained by visiting each of the given services (URLs listed below) and
    registering your application.
   */
  createServiceConfiguration('facebook', '833779916667282', '89dd54fbc1a5ff5ab610ec2c278f1c14');
  createServiceConfiguration('github', 'd768e3dcdf876092da9f', '1df75614371739ce8d6fbfba67dcabc9c4c46cf1');
  createServiceConfiguration('google', '313280785371-o6m4t7alshghi24eia9pvm0kuvt81v9n.apps.googleusercontent.com', 'XnVn13MUr1cMjjK9YC2DzAai');
  createServiceConfiguration('twitter', 'AS0lL1mTR7So0Zy7p59ghhLyF', '7OEHvFugps8fyWZ0R1LAMOA5tBnYp321Cqy3bBVZXGdRCOgSp3');

  /*
    Generate Test Accounts
    Creates a collection of test accounts automatically on startup.
   */
  users = [
    {
      name: "Admin",
      email: "admin@admin.com",
      password: "password"
    }
  ];
  results = [];
  for (i = 0, len = users.length; i < len; i++) {
    user = users[i];
    checkUser = Meteor.users.findOne({
      "emails.address": user.email
    });
    if (!checkUser) {
      results.push(id = Accounts.createUser({
        email: user.email,
        password: user.password,
        profile: {
          name: user.name
        }
      }));
    } else {
      results.push(void 0);
    }
  }
  return results;
});
