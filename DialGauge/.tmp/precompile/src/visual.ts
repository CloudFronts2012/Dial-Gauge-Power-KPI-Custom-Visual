
module powerbi.extensibility.visual.dg5AAA90EFEFE747CB9357C4FC19B85A58  {
    "use strict";
    export type DataType = { x: any, y: any };

    export class ConfigGauge {
        size: number;
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
        generalFormat: {
            format: boolean;
        };
        generalPercentage: {
            percentage: boolean;
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
        selectionId: powerbi.visuals.ISelectionId;

    };


    function addition(value: number): number {
        if (value != undefined)
            value += value;
        return value;
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
            pointerValue: 0,
            percentage: 0,
            chartname: '',
            selectionId: <any>''

        }

        let defaultSettings: GaugeChartSettings = {
            generalFormat: {
                format: false
            },
            generalPercentage: {
                percentage: true
            }
        };


        let viewGauge: GaugeChartModel = {
            dataPoints: [],
            settings: <GaugeChartSettings>{}
        };





        let categorical = dataViews[0].categorical;




        let gaugeDataPoints: GaugeDataPoint[] = [];

        let objects = dataViews[0].metadata.objects;

        var categories,
            categoryValues,
            categoryValuesLen = 1;



        if (categorical.categories) {
            categories = categorical.categories[0];
            categoryValues = categories.values;
            categoryValuesLen = categoryValues.length;

        }

        for (var idx = 0; idx < categoryValuesLen; idx++) {
            var maximum: number = undefined, minimum: number = undefined,
                redstart: number = undefined, redend: number = undefined,
                yellowstrat: number = undefined, yellowend: number = undefined,
                pointValue: number = undefined, percValue: number = undefined,
                cName: string = undefined;

            var values = categorical.values;
            var metadataColumns = dataViews[0].metadata.columns;



            for (var i = 0; i < categorical.values.length; i++) {

                var col = categorical.values[i].source
                var currentVal = categorical.values[i].values[idx] || 0;

                if (col && col.roles) {
                    if (col.roles[gaugeChartRoleNames.max]) {
                        maximum = <number>currentVal;
                    } else if (col.roles[gaugeChartRoleNames.min]) {
                        minimum = <number>currentVal;;

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
                gaugeDataPoint = {
                    max: maximum,
                    min: minimum,
                    rStart: redstart,
                    rEnd: redend,
                    yStart: yellowstrat,
                    yEnd: yellowend,
                    pointerValue: pointValue,
                    percentage: percValue,
                    chartname: cName,
                    selectionId: host.createSelectionIdBuilder()
                        .withCategory(categories, i)
                        .createSelectionId()

                };
            }
        }

        let gaugeChartSettings: GaugeChartSettings = {
            generalFormat: {
                format: getValue<boolean>(objects, 'generalFormat', 'format', defaultSettings.generalFormat.format),
            },
            generalPercentage: {
                percentage: getValue<boolean>(objects, 'generalPercentage', 'percentage', defaultSettings.generalPercentage.percentage),
            }
        };


        for (let i = 0, len = categorical.values.length; i < len; i++) {
            gaugeDataPoints.push(gaugeDataPoint);
        }

        gaugeModel = {
            dataPoints: gaugeDataPoints,
            settings: gaugeChartSettings,

        }
        return gaugeModel;


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

            this.config.size = this.config.size * 0.9;
            this.config.raduis = this.config.size * 0.97 / 2;
            this.config.cx = this.config.size / 2;
            this.config.cy = this.config.size / 2;
            this.svg.selectAll("*").remove();
        }

        public getFormattedValue(val: number): string {
            let formattedValue: string = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return formattedValue;
        }

        public getFormattedValueKM(val: number): string {
            let formattedValue;
            if (999 < val && val < 999999)
                formattedValue = Math.abs(Number(val)) / 1.0e+3 + "K";
            else if (val > 999999)
                formattedValue = Math.abs(Number(val)) / 1.0e+6 + "M";
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


            this.svg.attr({
                width: width,
                height: height,

            });


            let circle1 = this.svg.append('circle').classed('circle', true);
            let circle2 = this.svg.append('circle').classed('circle', true);
            let circle3 = this.svg.append('circle').classed('circle', true);


            circle1.attr({
                cx: this.config.cx,
                cy: this.config.cy,
                r: this.config.raduis

            }).style({
                'fill': '#ccc',
                'stroke-width': "0.5px",
                'stroke': "000"

            });

            circle2.attr({
                cx: this.config.cx,
                cy: this.config.cy,
                r: 0.9 * this.config.raduis

            }).style({
                'fill': '#fff',
                'stroke-width': "2px",
                'stroke': "e0e0e0",

            });




            for (var index in this.config.greenZones) {
                this.drawBand(this.config.greenZones[index].from, this.config.greenZones[index].to, this.config.greenColor, this.config.greenZonesName, viewModel, "green");
            }

            if (this.config.yellowZones[index].to >= this.config.redZones[index].to) {
                for (var index in this.config.yellowZones) {
                    this.drawBand(this.config.yellowZones[index].from, this.config.yellowZones[index].to, this.config.yellowColor, this.config.yellowZonesName, viewModel, "yellow");
                }

                for (var index in this.config.redZones) {
                    this.drawBand(this.config.redZones[index].from, this.config.redZones[index].to, this.config.redColor, this.config.redZonesName, viewModel, "red");

                }
            }
            else {
                for (var index in this.config.redZones) {
                    this.drawBand(this.config.redZones[index].from, this.config.redZones[index].to, this.config.redColor, this.config.redZonesName, viewModel, "red");
                }

                for (var index in this.config.yellowZones) {
                    this.drawBand(this.config.yellowZones[index].from, this.config.yellowZones[index].to, this.config.yellowColor, this.config.yellowZonesName, viewModel, "yellow");
                }
            }

            this.config.label = viewModel.dataPoints[0].chartname;


            var fontSize = Math.round(this.config.size / 9);

            this.svg.append('text').classed("text", true).attr({
                x: this.config.cx,
                y: this.config.cy / 1.8 + fontSize / 2,
                dy: fontSize / 2,
                'font-size': fontSize / 1.5 + "px",
            }).text(this.config.label).style({
                'fill': '#333',
                'text-anchor': 'middle',
                "stroke-width": "0px"

            });




            if (viewModel.settings.generalFormat.format) {
                pointerText = this.getFormattedValueKM(viewModel.dataPoints[0].pointerValue)
            }
            else {
                pointerText = this.getFormattedValue(viewModel.dataPoints[0].pointerValue)
            }




            var fontSize = Math.round(this.config.size / 9);
            this.svg.select(".RedEndContainer").remove();
            var perContainer = this.svg.append("svg:g").attr("class", "RedEndContainer");
            perContainer.append("text").attr({
                x: this.config.cx,
                y: this.config.cy * 1.5 + fontSize / 2,
                dy: fontSize / 2,
                'font-size': fontSize + "px",
            }).text(pointerText).style({
                'fill': '#333',
                'text-anchor': 'middle',
                "stroke-width": "0px"
            });

            var fontSize = Math.round(this.config.size / 9);
            this.svg.select(".PercentageContainer").remove();
            var perContainer = this.svg.append("svg:g").attr("class", "PercentageContainer");

            if (viewModel.settings.generalPercentage.percentage) {
                percentageText = (viewModel.dataPoints[0].percentage * 100).toFixed(2) + "%"
            }
            else {
                percentageText = (viewModel.dataPoints[0].percentage * 100).toFixed(2);
            }

            perContainer.append("svg:text").attr({
                x: this.config.cx,
                y: this.config.cy * 2 + fontSize / 2,
                dy: fontSize / 2,
                'font-size': fontSize + "px",
            }).text(percentageText).style({
                'fill': '#333',
                'text-anchor': 'middle',
                "stroke-width": "0px"
            });




            var fontSize = Math.round(this.config.size / 16);
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

                    if (viewModel.settings.generalFormat.format) {
                        majorText = this.getFormattedValueKM(major)
                    }
                    else {
                        majorText = this.getFormattedValue(major)
                    }

                    this.svg.append("svg:text")
                        .attr("x", point.x)
                        .attr("y", point.y)
                        .attr("dy", fontSize / 3)
                        .attr("text-anchor", major == viewModel.dataPoints[0].min ? "start" : "end")
                        .text(majorText)
                        .style("font-size", fontSize + "px")
                        .style("fill", "#333")
                        .style("stroke-width", "0px");

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


            pointerContainer.selectAll("path")
                .data([pointerPath])
                .enter()
                .append("svg:path")
                .attr("d", pointerLine)
                .style("fill", "#dc3912")
                .style("stroke", "#c63310")
                .style("fill-opacity", 0.7)
                .attr("transform", "translate(" + this.config.cx + "," + this.config.cy + ") rotate(" + rotation + ")")

            pointerContainer.append("svg:circle")
                .attr("cx", this.config.cx)
                .attr("cy", this.config.cy)
                .attr("r", 0.12 * this.config.raduis)
                .style("fill", "#4684EE")
                .style("stroke", "#666")
                .style("opacity", 1);


            var fontSize = Math.round(this.config.size / 10);
            pointerContainer.selectAll("text")
                .data([midValue])
                .enter()
                .append("svg:text")
                .attr("x", this.config.cx)
                .attr("y", this.config.size - this.config.cy / 4 - fontSize)
                .attr("dy", fontSize / 2)
                .attr("text-anchor", "middle")
                .style("font-size", fontSize + "px")
                .style("fill", "#000")
                .style("stroke-width", "0px");

            this.redraw(viewModel.dataPoints[0].rEnd, 0);

        }

        public redraw(value: number, transitionDuration: number) {

            var pointerContainer = this.svg.select(".pointerContainer");
            var pointer = pointerContainer.selectAll("path");
            pointer.transition()
                .duration(undefined != transitionDuration ? transitionDuration : this.config.transitionDuration);
        }

        public destroy(): void {



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


            Band.style("fill", color)
                .attr("d", <any>arc)
                .attr("transform", "translate(" + this.config.cx + "," + this.config.cy + ") rotate(270)")

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
                    bandValue = this.getFormattedValueKM(value.max);
                else
                    bandValue = this.getFormattedValue(value.max);
                displayName = "Maximum"
            }
            else if (band == 2) {
                if (toggle)
                    bandValue = this.getFormattedValueKM(value.rEnd);
                else
                    bandValue = this.getFormattedValue(value.rEnd);
                displayName = "Actual"
            }
            else if (band == 3) {
                if (toggle)
                    bandValue = this.getFormattedValueKM(value.yEnd);
                else
                    bandValue = this.getFormattedValue(value.yEnd);
                displayName = "Target"

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

            switch (objectName) {
                case 'generalFormat':
                    objectEnumeration.push({
                        objectName: objectName,
                        properties: {
                            format: this.gaugeChartSettings.generalFormat.format,
                        },
                        selector: null
                    });
                    break;
                case 'generalPercentage':
                    objectEnumeration.push({
                        objectName: objectName,
                        properties: {
                            percentage: this.gaugeChartSettings.generalPercentage.percentage,
                        },
                        selector: null
                    });
                    break;
            };

            return objectEnumeration;
        }

    }

}