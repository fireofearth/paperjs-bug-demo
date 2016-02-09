// OpenSeadragon canvas Overlay plugin 0.0.1 based on svg overlay plugin

(function() {

    if (!window.OpenSeadragon) {
        console.error('[openseadragon-canvas-overlay] requires OpenSeadragon');
        return;
    }


    // ----------
    OpenSeadragon.Viewer.prototype.fabricjsOverlay = function() {
        if (this._fabricjsOverlayInfo) {
            return this._fabricjsOverlayInfo;
        }

        this._fabricjsOverlayInfo = new Overlay(this);
        return this._fabricjsOverlayInfo;
    };

    // ----------
    var Overlay = function(viewer) {
        var self = this;

        this._viewer = viewer;

        this._containerWidth = 0;
        this._containerHeight = 0;

        this._canvasdiv = document.createElement( 'div');
        this._canvasdiv.style.position = 'absolute';
        this._canvasdiv.style.left = 0;
        this._canvasdiv.style.top = 0;
        this._canvasdiv.style.width = '100%';
        this._canvasdiv.style.height = '100%';
        this._viewer.canvas.appendChild(this._canvasdiv);

        this._canvas = document.createElement('canvas');
        this._canvas.setAttribute('id', 'osd-overlaycanvas');
        this._canvasdiv.appendChild(this._canvas);
        this.resize();
        this._fabriccanvas=new fabric.Canvas('osd-overlaycanvas');
        // disable fabric selection because default click is tracked by OSD
        this._fabriccanvas.selection=false; 
        // prevent OSD click elements on fabric objects
        this._fabriccanvas.on('mouse:down', function (options) {
           if (options.target) {
              options.e.preventDefault();
              options.e.stopPropagation();
              }
        });
        
    
        
        this._viewer.addHandler('animation', function() {
            self.resize();
            self.resizecanvas();

        });

        this._viewer.addHandler('open', function() {
            self.resize();
            self.resizecanvas();
        });

        this.resize();
    };

    // ----------
    Overlay.prototype = {
        // ----------
        canvas: function() {
            return this._canvas;
        },
        fabriccanvas: function() {
            return this._fabriccanvas;
        },
        // ----------
        clear: function() {
            this._fabriccanvas.clearAll();
        },
        // ----------
        resize: function() {
            if (this._containerWidth !== this._viewer.container.clientWidth) {
                this._containerWidth = this._viewer.container.clientWidth;
                this._canvasdiv.setAttribute('width', this._containerWidth);
                this._canvas.setAttribute('width', this._containerWidth);
            }

            if (this._containerHeight !== this._viewer.container.clientHeight) {
                this._containerHeight = this._viewer.container.clientHeight;
                this._canvasdiv.setAttribute('height', this._containerHeight);
                this._canvas.setAttribute('height', this._containerHeight);
            }

        },
       resizecanvas: function() {
           var viewportZoom = this._viewer.viewport.getZoom(true);
           var image1 = this._viewer.world.getItemAt(0);
           var zoom = image1.viewportToImageZoom(viewportZoom);
           var origin = new OpenSeadragon.Point(0, 0);     
           var image1WindowPoint = image1.imageToWindowCoordinates(origin);        
           var x=Math.round(image1WindowPoint.x);
           var y=Math.round(image1WindowPoint.y);
           this._fabriccanvas.setZoom(zoom);
           this._fabriccanvas.absolutePan(new fabric.Point(-x,-y));
       }
        
    };

})();