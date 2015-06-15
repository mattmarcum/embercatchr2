import Ember from 'ember';
import Firebase from 'firebase';
import config from '../config/environment';

export default Ember.Service.extend({
  init() {
      if (config.firebase) {
          this.set('firebase', new Firebase(config.firebase));
      } else {
          throw new Error("'firebase' not defined in environment");
      }
      this._super();
  },
  createUser(email, password){
    return new Ember.RSVP.Promise(
      (resolve, reject)=>{
        this.get('firebase').createUser({
          email: email,
          password: password
        },
        (error, data)=>{
          if(error){
            reject(error);
          }else{
            resolve(data);
          }
        });
      }
    );
  },
  emailPassword(email){
    return new  Ember.RSVP.Promise(
      (resolve, reject)=>{
        this.get('firebase').resetPassword({
          email: email
        },
        (error)=>{
          if(error){
            reject(error);
          }else{
            resolve();
          }
        });
      }
    );
  }
});
