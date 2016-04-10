'use strict';

angular.module('mockedUsers', []).

value('defaultJSON', {
	users: {
		13538912: {
			userId : '13538912',
			name : 'jaredwilli',
			status : 'online',
			notebooks : [{
				id: 'book0',
				text: 'My Notebook',
				notes : {
					0: '-ItsOTwSR2Ihqp0qKQR5',
					1: '-ItsgCvRAP0pS4_4qDEZ',
					2: '-Its_XcGM9on3LliGPrK'
				}
			}, {
				id: 'book1',
				text: 'Dev Notes',
				notes : {
					0: '-Its_QdLof6mnxHKRyeq'
				}
			}],
			tags : [{
				id: 'tag0',
				text: 'test',
				notes : {
					0: '-ItsOTwSR2Ihqp0qKQR5'
				}
			}, {
				id: 'tag1',
				text: 'html',
				notes : {
					0: '-ItsgCvRAP0pS4_4qDEZ',
					1: '-Its_XcGM9on3LliGPrK'
				}
			}, {
				id: 'tag2',
				text: 'css',
				notes : {
					0: '-ItsOTwSR2Ihqp0qKQR5',
					1: '-Its_XcGM9on3LliGPrK'
				}
			}],
			notes : {
				'-ItsOTwSR2Ihqp0qKQR5' : {
					modified : 1368835720293,
					created : 1367819358176,
					description : "Hopefully this will be easy to get working now blargh. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
					url : 'http://portcandle.com',
					notebook : 'My Notebook',
					title : 'Testing note',
					tags : 'test, css'
				},
				'-ItsgCvRAP0pS4_4qDEZ' : {
					modified : 1368237130164,
					created : 1367823470121,
					description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
					url : '',
					notebook : 'My Notebook',
					title : 'Testing Tags and Notebooks',
					tags : 'html'
				},
				'-Its_XcGM9on3LliGPrK' : {
					modified : 1368377527179,
					created : 1367822518831,
					description : "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
					url : 'http://anti-code.com',
					notebook : 'My Notebook',
					title : 'Tags test 3',
					tags : 'css, html'
				},
				'-Its_QdLof6mnxHKRyeq' : {
					modified : 1368792296845,
					created : 1367822490239,
					description : 'Has a different notebook and no tags initially.',
					url : '',
					notebook : 'Dev Notes',
					title : 'Testing New Notebook and no Tags',
					tags : ''
				}
			}
		},
		218374 : {
			userId : '218374',
			name : 'Tester',
			status : 'online',
			notebooks : [{
				id: 'book0',
				text: 'My Notebook',
				notes : {
					0: '-IwlTAo2LeorQYJ7u7z7',
					1: '-IwlSJWq5Kj2MMumJN-q'
				}
			}],
			tags : [{
				id: 'tag0',
				text: 'tester',
				notes : {
					0: '-IwlTAo2LeorQYJ7u7z7',
					1: '-IwlSJWq5Kj2MMumJN-q'
				}
			}],
			notes : {
				'-IwlTAo2LeorQYJ7u7z7' : {
					modified : 1370924327726,
					created : 1370924327726,
					description : "This is a test",
					url : 'http://google.com',
					notebook : 'My Notebook',
					title : 'Test',
					tags : 'tester'
				},
				'-IwlSJWq5Kj2MMumJN-q' : {
					modified : 1370924101287,
					created : 1370924101287,
					description : "New note test.",
					url : '',
					notebook : 'My Notebook',
					title : 'New',
					tags : 'tester'
				}
			}
		}
	}
});