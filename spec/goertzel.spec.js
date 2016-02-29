// Generated by CoffeeScript 1.10.0
var Goertzel;

Goertzel = require('../build/goertzel');

describe('Goertzel', function() {
  var allFrequencies, goertzel;
  goertzel = void 0;
  allFrequencies = [697, 852, 1209, 1477];
  describe('#processSample', function() {
    beforeEach(function() {
      return goertzel = new Goertzel({
        frequencies: allFrequencies,
        sampleRate: 8000,
        threshold: 0
      });
    });
    return it('biases towards the expected frequency', function() {
      var buffer, f, frequency, i, j, k, len, len1, len2, results, sample;
      results = [];
      for (i = 0, len = allFrequencies.length; i < len; i++) {
        frequency = allFrequencies[i];
        buffer = Goertzel.Utilities.generateSine(frequency, 8000, 2000);
        for (j = 0, len1 = buffer.length; j < len1; j++) {
          sample = buffer[j];
          goertzel.processSample(sample);
        }
        for (k = 0, len2 = allFrequencies.length; k < len2; k++) {
          f = allFrequencies[k];
          if (f !== frequency) {
            expect(goertzel.energies[f] < goertzel.energies[frequency]);
          }
        }
        results.push(goertzel.refresh());
      }
      return results;
    });
  });
  describe('::Utilities#peakFilter', function() {
    it('rejects a bad signal', function() {
      var badsignal;
      badsignal = Goertzel.Utilities.peakFilter([1, 4, 65, 14, 11, 318, 0], 20);
      return expect(badsignal).toEqual(true);
    });
    return it('accepts a good signal', function() {
      var goodsignal;
      goodsignal = Goertzel.Utilities.peakFilter([0, 0, 1900, 0, 0, 0, 0], 20);
      return expect(goodsignal).toEqual(false);
    });
  });
  describe('::Utilities#blackman', function() {
    return it('performs window function on a sample', function() {
      expect(Goertzel.Utilities.exactBlackman(233, 0, 400)).toEqual(1.6025740000000053);
      expect(Goertzel.Utilities.exactBlackman(233, 1, 400)).toEqual(1.608012138277554);
      return expect(Goertzel.Utilities.exactBlackman(233, 80, 400)).toEqual(49.15691270548219);
    });
  });
  return describe('::Utilities#floatToIntSample', function() {
    return it('converts a float32 sample to int16', function() {
      return expect(Goertzel.Utilities.floatToIntSample(0.0225)).toEqual(737);
    });
  });
});
