'use strict';

angular.module('angApp').

/**
 * Tags Factory for adding/editing/removing note tags
 *
 * @structure of the tags html for tags input on notes

<ul class="select2-choices">
	<li class="select2-search-choice">
		<div>testing</div>
		<a href="#" onclick="return false;" class="select2-search-choice-close" tabindex="-1"></a>
	</li>
	<li class="select2-search-field">
		<input type="text" autocomplete="off" class="select2-input" id="s2id_autogen2" style="width: 10px;" placeholder="UNKNOWN_TYPE" title="heuristic type: UNKNOWN_TYPE server type: NO_SERVER_DATA field signature: 3511397617 form signature: 14039394139595582785 experiment id: &quot;no server response&quot;">
	</li>
</ul>
 */

factory('tagFactory', [
	'angularFireCollection',
	function tagFactory(angularFireCollection) {
		var baseUrl = 'https://webernote.firebaseio.com/users/';
		var tags = {};
		var count = 0;

		return {
			get: function() {
				return tags;
			},
			count: function() {
				return count;
			},
			getAllTags: function(path) {
				return angularFireCollection(baseUrl + '/' + path);
			},
			getTag: function(path, tag) {
				return angularFireCollection(baseUrl + '/' + path + '/' + tag);
			},
			addTag: function(path, tag, note) {
				//var tag = (tags || '').split();
				console.log(this.getAllTags(path));
				console.log(tag, note);

				this.getAllTags(path).add(tag, function(snap) {
					console.log('tag added:', snap);
				});

				count += 1;
			},
			editTag: function(path, tag) {
				this.getAllTags(path).update(tag);
			},
			deleteTag: function(path, tag) {
				console.log(this.getAllTags(path), path, tag);
				count -= 1;
				this.getAllTags(path).remove(tag);
			}
		};
	}
]);
