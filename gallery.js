const statusCircle = document.getElementById('statusCircle');

    // Function to check the stream status from localStorage
    function checkStreamStatus() {
      const status = localStorage.getItem('streamStatus');
      if (status === 'active') {
        // Stream is active
        statusCircle.classList.remove('red');
        statusCircle.classList.add('green');
      } else {
        // Stream is stopped
        statusCircle.classList.remove('green');
        statusCircle.classList.add('red');
      }
    }

    // Check the stream status every 1 second
    setInterval(checkStreamStatus, 1000);

    // Initial check
    checkStreamStatus();
