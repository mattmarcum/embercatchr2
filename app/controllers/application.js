import Ember from 'ember';

export default Ember.Controller.extend({
    actions:{
        toggleWebTwoDotOh(){
            if( this.get('webTwoDotOh') ){
                return this.set( 'webTwoDotOh', '');
            }
            this.set( 'webTwoDotOh', 'e' );
        },
        toggleNav(){
            this.toggleProperty( 'showNav' );
        }
    },

    webTwoDotOh: 'e',

    currentPathChange: Ember.observer('currentPath', function(){
        this.set( 'showNav', false );
    })
});
