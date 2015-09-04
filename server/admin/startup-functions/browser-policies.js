/*
* Browser Policies
* Browser policy customizations.
* Documentation: https://atmospherejs.com/meteor/browser-policy
*/

customBrowserPolicies = function(){
  // Define any custom browser policies here.
  BrowserPolicy.content.allowImageOrigin("https://s3.amazonaws.com");
  BrowserPolicy.content.allowImageOrigin("http://i.imgur.com");
};
