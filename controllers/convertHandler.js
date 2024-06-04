function ConvertHandler() {
  const validUnits = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];

  this.getNum = function(input) {
    let result;
    let match = input.match(/[.\d\/]+/g);
    
    if (!match) {
      result = 1;
    } else {
      let numString = match[0];
      let numParts = numString.split('/');
      
      if (numParts.length > 2) {
        result = 'invalid number';
      } else {
        try {
          result = numParts.length === 1 ? parseFloat(numParts[0]) : parseFloat(numParts[0]) / parseFloat(numParts[1]);
        } catch (e) {
          result = 'invalid number';
        }
      }
    }
    
    if (isNaN(result)) {
      result = 'invalid number';
    }
    return result;
  };

  this.getUnit = function(input) {
    let result;
    let match = input.match(/[a-zA-Z]+/);
    if (match) {
      result = match[0].toLowerCase();
      if (!validUnits.includes(result)) {
        result = 'invalid unit';
      }
    } else {
      result = 'invalid unit';
    }
    return result;
  };

  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      'gal': 'L',
      'l': 'gal',
      'lbs': 'kg',
      'kg': 'lbs',
      'mi': 'km',
      'km': 'mi'
    };
    return unitMap[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function(unit) {
    const unitNames = {
      'gal': 'gallons',
      'L': 'liters',
      'l': 'liters', // Handle both 'L' and 'l'
      'lbs': 'pounds',
      'kg': 'kilograms',
      'mi': 'miles',
      'km': 'kilometers'
    };
    return unitNames[unit];
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;
    switch (initUnit.toLowerCase()) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        result = null;
    }
    return parseFloat(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
}

module.exports = ConvertHandler;
