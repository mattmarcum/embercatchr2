import Ember from 'ember';
import Firebase from 'firebase';
import config from '../config/environment';

export default Ember.Service.extend({
  init: function() {
      if (config.firebase) {
          this.set('firebase', new Firebase(config.firebase));
      } else {
          throw new Error("'firebase' not defined in environment");
      }
      this._super();
  },
  createUser: function(email, password){
    return new Ember.RSVP.Promise(
      function(resolve, reject){
        this.get('firebase').createUser({
          email: email,
          password: password
        },
        function(error, data){
          if(error){
            reject(error);
          }else{
            resolve(data);
          }
        });
      }.bind(this)
    );
  },
  emailPassword: function(email){
    return new  Ember.RSVP.Promise(
      function(resolve, reject){
        this.get('firebase').resetPassword({
          email: email
        },
        function(error){
          if(error){
            reject(error);
          }else{
            resolve();
          }
        });
      }.bind(this)
    );
  }
});
