import Ember from 'ember';
import EmberValidations from 'ember-validations';

var AuthParams = Ember.Object.extend( EmberValidations.Mixin, {
 email: null,
 password: null,
 validations: {
   email: {
     presence: true,
     format: {
       with: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
       message: `Please enter a valid email address`
     }
   },
   password: {
     presence: true,
     format: {
       with: /^([a-zA-Z]|\d)+$/,
       message: `Please user letters and numbers only`
     },
     length: {
       is: 8,
       message: `Minimum 8 characters`
     }
   }
 },
  isntValid: Ember.computed.not('isValid')
});

export default Ember.Component.extend({
  didInitAttrs(){
    this.set('authParams', AuthParams.create({ container: this.get('container') }));
  },
  actions: {
    submit(){
      this.attrs.submit(this.get('authParams.email'), this.get('authParams.password'))
      .then(()=>
        this.set('authParams', AuthParams.create({ container: this.get('container') }))
      )
      .catch(
        (error)=>alert(`Authentication Error: ${error}`)
      );
    }
  }
});
