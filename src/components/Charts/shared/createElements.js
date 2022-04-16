import * as am4charts from '@amcharts/amcharts4/charts';

import { customBullet } from './layout';

export function createSeries(chart, field, name) {
  const series = chart.series.push(new am4charts.ColumnSeries());

  series.columns.template.tooltipText = '{name}: {valueX}';
  series.name = name || field;
  series.dataFields.categoryY = 'category';
  series.dataFields.valueX = field;
  series.dataFields.valueXShow = 'totalPercent';
  series.columns.template.height = 30;
  series.dataItems.template.locations.categoryX = 0.5;
  series.stacked = true;
  series.tooltip.pointerOrientation = 'vertical';

  customBullet(series);
  chart.maskBullets = false;
  chart.paddingLeft = 30;
}
