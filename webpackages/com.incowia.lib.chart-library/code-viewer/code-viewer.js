(function() {
    'use strict';
    /**
     * Get help:
     * > Lifecycle callbacks:
     * https://www.polymer-project.org/1.0/docs/devguide/registering-elements.html#lifecycle-callbacks
     *
     * Access the Cubbles-Component-Model:
     * > Access slot values:
     * slot 'a': this.getA(); | this.setA(value)
     */
    CubxPolymer({
        is: 'code-viewer',

        /**
         * Manipulate an element’s local DOM when the element is created.
         */
        created: function() {
        },

        /**
         * Manipulate an element’s local DOM when the element is created and initialized.
         */
        ready: function() {
        },

        /**
         * Manipulate an element’s local DOM when the element is attached to the document.
         */
        attached: function() {
        },

      /**
       * Manipulate an element’s local DOM when the cubbles framework is initialized and ready to work.
       */
      cubxReady: function() {
        prettyPrint();
      },

      /**
       *  Observe the Cubbles-Component-Model: If value for slot 'code' has changed ...
       */
      modelCodeChanged: function(newValue) {
        // update the view
        document.getElementById(this.getId()).innerHTML = newValue;
        document.getElementById(this.getId()).className = "prettyprint";
        prettyPrint();
      }
    });
}());
