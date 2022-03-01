// isolate custom jobs tasks creation

'use strict';
const path = require('path');
const { NodeVM } = require('vm2');


const jobData = {
	test_a: 1
};
const jobDefinitionsPath = path.resolve(path.join(__dirname, '../scripts'));
const jobFile = 'TestSample';

const vm = new NodeVM({
	console: 'inherit',
	// disable eval, function creation
	eval: false,
	// disable wasm
	wasm: false,
	nesting: false,
	// don't wrap code within commonjs: VM.run return a value instead of a function
	wrapper: 'none',
	require: {
		// allow external modules
		external: [],
		// list of allowed builtin Node modules
		builtin: ['path'],
		// list of allowed imports
		import: [],
		// imports root path
		root: `${jobDefinitionsPath}`,
		// require restrictions apply on require chain
		context: 'sandbox'
	}
});

const scriptContent = `
	const Job = require('${path.join(jobDefinitionsPath, jobFile)}.js');
	return Job.testFunc(${JSON.stringify(jobData)});
`;

const buildResult = vm.run(scriptContent, jobFile);

console.log(buildResult);