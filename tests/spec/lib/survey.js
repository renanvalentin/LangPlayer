import assert from 'assert';
import Statistics from '../../../lib/Statistics';

describe('Survey', () => {

  describe('mean', () => {
    it('The mean of 2 and 4 should be 3', () => {
      assert.equal(Statistics.mean([2,4]), 3);
    });

    it('The mean should be 20', () => {
      let mean = Statistics.mean([10,25,20,15,30,20]);

      assert.equal(mean, 20);
    });
  });

  describe('variance', () => {
    it('The variance of 2 and 4 should be 1', () => {
      let mean = Statistics.mean([2,4])
        ,variance =  Statistics.variance([2,4], mean);

      assert.equal(variance, 1);
    });

    it('The variance should be 1.33', () => {
      let entries = [10, 8, 10, 12, 10, 10];

      let mean = Statistics.mean(entries)
        ,variance =  Statistics.variance(entries, mean);

      assert.equal(variance.toFixed(2), 1.33);
    });
  });

  describe('covariance', () => {
    it('The covariance should returns +3', () => {
      let covariance = Statistics.covariance(2 , { values: [2,4], mean: 3}, { values: [1,7], mean: 9});

      assert.equal(covariance, 3);
    });

    it('The covariance should be -3.33', () => {
      let a1 = [10, 25, 20, 15, 30, 20]
        , a2 = [10, 8, 10, 12, 10, 10];

      let a1Mean = Statistics.mean(a1)
        , a2Mean = Statistics.mean(a2);

      let covariance = Statistics.covariance(6, { values: a1, mean: a1Mean}, { values: a2, mean: a2Mean});

      assert.equal(covariance.toFixed(2), -3.33);
    });
  });

  describe('standard deviation', () => {
    it('The standard deviation should be 1.15', () => {
      let entries = [10, 8, 10, 12, 10, 10];
      let mean = Statistics.mean(entries);

      let standardDeviation = Statistics.standardDeviation(entries, mean);

      assert.equal(standardDeviation.toFixed(2), 1.15);
    });

    it('The standard deviation should be 6.45', () => {
      let entries = [10, 25, 20, 15, 30, 20];
      let mean = Statistics.mean(entries);

      let standardDeviation = Statistics.standardDeviation(entries, mean);

      assert.equal(standardDeviation.toFixed(2), 6.45);
    });
  });

  describe('correlation', () => {
    it('The correlation should be -0.447', () => {
      let a1 = [10, 25, 20, 15, 30, 20]
        , a2 = [10, 8, 10, 12, 10, 10];

      let a1Mean = Statistics.mean(a1)
        , a2Mean = Statistics.mean(a2);

      let correlation = Statistics.correlation(a1.length, { values: a1, mean: a1Mean}, { values: a2, mean: a2Mean});

      assert.equal(correlation.toFixed(3), -0.447);
    });
  });

});