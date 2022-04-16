import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';

import { colors } from 'assets/styles/theme';

export function customLegend(chart) {
  const legend = new am4charts.Legend();
  legend.contentAlign = 'left';
  legend.labels.template.fill = am4core.color(colors.gray[600]);
  legend.labels.template.width = 10;
  legend.itemContainers.template.padding(1, 1, 1, 1);
  legend.labels.template.truncate = true;
  legend.maxHeight = 50;
  legend.scrollable = true;

  chart.legend = legend;
  return legend;
}

export function customMarkers(legend) {
  legend.markers.template.width = 10;
  legend.markers.template.height = 10;
  const markers = legend.markers.template.children.getIndex(0);
  markers.cornerRadius(12, 12, 12, 12);
}

export function customLabels(labels, size = 13, color = colors.gray[600]) {
  labels.template.fontSize = size;
  labels.template.fill = color;
  labels.template.truncate = false;
  labels.truncate = false;
  labels.hideOversized = false;
}
export function customBullet(series) {
  const bullet = new am4charts.LabelBullet();

  bullet.label.adapter.add('text', (label, target) => {
    if (target.dataItem.valueX === 0) {
      return '';
    }
    return label;
  });
  bullet.interactionsEnabled = false;
  bullet.label.text = '{valueX}';
  bullet.label.fill = am4core.color(colors.gray[500]);
  bullet.locationX = 0.5;
  bullet.locationY = 0.3;

  series.bullets.push(bullet);
}
