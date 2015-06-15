import Ember from 'ember';
import EmberValidations from 'ember-validations';

var NewUser = Ember.Object.extend( EmberValidations.Mixin, {
 email: null,
 password: null,
 passwordConfirmation: null,
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
     },
     confirmation: true
   },
   passwordConfirmation: {
     presence: true
   }
 }
});

export default Ember.Component.extend({
  didInitAttrs(){
    this.set('newUser', NewUser.create({ container: this.get('container') }));
  },
  actions: {
    submit(){
      this.attrs.submit(this.get('newUser.email'), this.get('newUser.password'))
        .then(()=>{
          this.set('newUser', NewUser.create({ container: this.get('container') }));
          Ember.run.next(()=>alert(`Your account has been created, please login!`));
        })
        .catch((error)=>{
          alert(
`Sorry there was an error creating your account:
${error}`
          );
        });
    }
  }
});
