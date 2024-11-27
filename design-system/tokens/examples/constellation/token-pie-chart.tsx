import React from 'react';

import ReactECharts from 'echarts-for-react';

import { getTokenValue, useThemeObserver } from '@atlaskit/tokens';

export const TokenPieChartCodeBlock = `
  //  This is using echarts-for-react to generate graphs and it's using canvas under the hood
  const data = [
    {
      value: 27,
      name: 'New subs',
      itemStyle: {
        color: getTokenValue('color.chart.categorical.1', '#1D9AAA'),
      },
      emphasis: {
        itemStyle: {
          color: getTokenValue(
            'color.chart.categorical.1.hovered',
            '#1D7F8C',
          ),
        },
      },
    },
    {
      value: 27,
      name: 'Upsells',
      itemStyle: {
        color: getTokenValue('color.chart.categorical.2', '#5E4DB2'),
      },
      emphasis: {
        itemStyle: {
          color: getTokenValue(
            'color.chart.categorical.2.hovered',
            '#352C63',
          ),
        },
      },
    },
    {
      value: 23,
      name: 'Enterprise',
      itemStyle: {
        color: getTokenValue('color.chart.categorical.3', '#D97008'),
      },
      emphasis: {
        itemStyle: {
          color: getTokenValue(
            'color.chart.categorical.3.hovered',
            '#B65C02',
          ),
        },
      },
    },
    {
      value: 11,
      name: 'Support',
      itemStyle: {
        color: getTokenValue('color.chart.categorical.4', '#943D73'),
      },
      emphasis: {
        itemStyle: {
          color: getTokenValue(
            'color.chart.categorical.4.hovered',
            '#50253F',
          ),
        },
      },
    },
    {
      value: 8,
      name: 'Premium',
      itemStyle: {
        color: getTokenValue('color.chart.categorical.5', '#09326C'),
      },
      emphasis: {
        itemStyle: {
          color: getTokenValue(
            'color.chart.categorical.5.hovered',
            '#082145',
          ),
        },
      },
    },
    {
      value: 4,
      name: 'Renewals',
      itemStyle: {
        color: getTokenValue('color.chart.categorical.6', '#8F7EE7'),
      },
      emphasis: {
        itemStyle: {
          color: getTokenValue(
            'color.chart.categorical.6.hovered',
            '#8270DB',
          ),
        },
      },
    },
  ];
`;

export const TokenPieChart = () => {
	useThemeObserver();

	const chartOptions = {
		title: {
			text: 'Revenue streams',
			textStyle: {
				color: getTokenValue('color.text'),
				fontSize: 16,
			},
		},
		legend: {
			top: '20%',
			orient: 'vertical',
			left: 'right',
			align: 'left',
			selectedMode: false,
			itemWidth: 14,
			textStyle: {
				color: getTokenValue('color.text.subtle'),
			},
		},
		tooltip: {
			trigger: 'item',
			textStyle: {
				color: getTokenValue('color.text'),
			},
			formatter: function (params: any) {
				return `${params.name}\n${params.value}%`;
			},
			borderColor: getTokenValue('elevation.surface.overlay'),
			backgroundColor: getTokenValue('elevation.surface.overlay'),
		},
		series: [
			{
				name: 'Access From',
				type: 'pie',
				radius: ['40%', '70%'],
				itemStyle: {
					borderColor: getTokenValue('elevation.surface'),
					borderWidth: 2,
				},
				avoidLabelOverlap: false,
				label: {
					show: false,
				},
				labelLine: {
					show: false,
				},
				data: [
					{
						value: 27,
						name: 'New subs',
						itemStyle: {
							color: getTokenValue('color.chart.categorical.1'),
						},
						emphasis: {
							itemStyle: {
								color: getTokenValue('color.chart.categorical.1.hovered'),
							},
						},
					},
					{
						value: 27,
						name: 'Upsells',
						itemStyle: {
							color: getTokenValue('color.chart.categorical.2'),
						},
						emphasis: {
							itemStyle: {
								color: getTokenValue('color.chart.categorical.2.hovered'),
							},
						},
					},
					{
						value: 23,
						name: 'Enterprise',
						itemStyle: {
							color: getTokenValue('color.chart.categorical.3'),
						},
						emphasis: {
							itemStyle: {
								color: getTokenValue('color.chart.categorical.3.hovered'),
							},
						},
					},
					{
						value: 11,
						name: 'Support',
						itemStyle: {
							color: getTokenValue('color.chart.categorical.4'),
						},
						emphasis: {
							itemStyle: {
								color: getTokenValue('color.chart.categorical.4.hovered'),
							},
						},
					},
					{
						value: 8,
						name: 'Premium',
						itemStyle: {
							color: getTokenValue('color.chart.categorical.5'),
						},
						emphasis: {
							itemStyle: {
								color: getTokenValue('color.chart.categorical.5.hovered'),
							},
						},
					},
					{
						value: 4,
						name: 'Renewals',
						itemStyle: {
							color: getTokenValue('color.chart.categorical.6'),
						},
						emphasis: {
							itemStyle: {
								color: getTokenValue('color.chart.categorical.6.hovered'),
							},
						},
					},
				],
			},
		],
	};

	return <ReactECharts option={chartOptions} />;
};

export default { example: TokenPieChart, code: TokenPieChartCodeBlock };
