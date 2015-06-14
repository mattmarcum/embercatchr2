import Ember from 'ember';

export default Ember.Controller.extend({
  firebase: Ember.inject.service(),

  actions: {
    createUser(email, password){
      return this.get('firebase').createUser(email, password);
    }
  }
});
