const JobTestSample = {
	testFunc(jsonJob) {
		return {
			data: {
				a: jsonJob.test_a
			}
		};
	}
};

module.exports = JobTestSample;