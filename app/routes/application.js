import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  beforeModel(){
    if( this.get('session.isAuthenticated') && !this.get('session.secure.auth.user')){
      let userRecord = this.store.find('user', this.get('session.secure.auth.uid'));
      this.set('session.secure.auth.user', userRecord);
    }
    this._super();
  },
  actions: {
    sessionAuthenticationSucceeded(){
      var userId = this.get('session.secure.auth.uid');
      this.store.find('user', userId)
        .catch(()=> this.store.createRecord('user',{
            id: userId,
            email: this.get('session.secure.auth.email'),
          })
        ).then((userRecord)=>{
          userRecord.set('lastLogin', new Date()).save();
          this.set('session.secure.auth.user', userRecord);
          this.transitionTo('index');
        });
    }
  }
});
