## msg structure
```js
{
	message_id: Number,
	from:{
		id: Number,
		is_bot: Boolean,
		first_name: String,
		username: String,
		language_code: String
	},
	chat:{
		id: Number,
		first_name: String,
		username: String,
		type: enum(['private','group'])
	},
	date: Timestamp,
	text: String,
	entities: [
		{
		offset: Number,
			length: Number,
			type: enum(['bot_command'])
		}
	],
	reply: {
		video,
		photo,
		videoNote,
		file,
		sticker,
		audio,
		voice,
		game,
		action,
		location,
		place
	}
}

```
