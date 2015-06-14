import Ember from 'ember';

export default Ember.Component.extend({
  newUser:{
    email: '',
    password: '',
    passwordConfirmation: '',
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
  },
  actions: {
    submit(){
      this.attrs.submit(this.get('newUser.email'), this.get('newUser.password'))
      .catch((error)=>{
        alert(
          `Sorry there was an error creating your account:
          $error`
        );
      });
    }
  }
});
