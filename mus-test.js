


// TESTS FOR prelude

var melody1 = { tag: 'note', pitch: 'c4', dur: 250 };
var melody2 = 
    { tag: 'seq',
      left: { tag: 'note', pitch: 'd4', dur: 500 },
      right: { tag: 'note', pitch: 'c4', dur: 250 } };
var melody3 = 
    { tag: 'seq',
      left: { tag: 'note', pitch: 'd4', dur: 500 },
      right:
       { tag: 'seq',
         left: { tag: 'note', pitch: 'd4', dur: 500 },
         right: { tag: 'note', pitch: 'c4', dur: 250 } } };

jshint(answer);
eval(answer);

assert_eq(prelude(melody1), melody2,
       'Single note input prelude test');
assert_eq(prelude(melody2), melody3,
       'Double note input prelude test');

// TESTS for reverse

var melody1 = { tag: 'note', pitch: 'a4', dur: 125 };
var melody2 = 
    { tag: 'seq',
      left: 
       { tag: 'seq',
         left: { tag: 'note', pitch: 'a4', dur: 250 },
         right: { tag: 'note', pitch: 'b4', dur: 250 } },
      right:
       { tag: 'seq',
         left: { tag: 'note', pitch: 'c4', dur: 500 },
         right: { tag: 'note', pitch: 'd4', dur: 500 } } };
var melody3 = 
    { tag: 'seq',
      left:
       { tag: 'seq',
         left: { tag: 'note', pitch: 'd4', dur: 500 },
         right: { tag: 'note', pitch: 'c4', dur: 500 } },
      right:
       { tag: 'seq',
         left: { tag: 'note', pitch: 'b4', dur: 250 },
         right: { tag: 'note', pitch: 'a4', dur: 250 } } };

jshint(answer);
eval(answer);

assert_eq(reverse(melody1), melody1,
       'One note test');
assert_eq(reverse(melody2), melody3,
       'Four note test');
assert_eq(reverse(melody3), melody2,
       'Four note test backwards');

//TEST for endTime

var melody1_mus = { tag: 'note', pitch: 'a4', dur: 125 };
var melody2_mus = 
    { tag: 'seq',
      left: 
       { tag: 'seq',
         left: { tag: 'note', pitch: 'a4', dur: 250 },
         right: { tag: 'note', pitch: 'b4', dur: 250 } },
      right:
       { tag: 'seq',
         left: { tag: 'note', pitch: 'c4', dur: 500 },
         right: { tag: 'note', pitch: 'd4', dur: 500 } } };

jshint(answer);
eval(answer);

assert_eq(endTime(500, melody1_mus), 625,
       'One note test'); 
assert_eq(endTime(0, melody2_mus), 1500,
       'Four note test');


//TEST for compile without "par"

var melody1_mus = { tag: 'note', pitch: 'a4', dur: 125 };
var melody1_note = [ 
    { tag: 'note', pitch: 'a4', start: 0, dur: 125 } ];
var melody2_mus = 
    { tag: 'seq',
      left: 
       { tag: 'seq',
         left: { tag: 'note', pitch: 'a4', dur: 250 },
         right: { tag: 'note', pitch: 'b4', dur: 250 } },
      right:
       { tag: 'seq',
         left: { tag: 'note', pitch: 'c4', dur: 500 },
         right: { tag: 'note', pitch: 'd4', dur: 500 } } };
var melody2_note = [
    { tag: 'note', pitch: 'a4', start: 0, dur: 250 },
    { tag: 'note', pitch: 'b4', start: 250, dur: 250 },
    { tag: 'note', pitch: 'c4', start: 500, dur: 500 },
    { tag: 'note', pitch: 'd4', start: 1000, dur: 500 } ];
var endTime = function (time, expr) {
    if (expr.tag === 'note') return time + expr.dur;
    return endTime(endTime(time, expr.left), expr.right);
};

jshint(answer);
eval(answer);

assert_eq(compile(melody1_mus), melody1_note,
       'One note test');
assert_eq(compile(melody2_mus), melody2_note,
       'Four note test');

//TEST for compile with "par"
var melody_mus = 
    { tag: 'seq',
      left: 
       { tag: 'par',
         left: { tag: 'note', pitch: 'c3', dur: 250 },
         right: { tag: 'note', pitch: 'g4', dur: 500 } },
      right:
       { tag: 'par',
         left: { tag: 'note', pitch: 'd3', dur: 500 },
         right: { tag: 'note', pitch: 'f4', dur: 250 } } };
var melody_note = [
    { tag: 'note', pitch: 'c3', start: 0, dur: 250 },
    { tag: 'note', pitch: 'g4', start: 0, dur: 500 },
    { tag: 'note', pitch: 'd3', start: 500, dur: 500 },
    { tag: 'note', pitch: 'f4', start: 500, dur: 250 } ];

jshint(answer);
eval(answer);

assert_eq(compile(melody_mus), melody_note,
       'Four note test');