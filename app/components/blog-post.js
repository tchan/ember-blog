import Ember from 'ember';

export default Ember.Component.extend({
  isEditing: false,

  actions: {
    deletePost(post) {
      post.destroyRecord();
    },
    cancelEdit(post) {
      post.rollbackAttributes();
      this.set('isEditing', false);
    },
    editPost() {
      this.set('isEditing', true);
    },
    savePost(post) {
      post.save().then(() => {
        this.set('isEditing', false);
      });
    }
  }

});
