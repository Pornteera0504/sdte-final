module.exports = {
    reporters: [
        'default',
        [
            'jest-junit',
            {
                outputDirectory: './__test__/unit/',
                outputName: 'unit-test-result.xml'
            }
        ]
    ]
}
