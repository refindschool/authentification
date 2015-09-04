/*
* Routes: Authenticated
* Routes that are only visible to authenticated users.
*/

Router.route('dashboard', {
  path: '/dashboard',
  template: 'index',
  onBeforeAction: function(){
    // Code to run before route goes here.
    Session.set("currentRoute", "dashboard");
    this.next();
  }
});
