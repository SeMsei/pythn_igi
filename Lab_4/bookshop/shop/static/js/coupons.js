const coupons = document.querySelectorAll('.active-coupons');

coupons.forEach(
    coupon=>{
        var discount = coupon.getElementsByClassName("discount")[0].innerText;
        coupon.querySelector(".colorFill").style.width = discount;

        discount.replace('%', '');
        disc_size = parseInt(discount);
        let r = 255;
        let g;
        let b;
        g = 255-disc_size*2.55;
        b = 255-disc_size*2.55;
        console.log(`rgb(${r}, ${g}, ${b})`);
        coupon.querySelector(".colorFill").style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
);

const in_coupons = document.querySelectorAll('.inactive-coupons');

in_coupons.forEach(
    coupon=>{
        var discount = coupon.getElementsByClassName("discount")[0].innerText;
        coupon.querySelector(".colorFill").style.width = discount;

        discount.replace('%', '');
        disc_size = parseInt(discount);
        let r = 255;
        let g;
        let b;
        g = 255-disc_size*2.55;
        b = 255-disc_size*2.55;
        console.log(`rgb(${r}, ${g}, ${b})`);
        coupon.querySelector(".colorFill").style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
);