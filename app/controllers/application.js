import Ember from 'ember';

export default Ember.Controller.extend({
    actions:{
        toggleNav(){
            this.toggleProperty( 'showNav' );
        }
    },
    currentPathChange: Ember.observer('currentPath', function(){
        this.set( 'showNav', false );
    })
});
