import Ember from 'ember';

export default Ember.Controller.extend({
  firebase: Ember.inject.service(),

  actions: {
    createUser(email, password){
      return this.get('firebase').createUser(email, password);
    },
    login(email, password){
      return this.get('session').authenticate('authenticator:firebase', {
        'email': email,
        'password': password
      }).then(()=>this.set('session.secure.auth.email', email));
    },
    forgotPassword(email){
      this.get('firebase').emailPassword(email)
      .then(()=>alert('Check your email for your new password!'))
      .catch((error)=>alert(`Error: ${error}`));
    }
  }
});
