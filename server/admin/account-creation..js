/*
  Account Creation
  Methods to call when new users are created.
 */
var determineEmail;

// Function: Determine Email
// This allows us to check the email sent from the client, picking out
// a standard email vs. an OAuth email.

determineEmail = function(user) {
  var emailAddress, services;
  if (user.emails) {
    return emailAddress = user.emails[0].address;
  } else if (user.services) {
    services = user.services;
    return emailAddress = (function() {
      switch (false) {
        case !services.facebook:
          return services.facebook.email;
        case !services.github:
          return services.github.email;
        case !services.google:
          return services.google.email;
        case !services.twitter:
          return null;
        default:
          return null;
      }
    })();
  } else {
    return null;
  }
};

// Function: Accounts.onCreateUser()
// Hook into Meteor's account creation event to fire off a "welcome email"
// to new user's.

Accounts.onCreateUser(function(options, user) {

    // Pass our user over to our determineEmail function to see if we can
  // find an address to send our "welcome email" to. We also call up the profile
  // object to see if it exists and pull in a name if it's available.
  var userData;
  userData = {
    email: determineEmail(user),
    name: options.profile ? options.profile.name : ""
  };
    // If we get an email address, call up our sendWelcomeEmail method.
  if (userData.email !== null) {
    Meteor.call('sendWelcomeEmail', userData, function(error) {
      if (error) {
        return console.log(error);
      }
    });
  }
    // Note: because this function overrides how Meteor inserts a new user into
  // the database, we need to ensure that the default implementation still works.
  // Here, we look for any options passed with the email/password and set them
  // as the profile, just like Meteor would if we *didn't* use this function.
  if (options.profile) {
    user.profile = options.profile;
     // Return the user to Meteor.
  }
  return user;
});

// Methods
// sendWelcomeEmail: Send an email to our user to welcome them to the app.
Meteor.methods({
  sendWelcomeEmail: function(userData) {
        // Check our userData argument against our expected pattern.
    var emailTemplate;
    check(userData, {
      email: String,
      name: String
    });
    // Compile and render our email template using meteorhacks:ssr.
    SSR.compileTemplate('welcomeEmail', Assets.getText('email/welcome-email.html'));
    emailTemplate = SSR.render('welcomeEmail', {

      name: userData.name !== "" ? userData.name : null,
      url: "http://localhost:3000"
    });
      // Send off our email to the user.
    return Email.send({
      to: userData.email,
      from: "The Meteor Chef - Demo <demo@themeteorchef.com>",
      subject: "Welcome aboard, team matey!",
      html: emailTemplate
    });
  }
});