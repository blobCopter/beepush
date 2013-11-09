/**
 * Event
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

  attributes: {
  		Title: {
			type: 'string',
		 	required: true,
		 	maxLength: 64
		},
		Type: {
			type: 'integer',
			defaultsTo: 0 //0 ==> MANUAL
		},
		Description: {
			type: 'string',
			maxLength: 256
		},
		user_id: {
			type: 'integer',
			required: true
		},
		is_public: {
			type: 'boolean',
			defaultsTo: true
		}
  }

};
