import Ember from 'ember';
const { computed } = Ember;

export default Ember.Component.extend({
  store: Ember.inject.service(),
  isEditing: false,
  showCommentTextArea: false,
  comment: null,
  hasComments: computed.readOnly('post.comments.length'),
  hasCommentsText: computed('hasComments', function () {
    if (this.get('hasComments') === 1) {
      return 'comment';
    }
    return 'comments';
  }),
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
    },

    showCommentTextArea() {
      this.set('showCommentTextArea', true);
    },
    saveComment(comment, post) {
      let blogComment = this.get('store').createRecord('comment', {message: comment});
      // Firebase needs to save top layer first for hasMany relationships after adding an object
      // and then saving the individual blog record
      post.get('comments').then((comments) => {
        comments.addObject(blogComment);
        post.save().then(() => {
          blogComment.save();
        })
      })
    }
  }

});
