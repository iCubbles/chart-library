/*globals c3,Q,_*/
(function () {
  'use strict';
  /**
   * Get help:
   * > Lifecycle callbacks:
   * https://www.polymer-project.org/1.0/docs/devguide/registering-elements.html#lifecycle-callbacks
   *
   */
  CubxPolymer({
    is: 'base-chart',

    // valid chart types
    _validTypes: [
      'line',
      'bar',
      'scatter',
      'step',
      'area-step',
      'spline',
      'area-spline', 'pie'
    ],

    /**
     * Manipulate an element’s local DOM when the element is constructed.
     */
    ready: function () {

    },

    cubxReady: function () {
      this._cubxReady = true;
      this._drawChart();
    },

    /**
     * Called when slot 'type' has changed
     * @param {string} type
     */
    modelTypeChanged: function (type) {
      // if cubx is not ready do nothing
      if (!this._cubxReady) { return; }

      if (typeof type === 'string' && this._validTypes.indexOf(type) === -1) {
        console.log('type : "' + type + '" is not a valid bar type. Using type "line" instead.');
        type = 'line';
      }

      this._updateChart({
        type: type || 'line'
      });
    },

    /**
     *  Called when slot 'dataColumns' has changed
     *  @param {object} dataColumns
     */
    modelDataColumnsChanged: function (dataColumns) {
      // if cubx is not ready do nothing
      if (!this._cubxReady) { return; }
      var self = this;
      var excludes = this._calculateExcludes(dataColumns);

      this._emptyChart(excludes).then(function () {
        if (dataColumns) {
          self._updateChart({
            columns: dataColumns
          });
        }
      }, function () {
        console.log('error unloading data from bar chart');
      });
    },

    /**
     * Called when slot 'xLabels' has changed
     * @param {object} xLabels
     */
    modelXLabelsChanged: function (xLabels) {
      // if cubx is not ready do nothing
      if (!this._cubxReady) { return; }

      this._updateChart({
        categories: xLabels || []
      });
    },

    /**
     * Draw chart. If no data is given on slot 'dataColumns' the chart will be initially empty
     * @private
     */
    _drawChart: function () {
      var bindto = this.$.chart;
      var self = this;
      var columns = this.getDataColumns() || [];
      var categories = this.getXLabels() || [];
      var chart;
      var chartConfig = {
        bindto: bindto,
        data: {
          columns: columns,
          type: self.getType() || 'line'
        }
      };

      if (this.getType() !== 'pie') {
        chartConfig.axis = {
          x: {
            type: 'category',
            categories: categories
          }
        };
      }

      chart = c3.generate(chartConfig);
      this._chart = chart;
    },

    /**
     * Update chart
     * @param {object} updateArgs
     * @private
     */
    _updateChart: function (updateArgs) {
      var chart = this._chart;
      var self = this;

      if (_.has(updateArgs, 'columns')) {
        chart.load({
          columns: updateArgs.columns,
          type: self.getType() || 'line'
        });
        chart.flush();
      } else if (_.has(updateArgs, 'categories')) {
        chart.load({
          categories: updateArgs.categories
        });
        chart.flush();
      } else if (_.has(updateArgs, 'type')) {

        chart.load({
          columns: self.getDataColumns() || [],
          type: updateArgs.type
        });
        chart.flush();
      }
    },

    /**
     * Unload all dataColumns currently assigned to chart
     * @private
     * @param {object} [excludes] Array of data ids to exclude when emptying chart
     * @return {object} promise
     */
    _emptyChart: function (excludes) {
      var deferred = Q.defer();
      var chart = this._chart;
      var data = chart.data();
      var allDataKeys = [];
      var dataKeys = [];

      _.forEach(data, function (dataColumn) {
        allDataKeys.push(dataColumn.id);
      });
      if (excludes) {
        dataKeys = _.difference(allDataKeys, excludes);
      } else {
        dataKeys = allDataKeys;
      }
      chart.unload({
        ids: dataKeys,
        done: function () {
          deferred.resolve();
        }
      });
      chart.flush();

      return deferred.promise;
    },

    /**
     * Helper to calculate excludes
     * @param {object} dataColumns
     * @return {object} Array of excludes
     * @private
     */
    _calculateExcludes: function (dataColumns) {
      var oldDataIds = [];
      var newDataIds = [];

      _.forEach(this._chart.data(), function (dataItem) {
        oldDataIds.push(dataItem.id);
      });

      _.forEach(dataColumns, function (dataItem) {
        newDataIds.push(dataItem[ 0 ]);
      });

      return _.intersection(oldDataIds, newDataIds);
    }
  });
}());
