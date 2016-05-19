/**
 * Created by ega on 13.04.2016.
 */
function setHtmlCode() {
  var htmlCode = '&lt;div&gt;\n' +
    '  &lt;h1&gt;&lt;base-chart&gt; Demo&lt;/h1&gt;\n' +
    '  &lt;h2&gt;Slots:&lt;/h2&gt;\n' +
    '  &lt;p&gt;Hint: User JSON for input slots of type object/array!&lt;/p&gt;\n' +
    '  &lt;div style=\"width:50%\"&gt;\n' +
    '    &lt;form style=\"width:100%;\"&gt;\n' +
    '      &lt;label for=\"type\"&gt;&lt;h3&gt;type (String):&lt;/h3&gt;&lt;/label&gt;\n' +
    '      &lt;p&gt;Needs to be one of &lt;span id=\"validTypes\"&gt;&lt;/span&gt; or empty&lt;/p&gt;\n' +
    '      &lt;input type=\"text\" id=\"type\" value=\"line\"&gt;\n' +
    '      &lt;button id=\"btn_type\" type=\"button\"\n' +
    '                 disabled=\"disabled\"&gt;Set&lt;/button&gt;\n' +
    '      &lt;label for=\"dataColumns\"&gt;&lt;h3&gt;dataColumns (Array):&lt;/h3&gt;&lt;/label&gt;\n' +
    '      &lt;textarea id=\"dataColumns\" style=\"height:100px;width:100%;\"&gt;\n' +
    '            [[\"dataSet1\", 10, 20, 50, 100, 40, 20, 70],\n' +
    '            [\"dataSet2\", 100, 40, 10, 75, 50, 50, 90],\n' +
    '            [\"dataSet3\", 15, 30, 50, 40, 15, 120, 80]]\n' +
    '      &lt;/textarea&gt;\n' +
    '      &lt;button id=\"btn_dataColumns\" disabled=\"disabled\" \n' +
    '                 style=\"float:right;\" type=\"button\"&gt;Set&lt;/button&gt;\n' +
    '      &lt;label for=\"xLabels\"&gt;&lt;h3&gt;xLabels (Array):&lt;/h3&gt;&lt;/label&gt;\n' +
    '      &lt;textarea id=\"xLabels\" style=\"height:50px;width:100%;\"&gt;\n' +
    '            [\"Label 1\",\"Label 2\",\"Label 3\",\"Label 4\",\n' +
    '             \"Label 5\",\"Label 6\", \"Label 7\"]\n' +
    '      &lt;/textarea&gt;\n' +
    '      &lt;button id=\"btn_xLabels\" disabled=\"disabled\" \n' +
    '                 style=\"float:right;\" type=\"button\"&gt;Set&lt;/button&gt;\n' +
    '    &lt;/form&gt;\n' +
    '  &lt;/div&gt;\n' +
    '&lt;/div&gt;\n' +
    '&lt;div style=\"width:100%;height:1px;background-color:#0b0b0b;display:inline-block;\"&gt;&lt;/div&gt;\n' +
    '&lt;h2&gt;View:&lt;/h2&gt;\n' +
    '&lt;div cubx-core-crc&gt;\n' +
    '&lt;base-chart&gt;&lt;/base-chart&gt;\n' +
    '&lt;/div&gt;';
    document.getElementsByTagName("code-viewer")[0].setCode(htmlCode);
}

function setJsCode() {
  var jsCode ='&lt;script&gt;\n' +
  '    (function(){\n' +
  '        \'use strict\'\n\n' +
  '        var type = document.getElementById(\'type\')\n' +
  '        var btn_type = document.getElementById(\'btn_type\')\n' +
  '        var validTypes = document.getElementById(\'validTypes\')\n' +
  '        var dataColumns = document.getElementById(\'dataColumns\')\n' +
  '        var btn_dataColumns = document.getElementById(\'btn_dataColumns\')\n' +
  '        var xLabels = document.getElementById(\'xLabels\')\n' +
  '        var btn_xLabels = document.getElementById(\'btn_xLabels\')\n' +
  '        var baseChart = document.getElementsByTagName(\'base-chart\')[0]\n\n\n' +
  '        document.addEventListener(\'cifReady\', function() {\n' +
  '            validTypes.innerHTML = JSON.stringify(baseChart._validTypes)\n' +
  '            btn_dataColumns.removeAttribute(\'disabled\')\n' +
  '            btn_xLabels.removeAttribute(\'disabled\')\n' +
  '            btn_type.removeAttribute(\'disabled\')\n' +
  '        })\n\n' +
  '        btn_dataColumns.addEventListener(\'click\', function() {\n' +
  '            var value = dataColumns.value === \'\' ? null : JSON.parse(dataColumns.value)\n' +
  '            baseChart.setDataColumns(value)\n' +
  '        })\n\n' +
  '        btn_xLabels.addEventListener(\'click\', function() {\n' +
  '            var value = xLabels.value === \'\' ? null : JSON.parse(xLabels.value)\n' +
  '            baseChart.setXLabels(value)\n' +
  '        })\n\n' +
  '        btn_type.addEventListener(\'click\', function() {\n' +
  '            baseChart.setType(type.value)\n' +
  '        })\n' +
  '    })()\n' +
  '&lt;/script&gt;';
  document.getElementsByTagName("code-viewer")[1].setCode(jsCode);
}

function viewResultWithoutComponents() {
  document.getElementsByTagName("html-renderer")[0].setSrc("../../base-chart/demo/index.html");
}

function setHeadCode() {
  var headCode = '&lt;script src=\"../../../cubx.core.rte@1.7.0/webcomponents/webcomponents-lite.js\"&gt;&lt;/script&gt;\n' +
    '&lt;script src=\"../../../cubx.core.rte@1.7.0/crc-loader/js/main.js\" data-CRCInit.loadCIF=\"true\"&gt;&lt;/script&gt;';
  document.getElementsByTagName("code-viewer")[2].setCode(headCode);
}

function setComponentCode() {
  var componentCode ='&lt;h1&gt;&lt;base-chart&gt; Demo&lt;/h1&gt;\n' +
  '&lt;h2&gt;Slots:&lt;/h2&gt;\n\n' +
  '&lt;div cubx-core-crc&gt;\n' +
  '     &lt;demo-base-chart cubx-dependency=\"this/cubx-select/main\" &gt;&lt;/demo-base-chart&gt;\n' +
  '&lt;/div&gt;';
  document.getElementsByTagName("code-viewer")[3].setCode(componentCode);
}

function viewResultWithComponents() {
  document.getElementsByTagName("html-renderer")[1].setSrc("../../demo-base-chart/demo/index.html");
}
