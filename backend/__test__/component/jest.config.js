module.exports = {
    reporters: [
        'default',
        [
            'jest-junit',
            {
                outputDirectory: './__test__/component/',
                outputName: 'component-test-result.xml'
            }
        ]
    ]
}
