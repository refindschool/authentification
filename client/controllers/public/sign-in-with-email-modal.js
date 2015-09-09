 // Rendered
 Template.signInWithEmailModal.rendered = function() {
  return $('#sign-in-with-email').validate({
    rules: {
      emailAddress: {
        required: true,
        email: true
      },
      password: {
        required: true
      }
    },
    messages: {
      emailAddress: {
        required: "Gonna need an email, there, friend!",
        email: "Is that a real email? What a trickster!"
      },
      password: {
        required: "Gonna need an password, there, friend!?"
      }
    },
    submitHandler: function() {
      // Once our validation passes, we need to make a decision on
     //   whether we want to sign the user up, or, log them in. To do
     //   this, we look at a session variable `createOrSignIn` to
     //   see which path to take. This is set below in our event handler.
     var createOrSignIn, user;
     createOrSignIn = Session.get('createOrSignIn');
    // Get our user's information before we test as we'll use the same
    //  information for both our account creation and sign in.
     user = {
      email: $('[name="emailAddress"]').val(),
      password: $('[name="password"]').val()
    };
    // Take the correct path according to what the user clicked and
    //  our session variable is equal to.
    if (createOrSignIn === "create") {
         return Meteor.call('validateEmailAddress', user.email, function(error, response) {
          if (error) {
            return alert(error.reason);
          } else {
            if (response.error) {
              return alert(response.error);
            } else {
      return Accounts.createUser(user, function(error) {
// Before we do the insert, we call to the server to validate our email
// address. This isn't *required*, but it's a good feature to have. This
// allows us to ensure that users are signing up with legitimate email
//addresses and not addresses that will bounce.
        if (error) {
         //  If we get an error, let our user know.
          return alert(error.reason);
        } else {
          // If all works as expected, we need to hide our modal backdrop (lol, Bootstrap).
          return $('.modal-backdrop').hide();
        }
      });
    }
    }
  });

         // end of account creation process
    } else {
      // begining login process
      return Meteor.loginWithPassword(user.email, user.password, function(error) {
        if (error) {
          return alert(error.reason);
        } else {
           // If all works as expected, we need to hide our modal backdrop (lol, Bootstrap).
          return $('.modal-backdrop').hide();
        }
      });
    }
  }
});
};
// Events
Template.signInWithEmailModal.events({
  'click .btn-create-account': function() {
   // When the user clicks "Create Account," set a session variable
   // to use later in our submitHandler (above).
    return Session.set('createOrSignIn', 'create');
  },
  'click .btn-sign-in': function() {
   // When the user clicks "Sign In," set a session variable
   // to use later in our submitHandler (above).
    return Session.set('createOrSignIn', 'signin');
  },
  'submit form': function(e) {
     // Prevent form submission so it's deferred to our validator.
    return e.preventDefault();
  }
});
