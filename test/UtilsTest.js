describe('Utils', function() {
    var utils;

    beforeEach(function() {
        utils = new Utils();
    });

    it('can be created', function() {
        expect(utils instanceof Utils).toBeTruthy();
    });

    describe('flattenObject function', function() {
        var assertFlattened = function(original, flat) {
            expect(utils.flattenObject(original, '_')).toEqual(flat);
        };

        it('given null, returns null', function() {
            assertFlattened(null, null);
        });

        it('given empty object returns empty object', function() {
            assertFlattened({}, {});
        });

        it('given array returns throws expected object error', function() {
            expect(function () {utils.flattenObject([])}).toThrow('Expected object!');
        });

        it('given function returns throws expected object error', function() {
            expect(function () {utils.flattenObject(function() {})}).toThrow('Expected object!');
        });

        it('given single layer object returns same object', function() {
            assertFlattened({cool: true}, {cool: true});
        });

        it('given {person: {name: "foo"}}, returns {person_name: "foo"}', function() {
            assertFlattened(
                {person: {name: "foo"}},
                {person_name: "foo"}
            );
        });

        it('given {person: {name: "Mike"}}, returns {person_name: "Mike"}', function() {
            assertFlattened(
                {person: {name: "Mike"}},
                {person_name: "Mike"}
            );
        });

        it('given has top level attributes, returns them as top level attributes', function() {
            assertFlattened(
                {person: {name: "Mike"}, cool: true},
                {person_name: "Mike", cool: true}
            );
        });

        it('given has top level attributes and double nested object, returns all as top level attributes', function() {
            assertFlattened(
                {person: {name: "Mike", car: {make: 'buick', model: 'regal'}}, cool: true},
                {person_name: "Mike", person_car_make: 'buick', person_car_model: 'regal', cool: true}
            );
        });

        it('with crazy large object it all is works!', function() {
            assertFlattened(
                {
                    person: {
                        name: "Mike",
                        car: {
                            make: 'buick',
                            model: 'regal',
                            tires: {
                                color: 'black',
                                shape: 'round',
                                state: {
                                    tread: '0mm',
                                    pressure: '12psi',
                                    okay: true
                                }
                            }
                        }
                    },
                    cool: true
                },
                {
                    person_name: "Mike",
                    person_car_make: 'buick',
                    person_car_model: 'regal',
                    person_car_tires_color: 'black',
                    person_car_tires_shape: 'round',
                    person_car_tires_state_tread: '0mm',
                    person_car_tires_state_pressure: '12psi',
                    person_car_tires_state_okay: true,
                    cool: true
                }
            );
        });
    });

    describe('inflate function', function() {
        var assertInflated = function(original, inflated) {
            expect(utils.inflateObject(original, '_')).toEqual(inflated);
        };

        it('given null returns null', function() {
            assertInflated(null, null);
        });

        it('given array, throws expected object', function() {
            expect(function () {utils.inflateObject([])}).toThrow('Expected object!');
        });

        it('given function, throws expected object', function() {
            expect(function () {utils.inflateObject(function() {})}).toThrow('Expected object!');
        });

        it('given an empty object, returns empty object', function() {
            assertInflated({}, {});
        });

        it('given an object with one inflatable attribute, returns inflated', function() {
            assertInflated({foo_bar: 'awesome'}, {foo: {bar: 'awesome'}});
        });

        it('given an object with one inflatable attribute and one without, returns inflated', function() {
            assertInflated(
                {
                    foo_bar: 'awesome',
                    mike: 'cool'
                },
                {
                    foo: {
                        bar: 'awesome'
                    },
                    mike: 'cool'
                }
            );
        });

        it('given an object with multiple layers of inflation, returns inflated', function() {
            assertInflated(
                {
                    foo_bar_awesome: true
                },
                {
                    foo: {
                        bar: {
                            awesome: true
                        }
                    }
                }
            );
        });

        it('same first object', function() {
            assertInflated(
                {
                    foo_bar_awesome: true,
                    foo_car: 'accord'
                },
                {
                    foo: {
                        bar: {
                            awesome: true
                        },
                        car: 'accord'
                    }
                }
            );
        });

        it('stress test', function() {
            assertInflated(
                utils.flattenObject({
                    "DeliveryHideSettings": {
                        "HideSelects": {
                            "Enabled": false,
                            "Value": ""
                        },
                        "HideTextAreas": {
                            "Enabled": false,
                            "Value": ""
                        },
                        "HideiFrames": {
                            "Enabled": false,
                            "Value": ""
                        },
                        "HideObjects": {
                            "Enabled": false,
                            "Value": ""
                        },
                        "HideEmbededs": {
                            "Enabled": false,
                            "Value": ""
                        },
                        "HideAllPanels": {
                            "Enabled": false,
                            "Value": ""
                        }
                    },
                    "CustomDeliverySettings": {
                        "ZIndexoverride": {
                            "Enabled": false,
                            "Value": ""
                        },
                        "EnCoding": {
                            "Enabled": false,
                            "Value": ""
                        },
                        "EnableIfm": {
                            "Enabled": true,
                            "Value": ""
                        },
                        "EnableAdjOff": {
                            "Enabled": false,
                            "Value": ""
                        },
                        "EnableCookie": {
                            "Enabled": true,
                            "Value": ""
                        },
                        "EnableNodiv": {
                            "Enabled": false,
                            "Value": ""
                        },
                        "EnableMzif": {
                            "Enabled": true,
                            "Value": ""
                        },
                        "Enablecs": {
                            "Enabled": false,
                            "Value": "0"
                        },
                        "EnableLSetting": {
                            "Enabled": false,
                            "Value": ""
                        },
                        "EnableImp": {
                            "Enabled": false,
                            "Value": ""
                        },
                        "EnablePubPath": {
                            "Enabled": false,
                            "Value": ""
                        },
                        "EnableIntact": {
                            "Enabled": false,
                            "Value": ""
                        },
                        "EnableTarg": {
                            "Enabled": false,
                            "Value": ""
                        },
                        "CustomStyle": ""
                    }
                }, '_'),
                {
                    "DeliveryHideSettings": {
                        "HideSelects": {
                            "Enabled": false,
                            "Value": ""
                        },
                        "HideTextAreas": {
                            "Enabled": false,
                            "Value": ""
                        },
                        "HideiFrames": {
                            "Enabled": false,
                            "Value": ""
                        },
                        "HideObjects": {
                            "Enabled": false,
                            "Value": ""
                        },
                        "HideEmbededs": {
                            "Enabled": false,
                            "Value": ""
                        },
                        "HideAllPanels": {
                            "Enabled": false,
                            "Value": ""
                        }
                    },
                    "CustomDeliverySettings": {
                        "ZIndexoverride": {
                            "Enabled": false,
                            "Value": ""
                        },
                        "EnCoding": {
                            "Enabled": false,
                            "Value": ""
                        },
                        "EnableIfm": {
                            "Enabled": true,
                            "Value": ""
                        },
                        "EnableAdjOff": {
                            "Enabled": false,
                            "Value": ""
                        },
                        "EnableCookie": {
                            "Enabled": true,
                            "Value": ""
                        },
                        "EnableNodiv": {
                            "Enabled": false,
                            "Value": ""
                        },
                        "EnableMzif": {
                            "Enabled": true,
                            "Value": ""
                        },
                        "Enablecs": {
                            "Enabled": false,
                            "Value": "0"
                        },
                        "EnableLSetting": {
                            "Enabled": false,
                            "Value": ""
                        },
                        "EnableImp": {
                            "Enabled": false,
                            "Value": ""
                        },
                        "EnablePubPath": {
                            "Enabled": false,
                            "Value": ""
                        },
                        "EnableIntact": {
                            "Enabled": false,
                            "Value": ""
                        },
                        "EnableTarg": {
                            "Enabled": false,
                            "Value": ""
                        },
                        "CustomStyle": ""
                    }
                }
            );
        });
    });
});