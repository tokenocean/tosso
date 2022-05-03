<div class="wrapper">
    <div id="d1">aaa</div>
    <div id="d2"></div>
    <div id = "d3"></div>
</div>
<style>
  .wrapper{
    margin: 0px;
    padding: 0px;
    background: #222730;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: relative;
  }
  div{
    background: #4CAAB3;
    position: absolute;
  }
  #d1{
    width: 100%;
    height: 150px;
  }
  #d2{
    height: 150px;
    width: 150px;
    transform: rotate(45deg);
    box-shadow: 0 0 0 4px #222730;
  }
  #d2:hover{
    animation: shine 4s ease-in-out infinite;
  }
  #d3{
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background: #393E46;
  }
  @keyframes shine{
    0%{
        box-shadow: 
            2px -2px 4px 2px #b0ebfd,
            0 0 0 4px #6aa1fa;
    }
    25%{
        box-shadow:
            2px 2px 4px 2px #67d1f1,
            0 0 0 4px #4171be;
    }
    50%{
        box-shadow:
            -2px 2px 4px 2px #7dd7f3,
            0 0 0 4px #4486f0;
    }
    75%{
         box-shadow: 
            -2px -2px 4px 2px #b0ebfd,
            0 0 0 4px #5e87ca
    }
    100%{
        box-shadow: 
            2px -2px 4px 2px #b0ebfd,
            0 0 0 4px #6aa1fa;
    }
  }
</style>