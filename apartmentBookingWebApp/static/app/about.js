Vue.component("about",{ 
    template:`
    <main>
    <div class="navigationbar"> 
      <nav class="navbar navbar-expand-md navbar-dark" style="background-color: #3268a8;">
        <a class="navbar-brand"><img src="assets/images/logo.png" style="width:70px;height:70px;"></a>
        <span class="navbar-text" style="color: white;">BnBBooking</span>
        <ul class="navbar-nav">
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Reserve</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="">Recomend</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#/about">About us</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#/contact">Contact us</a>
              </li>
              <li>
              <div class="sign-in-up" style="right:0">
              <button type="button" class="btn my-2 my-lg-0" onclick="location.href='#/register'" >Create account</button>
              <button type="button" class="btn my-2 my-lg-0"  onclick="location.href='#/login'" >Sign in</button>
              </div>
          </li>
  
        </ul>
    </nav>
    </div>
    
    <div class="container-fluid">
      <div class="row">
        <div class="col-6 login-section-wrapper">
          <div id="log" class="login-wrapper my-auto">
            <h1 class="login-title">About BnBBooking</h1>

            <p>Founded in 2020 by two brilliant programmers Radovan Zupunski and Aleksandar Ignjatijevic, amid the Coronavirus outbreak in Novi Sad, BnBBooking company has grown from a small Serbian start-up to one of the world’s leading digital travel companies. Part of BnBBooking Holdings Inc. (NASDAQ: BKNG), BnBBooking.com’s mission is to make it easier for everyone to experience the world.

              By investing in technology that takes the friction out of travel, BnBBooking.com seamlessly connects millions of travelers to memorable experiences, a variety of transportation options, and incredible places to stay – from homes to hotels, and much more. As one of the world’s largest travel marketplaces for both established brands and entrepreneurs of all sizes, BnBBooking.com enables properties around the world to reach a global audience and grow their businesses.
              
              BnBBooking.com offers more than 28 million reported accommodation listings, including over 6.2 million homes, apartments, and other unique places to stay. Wherever you want to go and whatever you want to do, BnBBooking.com makes it easy and supports you with 24/7 customer support.</p>
            
           
          </div>
        </div>
        <div class="col-6 px-0 d-none d-sm-block">
          <img src="assets/images/Vacation-Rental-750x498.jpg" alt="login image" class="login-img">
        </div>
      </div>
    </div>
  </main>
    `
});


