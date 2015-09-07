
/*
  Email Validation
  Method for validating email addresses for authenticity.
 */
// Include future library. This is an NPM package, but as it's already a part of
// Meteor's core, we can do an Npm.require without importing it elsewhere first!
var Future;

Future = Npm.require('fibers/future');

Meteor.methods({
  validateEmailAddress: function(address) {
    //Check our email address against our expected pattern.
    var validateEmail;
    check(address, String);
    // Make use of Meteor's HTTP package to call on the Kickbox email validation
    // API (this ensures we're not allowing invalid addresses to signup for our
    // app). Note: we need to wrap this in a future as the HTTP all is made
    // asynchronously and we want to get a response from Kickbox before we continue.
    validateEmail = new Future();
    HTTP.call("GET", "https://api.kickbox.io/v1/verify", {
      params: {
        email: address,
        apikey: "a2e66d2c524f5fce691166a0b2aab125964123504efe56673197dee302dadb14"
      }
    }, function(error, response) {
      if (error) {
        return validateEmail["return"](error);
      } else {
        if (response.data.result === "invalid" || response.data.result === "unknown") {
          // If our user's email is invalid, toss an error back to the client. Here
          // we don't use a throw because that would block the Method, preventing
          // our error from reaching the client.
          return validateEmail["return"]({
            error: "Sorry, your email was returned as invalid. Please try another address."
          });
        } else {
          // If all is well, just return true.
          return validateEmail["return"](true);
        }
      }
    });
    return validateEmail.wait();
  }
});
