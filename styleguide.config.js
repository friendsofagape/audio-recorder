const path = require('path');
const upperFirst = require('lodash/upperFirst');
const camelCase = require('lodash/camelCase');
const { name, version, repository } = require('./package.json');
const { styles, theme } = require('./styleguide.styles');

let sections = [
	{
		name: 'README',
		content: 'README.md',
	},
	{
		name: 'TailwindModal',
		components: () => {
			const componentNames = [
				'TailwindModal',
			];
			return componentNames.map(componentName => {
				const filename = upperFirst(camelCase(componentName));
				return path.resolve(__dirname, `src/components/${componentName}`, `${filename}.js`)
			});
		}
	},
	{
		name: 'Basic Recorder',
		content: 'src/components/Recorder/_readme.md',
		components: () => {
			const componentNames = [
				'Recorder','Player'
			];
			return componentNames.map(componentName => {
				const filename = upperFirst(camelCase(componentName));
				return path.resolve(__dirname, `src/components/Recorder`, `${filename}.js`)
			});
		}
	},
	{
		name: 'Waveform Player',
		content: 'src/components/WaveformPlayer/_readme.md',
		components: () => {
			const componentNames = [
				'WaveformPlayer',
			];
			return componentNames.map(componentName => {
				const filename = upperFirst(camelCase(componentName));
				return path.resolve(__dirname, `src/components/WaveformPlayer`, `${filename}.js`)
			});
		}
	},
	{
		name: 'Buffer Manupulation',
		content: 'src/components/BufferManupulation/_readme.md',
		components: () => {
			const componentNames = [
				'Trimmer',
			];
			return componentNames.map(componentName => {
				const filename = upperFirst(camelCase(componentName));
				return path.resolve(__dirname, `src/components/BufferManupulation`, `${filename}.js`)
			});
		}
	},
	{
		name: 'Waveform Editor',
		content: 'src/components/WavePlaylist/_readme.md',
		components: () => {
			const componentNames = [
				'WaveformPlaylist'
			];
			return componentNames.map(componentName => {
				const filename = upperFirst(camelCase(componentName));
				return path.resolve(__dirname, `src/components/WavePlaylist`, `${filename}.js`)
			});
		}
	},
	{
		name: 'Buffer Methods',
		content: 'src/components/BufferOptions/_readme.md',
		components: () => {
			const componentNames = [
				'BufferOptions'
			];
			return componentNames.map(componentName => {
				const filename = upperFirst(camelCase(componentName));
				return path.resolve(__dirname, `src/components/BufferOptions`, `${filename}.js`)
			});
		}
	},
	// {
	// 	name: 'Core',
	// 	content: 'src/core/README.md',
	// },
	// {
	// 	name: 'MUI Themes',
	// 	content: 'src/MuiThemes.md',
	// }
];

module.exports = {
	title: `${upperFirst(camelCase(name))} v${version}`,
	ribbon: {
		url: repository.url,
		text: 'View on GitHub'
	},
	styles,
	theme: {
        // color: {
        //   link: '#51B64B',
        //   linkHover: '#3099B9',
        //   sidebarBackground: '#013444',
        //   base: '#333',
        // },
		maxWidth: 1300,
        color: {
            base:"#3099B9",
            link: 'firebrick',
            linkHover: '#51B64B',
            sidebarBackground: '#013444',
          },
        fontFamily: {
          base: '"Open Sans", sans-serif'
        }
      },
	getComponentPathLine: (componentPath) => {
		const dirname = path.dirname(componentPath, '.js');
		const file = dirname.split('/').slice(-1)[0];
		const componentName = upperFirst(camelCase(file));
		return `import { ${componentName} } from "${name}";`;
	},
	usageMode: 'expand',
	exampleMode: 'expand',
	pagePerSection: true,
	sections,
	components: 'src/components/**/[A-Z]*.js',
	defaultExample: true,
	moduleAliases: {
		'audio-recorder-rcl': path.resolve(__dirname, 'src'),
	},
	version,
	webpackConfig: {
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
				{
					test: /\.css$/,
					loader: 'style-loader!css-loader',
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
					  // Creates `style` nodes from JS strings
					  "style-loader",
					  // Translates CSS into CommonJS
					  "css-loader",
					  // Compiles Sass to CSS
					  "sass-loader",
					],
				},
				{
					test: /\.(gif|svg|jpg|png)$/,
					loader: "file-loader",
				}
			],
		},
	},
};

