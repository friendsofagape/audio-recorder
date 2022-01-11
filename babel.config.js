module.exports = {
	presets: [
		[
			'@babel/env',
			{
				modules: false,
				useBuiltIns: 'usage',
				corejs: 3,
			},
		],
		'@babel/react',
	],
	plugins: ['@babel/plugin-proposal-class-properties', "istanbul", "@babel/plugin-proposal-nullish-coalescing-operator",
	"@babel/plugin-proposal-object-rest-spread",
	"@babel/plugin-proposal-optional-chaining"]
};
