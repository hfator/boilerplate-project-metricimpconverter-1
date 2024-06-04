const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', () => {
  
  test('test 1: whole number input.', () => {
    assert.strictEqual(convertHandler.getNum('32L'),
    32,
    'correctly read a whole number input'
    );
  })  ;
  
  test('test 2: decimal number input', () => {
    assert.strictEqual(convertHandler.getNum('3.2L'),
    3.2,
    'correctly read a decimal number input'
    );
  });
  
  test('test 3: ', () => {
    assert.strictEqual(convertHandler.getNum('1/2L'), 
    0.5,
    'correctly read a fractional input'
);
  });
  
  test('test 4: ', () => {
    assert.strictEqual(convertHandler.getNum('5.4/3kg'), 
    1.8,
    'read a fractional input with a decimal'
);
  });
  
  test('test 5:  double-fraction', () => {
    assert.strictEqual(convertHandler.getNum('3/2/3kg'), 
    'invalid number'
    ,'return an error on a double-fraction'
    );
  });
  
  test('test 6: default to a numerical input of 1 when no numerical input is provided.', function(done) {
    assert.strictEqual(convertHandler.getNum('kg'), 1);
    done();
  });
  
  test('test 7: read each valid input unit.', function(done) {
    assert.strictEqual(convertHandler.getUnit('32L'), 'l');
    assert.strictEqual(convertHandler.getUnit('32gal'), 'gal');
    assert.strictEqual(convertHandler.getUnit('32lbs'), 'lbs');
    assert.strictEqual(convertHandler.getUnit('32kg'), 'kg');
    assert.strictEqual(convertHandler.getUnit('32mi'), 'mi');
    assert.strictEqual(convertHandler.getUnit('32km'), 'km');
    done();
  });
  
  test('test 8: correctly return an error for an invalid input unit.', function(done) {
    assert.strictEqual(convertHandler.getUnit('32g'), 'invalid unit');
    done();
  });
  
  test('test 9: return the correct return unit for each valid input unit.', function(done) {
    assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L');
    assert.strictEqual(convertHandler.getReturnUnit('l'), 'gal');
    assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs');
    assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km');
    assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi');
    done();
  });
  
  test('test 10: correctly return the spelled-out string unit for each valid input unit.', function(done) {
    assert.strictEqual(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.strictEqual(convertHandler.spellOutUnit('L'), 'liters');
    assert.strictEqual(convertHandler.spellOutUnit('l'), 'liters');
    assert.strictEqual(convertHandler.spellOutUnit('lbs'), 'pounds');
    assert.strictEqual(convertHandler.spellOutUnit('kg'), 'kilograms');
    assert.strictEqual(convertHandler.spellOutUnit('mi'), 'miles');
    assert.strictEqual(convertHandler.spellOutUnit('km'), 'kilometers');
    done();
  });
  
  test('test 11: correctly convert gal to L.', function(done) {
    assert.strictEqual(convertHandler.convert(1, 'gal'), 3.78541);
    done();
  });
  
  test('test 12: correctly convert L to gal.', function(done) {
    assert.strictEqual(convertHandler.convert(1, 'L'), 0.26417);
    done();
  });
  
  test('test 13: correctly convert mi to km.', function(done) {
    assert.strictEqual(convertHandler.convert(1, 'mi'), 1.60934);
    done();
  });
  
  test('test 14: correctly convert km to mi.', function(done) {
    assert.strictEqual(convertHandler.convert(1, 'km'), 0.62137);
    done();
  });
  
  test('test 15: correctly convert lbs to kg.', function(done) {
    assert.strictEqual(convertHandler.convert(1, 'lbs'), 0.45359);
    done();
  });
  
  test('test 16:s correctly convert kg to lbs.', function(done) {
    assert.strictEqual(convertHandler.convert(1, 'kg'), 2.20462);
    done();
  });
});
