module.exports = {
    reporters: [
        'default',
        [
            'jest-junit',
            {
                outputDirectory: './__test__/e2e/',
                outputName: 'e2e-test-result.xml'
            }
        ]
    ]
}
