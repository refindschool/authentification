/*
* UI Helpers
* Define UI helpers for common template functionality.
*/

/*
* Current Route
* Return an active class if the currentRoute session variable name
* (set in the appropriate file in /client/routes/) is equal to the name passed
* to the helper in the template.
*/

UI.registerHelper('currentRoute', function(route) {
  if (Session.equals('currentRoute', route)) {
    return 'active';
  } else {
    return '';
  }
});

// Current User Email
// Return the current user's email address. This method helps us to obtain the
// user's email regardless of whether they're using an OAuth login or the
// accounts-password login (Meteor doesn't offer a native solution for this).

UI.registerHelper('userIdentity', function(userId) {
  var getService, getUser, services;
  getUser = Meteor.users.findOne({
    _id: userId
  });
  if (getUser.emails) {
    return getUser.emails[0].address;
  } else if (getUser.services) {
    services = getUser.services;
    getService = (function() {
      switch (false) {
        case !services.facebook:
          return services.facebook.email;
        case !services.github:
          return services.github.email;
        case !services.google:
          return services.google.email;
        case !services.twitter:
          return services.twitter.screenName;
        default:
          return false;
      }
    })();
    return getService;
  } else {
    return getUser.profile.name;
  }
});
