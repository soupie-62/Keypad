var k1, k2,  k3;
var menuLevel = 0;

// menuLevel:
//	0	Normal functions
//	1	1st shift [F]	- yellow
//	2	2nd shift [G]	- blue
//	3	3rd shift [H]	- green
//	4	ALPHA		- white

function updateKeys() {
    k1 = document.getElementById('shift_1');
    k2 = document.getElementById('shift_2');
    k3 = document.getElementById('key_1');
    switch (menuLevel) {
        case 0:
                k1.src = "Button_y1.gif";
                k2.src = "Button_b1.gif";
                k3.src = "Button_10.gif";
                document.getElementById("myMsg1").innerHTML = " ";
                break;

        case 1:
                k1.src = "Button_y2.gif";
                k2.src = "Button_b1.gif";
                k3.src = "Button_1F.gif";
                document.getElementById("myMsg1").innerHTML = "F [Yellow Key]";
                break;

        case 2:
                k1.src = "Button_y1.gif";
                k2.src = "Button_b2.gif";
                k3.src = "Button_1G.gif";
                document.getElementById("myMsg1").innerHTML = "G [Blue Key]";
                break;

        case 3:
                k1.src = "Button_y2.gif";
                k2.src = "Button_b2.gif";
                k3.src = "Button_1H.gif";
                document.getElementById("myMsg1").innerHTML = "H [Yellow and Blue Keys]";
                break;
    }
}

function sh_F (){
    k1 = document.getElementById('shift_1');
    switch (menuLevel) {
        case 0:  		// no shift		
                menuLevel = 1;	// activate F
                break;

        case 1:  		// F active
                menuLevel = 0;	// no shift
                break;

        case 2:  		// G active 		
                menuLevel = 3;	// activate H [F and G combined]
                break;

        case 3: 		// H active
                menuLevel = 2;	// disable H, leave G active
                break;
        }
        updateKeys();
}

function sh_G (){
    k2 = document.getElementById('shift_2');
    switch (menuLevel) {
        case 0:  		// no shift		
                menuLevel = 2;	// activate G
                break;

        case 2:  		// G active
                menuLevel = 0;	// no shift
                break;

        case 1:  		// F active 		
                menuLevel = 3;	// activate H [F and G combined]
                break;

        case 3: 		// H active
                menuLevel = 1;	// disable H, leave F active
                break;
        }
        updateKeys();
}

function sh_A () {
    k2 = document.getElementById('shift_A');
    switch (menuLevel) {
        case 0:  		// no shift		
                menuLevel = 4;	// activate ALPHA
                break;

        case 4:  		// ALPHA active
                menuLevel = 0;	// no shift
                break;
}


function menuselect() {

}


