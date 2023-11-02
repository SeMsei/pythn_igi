const banners = document.querySelectorAll('.block1');
    let currentBanner = 0;
    let rotationInterval;
    let isPageFocused = true;
    console.log("{{time}}");

    function showBanner(index) {
      banners.forEach((banner, i) => {
        if (i === index) {
          banner.style.display = 'flex';
        } else {
          banner.style.display = 'none';
        }
      });
    }

    function startRotation() {
        const interval = parseInt(window.time)*1000;
        console.log(interval);
      rotationInterval = setInterval(() => {
        if (document.hasFocus()) {
          currentBanner = (currentBanner + 1) % banners.length;
          showBanner(currentBanner);
        }
      }, interval);
    }

    function stopRotation() {
      clearInterval(rotationInterval);
    }

    // Initial banner display
    showBanner(currentBanner);
    startRotation();