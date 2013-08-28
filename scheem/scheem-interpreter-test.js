// Some unit tests
var assert = chai.assert;

suite('Arithmetic', function() {

    var testCases = [{
        title: '5 test',
        input: 5,
        expected: 5
    }, {
        title: '(+ 2 3) test',
        input: ['+', 2, 3],
        expected: 5

    }, {
        title: '(* 2 3) test',
        input: ['*', 2, 3],
        expected: 6
    }, {
        title: '(/ 2 3) test',
        input: ['/', 1, 2],
        expected: 0.5
    }, {
        title: '(* (/ 8 4) (+ 1 1)) test',
        input: ['*', ['/', 8, 4],
            ['+', 1, 1]
        ],
        expected: 4
    }];

    testCases.forEach(function(t) {
        test(t.title, function() {
            assert.deepEqual(evalScheem(t.input, t.env), t.expected);
        });
    })

});

suite('Variables', function() {

    var testCases = [{
        title: 'x test',
        input: 'x',
        expected: 2,
        env: {x: 2, y: 3, z: 10}
    }, {
        title: '(* y 3) test',
        input: ['*', 'y', 3],
        expected: 9,
        env: {x: 2, y: 3, z: 10}
    }, {
        title: '(/ z (+ x y)) test',
        input: ['/', 'z', ['+', 'x', 'y']],
        expected: 2,
        env: {x: 2, y: 3, z: 10}
    }];

    testCases.forEach(function(t) {
        test(t.title, function() {
            assert.deepEqual(evalScheem(t.input, t.env), t.expected);
        });
    })

});

suite('set! and define', function() {

    test('evaluation of define test',function(){
        var env = {x:2, y:3, z:10};
        var tmp = evalScheem(['define', 'a', 5], env);
        assert.deepEqual(tmp, 0);
        assert.deepEqual(env, {x:2, y:3, z:10, a:5});
    });

    test('(set! a 1) test',function(){
        var env = {x:2, y:3, z:10, a: 5};
        var tmp = evalScheem(['set!', 'a', 1], env);
        assert.deepEqual(env, {x:2, y:3, z:10, a:1});
    });

    test('(set! x 7) test',function(){
        var env = {x:2, y:3, z:10};
        var tmp = evalScheem(['set!', 'x', 7], env);
        assert.deepEqual(env, {x:7, y:3, z:10});
    });

    test('(set! y (+ x 1)) test',function(){
        var env = {x:2, y:1, z:10};
        var tmp = evalScheem(['set!', 'y', ['+', 'x', 1]], env);
        assert.deepEqual(env, {x:2, y:3, z:10});
    });

});


suite('begin', function() {

    var testCases = [{
        title: '(begin 1 2 3) test',
        input: ['begin', 1, 2, 3],
        expected: 3,
        env: {}
    }, {
        title: '(begin (+ 2 2)) test',
        input: ['begin', ['+', 2, 2]],
        expected: 4,
        env: {}
    }, {
        title: '(begin x y x) test',
        input: ['begin', 'x', 'y', 'x'],
        expected: 1,
        env: {x:1, y:2}
    }, {
        title: '(begin (set! x 5) (set! x (+ y x) x)) test',
        input: ['begin', ['set!', 'x', 5], ['set!', 'x', ['+', 'y', 'x']], 'x'],
        expected: 7,
        env: {x:1, y:2}
    }];

    testCases.forEach(function(t) {
        test(t.title, function() {
            assert.deepEqual(evalScheem(t.input, t.env), t.expected);
        });
    })

});


suite('quote', function() {

    var testCases = [{
        title: '(quote (+ 2 3)) test',
        input: ['quote', ['+', 2, 3]],
        expected: ['+', 2, 3],
        env: {}
    }, {
        title: '(quote (quote (+ 2 3))) test',
        input: ['quote', ['quote', ['+', 2, 3]]],
        expected: ['quote', ['+', 2, 3]],
        env: {}
    }];

    testCases.forEach(function(t) {
        test(t.title, function() {
            assert.deepEqual(evalScheem(t.input, t.env), t.expected);
        });
    })

});


suite('less than', function() {

    var testCases = [{
        title: '(< 2 2) test',
        input: ['<', 2, 2],
        expected: '#f',
        env: {}
    }, {
        title: '(< 2 3) test',
        input: ['<', 2, 3],
        expected: '#t',
        env: {}
    }, {
        title: '(< (+ 1 1) (+ 2 3)) test',
        input: ['<', ['+', 1, 1], ['+', 2, 3]],
        expected: '#t',
        env: {}
    }];

    testCases.forEach(function(t) {
        test(t.title, function() {
            assert.deepEqual(evalScheem(t.input, t.env), t.expected);
        });
    })

});

suite('cons, car and cdr', function() {

    var testCases = [{
        title: "(cons 1 '(2 3)) test",
        input: ['cons', 1, ['quote', [2, 3]]],
        expected: [1, 2, 3],
        env: {}
    }, {
        title: "(cons '(1 2) '(3 4)) test",
        input: ['cons', ['quote', [1, 2]], ['quote', [3, 4]]],
        expected: [[1, 2], 3, 4],
        env: {}
    }, {
        title: "(car '((1 2) 3 4)) test",
        input: ['car', ['quote', [[1, 2], 3, 4]]],
        expected: [1, 2],
        env: {}
    }, {
        title: "(cdr '((1 2) 3 4)) test",
        input: ['cdr', ['quote', [[1, 2], 3, 4]]],
        expected: [3, 4],
        env: {}
    }];

    testCases.forEach(function(t) {
        test(t.title, function() {
            assert.deepEqual(evalScheem(t.input, t.env), t.expected);
        });
    })

});

suite('Conditionals', function() {

    var testCases = [{
        title: '(if (= 1 1) 2 3) test',
        input: ['if', ['=', 1, 1], 2, 3],
        expected: 2,
        env: {}
    }, {
        title: '(if (= 1 0) 2 3) test',
        input: ['if', ['=', 1, 0], 2, 3],
        expected: 3,
        env: {}
    }, {
        title: '(if (= 1 1) 2 error) test',
        input: ['if', ['=', 1, 1], 2, 'error'],
        expected: 2,
        env: {}
    }, {
        title: '(if (= 1 1) error 3) test',
        input: ['if', ['=', 1, 0], 'error', 3],
        expected: 3,
        env: {}
    }, {
        title: '(if (= 1 1) (if (= 2 3) 10 11) 12) test',
        input: ['if', ['=', 1, 1],['if', ['=', 2, 3], 10, 11], 12],
        expected: 11,
        env: {}
    }];

    testCases.forEach(function(t) {
        test(t.title, function() {
            assert.deepEqual(evalScheem(t.input, t.env), t.expected);
        });
    })

});


suite('Errors', function() {

    var testCases = [{
        title: 'You can only add numbers',
        input: ['+', 'dog', 'cat'],
        env: {}
    }, {
        title: 'You can only subract numbers',
        input: ['-', 'dog', 'cat'],
        env: {}
    }, {
        title: 'You can only multiply numbers',
        input: ['*', 'dog', 'cat'],
        env: {}
    }, {
        title: 'You can only divide numbers',
        input: ['/', 'dog', 'cat'],
        env: {}
    }, {
        title: 'You can only set variables already defined',
        input: ['set!', 'x', 5],
        env: {}
    }, {
        title: "quote should have exactly 2 argumemts. ('quote) is not valid",
        input: ['quote'],
        env: {}
    }, {
        title: "quote should have exactly 2 argumemts. ('x 3) is not valid",
        input: ['quote', 'x', 3],
        env: {}
    }];

    testCases.forEach(function(t) {
        test(t.title, function() {
            assert.throws(function(){
                evalScheem(t.input, t.env);
            });
        });
    })

});

