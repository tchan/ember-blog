import Ember from 'ember';

export default Ember.Component.extend({
  isEditing: false,

  actions: {
    deletePost(post) {
      post.destroyRecord();
    },

    editPost(post) {
      this.set('isEditing', true);
    }
  }

});
