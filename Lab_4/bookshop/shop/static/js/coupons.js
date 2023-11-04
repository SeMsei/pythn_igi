const coupons = document.querySelectorAll('.active-coupons');
console.log(window.list);
console.log(JSON.parse(window.list));
const active_js = JSON.parse(window.list);

for (var i = 0; i < coupons.length; i++) {
    var discount = active_js[i]["discount"];
    coupons[i].querySelector(".colorFill").style.width = discount + "%";

        disc_size = parseInt(discount);
        let r = 255;
        let g;
        let b;
        g = 255-disc_size*2.55;
        b = 255-disc_size*2.55;
        console.log(`rgb(${r}, ${g}, ${b})`);
        coupons[i].querySelector(".colorFill").style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}




const in_coupons = document.querySelectorAll('.inactive-coupons');
const inactive_js = JSON.parse(window.inactive_list);
console.log(inactive_js);

for (var i = 0; i < inactive_js.length; i++) {
    var discount = inactive_js[i]["discount"];
    console.log(discount);
    in_coupons[i].querySelector(".colorFill").style.width = discount + "%";

        disc_size = parseInt(discount);
        let r = 255;
        let g;
        let b;
        g = 255-disc_size*2.55;
        b = 255-disc_size*2.55;
        console.log(`rgb(${r}, ${g}, ${b})`);
        in_coupons[i].querySelector(".colorFill").style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}