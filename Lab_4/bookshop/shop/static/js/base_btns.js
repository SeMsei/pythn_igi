const buttons = document.getElementsByClassName("animated-button");
                                
                                for (let i = 0; i < buttons.length; i++) {
                                        console.log(1);
                                        
                                        buttons[i].addEventListener("mousemove", (e) => {
                                        const x = e.pageX - buttons[i].offsetLeft;
                                        const y = e.pageY - buttons[i].offsetTop;
                                        
                                        const centerX = buttons[i].offsetWidth / 2;
                                        const centerY = buttons[i].offsetHeight / 2;
                                        
                                        const deltaX = x - centerX;
                                        const deltaY = y - centerY;
                                        
                                        const scaleX = 1 + Math.abs(deltaX) / (buttons[i].offsetWidth / 2);
                                        const scaleY = 1 + Math.abs(deltaY) / (buttons[i].offsetHeight / 2);

                                        const max_scale_x = 2;
                                        const max_scale_y = 2;

                                        console.log(scaleX, scaleY);

                                        //scaleX = Math.min(max_scale_x, scaleX);
                                        //scaleY = Math.min(max_scale_y, scaleY);
                                        
                                        buttons[i].style.transform = `scale(${Math.min(max_scale_x, scaleX)}, ${Math.min(max_scale_y, scaleY)})`;
                                        });

                                        buttons[i].addEventListener("mouseleave", () => {
                                            buttons[i].style.transform = "scale(1, 1)";
                                        });
                                }