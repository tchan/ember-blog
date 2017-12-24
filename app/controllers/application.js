import Ember from 'ember';

export default Ember.Controller.extend({
actions: {
  publishNewPost() {
    this.store.createRecord('post', {
      title: this.get('title'),
      body: this.get('post'),
      author: this.get('author')
    }).save();
    this.set('title', '');
    this.set('post', '');
  }
}
});
