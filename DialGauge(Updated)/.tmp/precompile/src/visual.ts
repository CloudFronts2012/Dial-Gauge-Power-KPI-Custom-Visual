module powerbi.extensibility.visual.dg5AAA90EFEFE747CB9357C4FC19B85A58  {

    "use strict";
    export type DataType = { x: any, y: any };
    export class ConfigGauge {
        size: number;
        fontsize: number;
        label: string;
        minVal: number;
        maxVal: number;
        majorTicks: number;
        minorTicks: number;
        raduis: number;
        cx: number;
        cy: number;
        range: number;
        greenColor: string;
        yellowColor: string;
        redColor: string;
        transitionDuration: number;
        greenZones: any;
        yellowZones: any;
        redZones: any;
        greenZonesName: string;
        yellowZonesName: string;
        redZonesName: string;
        PointerName: string;
    }
    export var gaugeChartRoleNames = {
        min: 'min',
        max: 'max',
        yStart: 'yellowStart',
        yEnd: 'yellowEnd',
        rStart: 'redStart',
        rEnd: 'redEnd',
        pointerValue: 'pointerValue',
        percentage: 'percentage',
        chartName: 'chartName'
    }

    interface GaugeChartModel {
        dataPoints: GaugeDataPoint[];
        settings: GaugeChartSettings;
    };


    interface GaugeChartSettings {
        generalFont: {
            chartnamefontsize: number;
            minmaxfontsize: number;
            currentfontsize: number;
            percentagefontsize: number;
       
        };
        generalPercentage: {
            show: boolean;
            toggle: boolean;
            percdecimalprecision: number;
        };
        generalLegend: {
            show: boolean;
        };
        threeD: {
            show: boolean;
        };
        reverse: {
            show: boolean;
        };
        generalFormat: {
            format: boolean;
            decimalprecision: number;
            lead: string;
            trail: string;
        };
        chartToggle: {
            show: boolean;

        };
        currentToggle: {
            show: boolean;
        };

    }

   
    interface GaugeDataPoint {
        min: number;
        max: number;
        yStart: number;
        yEnd: number;
        rStart: number;
        rEnd: number;
        pointerValue: number;
        percentage: number;
        chartname: string;
        fontcolor: string;
        minmaxcolor: string;
        actualcolor: string;
        targetcolor: string;
        needlecolor: string;
        centrecolor: string;
        rimcolor: string;
        bodycolor: string;
        fontsize: number;
        selectionId: powerbi.visuals.ISelectionId;
    };


    function getCalc(viewModel: GaugeDataPoint): number {

        var test = viewModel.max;
       
        return 11110;
    }


    function visualTransform(options: VisualUpdateOptions, host: IVisualHost): GaugeChartModel {
        let dataViews = options.dataViews;
        var gaugeModel: GaugeChartModel;

        if (!dataViews) {
            return;
        }


        let gaugeDataPoint: GaugeDataPoint = {
            min: 0,
            max: 100,
            yStart: 0,
            yEnd: 0,
            rStart: 0,
            rEnd: 0,
            pointerValue: -99999,
            percentage: -99999,
            chartname: '',
            fontcolor: '#000000',
            minmaxcolor: '#109618',
            actualcolor: '#FF9900',
            targetcolor: '#DC3912',
            needlecolor: '#E67459',
            centrecolor: '#4684EE',
            rimcolor: '#CCCCCC',
            bodycolor: '#FFFFFF',
            fontsize: 12,
            selectionId: <any>''

        }

      

        let defaultSettings: GaugeChartSettings = {
            generalFont: {
                chartnamefontsize: 20,
                minmaxfontsize: 15,
                currentfontsize: 19,
                percentagefontsize: 22
                

            },
            generalPercentage: {
                show: true,
                toggle: true,
                percdecimalprecision: 2
            },
            reverse: {
                show: false
            },
            threeD: {
                show: false
            },
            generalLegend: {
                show: false
            },
            generalFormat: {
                format: false,
                decimalprecision: 2,
                lead: "",
                trail: ""
            },
            chartToggle: {
                show: true
            },
            currentToggle: {
                show: true
            }
        };

        let viewGauge: GaugeChartModel = {
            dataPoints: [],
            settings: <GaugeChartSettings>{}
        };


        if (!dataViews
            || !dataViews[0]
            || !dataViews[0].categorical
            || !dataViews[0].categorical.values)
            return viewGauge;


        var category,
            categoryValues,
            categoryValuesLen = 1;

        let categorical = dataViews[0].categorical;
        let gaugeDataPoints: GaugeDataPoint[] = [];
        let objects = dataViews[0].metadata.objects;
        let colorPalette: IColorPalette = host.colorPalette;
        let gaugeChartSettings: GaugeChartSettings = {
            generalFont: {
                chartnamefontsize: getValue<number>(objects, 'generalFont', 'chartnamefontsize', defaultSettings.generalFont.chartnamefontsize),
                minmaxfontsize: getValue<number>(objects, 'generalFont', 'minmaxfontsize', defaultSettings.generalFont.minmaxfontsize),
                currentfontsize: getValue<number>(objects, 'generalFont', 'currentfontsize', defaultSettings.generalFont.currentfontsize),
                percentagefontsize: getValue<number>(objects, 'generalFont', 'percentagefontsize', defaultSettings.generalFont.percentagefontsize)
            },
            generalPercentage: {
                show: getValue<boolean>(objects, 'generalPercentage', 'show', defaultSettings.generalPercentage.show),
                toggle: getValue<boolean>(objects, 'generalPercentage', 'toggle', defaultSettings.generalPercentage.toggle),
                percdecimalprecision: getValue<number>(objects, 'generalPercentage', 'percdecimalprecision', defaultSettings.generalPercentage.percdecimalprecision)
            },
            reverse: {
                show: getValue<boolean>(objects, 'reverse', 'show', defaultSettings.reverse.show),
            },
            threeD: {
                show: getValue<boolean>(objects, 'threeD', 'show', defaultSettings.threeD.show),
            },
            generalLegend: {
                show: getValue<boolean>(objects, 'generalLegend', 'show', defaultSettings.generalLegend.show),
            },
            generalFormat: {
                format: getValue<boolean>(objects, 'generalFormat', 'format', defaultSettings.generalFormat.format),
                decimalprecision: getValue<number>(objects, 'generalFormat', 'decimalprecision', defaultSettings.generalFormat.decimalprecision),
                lead: getValue<string>(objects, 'generalFormat', 'lead', defaultSettings.generalFormat.lead),
                trail: getValue<string>(objects, 'generalFormat', 'trail', defaultSettings.generalFormat.trail),
            },
            chartToggle: {
                show: getValue<boolean>(objects, 'chartToggle', 'show', defaultSettings.chartToggle.show),
            },
            currentToggle: {
                show: getValue<boolean>(objects, 'currentToggle', 'show', defaultSettings.currentToggle.show),
            }
        };



        for (let k = 0, len = categoryValuesLen; k < len; k++) {


            var maximum: number = undefined, minimum: number = undefined,
                redstart: number = undefined, redend: number = undefined,
                yellowstrat: number = undefined, yellowend: number = undefined,
                pointValue: number = undefined, percValue: number = undefined,
                cName: string = undefined;

            let minmaxdefaultColor: Fill = {
                solid: {
                    color: '#109618'
                }
            };

            let actualdefaultColor: Fill = {
                solid: {
                    color: '#FF9900'
                }
            };
            let targetdefaultColor: Fill = {
                solid: {
                    color: '#DC3912'
                }
            };
            let needledefaultColor: Fill = {
                solid: {
                    color: '#E67459'
                }
            };
            let centredefaultColor: Fill = {
                solid: {
                    color: '#4684EE'
                }
            };
            let rimdefaultColor: Fill = {
                solid: {
                    color: '#CCCCCC'
                }
            };
            let bodydefaultColor: Fill = {
                solid: {
                    color: '#FFFFFF'
                }
            };
            let fontdefaultColor: Fill = {
                solid: {
                    color: '#333333'
                }
            };

            var values = categorical.values;
            var metadataColumns = dataViews[0].metadata.columns;



            for (var j = 0; j < categorical.values.length; j++) {

                var col = categorical.values[j].source
                var currentVal = categorical.values[j].values[k] || 0;
                var datavaluemax = categorical.values[j];


                if (col && col.roles) {
                    if (col.roles[gaugeChartRoleNames.max]) {
                        maximum = <number>currentVal;
                    } else if (col.roles[gaugeChartRoleNames.min]) {
                        minimum = <number>currentVal;
                    } else if (col.roles[gaugeChartRoleNames.rStart]) {
                        redstart = <number>currentVal;
                    } else if (col.roles[gaugeChartRoleNames.rEnd]) {
                        redend = <number>currentVal;
                    } else if (col.roles[gaugeChartRoleNames.yStart]) {
                        yellowstrat = <number>currentVal;
                    } else if (col.roles[gaugeChartRoleNames.yEnd]) {
                        yellowend = <number>currentVal;
                    } else if (col.roles[gaugeChartRoleNames.percentage]) {
                        percValue = <number>currentVal;
                    } else if (col.roles[gaugeChartRoleNames.pointerValue]) {
                        pointValue = <number>currentVal;
                    } else if (col.roles[gaugeChartRoleNames.chartName]) {
                        cName = <string>currentVal;
                    }

                }
            }

            if (maximum === undefined) {
                maximum = gaugeDataPoint.max;
            }
            if (minimum === undefined) {
                minimum = gaugeDataPoint.min;
            }

            if (maximum === minimum) {
                if (maximum === 0)
                    maximum = gaugeDataPoint.max;
                if (!(minimum === 0))
                    minimum = gaugeDataPoint.min;
            }
            if (minimum > maximum) {
                var tempmin = minimum;
                minimum = maximum;
                maximum = tempmin;
            }

            if (redstart === undefined) {
                redstart = gaugeDataPoint.rStart;
            }
            if (redend === undefined) {
                redend = gaugeDataPoint.rEnd;
            }
            if (yellowstrat === undefined) {
                yellowstrat = gaugeDataPoint.yStart;
            }
            if (yellowend === undefined) {
                yellowend = gaugeDataPoint.yEnd;
            }
            if (percValue === undefined) {
                percValue = gaugeDataPoint.percentage;
            }
            if (pointValue === undefined) {
                pointValue = gaugeDataPoint.pointerValue;
            }

            if (cName === undefined) {
                cName = gaugeDataPoint.chartname;
            }
            if (redstart > redend) {
                var tempred = redstart;
                redstart = redend;
                redend = tempred;
            }
            if (yellowstrat > yellowend) {
                var tempyellow = yellowstrat;
                yellowstrat = yellowend;
                yellowend = tempyellow;
            }

            if (maximum < yellowend) {
                maximum = yellowend;
            }
            if (maximum < redend) {
                maximum = redend;
            }

            if (minimum > yellowstrat) {
                minimum = yellowstrat;
            }
            if (minimum > redstart) {
                minimum = redstart;
            }


            if (!isNaN(maximum) && !isNaN(minimum) &&
                !isNaN(redstart) && !isNaN(redend) &&
                !isNaN(yellowstrat) && !isNaN(yellowend) &&
                !isNaN(pointValue) && !isNaN(percValue)) {           

                gaugeDataPoints.push({
                    max: maximum,
                    min: minimum,
                    rStart: redstart,
                    rEnd: redend,
                    yStart: yellowstrat,
                    yEnd: yellowend,
                    pointerValue: pointValue,
                    percentage: percValue,
                    chartname: cName,
                    fontcolor: getValue<Fill>(objects, 'colorSelector', 'font', fontdefaultColor).solid.color,
                    minmaxcolor: getValue<Fill>(objects, 'colorSelector', 'minmax', minmaxdefaultColor).solid.color,
                    actualcolor: getValue<Fill>(objects, 'colorSelector', 'actual', actualdefaultColor).solid.color,
                    targetcolor: getValue<Fill>(objects, 'colorSelector', 'target', targetdefaultColor).solid.color,
                    needlecolor: getValue<Fill>(objects, 'colorSelector', 'needle', needledefaultColor).solid.color,
                    centrecolor: getValue<Fill>(objects, 'colorSelector', 'centre', centredefaultColor).solid.color,
                    rimcolor: getValue<Fill>(objects, 'colorSelector', 'rim', rimdefaultColor).solid.color,
                    bodycolor: getValue<Fill>(objects, 'colorSelector', 'body', bodydefaultColor).solid.color, 
                    fontsize: 12,
                    selectionId: host.createSelectionIdBuilder()
                        .withCategory(category, k)
                        .createSelectionId()

                });
            }
        }


        return {
            dataPoints: gaugeDataPoints,
            settings: gaugeChartSettings,

        };
    }

 

    export class Visual implements IVisual {

        private target: HTMLElement;
        private svg: d3.Selection<SVGElement>;
        private host: IVisualHost;
        private text: d3.Selection<SVGElement>;
        private model: GaugeChartModel;
        private dataView: DataView;
        private config: ConfigGauge;
        private selectionManager: ISelectionManager;
        private tooltipServiceWrapper: ITooltipServiceWrapper;
        private gaugeChartSettings: GaugeChartSettings;
        private locale: string;
        private gaugeDataPoint: GaugeDataPoint[];
        private selectionIdBuilder: ISelectionIdBuilder;



        public initConfig() {
            this.config = new ConfigGauge();
            this.config.label = "sample";
            this.config.majorTicks = 5;
            this.config.minorTicks = 2;
            this.config.greenColor = "#109618";
            this.config.yellowColor = "#FF9900";
            this.config.redColor = "#DC3912";
            this.config.transitionDuration = 500;
            this.config.greenZonesName = "Max</br>";
            this.config.redZonesName = "Actual</br>";
            this.config.yellowZonesName = "Target</br>";
            this.config.PointerName = "";
        }

        public initConfigOnRezise(Height: number, Width: number) {         
            var size = 250;          
            if (Height > Width) {
                size = Width;
            }
            else {
                size = Height;
            }

            this.config.size = size;
            this.config.fontsize = (Width + Height )/ 2;
            this.config.size = this.config.size * 0.9;
            this.config.raduis = this.config.size * 0.97 / 2;
            this.config.cx = Width/2;
            this.config.cy = this.config.size / 2;
            this.svg.selectAll("*").remove();
        }

        public getFormattedValue(num: number, decprec: number, lead: string, trail: string): string {

            let value = num.toFixed(decprec);
            let formattedValue = lead + value + trail;
            return formattedValue;
        }

        public getFormattedValueKM(num: number, decprec: number, lead: string , trail: string): string {
            let formattedValue,value, round;

            if (999 < num && num < 999999) {
                value = (num / 1000).toFixed(decprec);
                round = (num / 1000).toFixed(decprec);
                formattedValue = lead + round + "K " + trail;
            }
            else if (num > 999999) {
                value = (num / 1000000).toFixed(decprec);
                round = (num / 1000000).toFixed(decprec);
                formattedValue = lead + round + "M " + trail;
            }
            else
                formattedValue = lead + round + trail;
                                              
            return formattedValue;
        }


        constructor(options: VisualConstructorOptions) {
            this.host = options.host;
            this.target = options.element;
            let svg = this.svg = d3.select(options.element)
                .append('svg')
                .classed('svg', true);
            this.text = svg.append('text');
            this.tooltipServiceWrapper = createTooltipServiceWrapper(this.host.tooltipService, options.element);
            this.selectionManager = options.host.createSelectionManager();
            this.initConfig();
            this.locale = options.host.locale;
            this.selectionIdBuilder = options.host.createSelectionIdBuilder();


        }

        public update(options: VisualUpdateOptions) {

            let viewModel: GaugeChartModel = visualTransform(options, this.host);
            let selectionManager = this.selectionManager;
            let allowInteractions = this.host.allowInteractions;
            let settings = this.gaugeChartSettings = viewModel.settings;

            var dataView = options.dataViews[0];
            var viewport = options.viewport;
            this.gaugeDataPoint = viewModel.dataPoints;
            this.initConfig();
            this.initConfigOnRezise(viewport.height, viewport.width);

            this.config.minVal = viewModel.dataPoints[0].min;
            this.config.maxVal = viewModel.dataPoints[0].max;
            this.config.range = this.config.maxVal - this.config.minVal;
            this.config.greenZones = [{ from: viewModel.dataPoints[0].min, to: viewModel.dataPoints[0].max }];
            this.config.yellowZones = [{ from: viewModel.dataPoints[0].yStart, to: viewModel.dataPoints[0].yEnd }];
            this.config.redZones = [{ from: viewModel.dataPoints[0].rStart, to: viewModel.dataPoints[0].rEnd }];

            var height = viewport.height;
            var width = viewport.width;
            var pointerText;
            var majorText;
            var percentageText;
            var needlecolor, centrecolor, greencolor, yellowcolor, redcolor, rimcolor, bodycolor, fontcolor;
            greencolor = this.gaugeDataPoint[0].minmaxcolor;
            yellowcolor = this.gaugeDataPoint[0].actualcolor;
            redcolor = this.gaugeDataPoint[0].targetcolor;
            needlecolor = this.gaugeDataPoint[0].needlecolor;
            centrecolor = this.gaugeDataPoint[0].centrecolor;
            rimcolor = this.gaugeDataPoint[0].rimcolor;
            bodycolor = this.gaugeDataPoint[0].bodycolor;
            fontcolor = this.gaugeDataPoint[0].fontcolor;



            this.svg.attr({
                width: width,
                height: height,

            });

            let shadowcircle = this.svg.append('circle').classed('shadowcircle', true);
            let circle1 = this.svg.append('circle').classed('circle', true);
            let circle2 = this.svg.append('circle').classed('circle', true);
            let circle3 = this.svg.append('circle').classed('circle', true);

            var defs = this.svg.append("defs");
            
            var filter = defs.append("filter")
                .attr("id", "drop-shadow")
                .attr("height", "130%");

            filter.append("feGaussianBlur")
                .attr("in", "SourceAlpha")
                .attr("stdDeviation", 5)
                .attr("result", "blur");
            filter.append("feOffset")
                .attr("in", "blur")
                .attr("dx", 0)
                .attr("dy", 7)
                .attr("result", "offsetBlur");
            var feMerge = filter.append("feMerge");
            feMerge.append("feMergeNode")
                .attr("in", "offsetBlur")
            feMerge.append("feMergeNode")
                .attr("in", "SourceGraphic");

            if (viewModel.settings.threeD.show)
                {
            shadowcircle.attr({
                cx: this.config.cx - this.config.cx * 0.0000,
                cy: this.config.cy + this.config.cy*0.0000,
                r: this.config.raduis

            }).style({
                'fill': rimcolor,
                'stroke-width': "0.5px",
                'stroke': "000",
                'filter': 'url(#drop-shadow)',
                'opacity': 0.5
                    });
            }

            circle1.attr({
                cx: this.config.cx,
                cy: this.config.cy,
                r: this.config.raduis

            }).style({
                'fill': rimcolor,
                'stroke-width': "0.5px",
                'stroke': "000",
            });

            circle2.attr({
                cx: this.config.cx,
                cy: this.config.cy,
                r: 0.9 * this.config.raduis

            }).style({
                'fill': bodycolor,
                'stroke-width': "2px",
                'stroke': "e0e0e0",

            });



            if (viewModel.settings.generalLegend.show)
            {

            let legendyel = this.svg.append('circle').classed('legyel', true);
            let legendred = this.svg.append('circle').classed('legred', true);
            let legendgre = this.svg.append('circle').classed('leggre', true);
            let legendyeltext = this.svg.append('text').classed('legyeltext', true);
            let legendredtext = this.svg.append('text').classed('legredtext', true);
            let legendgretext = this.svg.append('text').classed('leggretext', true);

            legendyeltext.attr({
                x: this.config.cx / 13,
                y: this.config.cy * 0.1 + this.config.fontsize / 120,
                'font-size': this.config.fontsize/35
            }).text("Target").style({
                'fill': '#000',
                "stroke-width": "0px"
            });

            legendredtext.attr({
                x: this.config.cx / 13,
                y: 2*this.config.cy * 0.1 + this.config.fontsize / 120,
                'font-size': this.config.fontsize / 35
            }).text("Actual").style({
                'fill': '#000',
                "stroke-width": "0px"
            });

            legendgretext.attr({
                x: this.config.cx / 13,
                y: 3*this.config.cy * 0.1 + this.config.fontsize / 120,
                'font-size': this.config.fontsize / 35
            }).text("Maximum").style({
                'fill': '#000',
                "stroke-width": "0px"
            });

            legendyel.attr({
                cx: this.config.cx / 20,
                cy: this.config.cy*0.1,
                r: this.config.size/70

            }).style({
                'fill': yellowcolor,
                'stroke-width': "0.5px",
                'stroke': "000"
                });

            legendred.attr({
                cx: this.config.cx / 20,
                cy: 2*this.config.cy * 0.1,
                r: this.config.size / 70

            }).style({
                'fill': redcolor,
                'stroke-width': "0.5px",
                'stroke': "000"
                });

            legendgre.attr({
                cx: this.config.cx / 20,
                cy: 3 * this.config.cy * 0.1,
                r: this.config.size / 70

            }).style({
                'fill': greencolor,
                'stroke-width': "0.5px",
                'stroke': "000"
                    });
            }

            for (var index in this.config.greenZones) {
                this.drawBand(this.config.greenZones[index].from, this.config.greenZones[index].to, greencolor, this.config.greenZonesName, viewModel, "green");
            }

            if (this.config.yellowZones[index].to >= this.config.redZones[index].to) {
                for (var index in this.config.yellowZones) {
                    this.drawBand(this.config.yellowZones[index].from, this.config.yellowZones[index].to, yellowcolor, this.config.yellowZonesName, viewModel, "yellow");
                }

                for (var index in this.config.redZones) {
                    this.drawBand(this.config.redZones[index].from, this.config.redZones[index].to, redcolor, this.config.redZonesName, viewModel, "red");

                }
            }
            else {
                for (var index in this.config.redZones) {
                    this.drawBand(this.config.redZones[index].from, this.config.redZones[index].to, redcolor, this.config.redZonesName, viewModel, "red");
                }

                for (var index in this.config.yellowZones) {
                    this.drawBand(this.config.yellowZones[index].from, this.config.yellowZones[index].to, yellowcolor, this.config.yellowZonesName, viewModel, "yellow");
                }
            }

            this.config.label = viewModel.dataPoints[0].chartname;


            var fontSize = this.config.fontsize / 300;
            var chartnamefsf = viewModel.settings.generalFont.chartnamefontsize;
            var currentfsf = viewModel.settings.generalFont.currentfontsize;
            var minmaxfsf = viewModel.settings.generalFont.minmaxfontsize;
            var percfsf = viewModel.settings.generalFont.percentagefontsize;



            if (viewModel.settings.chartToggle.show)
                {
            this.svg.data(viewModel.dataPoints).append('text').classed("text", true).attr({
                x: this.config.cx,
                y: this.config.cy / 1.5 + (fontSize * chartnamefsf)/2,
                'font-size': fontSize * chartnamefsf + "px",
            }).text(this.config.label).style({
                'fill': fontcolor,
                'text-anchor': 'middle',
                "stroke-width": "0px"

            });
            }


            if (viewModel.settings.generalFormat.format) {
                pointerText = this.getFormattedValueKM(viewModel.dataPoints[0].pointerValue, viewModel.settings.generalFormat.decimalprecision, viewModel.settings.generalFormat.lead, viewModel.settings.generalFormat.trail)
            }
            else {
                pointerText = this.getFormattedValue(viewModel.dataPoints[0].pointerValue, viewModel.settings.generalFormat.decimalprecision, viewModel.settings.generalFormat.lead, viewModel.settings.generalFormat.trail)
            }

            if (viewModel.dataPoints[0].pointerValue == -99999)
                pointerText = "";

            this.svg.select(".RedEndContainer").remove();
            var perContainer = this.svg.append("svg:g").attr("class", "RedEndContainer");

            if (viewModel.settings.currentToggle.show) {
                perContainer.append("text").attr({
                    x: this.config.cx,
                    y: this.config.cy * 1.7,
                    'font-size': fontSize * currentfsf + "px",
                }).text(pointerText).style({
                    'fill': fontcolor,
                    'text-anchor': 'middle',
                    "stroke-width": "0px"
                });
            }
            this.svg.select(".PercentageContainer").remove();
            var perContainer = this.svg.append("svg:g").attr("class", "PercentageContainer");

            if (viewModel.settings.generalPercentage.toggle) {
                percentageText = (viewModel.dataPoints[0].percentage * 100).toFixed(viewModel.settings.generalPercentage.percdecimalprecision) + "%"
            }
            else {
                percentageText = (viewModel.dataPoints[0].percentage * 100).toFixed(viewModel.settings.generalPercentage.percdecimalprecision);
            }

            if (viewModel.dataPoints[0].percentage == -99999)
                percentageText = "";

            if (viewModel.settings.generalPercentage.show) {

                perContainer.append("svg:text").attr({
                    x: this.config.cx,
                    y: this.config.cy * 2.2,
                    'font-size': fontSize * percfsf + "px",
                }).text(percentageText).style({
                    'fill': '#333',
                    'text-anchor': 'middle',
                    "stroke-width": "0px"
                });

            }

            var majorDelta = this.config.range / (this.config.majorTicks - 1);

            for (var major = viewModel.dataPoints[0].min; major <= viewModel.dataPoints[0].max; major += majorDelta) {
                var minorDelta = majorDelta / this.config.minorTicks;
                for (var minor = major + minorDelta; minor < Math.min(major + majorDelta, this.config.maxVal); minor += minorDelta) {
                    var point1 = this.valueToPoint(minor, 0.75);
                    var point2 = this.valueToPoint(minor, 0.85);

                    this.svg.append("svg:line")
                        .attr("x1", point1.x)
                        .attr("y1", point1.y)
                        .attr("x2", point2.x)
                        .attr("y2", point2.y)
                        .style("stroke", "#666")
                        .style("stroke-width", "1px");
                }
                var point1 = this.valueToPoint(major, 0.7);
                var point2 = this.valueToPoint(major, 0.85)
                this.svg.append("svg:line")
                    .attr("x1", point1.x)
                    .attr("y1", point1.y)
                    .attr("x2", point2.x)
                    .attr("y2", point2.y)
                    .style("stroke", "#333")
                    .style("stroke-width", "2px");

                if (major == viewModel.dataPoints[0].min || major == viewModel.dataPoints[0].max) {
                    var point = this.valueToPoint(major, 0.63);
                    var reverseminmax;

                    if (viewModel.settings.reverse.show)
                        reverseminmax = viewModel.dataPoints[0].max;
                    else
                        reverseminmax = viewModel.dataPoints[0].min;

                    if (major == reverseminmax)
                    {
                        if (viewModel.settings.generalFormat.format) {
                            majorText = this.getFormattedValueKM(viewModel.dataPoints[0].min, viewModel.settings.generalFormat.decimalprecision, viewModel.settings.generalFormat.lead, viewModel.settings.generalFormat.trail)
                        }
                        else {
                            majorText = this.getFormattedValue(viewModel.dataPoints[0].min, viewModel.settings.generalFormat.decimalprecision, viewModel.settings.generalFormat.lead, viewModel.settings.generalFormat.trail)
                        }
                    }
                    else
                    {
                        if (viewModel.settings.generalFormat.format) {
                            majorText = this.getFormattedValueKM(viewModel.dataPoints[0].max, viewModel.settings.generalFormat.decimalprecision, viewModel.settings.generalFormat.lead, viewModel.settings.generalFormat.trail)
                        }
                        else {
                            majorText = this.getFormattedValue(viewModel.dataPoints[0].max, viewModel.settings.generalFormat.decimalprecision, viewModel.settings.generalFormat.lead, viewModel.settings.generalFormat.trail)
                        }
                    }

                    if (majorText == "undefined" && viewModel.settings.generalFormat.format)
                        majorText = "0K";

                    this.svg.append("svg:text")
                        .attr("x", point.x)
                        .attr("y", point.y)
                        .attr("text-anchor", major == viewModel.dataPoints[0].min ? "start" : "end")
                        .text(majorText)
                        .style("font-size", fontSize * minmaxfsf + "px")
                        .style("fill", fontcolor)
                        .style("stroke-width", "0px")
                        .style("transform", "scale(1,1)");
                }
               
            }

            var pointerContainer = this.svg.append("svg:g").attr("class", "pointerContainer");
            var midValue = (viewModel.dataPoints[0].min + viewModel.dataPoints[0].max) / 2;
            var pointerPath = this.buildPointerPath(midValue);
            var pointerLine = d3.svg.line<DataType>()
                .x(function (d) { return d.x })
                .y(function (d) { return d.y; })
                .interpolate("basis");

            var value = viewModel.dataPoints[0].pointerValue;
            var pointerValue = value;
            if (value > viewModel.dataPoints[0].max) pointerValue = viewModel.dataPoints[0].max + 0.02 * this.config.range;
            else if (value < viewModel.dataPoints[0].min) pointerValue = viewModel.dataPoints[0].min - 0.02 * this.config.range;
            var targetRotation = (this.valueToDegrees(pointerValue) - 90);
            var currentRotation = targetRotation;
            var step = 1;
            var rotation = currentRotation + (targetRotation - currentRotation) * step;

            if (viewModel.settings.reverse.show)
                rotation = rotation * (-1);

            pointerContainer.selectAll("path")
                .data([pointerPath])
                .enter()
                .append("svg:path")
                .attr("d", pointerLine)
                .style("fill", needlecolor)
                .style("fill-opacity", 0.8)
                .style("stroke", needlecolor)
                .style("stroke-width", 1.5)
                .attr("transform", "translate(" + this.config.cx + "," + this.config.cy + ") rotate(" + rotation + ")")

            pointerContainer.append("svg:circle")
                .attr("cx", this.config.cx)
                .attr("cy", this.config.cy)
                .attr("r", 0.12 * this.config.raduis)
                .style("fill", centrecolor)
                .style("opacity", 1);


            var fontSize = Math.round(this.config.fontsize / 10);
            this.redraw(viewModel.dataPoints[0].rEnd, 0);
        }

        public redraw(value: number, transitionDuration: number) {

            var pointerContainer = this.svg.select(".pointerContainer");
            var pointer = pointerContainer.selectAll("path");
            pointer.transition()
                .duration(undefined != transitionDuration ? transitionDuration : this.config.transitionDuration);
        }
        

        public drawBand(start: number, end: number, color: string, ToolTipText: string, viewModel: GaugeChartModel, bandColor: string) {

            if (0 >= end - start) return;

            let Band;

            if (bandColor == 'green')
                Band = this.svg.append('path').classed('band' + (1), true).data(viewModel.dataPoints);
            else if (bandColor == 'red')
                Band = this.svg.append('path').classed('band' + (2), true).data(viewModel.dataPoints);
            else if (bandColor == 'yellow')
                Band = this.svg.append('path').classed('band' + (3), true).data(viewModel.dataPoints);


            var arc = d3.svg.arc()
                .innerRadius(0.65 * this.config.raduis)
                .outerRadius(0.85 * this.config.raduis)
                .startAngle(this.valueToRadians(start))
                .endAngle(this.valueToRadians(end));

            var reverse;
            if (viewModel.settings.reverse.show)
                reverse = " scale(1,-1)";
            else
                 reverse = "";

            Band.style("fill", color)
                .attr("d", <any>arc)
                .attr("transform", "translate(" + this.config.cx + "," + this.config.cy + ") rotate(270)" + reverse)

            this.tooltipServiceWrapper.addTooltip(this.svg.selectAll('.band1'),
                (tooltipEvent: TooltipEventArgs<number>) => this.getTooltipData(tooltipEvent.data, 1),
                (tooltipEvent: TooltipEventArgs<number>) => null);

            this.tooltipServiceWrapper.addTooltip(this.svg.selectAll('.band2'),
                (tooltipEvent: TooltipEventArgs<number>) => this.getTooltipData(tooltipEvent.data, 2),
                (tooltipEvent: TooltipEventArgs<number>) => null);

            this.tooltipServiceWrapper.addTooltip(this.svg.selectAll('.band3'),
                (tooltipEvent: TooltipEventArgs<number>) => this.getTooltipData(tooltipEvent.data, 3),
                (tooltipEvent: TooltipEventArgs<number>) => null);

        }

        private getTooltipData(value: any, band: number): VisualTooltipDataItem[] {

            let toggle = this.gaugeChartSettings.generalFormat.format;
            let bandValue;
            let displayName;
            if (band == 1) {
                if (toggle)                    
                    bandValue = this.getFormattedValueKM(value.min, this.gaugeChartSettings.generalFormat.decimalprecision, this.gaugeChartSettings.generalFormat.lead, this.gaugeChartSettings.generalFormat.trail) + "\n" + this.getFormattedValueKM(value.max, this.gaugeChartSettings.generalFormat.decimalprecision, this.gaugeChartSettings.generalFormat.lead, this.gaugeChartSettings.generalFormat.trail);              
                else
                    bandValue = this.getFormattedValue(value.min, this.gaugeChartSettings.generalFormat.decimalprecision, this.gaugeChartSettings.generalFormat.lead, this.gaugeChartSettings.generalFormat.trail) + "\n" + this.getFormattedValue(value.max, this.gaugeChartSettings.generalFormat.decimalprecision, this.gaugeChartSettings.generalFormat.lead, this.gaugeChartSettings.generalFormat.trail);
                displayName = "Minimum\nMaximum"
            }
            else if (band == 2) {
                if (toggle)
                    bandValue = this.getFormattedValueKM(value.rStart, this.gaugeChartSettings.generalFormat.decimalprecision, this.gaugeChartSettings.generalFormat.lead, this.gaugeChartSettings.generalFormat.trail) + "\n" + this.getFormattedValueKM(value.rEnd, this.gaugeChartSettings.generalFormat.decimalprecision, this.gaugeChartSettings.generalFormat.lead, this.gaugeChartSettings.generalFormat.trail);
                else
                    bandValue = this.getFormattedValue(value.rStart, this.gaugeChartSettings.generalFormat.decimalprecision, this.gaugeChartSettings.generalFormat.lead, this.gaugeChartSettings.generalFormat.trail) + "\n" + this.getFormattedValue(value.rEnd, this.gaugeChartSettings.generalFormat.decimalprecision, this.gaugeChartSettings.generalFormat.lead, this.gaugeChartSettings.generalFormat.trail);
                displayName = "Actual Start\nActual End"
            }
            else if (band == 3) {
                if (toggle)
                    bandValue = this.getFormattedValueKM(value.yStart, this.gaugeChartSettings.generalFormat.decimalprecision, this.gaugeChartSettings.generalFormat.lead, this.gaugeChartSettings.generalFormat.trail) + "\n" + this.getFormattedValueKM(value.yEnd, this.gaugeChartSettings.generalFormat.decimalprecision, this.gaugeChartSettings.generalFormat.lead,this.gaugeChartSettings.generalFormat.trail);
                else
                    bandValue = this.getFormattedValue(value.yStart, this.gaugeChartSettings.generalFormat.decimalprecision, this.gaugeChartSettings.generalFormat.lead, this.gaugeChartSettings.generalFormat.trail) + "\n" + this.getFormattedValue(value.yEnd, this.gaugeChartSettings.generalFormat.decimalprecision, this.gaugeChartSettings.generalFormat.lead, this.gaugeChartSettings.generalFormat.trail);
                displayName = "Target Start\nTarget End"

            }


            return [{
                displayName: displayName,
                value: bandValue,
            }];
        }

        public buildPointerPath(value: number) {
            var delta = this.config.range / 13;

            var head = this.valueToPointForBP(value, 0.85);
            var head1 = this.valueToPointForBP(value - delta, 0.12);
            var head2 = this.valueToPointForBP(value + delta, 0.12);

            var tailValue = value - (this.config.range * (1 / (270 / 360)) / 2);
            var tail = this.valueToPointForBP(tailValue, 0.28);
            var tail1 = this.valueToPointForBP(tailValue - delta, 0.12);
            var tail2 = this.valueToPointForBP(tailValue + delta, 0.12);

            return [head, head1, tail2, tail, tail1, head2, head];
        }

        public valueToPointForBP(value: number, factor: number) {
            var point = this.valueToPoint(value, factor);
            point.x -= this.config.cx;
            point.y -= this.config.cy;
            return point;
        }

        private valueToDegrees(value: number) {
            return value / this.config.range * 270 - (this.config.minVal / this.config.range * 270 + 45);
        }

        private valueToRadians(value: number) {
            return this.valueToDegrees(value) * Math.PI / 180;
        }

        private valueToPoint(value: number, factor: number) {
            return {
                x: this.config.cx - this.config.raduis * factor * Math.cos(this.valueToRadians(value)),
                y: this.config.cy - this.config.raduis * factor * Math.sin(this.valueToRadians(value))
            };
        }


        


        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {
            let objectName = options.objectName;
            let objectEnumeration: VisualObjectInstance[] = [];
            let dataPoint = this.gaugeDataPoint[0];

            switch (objectName) {
                case 'colorSelector':
               
                    objectEnumeration.push({
                        objectName: objectName,
                        properties: {
                            font: {
                                solid: {
                                    color: dataPoint.fontcolor
                                }
                            },
                            minmax: {
                                solid: {
                                    color: dataPoint.minmaxcolor
                                }
                            },
                            actual: {
                                solid: {
                                    color: dataPoint.actualcolor
                                }
                            },
                            target: {
                                solid: {
                                    color: dataPoint.targetcolor
                                }
                            },
                            needle: {
                                solid: {
                                    color: dataPoint.needlecolor
                                }
                            },
                            centre: {
                                solid: {
                                    color: dataPoint.centrecolor
                                }
                            },
                            body: {
                                solid: {
                                    color: dataPoint.bodycolor
                                }
                            },
                            rim: {
                                solid: {
                                    color: dataPoint.rimcolor
                                }
                            }
                        },
                        selector: dataPoint.selectionId.getSelector()
                    });
                 
                    break;
                case 'generalFormat':
                    objectEnumeration.push({
                        objectName: objectName,
                        properties: {
                            format: this.gaugeChartSettings.generalFormat.format,
                            decimalprecision: this.gaugeChartSettings.generalFormat.decimalprecision,
                            lead: this.gaugeChartSettings.generalFormat.lead,
                            trail: this.gaugeChartSettings.generalFormat.trail,
                        },
                        validValues: {
                            decimalprecision: { numberRange: { min: 0, max: 10 } }
                        },
                        selector: null
                    });
                    break;
                case 'generalFont':
                    objectEnumeration.push({
                        objectName: objectName,
                        properties: {
                            chartnamefontsize: this.gaugeChartSettings.generalFont.chartnamefontsize,
                            minmaxfontsize: this.gaugeChartSettings.generalFont.minmaxfontsize,
                            currentfontsize: this.gaugeChartSettings.generalFont.currentfontsize,
                            percentagefontsize: this.gaugeChartSettings.generalFont.percentagefontsize
                        },
						validValues: {
                            chartnamefontsize: { numberRange: { min: 8, max: 40 } },
                            minmaxfontsize: { numberRange: { min: 8, max: 40 } },
                            currentfontsize: { numberRange: { min: 8, max: 40 } },
                            percentagefontsize: { numberRange: { min: 8, max: 40 } }
						},
                        selector: null
                    });
                    break;
                case 'generalPercentage':
                    objectEnumeration.push({
                        objectName: objectName,
                        properties: {
                            show: this.gaugeChartSettings.generalPercentage.show,
                            toggle: this.gaugeChartSettings.generalPercentage.toggle,
                            percdecimalprecision: this.gaugeChartSettings.generalPercentage.percdecimalprecision,
                        },
                        validValues: {
                            percdecimalprecision: { numberRange: { min: 0, max: 10 } },
                        },
                        selector: null
                    });
                    break;
                case 'reverse':
                    objectEnumeration.push({
                        objectName: objectName,
                        properties: {
                            show: this.gaugeChartSettings.reverse.show,
                        },
                        selector: null
                    });
                    break;
                case 'threeD':
                    objectEnumeration.push({
                        objectName: objectName,
                        properties: {
                            show: this.gaugeChartSettings.threeD.show,
                        },
                        selector: null
                    });
                    break;
                case 'generalLegend':
                    objectEnumeration.push({
                        objectName: objectName,
                        properties: {
                            show: this.gaugeChartSettings.generalLegend.show,
                        },
                        selector: null
                    });
                    break;
                case 'chartToggle':
                    objectEnumeration.push({
                        objectName: objectName,
                        properties: {
                            show: this.gaugeChartSettings.chartToggle.show,
                        },
                        selector: null
                    });
                    break;
                case 'currentToggle':
                    objectEnumeration.push({
                        objectName: objectName,
                        properties: {
                            show: this.gaugeChartSettings.currentToggle.show,
                        },
                        selector: null
                    });
                    break;
            };
            return objectEnumeration;
        }
        public destroy(): void {
        }
    }
}
