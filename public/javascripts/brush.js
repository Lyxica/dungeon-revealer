define(function () {
    console.log('brush.js starting');

    return function (context, settings) {
        if (!context || !settings) {
            throw new Error('Invalid args');
        }
        console.log('brush instance created');
        var brushTypes = ["clear", "fog"],
            currentBrushType = brushTypes[0],
            currentPattern = null,
            setBrushType = function () {
                console.error("Doesn't exist yet");
            },
            toggle = function () {
                if (currentBrushType === brushTypes[0]) {
                    console.log("shroud brush set");
                    currentBrushType = brushTypes[1];
                } else if (currentBrushType === brushTypes[1]) {

                    console.log("clear brush set");
                    currentBrushType = brushTypes[0];
                } else {
                    console.log("nothing: ");
                    console.log(currentBrushType);
                }
                context.strokeStyle = getCurrent();
            },
            getPattern = function (brushType) {
                if (brushType === brushTypes[0]) {
                    context.globalCompositeOperation = 'destination-out';
                    //return dmContext.createPattern(getImageCanvas(), 'repeat');
                    return 'rgba(' + settings.fogRGB + ',' + settings.fogOpacity + ')';
                } else if (brushType === brushTypes[1]) {
                    context.globalCompositeOperation = 'source-over';
                    return 'rgba(' + settings.fogRGB + ',' + settings.fogOpacity + ')';
                    //return dmContext.createPattern(getShadowImageCanvas(), 'repeat');
                }

            },
            getCurrent = function () {
                return getPattern(currentBrushType);
            }

        return {
            brushTypes: brushTypes,
            currentBrushType: currentBrushType,
            setBrushType: setBrushType,
            toggle: toggle,
            getCurrent: getCurrent,
            getPattern: getPattern
        }
    };
});