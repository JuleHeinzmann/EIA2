"use strict";
var Zaubercanvas;
(function (Zaubercanvas) {
    class Star extends Zaubercanvas.Moveable {
        constructor(_position) {
            super(_position);
            this.colors = ["#FF0000", "#FF1F00", "#FF3F00", "#FF7F00", "#FF9F00", "#FFBF00", "#FFDF00", "#DFFF00", "#BFFF00",
                "#9FFF00", "#5FFF00", "#3FFF00", "#1FFF00", "#00FF1F", "#00FF3F", "#00FF5F", "#00FF7F", "#00FF9F", "#00FFBF", "#00FFDF",
                "#00FEFF", "#00DFFF", "#009FFF", "#007FFF", "#005FFF", "#003FFF", "#001FFF", "#0000FF", "#3F00FF", "#5F00FF", "#7F00FF",
                "#BF00FF", "#DF00FF", "#FF00FE", "#FF00DF", "#FF00BF", "#FF009F", "#FF007F", "#FF005F", "#FF003F", "#FF001F"];
            this.currentcolor = this.colors[0];
            this.i = 0;
            this.type = "Star";
        }
        draw(_crc) {
            _crc.save();
            _crc.translate(this.position.x, this.position.y);
            _crc.beginPath();
            _crc.moveTo(0, -15);
            for (let i = 0; i < 5; i++) {
                _crc.rotate(Math.PI / 5);
                _crc.lineTo(0, -15 * 2);
                _crc.rotate(Math.PI / 5);
                _crc.lineTo(0, -15);
            }
            _crc.fillStyle = this.currentcolor;
            _crc.fill();
            _crc.restore();
        }
        move(_timeslice, _crc) {
            if (this.i < this.colors.length) {
                this.currentcolor = this.colors[Math.floor(this.i)];
                this.i += 1 * _timeslice;
            }
            else {
                this.i = 0;
            }
        }
    }
    Zaubercanvas.Star = Star;
})(Zaubercanvas || (Zaubercanvas = {}));
//# sourceMappingURL=Star.js.map