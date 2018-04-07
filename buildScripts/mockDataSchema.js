/*
	Create mock data using json-schema.org as reference and faker.js to mock values
	http://json-schema.org/
	https://github.com/marak/Faker.js/
 */

export const schema = {
	"type": "object",
	"properties": {
		"users": {
			"type": "array",
			"minItems": 3,
			"maxItems": 5,
			"items": {
				"type": "object",
				"properties": {
					"id": {
						"type": "integer",
						"unique": true,
						"minimum": 1,
					},
					"firstName": {
						"type": "string",
						"faker": "name.firstName",
					},
					"lastName": {
						"type": "string",
						"faker": "name.lastName",
					},
					"email": {
						"type": "string",
						"format": "email",
						"faker": "internet.email",
					},
				},
				"required": ["id", "firstName", "lastName", "email"],
			},
		},
	},
	"required": ["users"],
};
